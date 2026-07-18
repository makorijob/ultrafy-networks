// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  ADMIN_COOKIE_NAME, 
  checkPassword, 
  expectedSessionToken 
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Log environment (for debugging)
    console.log("🔍 Environment:", process.env.NODE_ENV);
    console.log("🔍 ADMIN_PASSWORD exists:", !!process.env.ADMIN_PASSWORD);
    console.log("🔍 SESSION_SECRET exists:", !!process.env.SESSION_SECRET);
    
    // Parse request
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
    
    const { password } = body;
    
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    
    // Check if environment variables exist
    if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
      console.error("❌ Missing environment variables on Vercel");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    
    // Verify password
    const isValid = await checkPassword(password);
    console.log(`🔑 Login attempt: ${isValid ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (!isValid) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = await expectedSessionToken();
    
    // Create response
    const response = NextResponse.json({ 
      success: true,
      message: "Login successful"
    });
    
    // Set cookie - Vercel compatible
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true, // Always true on Vercel (HTTPS)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    console.log("🍪 Cookie set successfully");
    console.log("🍪 Cookie name:", ADMIN_COOKIE_NAME);
    
    return response;
    
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
         }
