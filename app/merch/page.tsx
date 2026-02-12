"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/* eslint-disable @next/next/no-img-element */

type Category = "all" | "apparel" | "accessories" | "music" | "books";

// Fallback static data (used when Convex isn't connected yet)
const fallbackProducts = [
  // ── Apparel ──────────────────────────────────────────────────
  { _id: "1" as any, name: "Essential Hoodie", price: 89900, image: "/images/hoodie_merch_black_and_white.png", tag: "Best Seller", category: "apparel" as const, inStock: true },
  { _id: "2" as any, name: "Core Tee", price: 44900, image: "/images/insta-fp/potrait-7.jpg", tag: "New", category: "apparel" as const, inStock: true },
  { _id: "3" as any, name: "Heavyweight Crew", price: 74900, image: "/images/insta-fp/potrait-4.jpg", tag: "Sold Out", category: "apparel" as const, inStock: false },
  { _id: "4" as any, name: "Oversized Drop Tee", price: 54900, image: "/images/insta-fp/potrait-5.jpg", tag: "New", category: "apparel" as const, inStock: true },
  { _id: "5" as any, name: "FaithPoint Jersey", price: 69900, image: "/images/insta-fp/potrait-3.jpg", tag: "Limited", category: "apparel" as const, inStock: true },
  { _id: "6" as any, name: "Sunday Best Crewneck", price: 64900, image: "/images/insta-fp/potrait-1.jpg", tag: "", category: "apparel" as const, inStock: true },
  { _id: "7" as any, name: "Grace Long Sleeve", price: 52900, image: "/images/minimalist_merch_black_and_white.png", tag: "New", category: "apparel" as const, inStock: true },
  { _id: "8" as any, name: "Vintage Wash Tee", price: 39900, image: "/images/insta-fp/potrait-2.jpg", tag: "Sold Out", category: "apparel" as const, inStock: false },

  // ── Accessories ──────────────────────────────────────────────
  { _id: "9" as any, name: "Sunday Tote", price: 34900, image: "/images/tote_bag_merch_black_and_white.png", tag: "Best Seller", category: "accessories" as const, inStock: true },
  { _id: "10" as any, name: "Faith Cap", price: 29900, image: "/images/insta-fp/potrait-8.jpg", tag: "New", category: "accessories" as const, inStock: true },
  { _id: "11" as any, name: "Canvas Sling Bag", price: 44900, image: "/images/insta-fp/IMG_8691.jpg", tag: "Limited", category: "accessories" as const, inStock: true },
  { _id: "12" as any, name: "Enamel Pin Set", price: 14900, image: "/images/insta-fp/IMG_8768.jpg", tag: "New", category: "accessories" as const, inStock: true },
  { _id: "13" as any, name: "Woven Beanie", price: 24900, image: "/images/insta-fp/potrait-6.jpg", tag: "", category: "accessories" as const, inStock: true },
  { _id: "14" as any, name: "Scripture Bracelet", price: 19900, image: "/images/insta-fp/IMG_8747.jpg", tag: "New", category: "accessories" as const, inStock: true },

  // ── Music ────────────────────────────────────────────────────
  { _id: "15" as any, name: "Echoes of Grace", price: 34900, image: "/images/vinyl_record_black_and_white.png", tag: "Vinyl", category: "music" as const, inStock: true },
  { _id: "16" as any, name: "Live at The Loft", price: 19900, image: "/images/insta-fp/IMG_8748.JPG", tag: "Digital", category: "music" as const, inStock: true },
  { _id: "17" as any, name: "Worship Collective Vol. 1", price: 29900, image: "/images/insta-fp/landscape-2.jpg", tag: "New", category: "music" as const, inStock: true },
  { _id: "18" as any, name: "Hymns Reimagined", price: 24900, image: "/images/insta-fp/landscape-1.JPG", tag: "CD", category: "music" as const, inStock: true },
  { _id: "19" as any, name: "Acoustic Sessions", price: 14900, image: "/images/insta-fp/landscape-4.JPG", tag: "Digital", category: "music" as const, inStock: true },

  // ── Books ────────────────────────────────────────────────────
  { _id: "20" as any, name: "The Art of Stillness", price: 24900, image: "/images/minimalist_book_cover_black_and_white.png", tag: "New Release", category: "books" as const, inStock: true },
  { _id: "21" as any, name: "Walking in Purpose", price: 29900, image: "/images/insta-fp/landscape-3.JPG", tag: "Best Seller", category: "books" as const, inStock: true },
  { _id: "22" as any, name: "Devotional Journal", price: 19900, image: "/images/insta-fp/IMG_8708.jpg", tag: "New", category: "books" as const, inStock: true },
  { _id: "23" as any, name: "30 Days of Faith", price: 17900, image: "/images/bible_study_black_and_white.png", tag: "", category: "books" as const, inStock: true },
  { _id: "24" as any, name: "Letters to the Church", price: 22900, image: "/images/community_gathering_black_and_white.png", tag: "Limited", category: "books" as const, inStock: true },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "apparel", label: "Apparel" },
  { key: "accessories", label: "Accessories" },
  { key: "music", label: "Music" },
  { key: "books", label: "Books" },
];

function formatPrice(cents: number): string {
  return `R${(cents / 100).toFixed(0)}`;
}

export default function Merch() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  // Fetch from Convex — undefined while loading, null if no data
  const convexProducts = useQuery(api.products.list, {});

  // Use Convex data if it has products, otherwise show fallback
  const allProducts =
    convexProducts && convexProducts.length > 0
      ? convexProducts
      : fallbackProducts;
  const isLoading = convexProducts === undefined;

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2 block">Shop</span>
            <h1 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter">
              The <br /> Store
            </h1>
          </div>
          <div className="hidden md:block text-right max-w-xs">
            <p className="font-serif italic text-white/60 mb-4">
              Wear the message. All proceeds go towards our city outreach programs.
            </p>
            <Button
              variant="link"
              className="text-white uppercase tracking-widest p-0 h-auto hover:no-underline border-b border-white/30 pb-1"
            >
              View Lookbook
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? allProducts.length
                : allProducts.filter((p) => p.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-3 rounded-full text-xs tracking-[0.2em] font-bold transition-all border whitespace-nowrap ${
                  activeCategory === cat.key
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-[10px] opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 animate-spin text-white/30 mr-3" />
            <span className="text-xs tracking-[0.2em] text-white/30">Loading products...</span>
          </div>
        )}

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group block"
              >
                <div className="relative aspect-[3/4] bg-white/5 mb-4 overflow-hidden rounded-xl">
                  {product.tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                          product.tag === "Sold Out"
                            ? "bg-white/20 text-white/60 backdrop-blur-sm"
                            : product.tag === "New" || product.tag === "New Release"
                            ? "bg-white text-black"
                            : product.tag === "Limited" || product.tag === "Vinyl"
                            ? "bg-black text-white border border-white/20"
                            : "bg-white text-black"
                        }`}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ${
                      !product.inStock ? "opacity-50" : ""
                    }`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white text-black rounded-b-xl">
                    <Button className="w-full bg-black text-white hover:bg-black/80 uppercase tracking-widest text-xs rounded-full h-12">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {!product.inStock ? "Restocking Soon" : "Add to Cart"}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <h3 className="font-display text-xl uppercase font-bold group-hover:text-white/70 transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-mono text-sm text-white/70">{formatPrice(product.price)}</span>
                </div>
                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mt-1">{product.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-24">
            <ShoppingBag className="w-10 h-10 text-white/20 mx-auto mb-4" />
            <p className="font-serif italic text-white/40">No products in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
