import { NextRequest, NextResponse } from "next/server";
import {
  verifyOtp,
  createAdminToken,
  isAdminEmail,
  ADMIN_OTP_COOKIE,
  ADMIN_VERIFIED_COOKIE,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
    }

    // Double-check admin authorization
    if (!isAdminEmail(email)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    // Read challenge cookie
    const challenge = request.cookies.get(ADMIN_OTP_COOKIE)?.value;
    if (!challenge) {
      return NextResponse.json(
        { error: "No verification in progress. Please request a new code." },
        { status: 400 }
      );
    }

    // Verify OTP against the signed challenge
    const result = verifyOtp(email, otp, challenge);

    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // OTP is valid — create admin session token
    const { token, expiresAt } = createAdminToken(email);
    const maxAge = Math.floor((expiresAt - Date.now()) / 1000);

    const response = NextResponse.json({ success: true, message: "Verified successfully." });

    // Set admin verified cookie (readable by client for UI gating)
    response.cookies.set(ADMIN_VERIFIED_COOKIE, token, {
      httpOnly: false, // Client needs to read this to show/hide OTP screen
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });

    // Clear the challenge cookie
    response.cookies.delete(ADMIN_OTP_COOKIE);

    return response;
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
