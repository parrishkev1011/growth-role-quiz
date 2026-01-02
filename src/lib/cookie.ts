import crypto from "crypto";

/**
 * Signed access cookie used for paid access gating.
 *
 * Purpose: provide a tamper-resistant, short-lived marker that a given
 * Checkout `sessionId` was fulfilled and grants access to the paid
 * `role` blueprint without requiring a persistent user session.
 *
 * Payload shape (`AccessPayload`):
 * - `role` (string): name of the unlocked blueprint (lowercased).
 * - `sessionId` (string): Stripe Checkout session ID used to prove purchase.
 * - `exp` (number): unix seconds timestamp when the token expires.
 *
 * Signing: the cookie is HMAC-SHA256 signed using the secret in
 * `GRQ_COOKIE_SECRET`. On verify the server recomputes the HMAC and
 * compares it using a constant-time check to prevent tampering.
 * (This is a conceptual note; the implementation uses Node's `crypto` API.)
 *
 * Required env var:
 * - `GRQ_COOKIE_SECRET`: secret key used for HMAC signing. Must be set in
 *   production and rotated carefully (see rotation notes).
 *
 * Expiration & rotation:
 * - Tokens include an `exp` field; treat the cookie as ephemeral (90 days
 *   used elsewhere for server-side TTLs but prefer shorter-lived cookies if
 *   higher security is needed).
 * - Rotating `GRQ_COOKIE_SECRET` will invalidate existing cookies. To rotate
 *   without breaking immediate access, consider supporting a key ID (kid)
 *   and attempting verification with multiple keys during a transition.
 *
 * Common failure cases:
 * - Missing or incorrect `GRQ_COOKIE_SECRET` -> verification returns null.
 * - Token tampering -> HMAC mismatch and verification fails.
 * - Expired token (`exp` in the past) -> verification fails.
 * - Malformed token (not `payload.sig`) -> verification fails.
 */

type AccessPayload = {
  role: string;
  sessionId: string;
  exp: number; // unix seconds
};

const SECRET = process.env.GRQ_COOKIE_SECRET || "";

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function fromBase64url(input: string) {
  return Buffer.from(input, "base64url").toString();
}

export function signAccessCookie(payload: AccessPayload): string {
  // Backward-compatible: if called with object payload (old API), preserve
  // the previous base64json.signature format. New callers should pass the
  // `(role, sessionId)` overload below (pipe format).
  if (!SECRET) throw new Error("GRQ_COOKIE_SECRET is not configured");
  const json = JSON.stringify(payload);
  const payloadB64 = base64url(json);
  const sig = crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

// New helper: create pipe-format cookie `role|sessionId|sig`
export function signAccessCookiePipe(role: string, sessionId: string) {
  if (!SECRET) throw new Error("GRQ_COOKIE_SECRET is not configured");
  const payload = `${role}|${sessionId}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${role}|${sessionId}|${sig}`;
}

// verifyAccessCookie accepts either the old `base64json.sig` format or the
// new `role|sessionId|sig` pipe format. Returns an object with `role` and
// `sessionId` when valid, else null.
export function verifyAccessCookie(token: string): { role: string; sessionId: string } | null {
  if (!SECRET) return null;
  try {
    // Pipe format: role|sessionId|sig
    if (token.includes("|")) {
      const parts = token.split("|");
      if (parts.length !== 3) return null;
      const [role, sessionId, sig] = parts;
      const expected = crypto.createHmac("sha256", SECRET).update(`${role}|${sessionId}`).digest("base64url");
      const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
      if (!valid) return null;
      return { role, sessionId };
    }

    // Fallback: legacy base64json.signature
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;
    const expected = crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");
    const valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
    if (!valid) return null;
    const json = fromBase64url(payloadB64);
    const data = JSON.parse(json) as AccessPayload;
    if (data.exp && Date.now() / 1000 > data.exp) return null;
    return { role: data.role, sessionId: data.sessionId };
  } catch (e) {
    return null;
  }
}
