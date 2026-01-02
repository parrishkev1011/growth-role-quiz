import { notFound } from "next/navigation";
import { blueprints } from "@/lib/blueprints";
import { getFulfillment } from "@/lib/stripe-fulfillment";
import { verifyAccessCookie } from "@/lib/cookie";
import { cookies } from "next/headers";
import UnlockButtonClient from "../../UnlockButtonClient";

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function BlueprintPage({
  params,
  searchParams,
}: {
  params: { role: string } | Promise<{ role: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const resolved = (await params) as { role: string };
  const resolvedSearchParams = await searchParams;
  const roleSlug = resolved?.role;
  const sessionId = resolvedSearchParams?.session_id;

  if (!roleSlug) return notFound();

  // Paid gating: Accept either a session_id (initial redirect) or a signed cookie.
  // The server sets the cookie after recording fulfillment, so either path proves access.
  let fulfilled = false;

  // Check signed cookie first (set by /success route). We accept the pipe
  // format `role|sessionId|sig` (preferred) and fall back to legacy format.
  const cookieStore = await cookies();
  const cookie = cookieStore.get("grq_access")?.value;
  if (cookie) {
    const payload = verifyAccessCookie(cookie);
    if (payload && payload.role && payload.sessionId) {
      // Ensure cookie role matches requested role
      if (payload.role.toLowerCase() === roleSlug.toLowerCase()) {
        // Prefer server-side KV verification when available.
        const kvConfigured = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
        try {
          const f = await getFulfillment(payload.sessionId);
          if (f && f.role === roleSlug.toLowerCase()) {
            fulfilled = true;
          } else if (!kvConfigured) {
            // No KV configured in prod — allow cookie in local/dev fallback.
            fulfilled = true;
          }
        } catch (e) {
          // If KV read fails, be conservative and do not grant access.
          console.warn("Error checking fulfillment for cookie session", e);
        }
      }
    }
  }

  // Fallback: Check session_id from query params if no valid cookie
  if (!fulfilled && sessionId) {
    const fulfillment = await getFulfillment(sessionId);
    if (fulfillment && fulfillment.role === roleSlug.toLowerCase()) {
      fulfilled = true;
    }
  }

  const blueprint = blueprints[roleSlug.toLowerCase()];
  if (!blueprint) return notFound();

  const roleTitle = toTitle(roleSlug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 lg:px-8 lg:py-20">
      <header className="space-y-4 pb-12">
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500">
            Growth Role Blueprints
          </div>
          {fulfilled ? (
            <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
              Unlocked
            </span>
          ) : (
            <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              Locked
            </span>
          )}
        </div>

        <h1 className="text-5xl font-bold leading-tight text-neutral-950 dark:text-neutral-50">
          {roleTitle}
        </h1>

        <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
          {blueprint.subhead}
        </p>
      </header>

      <div className="space-y-12">
        {fulfilled ? (
          blueprint.sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-neutral-200 pb-12 dark:border-neutral-800 last:border-b-0"
            >
              <h2 className="mb-6 text-2xl font-bold leading-snug text-neutral-950 dark:text-neutral-50">
                {section.title}
              </h2>

              <div className="space-y-5 text-base leading-relaxed text-neutral-700 dark:text-neutral-400">
                {section.body.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="rounded-lg border border-neutral-200 p-8 text-center dark:border-neutral-800">
            <h3 className="text-2xl font-semibold">Unlock this blueprint</h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">
              Purchase access to unlock the full blueprint for {roleTitle}.
            </p>
            <div className="mt-6 flex justify-center">
              <UnlockButtonClient role={roleSlug} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
