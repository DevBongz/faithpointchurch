"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Instagram, Youtube, Music } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

/* ── images ── */
const heroVideo = "/images/insta-fp/hero-video.mp4";
const heroBg = "/images/insta-fp/landscape-2.jpg";
const img1 = "/images/insta-fp/landscape-1.JPG";
const img2 = "/images/insta-fp/IMG_8691.jpg";
const img3 = "/images/insta-fp/landscape-3.JPG";
const img4 = "/images/insta-fp/IMG_8708.jpg";
const img5 = "/images/insta-fp/potrait-1.jpg";
const img6 = "/images/insta-fp/landscape-2.jpg";
const img7 = "/images/insta-fp/IMG_8747.jpg";
const img8 = "/images/insta-fp/potrait-5.jpg";
const img9 = "/images/insta-fp/IMG_8768.jpg";
const img10 = "/images/insta-fp/landscape-4.JPG";
const img11 = "/images/insta-fp/potrait-3.jpg";
const img12 = "/images/insta-fp/IMG_8748.JPG";

/* ───────────────────────────── Navbar ───────────────────────────── */
function HartbeatNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "ABOUT", href: "/about" },
    { label: "SERMONS", href: "/sermons" },
    { label: "EVENTS", href: "/events" },
    { label: "RESOURCES", href: "/resources" },
    { label: "CONNECT", href: "#newsletter" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        {/* Left links */}
        <div className="hidden md:flex items-center gap-8">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-[0.25em] text-white hover:opacity-60 transition-opacity font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          {/* Three dots */}
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-white text-xs tracking-[0.2em] font-light hidden md:block">
            FAITHPOINT
          </span>
        </Link>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-8">
          {links.slice(2).map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-[0.25em] text-white hover:opacity-60 transition-opacity font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white z-[60]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="7" y2="7" /><line x1="4" x2="20" y1="17" y2="17" /></svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8"
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setOpen(false)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-3xl tracking-[0.15em] text-white font-bold hover:opacity-60 transition-opacity"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

/* ───────────────────────── Marquee Banner ───────────────────────── */
function MarqueeBanner({
  words,
  reverse = false,
  className = "",
}: {
  words: string[];
  reverse?: boolean;
  className?: string;
}) {
  const text = words.join(" \u00B7 ") + " \u00B7 ";
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none">
          {text}
        </span>
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none" aria-hidden>
          {text}
        </span>
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────── Statement + Image Row ───────────────────── */
function StatementRow({
  statement,
  image,
  imageAlt,
  reverse = false,
}: {
  statement: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 min-h-[70vh] ${
        reverse ? "md:direction-rtl" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center p-12 md:p-20 ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-center md:text-left"
        >
          {statement}
        </motion.h2>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className={`relative overflow-hidden ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover min-h-[50vh] md:min-h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────── Image Mosaic Grid ──────────────────────── */
function ImageMosaic() {
  const items = [
    { src: img4, alt: "Community gathering", span: "col-span-2 row-span-2" },
    { src: img5, alt: "Portrait", span: "col-span-1 row-span-1" },
    { src: img11, alt: "Worship", span: "col-span-1 row-span-1" },
    { src: img12, alt: "Bible study", span: "col-span-1 row-span-2" },
    { src: img6, alt: "Gathering", span: "col-span-1 row-span-1" },
    { src: img9, alt: "Outreach", span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
          className={`${item.span} overflow-hidden group`}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */
export default function VersionE() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <HartbeatNav />

      {/* ─────────── 1. FULL-SCREEN HERO ─────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            poster={heroBg}
            className="w-full h-full object-cover scale-110 grayscale contrast-125"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs md:text-sm tracking-[0.4em] text-white/60 mb-8 font-light"
          >
            EST. 2024 &mdash; CAPE TOWN, SOUTH AFRICA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8"
          >
            WELCOME TO FAITHPOINT.
            <br />
            <span className="text-transparent-stroke">WE ARE FAITH.</span>
            <br />
            WE ARE COMMUNITY.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-2xl mx-auto text-base md:text-lg font-serif italic text-white/70 leading-relaxed"
          >
            A vibrant community creating experiences at the intersection of faith
            and culture, with a mission to transform and restore lives together.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/40">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─────────── 2. MARQUEE BANNER ─────────── */}
      <section className="py-12 border-y border-white/10 bg-black">
        <MarqueeBanner words={["FAITH", "HOPE", "LOVE", "COMMUNITY", "WORSHIP", "SERVE", "RESTORE"]} />
      </section>

      {/* ─────────── 3. STATEMENT ROWS ─────────── */}
      <StatementRow
        statement="FAITH WITH IMPACT"
        image={img1}
        imageAlt="Worship gathering"
      />

      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto"
          >
            <span className="text-transparent-stroke">ORDINARY</span> JUST
            ISN&apos;T OUR THING
          </motion.p>
        </div>
      </section>

      <StatementRow
        statement="WHERE FAITH MEETS CULTURE"
        image={img3}
        imageAlt="Bible study"
        reverse
      />

      {/* ─────────── 4. BOLD DECLARATION ─────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Subtle texture bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-lg md:text-xl tracking-[0.3em] text-white/40 mb-6 font-light">
              WE&apos;RE NOT IN THE SUBTLE BUSINESS
            </h2>
            <p className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] max-w-5xl mx-auto mb-12">
              FEELING-FIRST WORSHIP.
              <br />
              <span className="text-transparent-stroke">IMMERSIVE EXPERIENCES.</span>
              <br />
              AUTHENTIC COMMUNITY.
            </p>
            <p className="max-w-2xl mx-auto font-serif italic text-lg md:text-xl text-white/60 leading-relaxed">
              We live, breathe, and walk the walk that others only talk &mdash;
              staying true to our belief that authentic faith and radical love
              have the power to shift the culture and change the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── 5. REVERSED MARQUEE ─────────── */}
      <section className="py-12 border-y border-white/10 bg-black">
        <MarqueeBanner
          words={["SUNDAYS 10AM", "WEDNESDAYS 6PM", "PARKLANDS", "CAPE TOWN", "COME AS YOU ARE"]}
          reverse
          className="text-white/20"
        />
      </section>

      {/* ─────────── 6. IMAGE MOSAIC ─────────── */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          >
            <div>
              <p className="text-xs tracking-[0.3em] text-white/40 mb-3">OUR GALLERY</p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                LIFE AT <span className="text-transparent-stroke">FAITHPOINT</span>
              </h2>
            </div>
            <p className="font-serif italic text-white/50 max-w-sm text-lg">
              Moments of worship, community, and transformation captured in real time.
            </p>
          </motion.div>
        </div>
        <div className="container mx-auto px-6">
          <ImageMosaic />
        </div>
      </section>

      {/* ─────────── 7. MINISTRY CARDS ─────────── */}
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
            {[
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
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative h-[550px] overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Background image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top tag */}
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

      {/* ─────────── 8. NEWSLETTER ─────────── */}
      <section id="newsletter" className="relative py-32 md:py-48 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={img7}
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

      {/* ─────────── 9. SOCIAL LINKS BAR ─────────── */}
      <section className="py-6 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-xs tracking-[0.2em] text-white/40">
          {[
            { label: "INSTAGRAM", icon: Instagram, href: "#" },
            { label: "YOUTUBE", icon: Youtube, href: "#" },
            { label: "PODCAST", icon: Music, href: "#" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <social.icon className="w-4 h-4" />
              {social.label}
            </a>
          ))}
        </div>
      </section>

      {/* ─────────── 10. FOOTER ─────────── */}
      <footer className="py-16 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <h2 className="text-2xl mb-4 tracking-tight">
                <span className="font-bold">faithpoint</span>
                <span className="font-serif font-light italic">church</span>
              </h2>
              <p className="font-serif italic text-white/40 max-w-sm leading-relaxed">
                Ennerdale Street, Milnerton Rural, Parklands
                <br />
                Cape Town, South Africa
                <br />
                hello@faithpoint.church
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[10px] tracking-[0.3em] text-white/30 mb-6">
                NAVIGATE
              </h4>
              <ul className="space-y-3 text-sm tracking-wider">
                {["About", "Sermons", "Events", "Resources", "Merch"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase()}`}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Times */}
            <div>
              <h4 className="text-[10px] tracking-[0.3em] text-white/30 mb-6">
                SERVICE TIMES
              </h4>
              <ul className="space-y-3 font-serif italic text-white/60">
                <li>Sunday 10AM</li>
                <li>Wednesday Prayer 6PM</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.3em] text-white/20">
            <span>&copy; 2024 FAITH POINT CHURCH</span>
            <div className="flex items-center gap-1.5 my-4 md:my-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <span>COME AS YOU ARE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
