"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    if (sessionStorage.getItem("fp-splash-shown")) {
      setShow(false);
      return;
    }
    setHasPlayed(true);
    sessionStorage.setItem("fp-splash-shown", "true");

    // Auto-dismiss after the animation completes
    const timer = setTimeout(() => {
      setShow(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Don't render at all if already shown this session
  if (!hasPlayed && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[hsl(0,0%,5%)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Subtle radial glow behind the logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-64 h-64 rounded-full bg-white/[0.03] blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Logo mark — animated SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 md:w-24 md:h-24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle — draws itself on */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="white"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* 'f' stroke — hook at top flowing into vertical stem */}
              <motion.path
                d="M 44 27 C 44 20, 54 18, 57 23 C 59 26, 52 29, 50 34 L 50 76"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: "easeInOut",
                }}
              />

              {/* 'f' crossbar — elegant sweep to the right */}
              <motion.path
                d="M 40 48 C 44 45, 56 45, 62 48"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  ease: "easeInOut",
                }}
              />

              {/* Small circle — the 'point' in faithpoint */}
              <motion.circle
                cx="60"
                cy="66"
                r="4.5"
                stroke="white"
                strokeWidth="1.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>

          {/* Text branding — faithpoint + church */}
          <motion.div
            className="mt-8 flex items-baseline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="font-sans font-bold text-white text-lg tracking-tight">
              faithpoint
            </span>
            <span className="font-serif font-light italic text-white text-lg">
              church
            </span>
          </motion.div>

          {/* Subtle loading dots */}
          <motion.div
            className="mt-8 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-1 h-1 rounded-full bg-white/50"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
