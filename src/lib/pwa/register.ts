// Guarded service worker registration — runs only in published production builds.
const SW_URL = "/sw.js";

function isPreviewHost(hostname: string) {
  if (hostname.startsWith("id-preview--") || hostname.startsWith("preview--")) return true;
  if (hostname === "lovableproject.com" || hostname.endsWith(".lovableproject.com")) return true;
  if (hostname === "lovableproject-dev.com" || hostname.endsWith(".lovableproject-dev.com")) return true;
  if (hostname === "beta.lovable.dev" || hostname.endsWith(".beta.lovable.dev")) return true;
  return false;
}

async function unregisterAll() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map((r) => r.unregister().catch(() => false)));
}

export async function registerPWA() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  const url = new URL(window.location.href);
  const killSwitch = url.searchParams.get("sw") === "off";
  const inIframe = window.self !== window.top;
  const isDev = !import.meta.env.PROD;
  const refused = isDev || inIframe || isPreviewHost(window.location.hostname) || killSwitch;

  if (refused) {
    await unregisterAll();
    return;
  }

  try {
    await navigator.serviceWorker.register(SW_URL, { scope: "/" });
  } catch {
    /* noop */
  }
}
