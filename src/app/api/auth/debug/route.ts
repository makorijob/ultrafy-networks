// app/api/auth/debug/route.ts
import { NextResponse } from "next/server";
import { debugAuthConfig, generateRecommendedSecret } from "@/lib/auth";

export async function GET() {
  const config = await debugAuthConfig();
  
  return NextResponse.json({
    ...config,
    recommendation: {
      message: "Add these to your .env.local file:",
      envVars: {
        ADMIN_PASSWORD: "your-secure-password-here",
        SESSION_SECRET: generateRecommendedSecret(),
      },
      note: "Restart your dev server after adding these variables"
    },
    timestamp: new Date().toISOString(),
  });
}
