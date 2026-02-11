"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Play, Mic, Video, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
/* eslint-disable @next/next/no-img-element */
const preacherImg = "/images/insta-fp/potrait-3.jpg";
const bibleImg = "/images/insta-fp/landscape-2.jpg";

const series = [
  { title: "The Book of Acts", subtitle: "Unstoppable Church", img: preacherImg },
  { title: "Kingdom Culture", subtitle: "Living Differently", img: bibleImg },
  { title: "Deep Waters", subtitle: "Faith in the Unknown", img: preacherImg }
];

const recentSermons = [
  { id: 1, title: "Walking by Faith", speaker: "Pastor John Doe", date: "Nov 19, 2025", duration: "45 min", series: "The Book of Acts" },
  { id: 2, title: "The Power of Unity", speaker: "Pastor Jane Smith", date: "Nov 12, 2025", duration: "38 min", series: "The Book of Acts" },
  { id: 3, title: "Breaking Chains", speaker: "Pastor John Doe", date: "Nov 05, 2025", duration: "52 min", series: "Standalone" },
  { id: 4, title: "A Heart of Worship", speaker: "Guest Speaker", date: "Oct 29, 2025", duration: "41 min", series: "Kingdom Culture" },
];

export default function Sermons() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-10">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
           >
             <h1 className="text-8xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-none">
               Watch & <br/> Listen
             </h1>
           </motion.div>
           <div className="flex gap-4 mt-8 md:mt-0">
             <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-black uppercase tracking-widest text-xs">
               <Video className="mr-2 w-4 h-4" /> Latest Video
             </Button>
             <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-black uppercase tracking-widest text-xs">
               <Headphones className="mr-2 w-4 h-4" /> Podcast
             </Button>
           </div>
        </div>

        {/* Featured Series Carousel */}
        <div className="mb-24">
          <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">Current Series</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {series.map((item, idx) => (
              <div key={idx} className="group relative aspect-[4/5] overflow-hidden bg-white/5 cursor-pointer">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="font-serif italic text-white/60 mb-2">{item.subtitle}</p>
                  <h2 className="font-display text-3xl uppercase font-bold leading-tight group-hover:text-white transition-colors">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sermons List */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-2">Recent Messages</h3>
          <div className="space-y-4">
            {recentSermons.map((sermon) => (
              <div key={sermon.id} className="group flex flex-col md:flex-row items-center justify-between p-6 border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 rounded-lg cursor-pointer">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors flex-shrink-0">
                    <Play className="w-4 h-4 fill-current ml-1" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl uppercase font-bold mb-1">{sermon.title}</h4>
                    <p className="font-serif text-sm text-white/60 italic">{sermon.speaker} • {sermon.series}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end font-mono text-xs text-white/40 uppercase tracking-widest">
                  <span>{sermon.date}</span>
                  <span>{sermon.duration}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="ghost" className="font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-white/60">
              View All Archive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

