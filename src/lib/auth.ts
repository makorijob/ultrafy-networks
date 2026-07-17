// lib/auth.ts

export const ADMIN_COOKIE_NAME = "ultrafy_admin_session";

/**
 * SHA-256 hash function using Web Crypto API
 */
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

/**
 * Get environment variables with validation
 */
function getEnvVariables() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  
  if (!password) {
    console.warn("⚠️ ADMIN_PASSWORD is not set in environment variables");
  }
  
  if (!secret) {
    console.warn("⚠️ SESSION_SECRET is not set in environment variables");
  }
  
  return { password: password ?? "", secret: secret ?? "" };
}

/**
 * The expected session token: a hash of the admin password + a server-only
 * secret. Anyone who knows the admin password can log in; the cookie itself
 * never contains the raw password.
 */
export async function expectedSessionToken(): Promise<string> {
  const { password, secret } = getEnvVariables();
  
  // If either is missing, return a fallback token for development
  if (!password || !secret) {
    console.warn("⚠️ Using fallback token due to missing environment variables");
    // This ensures the app doesn't break but warns about the issue
    return sha256Hex(`fallback::${Date.now()}`);
  }
  
  return sha256Hex(`${password}::${secret}`);
}

/**
 * Check if the provided password matches the stored password
 */
export async function checkPassword(candidate: string): Promise<boolean> {
  const { password } = getEnvVariables();
  
  if (!password) {
    console.error("❌ ADMIN_PASSWORD is not set - authentication will fail");
    return false;
  }
  
  // Trim to avoid whitespace issues
  const trimmedCandidate = candidate?.trim() ?? "";
  const trimmedPassword = password.trim();
  
  // Simple constant-time comparison to prevent timing attacks
  if (trimmedCandidate.length !== trimmedPassword.length) {
    return false;
  }
  
  // Use a timing-safe comparison
  let result = 0;
  for (let i = 0; i < trimmedCandidate.length; i++) {
    result |= trimmedCandidate.charCodeAt(i) ^ trimmedPassword.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Validate a session cookie by comparing it with the expected token
 */
export async function isValidSessionCookie(
  value: string | undefined | null
): Promise<boolean> {
  if (!value) {
    console.log("🔍 No cookie value provided");
    return false;
  }
  
  try {
    const expected = await expectedSessionToken();
    const isValid = value === expected;
    
    if (!isValid) {
      console.log("🔍 Invalid session cookie - token mismatch");
      // Log length comparison for debugging (don't log actual tokens)
      console.log(`  Expected length: ${expected.length}, Got length: ${value.length}`);
    }
    
    return isValid;
  } catch (error) {
    console.error("❌ Error validating session cookie:", error);
    return false;
  }
}

/**
 * Generate a secure random session token (alternative to the hash-based approach)
 */
export async function generateSecureToken(): Promise<string> {
  const { password, secret } = getEnvVariables();
  
  if (!password || !secret) {
    console.warn("⚠️ Using fallback token generation");
    return sha256Hex(`fallback::${Date.now()}`);
  }
  
  // Add a timestamp to make each token unique
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return sha256Hex(`${password}::${secret}::${timestamp}::${random}`);
}

/**
 * Debug function to check auth configuration
 * Use this in development to verify your setup
 */
export async function debugAuthConfig(): Promise<{
  hasPassword: boolean;
  hasSecret: boolean;
  passwordLength: number;
  secretLength: number;
  tokenPreview: string;
  isConfigured: boolean;
  issues: string[];
}> {
  const { password, secret } = getEnvVariables();
  const issues: string[] = [];
  
  if (!password) {
    issues.push("ADMIN_PASSWORD is not set");
  }
  
  if (!secret) {
    issues.push("SESSION_SECRET is not set");
  }
  
  if (password && password.length < 8) {
    issues.push("ADMIN_PASSWORD is too short (minimum 8 characters recommended)");
  }
  
  if (secret && secret.length < 16) {
    issues.push("SESSION_SECRET is too short (minimum 16 characters recommended)");
  }
  
  let tokenPreview = "N/A";
  try {
    const token = await expectedSessionToken();
    tokenPreview = token.substring(0, 20) + "...";
  } catch (error) {
    issues.push("Failed to generate token");
  }
  
  return {
    hasPassword: !!password,
    hasSecret: !!secret,
    passwordLength: password?.length ?? 0,
    secretLength: secret?.length ?? 0,
    tokenPreview,
    isConfigured: !!password && !!secret,
    issues,
  };
}

/**
 * Generate a recommended SESSION_SECRET for development
 */
export function generateRecommendedSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Environment variable helper to get admin password
 */
export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is not set. " +
      "Please add it to your .env.local file."
    );
  }
  return password;
}

/**
 * Environment variable helper to get session secret
 */
export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. " +
      "Please add it to your .env.local file."
    );
  }
  return secret;
}
