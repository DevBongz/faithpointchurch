"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const img8 = "/images/insta-fp/potrait-5.jpg";
const img9 = "/images/insta-fp/IMG_8768.jpg";
const img10 = "/images/insta-fp/landscape-4.JPG";

const cards = [
  {
    title: "WORSHIP",
    subtitle: "Auditions Open",
    image: img10,
    desc: "Join the worship team and use your gifts to lead others into God's presence.",
  },
  {
    title: "SMALL GROUPS",
    subtitle: "Weekly Gatherings",
    image: img8,
    desc: "Life is better together. Find your people in a small group near you.",
  },
  {
    title: "OUTREACH",
    subtitle: "Join The Team",
    image: img9,
    desc: "Serve our city with open hands and be the hands and feet of Jesus.",
  },
];

export function MinistryCards() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4">
            GET INVOLVED<span className="text-black/20">.</span>
          </h2>
          <p className="font-serif italic text-lg text-black/50 max-w-lg mx-auto">
            There&apos;s a place for everyone. Jump in and be part of something greater.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative h-[550px] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="relative z-10 p-8 flex justify-between items-start h-full flex-col">
                <span className="text-[10px] tracking-[0.25em] text-white/60 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  {card.subtitle}
                </span>
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3 group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {card.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs tracking-[0.2em] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    LEARN MORE <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
