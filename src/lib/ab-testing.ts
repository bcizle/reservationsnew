/**
 * Lightweight A/B testing primitives.
 *
 * Variant assignment is deterministic per visitor via a cookie hash, so a
 * given browser always sees the same variant for the same test name. Event
 * tracking pipes through GA4 (window.gtag) — variant assignment and
 * downstream events both fire so we can compare conversion rates across
 * variants in GA4 explorations.
 *
 * Server-side calls return the first variant (the default control) — actual
 * assignment happens once the page hydrates and a cookie is available.
 */

const COOKIE_NAME = "rn_visitor_id";
const COOKIE_MAX_AGE_DAYS = 365;

type GtagFn = (
  command: "event",
  eventName: string,
  params: Record<string, string | number | boolean | undefined>,
) => void;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const target = `${name}=`;
  const parts = document.cookie ? document.cookie.split(";") : [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(target)) {
      return decodeURIComponent(trimmed.slice(target.length));
    }
  }
  return null;
}

function writeCookie(name: string, value: string, maxAgeDays: number): void {
  if (!isBrowser()) return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function generateVisitorId(): string {
  const cryptoObj = isBrowser() ? window.crypto : undefined;
  if (cryptoObj && typeof cryptoObj.randomUUID === "function") {
    return cryptoObj.randomUUID();
  }
  if (cryptoObj && typeof cryptoObj.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback for ancient browsers without window.crypto. Lower entropy but
  // good enough for variant bucketing — we are not signing tokens with this.
  return `v_${Math.floor(Math.random() * 1e12).toString(36)}_${Date.now().toString(
    36,
  )}`;
}

export function getVisitorId(): string {
  const existing = readCookie(COOKIE_NAME);
  if (existing) return existing;
  const fresh = generateVisitorId();
  writeCookie(COOKIE_NAME, fresh, COOKIE_MAX_AGE_DAYS);
  return fresh;
}

// FNV-1a 32-bit. Deterministic, fast, no deps. We only need a stable
// bucketing hash, not cryptographic strength.
function hashString(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash >>> 0;
}

/**
 * Pick a variant for the given test name. Deterministic per visitor cookie
 * — the same browser always sees the same variant for the same test.
 *
 * During SSR (no cookies available), returns the first variant so the
 * server-rendered HTML is stable. On hydration the client may swap to the
 * assigned variant.
 */
export function assignVariant<T extends string>(
  testName: string,
  variants: readonly T[],
): T {
  if (variants.length === 0) {
    throw new Error(`assignVariant: no variants for test "${testName}"`);
  }
  if (!isBrowser()) return variants[0];
  const visitorId = getVisitorId();
  const bucket = hashString(`${testName}:${visitorId}`) % variants.length;
  return variants[bucket];
}

/**
 * Fire a GA4 event tagged with the active A/B test variant. Use this when
 * the user takes an action you want to compare across variants (button
 * click, form submit, scroll depth, conversion).
 */
export function trackEvent(
  testName: string,
  variant: string,
  eventName: string,
  extra: Record<string, string | number | boolean> = {},
): void {
  if (!isBrowser()) return;
  const gtag = (window as Window & { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", eventName, {
    ab_test: testName,
    ab_variant: variant,
    ...extra,
  });
}

/**
 * Fire an exposure event the first time a visitor sees a given variant.
 * Call this when the variant is actually rendered so GA4 has a reliable
 * denominator for conversion-rate math.
 */
export function trackExposure(testName: string, variant: string): void {
  trackEvent(testName, variant, "ab_test_exposure");
}
