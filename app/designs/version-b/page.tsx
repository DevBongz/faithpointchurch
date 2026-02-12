"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown } from "lucide-react";

/**
 * Version B — "midnight."
 * Dark, cinematic, full-screen statement typography.
 * Combines the bold poster aesthetic with the church's branding system.
 */
export default function VersionB() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/designs" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <span className="text-base tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-serif font-light italic">church</span>
          </span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </nav>

      {/* Hero — Full Screen Statement */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative">
        {/* Subtle border */}
        <div className="absolute inset-6 md:inset-12 border border-white/[0.04] pointer-events-none rounded-3xl" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[13vw] md:text-[11vw] font-bold leading-[0.88] tracking-tighter">
              faith that
              <br />
              moves
              <br />
              mountains.
            </h1>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 flex items-end justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-white/30" />
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>

          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] tracking-[0.3em]">scroll</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
            <span className="text-[10px] tracking-[0.3em]">if you are ready</span>
          </div>

          <div className="text-xs tracking-[0.25em] text-white/20 hidden md:block">
            come &nbsp; as &nbsp; you &nbsp; are
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-5"
          >
            <span className="text-[10px] tracking-[0.4em] text-white/20 block mb-8">
              our mission
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              transforming
              <br />
              <span className="text-white/20">&</span> restoring.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 md:col-span-5 md:col-start-8 flex flex-col justify-end"
          >
            <p className="font-serif italic text-xl md:text-2xl text-white/50 leading-relaxed mb-8">
              We believe in a church that is authentic, raw, and real. Not a
              performance, but a family. Not a building, but a movement.
            </p>
            <div className="h-px bg-white/10 mb-6" />
            <div className="flex gap-12">
              <div>
                <span className="font-serif italic text-white/30 text-sm block mb-1">sunday:</span>
                <span className="block text-4xl font-bold tracking-tight">10AM</span>
              </div>
              <div>
                <span className="font-serif italic text-white/30 text-sm block mb-1">wednesday prayer:</span>
                <span className="block text-4xl font-bold tracking-tight">6PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Width Image with rounded corners */}
      <section className="px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="aspect-[21/9] overflow-hidden rounded-3xl">
            <img
              src="/images/insta-fp/faithpoint_banner-black.jpg"
              alt="Worship"
              className="w-full h-full object-cover grayscale contrast-125 opacity-80"
            />
          </div>
        </motion.div>
      </section>

      {/* Connect Grid */}
      <section className="py-24 md:py-40 px-6 md:px-12 border-t border-white/[0.06] mt-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none">
              connect.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "worship", desc: "Join our worship team — auditions open." },
              { title: "outreach", desc: "Serve the community with us." },
              { title: "small groups", desc: "Life is better in circles, not rows." },
              { title: "the store", desc: "Faith Point merch — new collection." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-white/[0.06] rounded-2xl p-8 md:p-12 group cursor-pointer hover:bg-white hover:text-black transition-all duration-700"
              >
                <span className="text-[10px] tracking-[0.4em] opacity-20 block mb-12">
                  0{idx + 1}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {item.title}
                </h3>
                <p className="font-serif italic opacity-40 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <span className="text-base tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-serif font-light italic">church</span>
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="flex gap-8 text-xs tracking-widest text-white/20">
            <span>Instagram</span>
            <span>Youtube</span>
            <span>Podcast</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
