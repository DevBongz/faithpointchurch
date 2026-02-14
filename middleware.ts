import { NextRequest, NextResponse } from "next/server";

const ADMIN_VERIFIED_COOKIE = "fp_admin_verified";

/**
 * Validate the admin verified token using Web Crypto API (Edge-compatible).
 * Token format: email:expiresAt:signature
 */
async function validateAdminToken(token: string, secret: string): Promise<boolean> {
  try {
    const parts = token.split(":");
    if (parts.length < 3) return false;

    const signature = parts.pop()!;
    const expiresAtStr = parts.pop()!;
    const email = parts.join(":");
    const expiresAt = parseInt(expiresAtStr, 10);

    // Check expiry
    if (Date.now() > expiresAt) return false;

    // Verify HMAC signature using Web Crypto
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const payload = `admin:${email}:${expiresAt}`;
    const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin route protection ───────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    // Allow API routes for OTP send/verify (they handle their own auth)
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.next();
    }

    // 1. Check for Better Auth session cookie
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ??
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // 2. Check for admin OTP verification cookie (server-side validation)
    //    If missing or invalid, the page component will show the OTP gate.
    //    This is an additional server-side layer — the client also gates.
    const adminToken = request.cookies.get(ADMIN_VERIFIED_COOKIE)?.value;
    if (adminToken) {
      const secret = process.env.BETTER_AUTH_SECRET;
      if (secret) {
        const valid = await validateAdminToken(adminToken, secret);
        if (!valid) {
          // Clear invalid cookie and let page show OTP gate
          const response = NextResponse.next();
          response.cookies.delete(ADMIN_VERIFIED_COOKIE);
          return response;
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
