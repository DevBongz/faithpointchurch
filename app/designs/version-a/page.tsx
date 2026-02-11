"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Version A — "growth."
 * Inspired by the Faith Point "growth." poster and venue announcements.
 * Clean white, oversized lowercase type with periods, rounded-corner photos,
 * generous whitespace, "faithpointchurch" branding, three-dot motif.
 */
export default function VersionA() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-black selection:bg-black selection:text-white overflow-x-hidden">
      {/* Nav — faithpointchurch style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf7]/90 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/designs" className="flex items-center gap-2 text-black/40 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <span className="text-base tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-light">church</span>
          </span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>

          <span className="text-xs tracking-[0.25em] text-black/30 hidden md:block">
            come &nbsp; as &nbsp; you &nbsp; are
          </span>
        </div>
      </nav>

      {/* Hero — "growth." style oversized lowercase */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter">
              faith
              <br />
              point.
            </h1>
          </motion.div>

          {/* Rounded photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 max-w-md mx-auto md:mx-0 md:ml-[20%]"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src="/images/insta-fp/IMG_8708.jpg"
                alt="Worship gathering"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Tagline + details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <p className="text-base text-black/50 max-w-sm leading-relaxed">
              our church is growing,
              <br />
              transforming and restoring lives,
              <br />
              raising responsible overcomers.
            </p>
            <div className="flex gap-12 text-sm">
              <div>
                <span className="font-serif italic text-black/40 text-sm block mb-1">sunday venue:</span>
                <span className="font-bold text-lg tracking-tight">
                  Ennerdale Street
                  <br />
                  Parklands
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif italic text-black/40 text-sm block mb-1">service:</span>
                <span className="font-bold text-3xl tracking-tight">10AM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        <div className="h-px bg-black/10" />
      </div>

      {/* Services — Clean card grid */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              gather.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Sunday Service",
                time: "10AM",
                desc: "Weekly gathering for worship, word, and community.",
                img: "/images/insta-fp/IMG_8691.jpg",
              },
              {
                title: "Wednesday Prayer",
                time: "6PM — 7PM",
                desc: "On Zoom and in person at 12 Auckland Street, Paarden Eiland.",
                img: "/images/insta-fp/landscape-3.JPG",
              },
              {
                title: "Small Groups",
                time: "Weekdays",
                desc: "Intimate gatherings across the city for deeper connection.",
                img: "/images/insta-fp/potrait-2.jpg",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-black/40 mb-2">{item.desc}</p>
                <span className="font-bold text-sm">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Word of the Year — "ACCELERATE" style */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-black/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Photos */}
            <div className="flex gap-4">
              <div className="flex-1 -rotate-3">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/potrait-3.jpg"
                    alt="Preacher"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 rotate-2 mt-8">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="/images/insta-fp/IMG_8708.jpg"
                    alt="Worship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Dictionary definition */}
            <div>
              <span className="text-xs tracking-[0.4em] text-black/30 block mb-2">
                2026
              </span>
              <span className="text-xs tracking-[0.4em] text-black/40 block mb-4">
                W O R D &nbsp; O F &nbsp; T H E &nbsp; Y E A R
              </span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                accelerate
              </h2>
              <div className="h-px bg-black/10 mb-6" />
              <p className="text-lg mb-1">
                <span className="font-bold">verb</span>
              </p>
              <p className="font-serif italic text-black/50 text-lg mb-1">
                ek/se/le/rate
              </p>
              <p className="text-black/60">
                to move faster : to gain speed
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 md:py-32 px-6 md:px-12 border-t border-black/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif italic text-3xl md:text-5xl leading-[1.2] text-black/80">
              "Faith is seeing light with your heart when all your eyes see is
              darkness."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-lg tracking-tight">
              <span className="font-bold">faithpoint</span>
              <span className="font-light">church</span>
            </span>
            <p className="text-xs text-black/30 mt-1">
              Ennerdale Street, Milnerton Rural, Parklands — Cape Town
            </p>
          </div>
          <div className="flex gap-8 text-xs tracking-widest text-black/30">
            <span>Instagram</span>
            <span>Youtube</span>
            <span>Podcast</span>
          </div>
          <span className="text-[10px] text-black/15 tracking-widest">
            © 2024 Faith Point Church
          </span>
        </div>
      </footer>
    </div>
  );
}
