import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ─── User-facing ────────────────────────────────────────────────────────────

/** Get membership application for a specific user */
export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("memberships")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    return memberships[0] ?? null;
  },
});

/** Submit a new membership application */
export const apply = mutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    isServing: v.boolean(),
    servingTeam: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already has a membership application
    const existing = await ctx.db
      .query("memberships")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      throw new Error("You have already submitted a membership application.");
    }

    return await ctx.db.insert("memberships", {
      userId: args.userId,
      fullName: args.fullName,
      contactNumber: args.contactNumber,
      email: args.email,
      isServing: args.isServing,
      servingTeam: args.servingTeam,
      status: "pending",
      appliedAt: new Date().toISOString(),
    });
  },
});

// ─── Admin-facing ───────────────────────────────────────────────────────────

/** List all membership applications (admin) */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("memberships").order("desc").collect();
  },
});

/** List memberships by status (admin) */
export const listByStatus = query({
  args: {
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("graduated"),
      v.literal("declined")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("memberships")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

/** Update membership status (admin) */
export const updateStatus = mutation({
  args: {
    membershipId: v.id("memberships"),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("graduated"),
      v.literal("declined")
    ),
    reviewedBy: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.membershipId, {
      status: args.status,
      reviewedAt: new Date().toISOString(),
      reviewedBy: args.reviewedBy,
      notes: args.notes,
    });
  },
});

/** Get total counts by status (admin dashboard) */
export const getCounts = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("memberships").collect();
    return {
      total: all.length,
      pending: all.filter((m) => m.status === "pending").length,
      approved: all.filter((m) => m.status === "approved").length,
      graduated: all.filter((m) => m.status === "graduated").length,
      declined: all.filter((m) => m.status === "declined").length,
    };
  },
});
