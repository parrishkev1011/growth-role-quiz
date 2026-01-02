export default function StripeCancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">
        Payment Cancelled
      </h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Your payment was not completed. You can try again whenever you're ready.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/"
          className="rounded-lg bg-neutral-950 px-6 py-3 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
        >
          Back Home
        </a>
      </div>
    </main>
  );
}
