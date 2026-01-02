import Stripe from "stripe";
import { recordFulfillment } from "@/lib/stripe-fulfillment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Stripe webhook handler for live mode.
 * Responds to checkout.session.completed to grant access.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !webhookSecret) {
    console.warn("[Webhook] Missing signature or secret");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[Webhook] Signature verification failed:", message);
    return Response.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log(`[Webhook] Received event: ${event.type} (ID: ${event.id})`);

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;
    const role = (session.metadata?.role as string) || "architect";
    const email = session.customer_email || undefined;

    try {
      // Record the fulfillment in KV
      await recordFulfillment(sessionId, role, email);

      console.log(
        `[Webhook] ✓ Fulfillment recorded: session=${sessionId}, role=${role}, email=${email || 'none'}`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[Webhook] ✗ Failed to record fulfillment for ${sessionId}:`, msg);
      // Still return 200 so Stripe doesn't retry
    }
  }

  return Response.json({ received: true });
}

/**
 * Handle GET requests gracefully (browser visits).
 * Stripe webhooks are POST only.
 */
export async function GET() {
  return new Response(
    "Stripe webhook endpoint. POST only. Configure this URL in your Stripe Dashboard under Developers > Webhooks.",
    { status: 405, headers: { "Content-Type": "text/plain" } }
  );
}
