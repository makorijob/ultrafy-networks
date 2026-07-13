export const ADMIN_COOKIE_NAME = "ultrafy_admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * The expected session token: a hash of the admin password + a server-only
 * secret. Anyone who knows the admin password can log in; the cookie itself
 * never contains the raw password.
 */
export async function expectedSessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.SESSION_SECRET ?? "";
  return sha256Hex(`${password}::${secret}`);
}

export async function checkPassword(candidate: string): Promise<boolean> {
  return candidate === (process.env.ADMIN_PASSWORD ?? "");
}

export async function isValidSessionCookie(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const expected = await expectedSessionToken();
  return value === expected;
}
