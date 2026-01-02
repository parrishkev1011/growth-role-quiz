"use client";

import { useState } from "react";

export default function UnlockButtonClient({ role }: { role: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Failed to create checkout session");
      }

      const data = await res.json();
      const url = data.url;
      if (!url) throw new Error("No checkout url returned");

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-violet-400 px-5 py-2 text-sm font-semibold text-slate-900"
      >
        {loading ? "Redirecting…" : "Unlock blueprint — $"}
      </button>
      {error ? (
        <div className="mt-3 text-sm text-red-600">{error}</div>
      ) : null}
    </div>
  );
}
