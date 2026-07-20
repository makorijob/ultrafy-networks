import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from "./auth";

/** Returns null if the request is an authenticated admin, otherwise a 401 response to return early. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies();

  const value = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  const ok = await isValidSessionCookie(value);

  if (!ok) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}