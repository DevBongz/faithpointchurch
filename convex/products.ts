import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all products (optionally filtered by category)
export const list = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("apparel"),
        v.literal("accessories"),
        v.literal("music"),
        v.literal("books")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    return await ctx.db.query("products").collect();
  },
});

// Get a single product
export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a product (admin)
export const create = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.union(
      v.literal("apparel"),
      v.literal("accessories"),
      v.literal("music"),
      v.literal("books")
    ),
    tag: v.optional(v.string()),
    description: v.optional(v.string()),
    inStock: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});
