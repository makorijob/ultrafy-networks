// lib/auth.ts
export const ADMIN_COOKIE_NAME = "ultrafy_admin_session";

// Simple password check - no hashing or session secret needed
export async function checkPassword(candidate: string): Promise<boolean> {
  const validPassword = process.env.ADMIN_PASSWORD ?? "1504Nick123";
  return candidate === validPassword;
}

// Simple token generation - just a timestamp + random string
export async function expectedSessionToken(): Promise<string> {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
}

// Simple cookie validation - just check if it exists
export async function isValidSessionCookie(
  value: string | undefined | null
): Promise<boolean> {
  return !!value; // Any non-empty cookie is valid
}
