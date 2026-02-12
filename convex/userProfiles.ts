import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get profile for a user
export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const profiles = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    return profiles[0] ?? null;
  },
});

// Create or update a profile
export const upsert = mutation({
  args: {
    userId: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    role: v.optional(v.string()),
    memberSince: v.optional(v.string()),
    smallGroup: v.optional(v.string()),
    servingTeam: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      return await ctx.db.patch(existing._id, {
        phone: args.phone,
        address: args.address,
        role: args.role,
        memberSince: args.memberSince,
        smallGroup: args.smallGroup,
        servingTeam: args.servingTeam,
      });
    }

    return await ctx.db.insert("userProfiles", args);
  },
});
