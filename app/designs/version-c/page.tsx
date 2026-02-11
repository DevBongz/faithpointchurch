"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Version C — "editorial."
 * Dictionary-style definitions, text-clip imagery, typographic experimentation.
 * Merges the "ACCELERATE" dictionary layout with the cinematic text-clip from Gravity.
 */
export default function VersionC() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/designs" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <span className="text-base tracking-tight">
            <span className="font-bold text-white">faithpoint</span>
            <span className="font-light text-white/60">church</span>
          </span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </nav>

      {/* Hero — Text Clipping Mask */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 w-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[22vw] md:text-[18vw] font-bold leading-[0.85] tracking-tighter"
              style={{
                backgroundImage: "url(/images/insta-fp/faithpoint_banner-black.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "grayscale(100%) contrast(1.2)",
              }}
            >
              faith
              <br />
              point.
            </h1>
          </motion.div>
        </div>

        {/* Bottom labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12"
        >
          <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-white/20 overflow-x-auto gap-6">
            <span>worship</span>
            <span>community</span>
            <span>prayer</span>
            <span>outreach</span>
            <span>youth</span>
            <span>creative</span>
          </div>
        </motion.div>
      </section>

      {/* Dictionary Definition Section — "ACCELERATE" style */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Tilted photos */}
            <div className="flex gap-4 mb-12 max-w-md">
              <div className="flex-1 -rotate-3">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/potrait-3.jpg"
                    alt="Preaching"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 rotate-2 mt-6">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/IMG_8691.jpg"
                    alt="Community"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <span className="text-xs tracking-[0.4em] text-white/20 block mb-2">2026</span>
            <span className="text-xs tracking-[0.4em] text-white/30 block mb-6">
              W O R D &nbsp; O F &nbsp; T H E &nbsp; Y E A R
            </span>

            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none mb-12">
              accelerate
            </h2>

            <div className="h-px bg-white/10 mb-8 max-w-lg" />

            <div className="max-w-lg">
              <p className="text-xl mb-1">
                <span className="font-bold">verb</span>
              </p>
              <p className="font-serif italic text-white/40 text-xl mb-2">
                ek/se/le/rate
              </p>
              <p className="text-white/50 text-lg">to move faster : to gain speed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15]">
              we are a community built on faith, rooted in love, and driven by
              purpose.{" "}
              <span className="text-white/20">
                transforming and restoring lives, raising responsible overcomers.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Grid with rounded corners */}
      <section className="px-6 md:px-12 pb-24">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/images/insta-fp/landscape-2.jpg"
                  alt="Bible Study"
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-bold tracking-tight">
                  wednesday prayer.
                </h3>
                <span className="text-[10px] tracking-[0.3em] text-white/40">
                  6PM — 7PM
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative group flex-1"
              >
                <div className="h-full overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/IMG_8691.jpg"
                    alt="Community"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                  <h3 className="text-2xl font-bold tracking-tight">community.</h3>
                  <span className="text-[10px] tracking-[0.3em] text-white/40">small groups</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group flex-1"
              >
                <div className="h-full overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/landscape-4.JPG"
                    alt="Worship"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                  <h3 className="text-2xl font-bold tracking-tight">worship.</h3>
                  <span className="text-[10px] tracking-[0.3em] text-white/40">sundays 10AM</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Text CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-[14vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter"
              style={{
                backgroundImage: "url(/images/insta-fp/IMG_8691.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "grayscale(100%) contrast(1.1)",
              }}
            >
              join us.
            </h2>
            <p className="font-serif italic text-white/30 mt-8 text-lg">
              Ennerdale Street, Milnerton Rural, Parklands — Cape Town
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <span className="text-sm tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-light text-white/40">church</span>
          </span>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
          <span className="text-[10px] text-white/15 tracking-widest">est. 2024</span>
        </div>
      </footer>
    </div>
  );
}
