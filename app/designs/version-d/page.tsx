"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Version D — "community."
 * Inspired by the Communion Sunday poster and venue announcements.
 * Photo-forward people grid, event-poster aesthetic, warm and personal.
 * Clean white background, rounded photos, bold type, speaker/team portraits.
 */
export default function VersionD() {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-black selection:bg-black selection:text-white overflow-x-hidden">
      {/* Nav — faithpointchurch poster style */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf7]/90 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/designs" className="text-black/40 hover:text-black transition-colors">
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

      {/* Hero — Communion Sunday / Event Poster Style */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
        <div className="container mx-auto max-w-5xl">
          {/* Location + Time badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-start mb-8"
          >
            <div className="text-sm text-black/50 leading-relaxed">
              Ennerdale Street, Milnerton Rural
              <br />
              Parklands — Cape Town
            </div>
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-tight">10AM</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="flex items-start gap-2">
              <span className="text-blue-600 text-5xl font-bold leading-none">*</span>
              <h1 className="text-6xl md:text-[9rem] font-bold leading-[0.85] tracking-tighter">
                sunday
                <br />
                service
              </h1>
            </div>
          </motion.div>

          {/* Subtitle with date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-baseline gap-4 mb-16"
          >
            <div className="border-t border-black/10 pt-2 flex-1">
              <span className="text-xs tracking-[0.3em] text-black/30">
                FAITHPOINT CHURCH
              </span>
            </div>
          </motion.div>

          {/* Rounded hero photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-3xl">
              <img
                src="/images/insta-fp/IMG_8691.jpg"
                alt="Community worship gathering"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-md"
          >
            <p className="text-base text-black/50 leading-relaxed">
              our church is growing,
              <br />
              so this sunday we will gather
              <br />
              together as one community.
            </p>
          </motion.div>

          {/* Venue info — poster style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          >
            <div>
              <span className="font-serif italic text-black/40 text-sm block mb-1">
                sunday venue:
              </span>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
                Ennerdale Street
                <br />
                Parklands
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif italic text-black/40 text-sm block mb-1">
                every sunday
              </span>
              <span className="text-5xl md:text-7xl font-bold tracking-tighter">
                10AM
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* People Grid — Communion Sunday speaker style */}
      <section className="py-24 px-6 md:px-12 border-t border-black/5">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              our team.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Pastor Jay", role: "Lead Pastor", img: "/images/insta-fp/potrait-3.jpg" },
              { name: "Worship Team", role: "Faith Point Worship", img: "/images/insta-fp/IMG_8708.jpg" },
              { name: "Community", role: "Small Group Leaders", img: "/images/insta-fp/potrait-1.jpg" },
            ].map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="font-bold text-sm tracking-tight mb-3 uppercase">
                  {person.name}
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl mb-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <span className="text-xs text-black/40">{person.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wednesday Prayer — poster style */}
      <section className="py-24 px-6 md:px-12 border-t border-black/5">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-base tracking-tight block mb-4">
              <span className="font-bold">faithpoint</span>
              <span className="font-light">church</span>
            </span>

            <h2 className="font-serif italic text-5xl md:text-7xl leading-[1] mb-4">
              wednesday
              <br />
              prayer
            </h2>

            <p className="text-xl font-bold mb-12">6PM — 7PM</p>

            <div className="aspect-[16/9] overflow-hidden rounded-3xl max-w-3xl mx-auto mb-12">
              <img
                src="/images/insta-fp/landscape-2.jpg"
                alt="Wednesday Prayer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex justify-between max-w-lg mx-auto text-sm text-black/50">
              <span>On Zoom — link in bio</span>
              <span>In Person — 12 Auckland Street, Paarden Eiland</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two-up photo section — venue announcement style */}
      <section className="py-24 px-6 md:px-12 border-t border-black/5">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src="/images/insta-fp/IMG_8747.jpg"
                  alt="Worship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src="/images/insta-fp/IMG_5622.jpg"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="font-serif italic text-black/40 text-sm block mb-1">
                  sunday venue:
                </span>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none">
                  Ennerdale Street
                  <br />
                  Parklands
                </h3>
              </div>
              <div className="text-right">
                <span className="font-serif italic text-black/40 text-sm block mb-1">every sunday</span>
                <span className="text-5xl md:text-7xl font-bold tracking-tighter">10AM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span className="text-base tracking-tight">
            <span className="font-bold">faithpoint</span>
            <span className="font-light">church</span>
          </span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>

          <span className="text-xs tracking-[0.25em] text-black/30">
            come &nbsp; as &nbsp; you &nbsp; are
          </span>
        </div>
      </footer>
    </div>
  );
}
