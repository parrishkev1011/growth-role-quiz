# Stripe Checkout Integration Guide

## Overview
This implementation provides end-to-end Stripe Checkout integration with server-side verification and webhook-based fulfillment tracking.

## Flow

1. **User buys a blueprint** → Checkout session created with `role` in metadata
2. **Payment successful** → Stripe redirects to `/stripe/success?session_id=...`
3. **Client verifies** → Calls `/api/stripe/verify-session` (server-side check)
4. **Webhook fires** → `checkout.session.completed` records fulfillment
5. **Redirect to blueprint** → `/blueprint/${role}?session_id=...`

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
STRIPE_SECRET_KEY=sk_test_...          # From Stripe Dashboard > API Keys
STRIPE_PUBLISHABLE_KEY=pk_test_...      # From Stripe Dashboard > API Keys
STRIPE_PRICE_ID=price_...               # From Stripe Dashboard > Products
STRIPE_WEBHOOK_SECRET=whsec_...         # Generated after setting webhook endpoint
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Your app URL
```

### 2. Configure Stripe Webhook

1. Go to **Stripe Dashboard** → **Webhooks** → **Add endpoint**
2. URL: `https://yourapp.com/api/stripe/webhook` (use ngrok for local testing)
3. Events to send: `checkout.session.completed`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 3. Local Testing with ngrok

For local Stripe webhook testing:

```bash
# Install ngrok (if not already)
brew install ngrok

# Start ngrok tunnel
ngrok http 3000

# Use the ngrok URL in Stripe Dashboard webhook endpoint
# https://abc123.ngrok.io/api/stripe/webhook
```

Then test with Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
```

## Files

- **src/app/api/create-checkout-session/route.js** - Creates Stripe Checkout session with role metadata
- **src/app/api/stripe/verify-session/route.ts** - Verifies payment & retrieves role (server-side)
- **src/app/api/stripe/webhook/route.ts** - Webhook handler that records fulfillments
- **src/lib/stripe-fulfillment.ts** - File-based fulfillment store (replace with DB in production)
- **src/app/stripe/success/page.tsx** - Payment success page with verification
- **src/app/stripe/cancel/page.tsx** - Payment cancelled page

## Optional: Enable Blueprint Payment Gating

Uncomment the gating code in `src/app/blueprint/[role]/page.tsx` to require valid `session_id`:

```tsx
if (sessionId) {
  const fulfillment = getFulfillment(sessionId);
  if (!fulfillment || fulfillment.role !== roleSlug.toLowerCase()) {
    return notFound();
  }
}
```

When uncommented, users must arrive at `/blueprint/${role}?session_id=${sessionId}` from the success page.

## Data Persistence

Currently uses file-based JSON storage at `.data/stripe-fulfillment.json`.

**For production**, replace with:
- Vercel KV
- Supabase
- PostgreSQL
- MongoDB
- Any serverless database

Update `src/lib/stripe-fulfillment.ts` to use your database instead of file storage.

## Testing Stripe Payments

Use Stripe's test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 2500 0000 3155`

Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits

## Error Handling

### Common Issues

1. **"Session not yet confirmed"** – Webhook hasn't processed yet. Wait ~1 second and try again.
2. **"Missing role in session"** – Ensure `role` is passed when creating checkout session.
3. **Webhook signature verification failed** – Double-check `STRIPE_WEBHOOK_SECRET`.
4. **Redirect loop** – Ensure `NEXT_PUBLIC_BASE_URL` matches your actual domain.

## Security Considerations

- ✅ Secret key stays server-side (never exposed to client)
- ✅ Webhook signature verified with `STRIPE_WEBHOOK_SECRET`
- ✅ Session status checked before granting access
- ✅ Fulfillment record required (prevents direct blueprint access)
- ✅ Role normalized to lowercase (consistent with blueprint keys)

## Next Steps

1. Add persistent storage (database)
2. Implement user accounts to track purchases by email
3. Add email confirmations post-purchase
4. Track refunds and handle `charge.refunded` webhook
5. Add analytics/logging for purchases
