import { mutation } from "./_generated/server";

// Seed initial data — run once via Convex dashboard or CLI
export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length > 0) {
      return "Products already seeded.";
    }

    const products = [
      { name: "Essential Hoodie", price: 5500, image: "/images/insta-fp/potrait-4.jpg", category: "apparel" as const, tag: "Best Seller", inStock: true },
      { name: "Sunday Tote", price: 2500, image: "/images/insta-fp/potrait-6.jpg", category: "accessories" as const, tag: "Limited", inStock: true },
      { name: "Core Tee", price: 3500, image: "/images/insta-fp/potrait-7.jpg", category: "apparel" as const, tag: "New", inStock: true },
      { name: "Heavyweight Crew", price: 6000, image: "/images/insta-fp/potrait-4.jpg", category: "apparel" as const, tag: "Sold Out", inStock: false },
      { name: "Faith Cap", price: 2800, image: "/images/insta-fp/potrait-8.jpg", category: "accessories" as const, tag: "New", inStock: true },
      { name: "Echoes of Grace", price: 2500, image: "/images/insta-fp/IMG_8748.JPG", category: "music" as const, tag: "Vinyl", inStock: true },
      { name: "The Art of Stillness", price: 1800, image: "/images/insta-fp/landscape-3.JPG", category: "books" as const, tag: "New Release", inStock: true },
      { name: "Live at The Loft", price: 1500, image: "/images/insta-fp/IMG_8748.JPG", category: "music" as const, tag: "Digital", inStock: true },
    ];

    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return `Seeded ${products.length} products.`;
  },
});

export const seedMedia = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("mediaContent").collect();
    if (existing.length > 0) {
      return "Media already seeded.";
    }

    const media = [
      { title: "The Way of Love", subtitle: "Offering + Sacrifice", category: "sermon" as const, thumbnailUrl: "/images/insta-fp/landscape-1.JPG", speaker: "Pastor Jay", duration: "45 min", series: "The Way of Love", featured: true, publishedAt: "2026-02-09" },
      { title: "Kingdom Culture", subtitle: "Living Differently", category: "sermon" as const, thumbnailUrl: "/images/insta-fp/landscape-3.JPG", speaker: "Pastor Jay", duration: "38 min", series: "Kingdom Culture", featured: true, publishedAt: "2026-02-02" },
      { title: "Worship Night Live", subtitle: "February 2026", category: "worship" as const, thumbnailUrl: "/images/insta-fp/IMG_8747.jpg", duration: "1hr 20min", featured: true, publishedAt: "2026-02-07" },
      { title: "Deep Waters", subtitle: "Faith in the Unknown", category: "sermon" as const, thumbnailUrl: "/images/insta-fp/IMG_8708.jpg", speaker: "Guest Speaker", duration: "52 min", series: "Deep Waters", featured: false, publishedAt: "2026-01-26" },
      { title: "Walking by Faith", subtitle: "The Book of Acts", category: "sermon" as const, thumbnailUrl: "/images/insta-fp/potrait-3.jpg", speaker: "Pastor Jay", duration: "45 min", series: "The Book of Acts", featured: false, publishedAt: "2026-01-19" },
      { title: "How Great Is Our God", subtitle: "FP Worship", category: "worship" as const, thumbnailUrl: "/images/insta-fp/IMG_8747.jpg", duration: "6 min", featured: false, publishedAt: "2026-01-15" },
      { title: "Faith Forward", subtitle: "Weekly Conversations", category: "podcast" as const, thumbnailUrl: "/images/insta-fp/potrait-4.jpg", speaker: "Pastoral Team", duration: "35 min", featured: false, publishedAt: "2026-02-10" },
      { title: "The Restore Podcast", subtitle: "Stories of Healing", category: "podcast" as const, thumbnailUrl: "/images/insta-fp/potrait-2.jpg", speaker: "Various", duration: "40 min", featured: false, publishedAt: "2026-02-03" },
    ];

    for (const item of media) {
      await ctx.db.insert("mediaContent", item);
    }

    return `Seeded ${media.length} media items.`;
  },
});
