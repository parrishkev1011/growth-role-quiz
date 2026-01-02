"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function StripeSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session found. Payment may not have completed.");
      setLoading(false);
      return;
    }

    // Verify the session with our backend
    verifySession(sessionId);
  }, [sessionId]);

  async function verifySession(id: string) {
    try {
      const res = await fetch("/api/stripe/verify-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: id }),
      });

      if (!res.ok) {
        let errorMsg = "Failed to verify payment";
        try {
          const data = await res.json();
          errorMsg = data.details || data.error || "Failed to verify payment";
        } catch (e) {
          const text = await res.text();
          errorMsg = text || errorMsg;
        }
        setError(errorMsg);
        setLoading(false);
        console.error("Verification failed:", errorMsg);
        return;
      }

      const data = await res.json();
      const role = data.role;

      // Redirect to the blueprint page with session_id for gating (optional)
      router.push(`/blueprint/${role}?session_id=${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Error verifying payment: ${message}`);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">
          Verifying your payment...
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Please wait while we confirm your purchase.
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Verification Failed</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">{error}</p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/"
            className="rounded-lg bg-neutral-950 px-6 py-2 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Back Home
          </a>
          <a
            href="/stripe/cancel"
            className="rounded-lg border border-neutral-300 px-6 py-2 text-neutral-950 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-900"
          >
            Try Again
          </a>
        </div>
      </main>
    );
  }

  return null;
}

export default function StripeSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">
            Loading...
          </h1>
        </main>
      }
    >
      <StripeSuccessContent />
    </Suspense>
  );
}
