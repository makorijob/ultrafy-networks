// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, checkPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await checkPassword(password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create simple session token
    const token = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
