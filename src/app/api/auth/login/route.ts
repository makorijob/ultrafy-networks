// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  ADMIN_COOKIE_NAME, 
  checkPassword, 
  expectedSessionToken,
  getAdminPassword,
  getSessionSecret
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json().catch(() => {
      throw new Error("Invalid JSON payload");
    });
    
    const { password } = body;
    
    // Validate input
    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: "Password is required and must be a string" },
        { status: 400 }
      );
    }

    // Check if environment variables are properly configured
    try {
      getAdminPassword();
      getSessionSecret();
    } catch (envError) {
      console.error("❌ Environment configuration error:", envError);
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Verify the password
    const isValid = await checkPassword(password);
    console.log(`🔑 Login attempt: ${isValid ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (!isValid) {
      // Add a small delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Generate the session token
    const token = await expectedSessionToken();
    console.log(`🔐 Session token generated (length: ${token.length})`);

    // Create the response with the session cookie
    const response = NextResponse.json({ 
      success: true,
      message: "Login successful"
    });

    // Set the secure HTTP-only cookie
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      // Add priority for better browser compatibility
      priority: "high",
    });

    console.log(`🍪 Cookie set: ${ADMIN_COOKIE_NAME}`);
    
    return response;

  } catch (error) {
    console.error("❌ Login error:", error);
    
    // Return a generic error message to avoid leaking information
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// Optional: Add a GET endpoint for debugging
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 404 }
    );
  }

  const hasPassword = !!process.env.ADMIN_PASSWORD;
  const hasSecret = !!process.env.SESSION_SECRET;
  
  return NextResponse.json({
    status: "Auth API is running",
    configuration: {
      hasAdminPassword: hasPassword,
      hasSessionSecret: hasSecret,
      isConfigured: hasPassword && hasSecret,
    },
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
