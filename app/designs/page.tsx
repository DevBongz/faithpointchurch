"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const designs = [
  {
    id: "version-a",
    name: "growth.",
    description: "Clean white canvas. Oversized lowercase type, rounded photos, maximum breathing room.",
    style: "Light / Editorial",
  },
  {
    id: "version-b",
    name: "midnight.",
    description: "Full-bleed dark with bold proclamation text. Dramatic, cinematic, statement-driven.",
    style: "Dark / Statement",
  },
  {
    id: "version-c",
    name: "editorial.",
    description: "Dictionary-style definitions, image-through-text, typographic experimentation.",
    style: "Dark / Typographic",
  },
  {
    id: "version-d",
    name: "community.",
    description: "Photo-forward with people grid, event-poster aesthetic, warm and personal.",
    style: "Light / Photo-centric",
  },
  {
    id: "version-e",
    name: "hartbeat.",
    description: "Bold, fun, and creative. Scrolling marquees, full-screen statements, immersive image mosaics. Inspired by hartbeat.com.",
    style: "Dark / Bold & Creative",
  },
];

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-base tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-light">church</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>

          <span className="text-xs tracking-[0.25em] text-black/40">
            come &nbsp; as &nbsp; you &nbsp; are
          </span>
        </div>
      </header>

      {/* Title Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] text-black/40 mb-8">
              design concepts
            </p>
            <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.9] mb-8">
              home page
              <br />
              <span className="text-black/15">concepts.</span>
            </h1>
            <p className="max-w-md text-base text-black/50 leading-relaxed">
              Five creative directions for the Faith Point home page. Each
              explores a different aesthetic while keeping the same brand
              identity and content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Grid */}
      <section className="px-6 pb-32">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {designs.map((design, idx) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <Link href={`/designs/${design.id}`} className="group block">
                  {/* Preview Card */}
                  <div
                    className={`${
                      idx % 2 === 0 ? "bg-[#f5f5f0]" : "bg-[#0a0a0a]"
                    } relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl`}
                  >
                    <span
                      className={`text-7xl md:text-8xl font-bold tracking-tighter leading-none ${
                        idx % 2 === 0 ? "text-black/[0.06]" : "text-white/[0.06]"
                      } select-none transition-transform duration-700 group-hover:scale-110`}
                    >
                      {design.name}
                    </span>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center rounded-2xl">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-sm tracking-widest">
                        view design <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">
                        {design.name}
                      </h3>
                      <p className="text-sm text-black/40 mt-1 max-w-sm">
                        {design.description}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-widest text-black/25 mt-1">
                      {design.style}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8 px-6">
        <div className="container mx-auto max-w-5xl flex items-center justify-between text-xs text-black/30 tracking-widest">
          <span>
            <span className="font-bold">faithpoint</span>
            <span className="font-light">church</span>
          </span>
          <span>5 concepts</span>
        </div>
      </footer>
    </div>
  );
}
