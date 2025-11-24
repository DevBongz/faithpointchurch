"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
const heroImage = "/images/worship_moment_black_and_white.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with heavy grain/overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={heroImage} 
          alt="Worship" 
          className="w-full h-full object-cover opacity-80 grayscale contrast-125"
        />
      </div>

      <div className="container relative z-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/70 mb-6">
            Welcome Home / Est. 2024
          </h2>
          
          <h1 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-8">
            Faith <span className="text-transparent-stroke text-white/10">Moves</span><br />
            Mountains
          </h1>
          
          <p className="max-w-xl mx-auto text-lg md:text-xl font-serif italic text-white/80 mb-12 leading-relaxed">
            "Where the spirit meets the soul in the heart of the city. Join us for a journey of transformation."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 font-display uppercase tracking-widest text-sm">
              Join us Sunday <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10 font-display uppercase tracking-widest text-sm group">
              <Play className="mr-2 w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> Watch Latest
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-between items-end px-6 container mx-auto hidden md:flex"
        >
          <div className="text-left">
            <span className="block text-xs text-white/40 uppercase tracking-widest mb-1">Service Times</span>
            <span className="block font-display text-xl">Sun 9AM & 11AM</span>
          </div>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent mx-auto"></div>
          <div className="text-right">
            <span className="block text-xs text-white/40 uppercase tracking-widest mb-1">Location</span>
            <span className="block font-display text-xl">124 Faith Ave, NY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}