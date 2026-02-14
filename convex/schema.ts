import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ─── Products (Merch Store) ────────────────────────────────────────────────
  products: defineTable({
    name: v.string(),
    price: v.number(), // in cents
    image: v.string(),
    category: v.union(
      v.literal("apparel"),
      v.literal("accessories"),
      v.literal("music"),
      v.literal("books")
    ),
    tag: v.optional(v.string()), // "Best Seller", "New", "Limited", "Sold Out", etc.
    description: v.optional(v.string()),
    inStock: v.boolean(),
  }).index("by_category", ["category"]),

  // ─── Orders ────────────────────────────────────────────────────────────────
  orders: defineTable({
    userId: v.string(), // Better Auth user ID
    items: v.array(
      v.object({
        productId: v.id("products"),
        productName: v.string(),
        quantity: v.number(),
        priceAtPurchase: v.number(), // cents
      })
    ),
    total: v.number(), // cents
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  // ─── Giving / Donations ────────────────────────────────────────────────────
  giving: defineTable({
    userId: v.string(),
    amount: v.number(), // cents
    type: v.union(
      v.literal("tithe"),
      v.literal("offering"),
      v.literal("building_fund"),
      v.literal("missions"),
      v.literal("other")
    ),
    method: v.optional(v.string()), // "Card •••• 4242"
    recurring: v.boolean(),
    note: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  // ─── User Profiles (extends Better Auth user) ─────────────────────────────
  userProfiles: defineTable({
    userId: v.string(), // Better Auth user ID (unique key)
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    role: v.optional(v.string()), // "member", "leader", "admin"
    memberSince: v.optional(v.string()),
    smallGroup: v.optional(v.string()),
    servingTeam: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  // ─── Membership Applications ──────────────────────────────────────────────
  memberships: defineTable({
    userId: v.string(), // Better Auth user ID
    fullName: v.string(), // Official ID names for certificate
    contactNumber: v.string(),
    email: v.string(),
    isServing: v.boolean(), // Are you already serving?
    servingTeam: v.optional(v.string()), // Which team / what are you helping with?
    status: v.union(
      v.literal("pending"), // Awaiting review
      v.literal("approved"), // Accepted into membership class
      v.literal("graduated"), // Completed membership class
      v.literal("declined") // Declined
    ),
    appliedAt: v.string(), // ISO date string
    reviewedAt: v.optional(v.string()),
    reviewedBy: v.optional(v.string()), // Admin user ID
    notes: v.optional(v.string()), // Admin notes
  })
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),

  // ─── Media Content ─────────────────────────────────────────────────────────
  mediaContent: defineTable({
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
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"]),
});
