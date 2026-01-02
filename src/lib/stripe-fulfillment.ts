/**
 * Fulfillment store (Vercel KV / Upstash Redis with local fallback)
 *
 * This module records successful Stripe Checkout sessions so server-side
 * gates (e.g. `/blueprint/[role]`) can verify access.
 *
 * Environment variables (required in production on Vercel):
 * - KV_REST_API_URL: Vercel KV REST URL (Upstash)
 * - KV_REST_API_TOKEN: Vercel KV REST token
 *
 * Local development:
 * - If KV env vars are missing, the implementation falls back to a process-
 *   local in-memory Map. This is intended for quick local development only
 *   (data is ephemeral and not shared across instances).
 *
 * Key format in KV: `grq:fulfillment:{sessionId}` -> JSON { session_id, role, email?, createdAt }
 *
 * How to test locally (quick):
 * 1. Run the dev server: `npm run dev`
 * 2. Create a Stripe Checkout session in test mode and complete payment.
 * 3. Stripe will redirect to `/success?session_id={CHECKOUT_SESSION_ID}` which
 *    verifies the session and writes the fulfillment record (or the verify
 *    endpoint will record a fallback when appropriate).
 *
 * How to test on Vercel (production):
 * 1. Provision Vercel KV (Upstash) and set `KV_REST_API_URL` and
 *    `KV_REST_API_TOKEN` in your Vercel project environment variables.
 * 2. Set `GRQ_COOKIE_SECRET` and Stripe env vars in Vercel.
 * 3. Deploy and verify a real webhook or let `/success` record the fulfillment.
 */

import { kv } from "@vercel/kv";

type Fulfillment = {
  session_id: string;
  role: string;
  email?: string;
  createdAt: number; // unix ms
};

const TTL_SECONDS = 60 * 60 * 24 * 90; // 90 days

function keyFor(sessionId: string) {
  return `grq:fulfillment:${sessionId}`;
}

// Local in-memory fallback (used when Vercel KV env vars are not configured).
const localStore = new Map<string, Fulfillment>();
const KV_AVAILABLE = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

export async function recordFulfillment(sessionId: string, role: string, email?: string) {
  const key = keyFor(sessionId);
  const payload: Fulfillment = {
    session_id: sessionId,
    role: role.toLowerCase(),
    email,
    createdAt: Date.now(),
  };

  if (KV_AVAILABLE) {
    try {
      await kv.set(key, payload, { ex: TTL_SECONDS });
      return;
    } catch (e) {
      console.warn("Vercel KV write failed, falling back to memory store", e);
    }
  }

  // fallback
  localStore.set(key, payload);
}

export async function getFulfillment(sessionId: string): Promise<Fulfillment | null> {
  const key = keyFor(sessionId);
  if (KV_AVAILABLE) {
    try {
      const v = await kv.get(key);
      if (!v) return null;
      return v as Fulfillment;
    } catch (e) {
      console.warn("Vercel KV read failed, falling back to memory store", e);
    }
  }

  const f = localStore.get(key) ?? null;
  return f;
}

export async function hasFulfillment(sessionId: string, role?: string): Promise<boolean> {
  const f = await getFulfillment(sessionId);
  if (!f) return false;
  if (role) return f.role === role.toLowerCase();
  return true;
}

export async function listFulfillments(): Promise<Fulfillment[]> {
  // Not efficient for production; KV doesn't support listing by prefix easily in this helper.
  return Array.from(localStore.values());
}
