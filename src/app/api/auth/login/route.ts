// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, checkPassword, expectedSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Check if environment variables are set
    if (!process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD not set in environment');
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    
    if (!process.env.SESSION_SECRET) {
      console.error('SESSION_SECRET not set in environment');
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const ok = await checkPassword(password ?? "");
    console.log('Password check result:', ok);
    
    if (!ok) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = await expectedSessionToken();
    console.log('Generated token length:', token.length);
    console.log('Token first 10 chars:', token.substring(0, 10));
    
    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
