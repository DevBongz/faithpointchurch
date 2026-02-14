import { createHmac, randomInt } from "crypto";

// ─── Constants ──────────────────────────────────────────────────────────────
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes for OTP validity
const ADMIN_SESSION_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours for admin session

export const ADMIN_OTP_COOKIE = "fp_admin_otp_challenge";
export const ADMIN_VERIFIED_COOKIE = "fp_admin_verified";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is not set");
  return secret;
}

function hmacSign(data: string): string {
  return createHmac("sha256", getSecret()).update(data).digest("hex");
}

// ─── OTP Generation & Verification (stateless via HMAC) ────────────────────

/** Generate a 6-digit OTP and create a signed challenge string */
export function generateOtp(email: string): { otp: string; challenge: string; expiresAt: number } {
  const otp = randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;
  const payload = `${email}:${otp}:${expiresAt}`;
  const signature = hmacSign(payload);
  const challenge = `${expiresAt}:${signature}`;

  return { otp, challenge, expiresAt };
}

/** Verify an OTP against a signed challenge string */
export function verifyOtp(email: string, otp: string, challenge: string): { valid: boolean; error?: string } {
  try {
    const [expiresAtStr, signature] = challenge.split(":");
    const expiresAt = parseInt(expiresAtStr, 10);

    if (Date.now() > expiresAt) {
      return { valid: false, error: "Code has expired. Please request a new one." };
    }

    const payload = `${email}:${otp}:${expiresAt}`;
    const expectedSignature = hmacSign(payload);

    if (signature !== expectedSignature) {
      return { valid: false, error: "Invalid code. Please try again." };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: "Verification failed." };
  }
}

// ─── Admin Session Cookie ──────────────────────────────────────────────────

/** Create a signed admin verification token */
export function createAdminToken(email: string): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + ADMIN_SESSION_EXPIRY_MS;
  const payload = `admin:${email}:${expiresAt}`;
  const signature = hmacSign(payload);
  const token = `${email}:${expiresAt}:${signature}`;

  return { token, expiresAt };
}

/** Validate a signed admin verification token */
export function validateAdminToken(token: string): { valid: boolean; email?: string } {
  try {
    const parts = token.split(":");
    if (parts.length < 3) return { valid: false };

    // Email may contain colons (unlikely but handle gracefully)
    const signature = parts.pop()!;
    const expiresAtStr = parts.pop()!;
    const email = parts.join(":");
    const expiresAt = parseInt(expiresAtStr, 10);

    if (Date.now() > expiresAt) return { valid: false };

    const payload = `admin:${email}:${expiresAt}`;
    const expectedSignature = hmacSign(payload);

    if (signature !== expectedSignature) return { valid: false };

    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}

// ─── Admin Email Check ─────────────────────────────────────────────────────

/** Check if an email is an authorized admin */
export function isAdminEmail(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase());
}
