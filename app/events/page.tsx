"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
const concertImg = "/images/insta-fp/IMG_5622.jpg";
const communityImg = "/images/insta-fp/IMG_8691.jpg";

const events = [
  {
    id: 1,
    day: "24",
    month: "Nov",
    title: "City Wide Worship Night",
    time: "7:00 PM - 9:30 PM",
    location: "Main Auditorium",
    image: concertImg,
    category: "Worship"
  },
  {
    id: 2,
    day: "28",
    month: "Nov",
    title: "Thanksgiving Feast",
    time: "5:00 PM - 8:00 PM",
    location: "Community Hall",
    image: communityImg,
    category: "Community"
  },
  {
    id: 3,
    day: "02",
    month: "Dec",
    title: "Leadership Summit",
    time: "9:00 AM - 2:00 PM",
    location: "Conference Room A",
    image: null,
    category: "Leadership"
  },
  {
    id: 4,
    day: "15",
    month: "Dec",
    title: "Christmas Spectacular",
    time: "6:00 PM - 8:00 PM",
    location: "Main Auditorium",
    image: null,
    category: "Special Event"
  }
];

export default function Events() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-b border-white/10 pb-10"
        >
          <h1 className="text-8xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-4">
            Upcoming <br/>
            <span className="text-transparent-stroke text-white/10">Gatherings</span>
          </h1>
        </motion.div>

        {/* Featured Event */}
        <div className="mb-24 relative group cursor-pointer">
          <div className="aspect-[21/9] overflow-hidden relative">
             <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
             <img src={concertImg} alt="Featured" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
             
             <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end">
                  <div>
                    <span className="inline-block px-3 py-1 border border-white rounded-full text-xs font-mono uppercase tracking-widest mb-4">Featured</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-2">City Wide Worship</h2>
                    <p className="font-serif italic text-xl opacity-80">Join us for a night of breakthrough.</p>
                  </div>
                  <Button className="mt-6 md:mt-0 rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 font-display uppercase tracking-widest">
                    Register Now
                  </Button>
                </div>
             </div>
          </div>
        </div>

        {/* Event List */}
        <div className="grid gap-0">
          {events.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group border-t border-white/10 py-12 flex flex-col md:flex-row gap-8 md:items-center hover:bg-white/5 transition-colors px-4"
            >
              <div className="flex flex-col items-center justify-center w-24 md:w-32 text-center">
                <span className="block text-xs font-mono uppercase tracking-widest text-white/50">{event.month}</span>
                <span className="block text-5xl md:text-6xl font-display font-bold">{event.day}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded-full text-white/50">{event.category}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-display font-bold uppercase mb-2 group-hover:text-white/80 transition-colors">{event.title}</h3>
                <div className="flex flex-col md:flex-row gap-4 text-sm font-serif italic text-white/60">
                  <span>{event.time}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end">
                <Button variant="outline" className="rounded-full border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                  Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

