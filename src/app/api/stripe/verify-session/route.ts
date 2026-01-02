import Stripe from "stripe";
import { getFulfillment, recordFulfillment } from "@/lib/stripe-fulfillment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();

    if (!session_id || typeof session_id !== "string") {
      return Response.json(
        { error: "Missing or invalid session_id" },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment not completed" },
        { status: 401 }
      );
    }

    // Check that session was recorded by webhook (added layer of security)
    let fulfillment = await getFulfillment(session_id);
    if (!fulfillment) {
      // If webhook hasn't recorded it yet, but Stripe reports the session
      // as paid, we can record the fulfillment now as a dev-friendly fallback.
      // In production you may prefer strict webhook-only confirmation.
      if (session.payment_status === "paid") {
        const role = (session.metadata?.role as string) || "architect";
        const email = session.customer_email || undefined;
        await recordFulfillment(session_id, role, email);
        fulfillment = await getFulfillment(session_id);
      }

      if (!fulfillment) {
        return Response.json(
          { error: "Session not yet confirmed" },
          { status: 401 }
        );
      }
    }

    // Extract role from fulfillment record (double-check from metadata too)
    const role = fulfillment.role || (session.metadata?.role as string);

    if (!role) {
      return Response.json(
        { error: "No role found in session" },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      role: role.toLowerCase(),
      email: session.customer_email,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("verify-session error:", message);
    return Response.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}
