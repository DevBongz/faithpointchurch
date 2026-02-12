import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get giving history for a user
export const listByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("giving")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Record a donation
export const create = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    type: v.union(
      v.literal("tithe"),
      v.literal("offering"),
      v.literal("building_fund"),
      v.literal("missions"),
      v.literal("other")
    ),
    method: v.optional(v.string()),
    recurring: v.boolean(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("giving", args);
  },
});

// Get total giving for a user
export const totalByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("giving")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    return records.reduce((sum, record) => sum + record.amount, 0);
  },
});
