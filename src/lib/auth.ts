// lib/auth.ts

export const ADMIN_COOKIE_NAME = "ultrafy_admin_session";

async function sha256Hex(input: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (error) {
    console.error("SHA-256 hashing error:", error);
    throw new Error("Failed to generate hash");
  }
}

export async function expectedSessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.SESSION_SECRET ?? "";
  
  // In production, these MUST be set
  if (!password || !secret) {
    console.error("❌ Missing environment variables on Vercel");
    console.error("ADMIN_PASSWORD:", !!password);
    console.error("SESSION_SECRET:", !!secret);
    throw new Error("Server configuration error");
  }
  
  return sha256Hex(`${password}::${secret}`);
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  
  if (!password) {
    console.error("❌ ADMIN_PASSWORD not set on Vercel");
    return false;
  }
  
  // Use timing-safe comparison
  const trimmedCandidate = candidate?.trim() ?? "";
  const trimmedPassword = password.trim();
  
  if (trimmedCandidate.length !== trimmedPassword.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < trimmedCandidate.length; i++) {
    result |= trimmedCandidate.charCodeAt(i) ^ trimmedPassword.charCodeAt(i);
  }
  return result === 0;
}

export async function isValidSessionCookie(
  value: string | undefined | null
): Promise<boolean> {
  if (!value) return false;
  
  try {
    const expected = await expectedSessionToken();
    return value === expected;
  } catch (error) {
    console.error("❌ Error validating session cookie:", error);
    return false;
  }
      }
