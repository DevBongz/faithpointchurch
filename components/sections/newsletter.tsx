"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const bgImg = "/images/insta-fp/IMG_8747.jpg";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section id="newsletter" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bgImg}
          alt="Worship night"
          className="w-full h-full object-cover grayscale opacity-30"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6">
            NEVER MISS A <span className="text-transparent-stroke">MOMENT</span>.
          </h2>
          <p className="font-serif italic text-lg text-white/50 mb-12 max-w-md mx-auto">
            Stay connected with everything happening at Faith Point. Join our mailing list.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 bg-transparent border border-white/20 rounded-full px-6 py-4 text-sm tracking-wider placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-black rounded-full px-10 py-4 text-xs tracking-[0.25em] font-bold hover:bg-white/90 transition-colors"
            >
              SEND IT
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
