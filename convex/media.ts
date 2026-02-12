import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all media content (optionally filtered by category)
export const list = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("sermon"),
        v.literal("worship"),
        v.literal("podcast"),
        v.literal("event")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("mediaContent")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("mediaContent").order("desc").collect();
  },
});

// Get featured media
export const featured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("mediaContent")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
  },
});

// Create media content (admin)
export const create = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    category: v.union(
      v.literal("sermon"),
      v.literal("worship"),
      v.literal("podcast"),
      v.literal("event")
    ),
    youtubeId: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    speaker: v.optional(v.string()),
    duration: v.optional(v.string()),
    series: v.optional(v.string()),
    featured: v.boolean(),
    publishedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mediaContent", args);
  },
});
