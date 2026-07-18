// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Hardcoded check using your environment variable
    const validPassword = process.env.ADMIN_PASSWORD || "1504Nick123";
    
    if (!password || password !== validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    // Generate simple token
    const token = Buffer.from(`${password}:${Date.now()}`).toString('base64');
    
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    return response;
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
      }
