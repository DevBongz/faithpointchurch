import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  generateOtp,
  isAdminEmail,
  ADMIN_OTP_COOKIE,
} from "@/lib/admin-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Check if this email is authorized as admin
    if (!isAdminEmail(email)) {
      // Return a generic message to avoid leaking which emails are admins
      return NextResponse.json({ error: "Unable to send verification code." }, { status: 403 });
    }

    // Generate OTP and signed challenge
    const { otp, challenge, expiresAt } = generateOtp(email);

    // Send OTP via Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "FaithPoint Admin <onboarding@resend.dev>",
      to: email,
      subject: "FaithPoint Admin — Verification Code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 20px; font-weight: bold; color: #000; letter-spacing: -0.02em; margin: 0;">
              faithpoint<span style="font-weight: 300; font-style: italic;">church</span>
            </h1>
            <p style="font-size: 10px; letter-spacing: 0.25em; color: #999; text-transform: uppercase; margin-top: 4px;">Admin Portal</p>
          </div>
          
          <div style="background: #f9f9f9; border-radius: 12px; padding: 32px; text-align: center;">
            <p style="font-size: 14px; color: #666; margin: 0 0 24px;">Your verification code is:</p>
            <div style="font-size: 36px; font-weight: bold; letter-spacing: 0.3em; color: #000; font-family: monospace; margin-bottom: 24px;">
              ${otp}
            </div>
            <p style="font-size: 12px; color: #999; margin: 0;">This code expires in 5 minutes.</p>
          </div>
          
          <p style="font-size: 11px; color: #bbb; text-align: center; margin-top: 24px;">
            If you didn't request this code, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send verification code." }, { status: 500 });
    }

    // Set challenge cookie (HTTP-only so client can't tamper)
    const response = NextResponse.json({ success: true, message: "Verification code sent." });

    response.cookies.set(ADMIN_OTP_COOKIE, challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 300, // 5 minutes
    });

    return response;
  } catch (err) {
    console.error("Send OTP error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
