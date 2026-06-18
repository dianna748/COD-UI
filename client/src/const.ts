export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

type AuthType = "signIn" | "signUp";

// Generate the Manus OAuth URL at runtime so the redirect URI always
// reflects the current origin (frontend and backend run on separate hosts).
//
// Note: this runs during render (e.g. useAuth's default `redirectPath`),
// so it must never throw even if the OAuth env vars are not yet injected.
const buildAuthUrl = (type: AuthType): string => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  // Safe fallback: if the portal URL is missing we cannot build an absolute
  // URL. Return the local login route instead of throwing `Invalid URL`.
  if (!oauthPortalUrl) {
    return type === "signUp" ? "/register" : "/login";
  }

  try {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId ?? "");
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", type);

    return url.toString();
  } catch {
    return type === "signUp" ? "/register" : "/login";
  }
};

export const getLoginUrl = () => buildAuthUrl("signIn");
export const getRegisterUrl = () => buildAuthUrl("signUp");
