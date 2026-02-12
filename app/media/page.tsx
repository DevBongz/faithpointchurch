"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Play,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Youtube,
  Music,
  Radio,
  Tv,
  Mic,
  Headphones,
  Instagram,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
/* eslint-disable @next/next/no-img-element */

// ─── Data ────────────────────────────────────────────────────────────────────

const heroVideo = "/images/insta-fp/hero-video.mp4";
const heroFallback = "/images/insta-fp/faithpoint_banner-black.jpg";

type Division = "watch" | "listen" | "connect";

const nowStreaming = [
  {
    id: 1,
    title: "The Way of Love",
    subtitle: "Offering + Sacrifice",
    image: "/images/insta-fp/landscape-1.JPG",
    tag: "Latest Sermon",
    videoId: "dQw4w9WgXcQ", // placeholder
  },
  {
    id: 2,
    title: "Kingdom Culture",
    subtitle: "Living Differently",
    image: "/images/insta-fp/landscape-3.JPG",
    tag: "Series",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Worship Night Live",
    subtitle: "February 2025",
    image: "/images/insta-fp/IMG_8747.jpg",
    tag: "Live Recording",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Deep Waters",
    subtitle: "Faith in the Unknown",
    image: "/images/insta-fp/IMG_8708.jpg",
    tag: "Series",
    videoId: "dQw4w9WgXcQ",
  },
];

type ContentCategory = "sermons" | "worship" | "podcasts";

const contentItems: Record<ContentCategory, Array<{ title: string; image: string; subtitle?: string }>> = {
  sermons: [
    { title: "Walking by Faith", image: "/images/insta-fp/potrait-3.jpg", subtitle: "The Book of Acts" },
    { title: "Breaking Chains", image: "/images/insta-fp/landscape-2.jpg", subtitle: "Standalone" },
    { title: "The Power of Unity", image: "/images/insta-fp/potrait-1.jpg", subtitle: "The Book of Acts" },
    { title: "A Heart of Worship", image: "/images/insta-fp/landscape-4.JPG", subtitle: "Kingdom Culture" },
    { title: "Grace Abounds", image: "/images/insta-fp/potrait-5.jpg", subtitle: "Deep Waters" },
    { title: "Rooted in Love", image: "/images/insta-fp/IMG_8691.jpg", subtitle: "Kingdom Culture" },
  ],
  worship: [
    { title: "How Great Is Our God", image: "/images/insta-fp/IMG_8747.jpg", subtitle: "FP Worship" },
    { title: "Build My Life", image: "/images/insta-fp/landscape-1.JPG", subtitle: "FP Worship" },
    { title: "Goodness of God", image: "/images/insta-fp/IMG_8708.jpg", subtitle: "Live Session" },
    { title: "Here I Am to Worship", image: "/images/insta-fp/landscape-3.JPG", subtitle: "Acoustic" },
  ],
  podcasts: [
    { title: "Faith Forward", image: "/images/insta-fp/potrait-4.jpg", subtitle: "Weekly Conversations" },
    { title: "The Restore Podcast", image: "/images/insta-fp/potrait-2.jpg", subtitle: "Stories of Healing" },
    { title: "Beyond Sunday", image: "/images/insta-fp/potrait-7.jpg", subtitle: "Midweek Devotional" },
  ],
};

const platforms = [
  { name: "YouTube", icon: Youtube, stat: "2.5K+", label: "Subscribers", href: "#" },
  { name: "Instagram", icon: Instagram, stat: "5K+", label: "Followers", href: "#" },
  { name: "Podcast", icon: Headphones, stat: "100+", label: "Episodes", href: "#" },
];

const partners = [
  {
    title: "FP Worship",
    tag: "Original Music",
    image: "/images/insta-fp/landscape-4.JPG",
    desc: "Original worship music crafted in community. Listen on all streaming platforms.",
  },
  {
    title: "The Restore Podcast",
    tag: "Weekly Episodes",
    image: "/images/insta-fp/potrait-5.jpg",
    desc: "Real conversations about faith, restoration, and living as overcomers.",
  },
  {
    title: "Youth Media",
    tag: "Next Generation",
    image: "/images/insta-fp/IMG_8768.jpg",
    desc: "Creative content by and for the youth. Short films, spoken word, and more.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MediaPage() {
  const [activeDivision, setActiveDivision] = useState<Division>("watch");
  const [activeCategory, setActiveCategory] = useState<ContentCategory>("sermons");
  const [showMore, setShowMore] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Embla carousel for "Now Streaming"
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const divisions: { key: Division; label: string }[] = [
    { key: "watch", label: "WATCH" },
    { key: "listen", label: "LISTEN" },
    { key: "connect", label: "CONNECT" },
  ];

  const categories: { key: ContentCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "sermons", label: "SERMONS", icon: Tv },
    { key: "worship", label: "WORSHIP", icon: Music },
    { key: "podcasts", label: "PODCASTS", icon: Mic },
  ];

  const visibleItems = showMore ? contentItems[activeCategory] : contentItems[activeCategory].slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Navbar />

      {/* ── Division Tabs (Hartbeat-style top tabs) ─────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-20">
        <div className="bg-background/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 flex items-center gap-0">
            {divisions.map((div) => (
              <button
                key={div.key}
                onClick={() => setActiveDivision(div.key)}
                className={`relative px-6 py-4 text-xs tracking-[0.25em] font-bold transition-colors ${
                  activeDivision === div.key
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {div.label}
                {activeDivision === div.key && (
                  <motion.div
                    layoutId="divisionTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="pt-32">
        {/* ────────────────────────────────────────────────────────────── */}
        {/* WATCH DIVISION                                                 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeDivision === "watch" && (
            <motion.div
              key="watch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Hero / Now Streaming Carousel ─────────────────── */}
              <section className="relative bg-black pb-24 pt-16 overflow-hidden">
                {/* Background video (subtle) */}
                <div className="absolute inset-0 z-0 opacity-20">
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={heroFallback}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
                </div>

                <div className="relative z-10">
                  <div className="container mx-auto px-6 mb-12">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="inline-block bg-white text-black text-[10px] font-bold tracking-[0.25em] px-3 py-1 mb-4">
                          NOW STREAMING
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                          Latest from <span className="font-serif italic font-light">Faith Point</span>
                        </h2>
                      </div>
                      <div className="hidden md:flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={scrollPrev}
                          className="rounded-full border-white/20 hover:bg-white hover:text-black"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={scrollNext}
                          className="rounded-full border-white/20 hover:bg-white hover:text-black"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Embla Carousel */}
                  <div className="overflow-hidden cursor-grab active:cursor-grabbing pl-6" ref={emblaRef}>
                    <div className="flex gap-6">
                      {nowStreaming.map((item) => (
                        <div
                          key={item.id}
                          className="flex-[0_0_85%] md:flex-[0_0_55%] lg:flex-[0_0_42%] min-w-0 group"
                        >
                          <div
                            className="relative aspect-video overflow-hidden rounded-2xl cursor-pointer"
                            onClick={() => setActiveVideo(item.videoId)}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4">
                              <span className="bg-white text-black text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full">
                                {item.tag}
                              </span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <Play className="w-6 h-6 fill-white text-white ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                              <p className="font-serif italic text-white/60 text-sm mb-1">{item.subtitle}</p>
                              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Content Grid (Hartbeat FILM/TV/AUDIO style) ───── */}
              <section className="py-24 bg-background border-t border-white/5">
                <div className="container mx-auto px-6">
                  {/* Section Header */}
                  <div className="max-w-3xl mb-16">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                        FAITH-FILLED CONTENT<span className="text-white/20">.</span>
                      </h2>
                      <p className="font-serif italic text-lg text-white/60 leading-relaxed max-w-xl">
                        Sermons, worship sessions, and conversations that bring you closer to God. 
                        Content that transforms, restores, and inspires — wherever you are.
                      </p>
                    </motion.div>
                  </div>

                  {/* Category Filter Tabs (Film/TV/Audio style) */}
                  <div className="flex gap-4 mb-12">
                    {categories.map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setActiveCategory(cat.key);
                          setShowMore(false);
                        }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs tracking-[0.2em] font-bold transition-all border ${
                          activeCategory === cat.key
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                        }`}
                      >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Content Grid */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {visibleItems.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="group cursor-pointer"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-bold text-lg tracking-tight group-hover:text-white/70 transition-colors">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <p className="font-serif italic text-sm text-white/40">{item.subtitle}</p>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Load More */}
                  {contentItems[activeCategory].length > 4 && !showMore && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={() => setShowMore(true)}
                        className="text-xs tracking-[0.2em] font-bold text-white/40 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all"
                      >
                        LOAD MORE
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────── */}
          {/* LISTEN DIVISION                                             */}
          {/* ────────────────────────────────────────────────────────── */}
          {activeDivision === "listen" && (
            <motion.div
              key="listen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Listen Hero */}
              <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src="/images/insta-fp/IMG_8747.jpg"
                    alt="Worship"
                    className="w-full h-full object-cover grayscale opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-background" />
                </div>

                <div className="relative z-10 container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="inline-block text-[10px] tracking-[0.3em] text-white/40 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                      AUDIO
                    </span>
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
                      HEAR THE<br />
                      <span className="text-transparent-stroke">WORD</span>
                    </h2>
                    <p className="font-serif italic text-xl text-white/50 max-w-lg leading-relaxed">
                      Sermons, worship albums, and podcasts — available on every platform you love.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Podcast / Audio Cards */}
              <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Faith Forward Podcast",
                        desc: "Weekly conversations about walking in faith, hosted by our pastoral team. Real stories, real questions.",
                        image: "/images/insta-fp/potrait-4.jpg",
                        icon: Mic,
                        link: "Listen on Spotify",
                      },
                      {
                        title: "FP Worship",
                        desc: "Original worship music born from our community. Stream our latest album on all platforms.",
                        image: "/images/insta-fp/landscape-1.JPG",
                        icon: Music,
                        link: "Stream Now",
                      },
                      {
                        title: "Sermon Audio",
                        desc: "Never miss a message. All Sunday sermons available as audio for your daily commute.",
                        image: "/images/insta-fp/potrait-3.jpg",
                        icon: Headphones,
                        link: "Browse Archive",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-500"
                      >
                        {/* Background image */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale" />
                        </div>

                        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors duration-300" />
                          </div>

                          <div>
                            <h3 className="text-3xl font-bold tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">
                              {item.title}
                            </h3>
                            <p className="font-serif italic text-white/50 text-sm leading-relaxed mb-6">
                              {item.desc}
                            </p>
                            <span className="text-xs tracking-[0.2em] text-white/40 border-b border-white/20 pb-1 group-hover:text-white group-hover:border-white transition-all">
                              {item.link}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Platform Badges */}
                  <div className="mt-20 pt-12 border-t border-white/5">
                    <p className="text-center text-[10px] tracking-[0.3em] text-white/30 mb-8">AVAILABLE ON</p>
                    <div className="flex flex-wrap items-center justify-center gap-12 text-white/20">
                      {["Spotify", "Apple Music", "YouTube Music", "Apple Podcasts", "Google Podcasts"].map((p) => (
                        <span key={p} className="text-sm tracking-widest hover:text-white/60 transition-colors cursor-pointer">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────── */}
          {/* CONNECT DIVISION                                            */}
          {/* ────────────────────────────────────────────────────────── */}
          {activeDivision === "connect" && (
            <motion.div
              key="connect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Media Reach Section (Hartbeat "MEDIA" section style) */}
              <section className="py-24 bg-background">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="inline-block text-[10px] tracking-[0.3em] text-white/40 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                        MEDIA
                      </span>
                      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                        THE MESSAGE IS<br />
                        <span className="text-transparent-stroke">GLOBAL</span>
                      </h2>
                      <p className="font-serif italic text-lg text-white/60 leading-relaxed max-w-md">
                        Faith Point is a creative, multiplatform church at the intersection of faith and culture. 
                        Through YouTube, social media, and podcasts, we connect our content with people around 
                        the world — whenever and wherever they need to hear the Word.
                      </p>
                    </motion.div>

                    {/* Stats Cards (Hartbeat streaming/experiential/distribution style) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {platforms.map((platform, i) => (
                        <motion.a
                          key={platform.name}
                          href={platform.href}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                          className="group relative aspect-square rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
                        >
                          <platform.icon className="w-6 h-6 text-white/30 group-hover:text-black/50 transition-colors" />
                          <div>
                            <span className="block text-3xl font-bold tracking-tighter">{platform.stat}</span>
                            <span className="block text-[10px] tracking-[0.2em] text-white/40 group-hover:text-black/50 mt-1">
                              {platform.label}
                            </span>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Content Channels (Hartbeat branded partnerships style) */}
                  <div className="border-t border-white/5 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                      <div>
                        <span className="inline-block text-[10px] tracking-[0.3em] text-white/40 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                          CONTENT CHANNELS
                        </span>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                          CHANNELS<span className="text-white/20">.</span>
                        </h2>
                      </div>
                      <p className="font-serif italic text-lg text-white/50 max-w-sm mt-6 md:mt-0">
                        Original content that builds faith, sparks conversation, and reaches the next generation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {partners.map((partner, i) => (
                        <motion.div
                          key={partner.title}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.12 }}
                          className="group relative h-[550px] overflow-hidden rounded-2xl cursor-pointer"
                        >
                          <img
                            src={partner.image}
                            alt={partner.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] tracking-[0.25em] text-white/60 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                                {partner.tag}
                              </span>
                              <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors duration-300" />
                            </div>

                            <div>
                              <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3 group-hover:translate-x-2 transition-transform duration-500">
                                {partner.title}
                              </h3>
                              <p className="font-serif italic text-sm text-white/50 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {partner.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Newsletter CTA (Hartbeat "NEVER MISS A BEAT" style) ─── */}
        <NeverMissSection />

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="py-20 border-t border-white/10 bg-black text-center md:text-left">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 tracking-tight">
                <span className="font-bold">faithpoint</span>
                <span className="font-serif font-light italic">church</span>
              </h2>
              <p className="font-serif italic text-white/50 max-w-sm">
                Ennerdale Street, Milnerton Rural, Parklands — Cape Town <br />
                hello@faithpoint.church
              </p>
            </div>

            <div>
              <h4 className="text-xs tracking-widest text-white/40 mb-6">Connect</h4>
              <ul className="space-y-4 text-sm tracking-wider">
                <li><a href="#" className="hover:text-white/60">Instagram</a></li>
                <li><a href="#" className="hover:text-white/60">Youtube</a></li>
                <li><a href="#" className="hover:text-white/60">Podcast</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-widest text-white/40 mb-6">Times</h4>
              <ul className="space-y-4 font-serif italic text-white/70">
                <li>Sunday 10AM</li>
                <li>Wednesday Prayer 6PM</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 tracking-widest">
            <span>&copy; 2024 Faith Point Church</span>
            <div className="flex items-center gap-1.5 my-4 md:my-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
            <span>come as you are</span>
          </div>
        </footer>
      </main>

      {/* ── Video Lightbox ────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-xs tracking-[0.2em]"
            >
              CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Newsletter Sub-component (Hartbeat "NEVER MISS A BEAT" style) ──────────

function NeverMissSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative py-32 overflow-hidden bg-white text-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85]"
            >
              NEVER<br />MISS A<br />
              <span className="text-black/20">MOMENT.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-serif italic text-lg text-black/50 mb-8 max-w-md">
              Subscribe to get the latest sermons, worship releases, and church updates delivered to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-black/20 rounded-full px-6 py-4 text-sm tracking-wider placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="bg-black text-white rounded-full px-10 py-4 text-xs tracking-[0.25em] font-bold hover:bg-black/80 transition-colors"
              >
                SEND IT
              </button>
            </form>

            <div className="flex items-center gap-6 mt-12 text-xs tracking-[0.2em] text-black/30">
              <a href="#" className="hover:text-black transition-colors flex items-center gap-2">
                <Youtube className="w-4 h-4" /> YOUTUBE
              </a>
              <a href="#" className="hover:text-black transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" /> INSTAGRAM
              </a>
              <a href="#" className="hover:text-black transition-colors flex items-center gap-2">
                <Headphones className="w-4 h-4" /> PODCAST
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
