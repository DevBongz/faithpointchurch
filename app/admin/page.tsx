"use client";

import { Navbar } from "@/components/layout/navbar";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Users,
  Clock,
  CheckCircle2,
  GraduationCap,
  XCircle,
  Search,
  Filter,
  Loader2,
  ChevronDown,
  Eye,
  Phone,
  Mail,
  Calendar,
  HandHeart,
  UserCheck,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

// ─── Constants ──────────────────────────────────────────────────────────────

const ADMIN_VERIFIED_COOKIE = "fp_admin_verified";

type StatusFilter = "all" | "pending" | "approved" | "graduated" | "declined";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  approved: { label: "Approved", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
  graduated: { label: "Graduated", icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-500/10" },
  declined: { label: "Declined", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
};

// ─── OTP Input Component ────────────────────────────────────────────────────

function OtpInput({ length = 6, onComplete }: { length?: number; onComplete: (code: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    // Auto-advance to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    const code = newValues.join("");
    if (code.length === length) {
      onComplete(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newValues = [...values];
    pasted.split("").forEach((char, i) => {
      newValues[i] = char;
    });
    setValues(newValues);
    const nextEmpty = newValues.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? length - 1 : nextEmpty]?.focus();
    if (pasted.length === length) {
      onComplete(pasted);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-transparent border border-white/15 rounded-xl focus:outline-none focus:border-white/50 transition-colors"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}

// ─── OTP Verification Gate ──────────────────────────────────────────────────

function OtpGate({ email, onVerified }: { email: string; onVerified: () => void }) {
  const [step, setStep] = useState<"send" | "verify">("send");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      const res = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send code.");
        return;
      }

      toast.success("Verification code sent to your email.");
      setStep("verify");
      setCooldown(60);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = useCallback(async (code: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Verification failed.");
        setIsVerifying(false);
        return;
      }

      toast.success("Access granted.");
      onVerified();
    } catch {
      toast.error("Something went wrong.");
      setIsVerifying(false);
    }
  }, [email, onVerified]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-7 h-7 text-white/50" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Verification</h1>
          <p className="font-serif italic text-white/50 mb-10">
            {step === "send"
              ? "We need to verify your identity before granting access to the admin portal."
              : `Enter the 6-digit code sent to ${email}`}
          </p>

          <AnimatePresence mode="wait">
            {step === "send" ? (
              <motion.div
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="border border-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/60">{email}</span>
                  </div>
                  <p className="text-xs text-white/30">
                    A 6-digit verification code will be sent to this email address.
                  </p>
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={isSending}
                  className="w-full rounded-xl bg-white text-black hover:bg-white/90 tracking-widest text-xs h-14 font-bold"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "SEND VERIFICATION CODE"
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isVerifying ? (
                  <div className="py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-white/50 mx-auto mb-3" />
                    <p className="text-xs text-white/40">Verifying...</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <OtpInput onComplete={handleVerifyOtp} />
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={cooldown > 0 || isSending}
                      className="text-xs tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors disabled:opacity-30"
                    >
                      {cooldown > 0
                        ? `RESEND CODE IN ${cooldown}s`
                        : "RESEND CODE"}
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────────────────

function AdminDashboard({ session }: { session: { user: { id: string; email?: string | null; name?: string | null } } }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Convex queries
  const allMemberships = useQuery(api.memberships.listAll);
  const counts = useQuery(api.memberships.getCounts);
  const updateStatus = useMutation(api.memberships.updateStatus);

  // Filter memberships
  const filteredMemberships = (allMemberships ?? []).filter((m) => {
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.servingTeam ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get unique serving teams
  const servingTeams = [
    ...new Set(
      (allMemberships ?? [])
        .filter((m) => m.servingTeam)
        .map((m) => m.servingTeam!)
    ),
  ];

  const handleStatusUpdate = async (
    membershipId: string,
    newStatus: "pending" | "approved" | "graduated" | "declined"
  ) => {
    if (!session?.user?.id) return;
    setUpdatingId(membershipId);
    try {
      await updateStatus({
        membershipId: membershipId as Id<"memberships">,
        status: newStatus,
        reviewedBy: session.user.id,
      });
      toast.success(`Membership status updated to ${newStatus}.`);
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  Admin Portal
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                  Membership Management
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.15em] text-white/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OTP VERIFIED</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10"
        >
          {[
            { label: "Total", value: counts?.total ?? 0, icon: Users, filter: "all" as StatusFilter },
            { label: "Pending", value: counts?.pending ?? 0, icon: Clock, filter: "pending" as StatusFilter },
            { label: "Approved", value: counts?.approved ?? 0, icon: CheckCircle2, filter: "approved" as StatusFilter },
            { label: "Graduated", value: counts?.graduated ?? 0, icon: GraduationCap, filter: "graduated" as StatusFilter },
            { label: "Declined", value: counts?.declined ?? 0, icon: XCircle, filter: "declined" as StatusFilter },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setStatusFilter(stat.filter)}
              className={`border rounded-xl p-4 text-left transition-all ${
                statusFilter === stat.filter
                  ? "border-white/30 bg-white/[0.05]"
                  : "border-white/5 hover:border-white/15"
              }`}
            >
              <stat.icon className="w-4 h-4 text-white/30 mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {stat.label}
              </p>
            </button>
          ))}
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, email, or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl pl-12 pr-5 py-3 text-sm tracking-wider placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          {servingTeams.length > 0 && (
            <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-white/40">
              <Filter className="w-3.5 h-3.5" />
              <span>TEAMS:</span>
              <div className="flex gap-1 flex-wrap">
                {servingTeams.map((team) => (
                  <button
                    key={team}
                    onClick={() => setSearchQuery(team)}
                    className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white/80 transition-all"
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Members Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Loading State */}
          {!allMemberships && (
            <div className="text-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-white/30 mx-auto" />
            </div>
          )}

          {/* Empty State */}
          {allMemberships && filteredMemberships.length === 0 && (
            <div className="text-center py-20 border border-white/5 rounded-2xl">
              <Users className="w-10 h-10 text-white/15 mx-auto mb-4" />
              <p className="text-white/40 font-serif italic mb-2">
                {searchQuery || statusFilter !== "all"
                  ? "No members match your search."
                  : "No membership applications yet."}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className="text-xs tracking-[0.2em] text-white/30 hover:text-white transition-colors mt-2"
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          )}

          {/* Member Cards */}
          {allMemberships && filteredMemberships.length > 0 && (
            <div className="space-y-3">
              {/* Table Header (desktop) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                <div className="col-span-3">Name</div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-2">Serving Team</div>
                <div className="col-span-2">Applied</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {filteredMemberships.map((member) => {
                const status = statusConfig[member.status];
                const isExpanded = selectedMember === member._id;

                return (
                  <div key={member._id}>
                    <div
                      className={`border rounded-xl transition-all cursor-pointer ${
                        isExpanded
                          ? "border-white/20 bg-white/[0.03]"
                          : "border-white/5 hover:border-white/15"
                      }`}
                    >
                      {/* Desktop Row */}
                      <div
                        className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4"
                        onClick={() => setSelectedMember(isExpanded ? null : member._id)}
                      >
                        <div className="col-span-3">
                          <p className="font-bold text-sm truncate">{member.fullName}</p>
                          <p className="text-xs text-white/40 truncate">{member.email}</p>
                        </div>
                        <div className="col-span-2 text-sm text-white/60">{member.contactNumber}</div>
                        <div className="col-span-2 text-sm">
                          {member.isServing ? (
                            <span className="text-white/80">{member.servingTeam}</span>
                          ) : (
                            <span className="text-white/30 font-serif italic">Not yet serving</span>
                          )}
                        </div>
                        <div className="col-span-2 text-xs text-white/40">
                          {new Date(member.appliedAt).toLocaleDateString("en-ZA", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </div>
                        <div className="col-span-1">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          <button className="text-white/30 hover:text-white/60 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </div>

                      {/* Mobile Card */}
                      <div
                        className="md:hidden p-5"
                        onClick={() => setSelectedMember(isExpanded ? null : member._id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-bold">{member.fullName}</p>
                            <p className="text-xs text-white/40">{member.email}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {member.contactNumber}
                          </span>
                          {member.servingTeam && (
                            <span className="flex items-center gap-1">
                              <HandHeart className="w-3 h-3" />
                              {member.servingTeam}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border border-t-0 border-white/10 rounded-b-xl p-6 bg-white/[0.02]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                              <div>
                                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Full Name</p>
                                <p className="text-sm font-bold">{member.fullName}</p>
                              </div>
                              <div>
                                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Email</p>
                                <p className="text-sm flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-white/30" />
                                  {member.email}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Phone</p>
                                <p className="text-sm flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-white/30" />
                                  {member.contactNumber}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Currently Serving</p>
                                <p className="text-sm">
                                  {member.isServing ? `Yes — ${member.servingTeam}` : "Not yet"}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Applied On</p>
                                <p className="text-sm flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-white/30" />
                                  {new Date(member.appliedAt).toLocaleDateString("en-ZA", {
                                    weekday: "long", month: "long", day: "numeric", year: "numeric",
                                  })}
                                </p>
                              </div>
                              {member.reviewedAt && (
                                <div>
                                  <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-1">Reviewed On</p>
                                  <p className="text-sm">
                                    {new Date(member.reviewedAt).toLocaleDateString("en-ZA", {
                                      month: "long", day: "numeric", year: "numeric",
                                    })}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Status Update Actions */}
                            <div className="pt-4 border-t border-white/5">
                              <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-3">Update Status</p>
                              <div className="flex flex-wrap gap-2">
                                {(["pending", "approved", "graduated", "declined"] as const).map((s) => {
                                  const cfg = statusConfig[s];
                                  const isActive = member.status === s;
                                  return (
                                    <button
                                      key={s}
                                      disabled={isActive || updatingId === member._id}
                                      onClick={() => handleStatusUpdate(member._id, s)}
                                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-all ${
                                        isActive
                                          ? `${cfg.bg} ${cfg.color} border-transparent cursor-default`
                                          : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                                      } disabled:opacity-40`}
                                    >
                                      {updatingId === member._id ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        <cfg.icon className="w-3 h-3" />
                                      )}
                                      {cfg.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Serving Teams Summary */}
        {servingTeams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold mb-6">
              Serving Teams Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {servingTeams.map((team) => {
                const members = (allMemberships ?? []).filter((m) => m.servingTeam === team);
                return (
                  <button
                    key={team}
                    onClick={() => setSearchQuery(team)}
                    className="border border-white/5 hover:border-white/15 rounded-xl p-5 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{team}</p>
                          <p className="text-[10px] text-white/30">
                            {members.length} {members.length === 1 ? "member" : "members"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page (Auth + OTP Gate) ────────────────────────────────────────────

export default function AdminPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [otpVerified, setOtpVerified] = useState(false);

  // Check if admin verified cookie exists on mount
  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const verified = cookies.find((c) => c.startsWith(`${ADMIN_VERIFIED_COOKIE}=`));
    if (verified) {
      setOtpVerified(true);
    }
  }, []);

  // Auth check — redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  // Check if user has admin role
  const isAdmin =
    session?.user &&
    ((session.user as Record<string, unknown>).role === "admin" ||
      session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);

  if (isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-white/50" />
      </div>
    );
  }

  if (!session) return null;

  // Unauthorized view
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Access Denied</h1>
          <p className="font-serif italic text-white/50 text-center max-w-md mb-8">
            This area is restricted to church administrators. If you believe you should have access, please contact the church office.
          </p>
          <Button
            onClick={() => router.push("/account")}
            className="rounded-full bg-white text-black hover:bg-white/90 tracking-widest text-xs px-8 h-12"
          >
            BACK TO ACCOUNT
          </Button>
        </div>
      </div>
    );
  }

  // OTP verification gate
  if (!otpVerified) {
    return (
      <OtpGate
        email={session.user.email || ""}
        onVerified={() => setOtpVerified(true)}
      />
    );
  }

  // Fully authenticated — show dashboard
  return <AdminDashboard session={session} />;
}
