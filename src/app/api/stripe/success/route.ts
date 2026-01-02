import Stripe from "stripe";
import { recordFulfillment } from "@/lib/stripe-fulfillment";
import { signAccessCookiePipe } from "@/lib/cookie";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Server-side handler for Stripe checkout success verification.
 * - Verifies the session with Stripe
 * - Records fulfillment in KV
 * - Sets the signed cookie
 * - Returns the role so client can redirect
 */
export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return new Response("Missing session_id", { status: 400 });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    const role = (session.metadata?.role as string) || "architect";
    const email = session.customer_email || undefined;

    // Record fulfillment in Vercel KV (dev+prod)
    await recordFulfillment(session_id, role, email);

    // Build pipe-format signed cookie: role|sessionId|signature
    const token = signAccessCookiePipe(role, session_id);

    const isProd = process.env.NODE_ENV === "production";
    const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
    const cookieParts = [
      `grq_access=${token}`,
      `Path=/`,
      `HttpOnly`,
      `SameSite=Lax`,
      `Max-Age=${MAX_AGE}`,
    ];

    if (isProd) cookieParts.push("Secure");

    const headers = new Headers();
    headers.append("Set-Cookie", cookieParts.join("; "));

    return Response.json(
      { success: true, role: role.toLowerCase(), email },
      { headers }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : "";
    console.error("/api/stripe/success verification error:", msg);
    console.error("Stack:", stack);
    return Response.json(
      { error: "Verification failed", details: msg },
      { status: 500 }
    );
  }
}
