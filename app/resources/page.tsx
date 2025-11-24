"use client";

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Music, BookOpen } from "lucide-react";
import Image from "next/image";
const bookImg = "/images/minimalist_book_cover_black_and_white.png";
const vinylImg = "/images/vinyl_record_black_and_white.png";

const resources = [
  {
    type: "book",
    title: "The Art of Stillness",
    author: "P. John Doe",
    price: "$18.00",
    image: bookImg,
    tag: "New Release"
  },
  {
    type: "music",
    title: "Echoes of Grace",
    author: "FP Worship",
    price: "$25.00",
    image: vinylImg,
    tag: "Vinyl"
  },
  {
    type: "book",
    title: "City Light",
    author: "Anthology",
    price: "$22.00",
    image: bookImg,
    tag: "Bestseller"
  },
  {
    type: "music",
    title: "Live at The Loft",
    author: "FP Worship",
    price: "$15.00",
    image: vinylImg,
    tag: "Digital"
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col justify-center items-center text-center mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Equip & Inspire</span>
          <h1 className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-8">
            Books <span className="font-serif text-5xl md:text-7xl normal-case italic text-white/50">&</span> Music
          </h1>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 uppercase tracking-widest text-xs hover:bg-white hover:text-black">
              Shop Books
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 border-white/20 uppercase tracking-widest text-xs hover:bg-white hover:text-black">
              Shop Music
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {resources.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-square bg-white/5 mb-6 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white text-black text-[10px] font-bold font-mono uppercase px-2 py-1 tracking-widest">
                    {item.tag}
                  </span>
                </div>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="rounded-full bg-white text-black hover:bg-white/90 uppercase tracking-widest text-xs">
                    {item.type === 'book' ? <BookOpen className="w-4 h-4 mr-2"/> : <Music className="w-4 h-4 mr-2"/>}
                    View
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-2xl uppercase font-bold leading-none mb-1 group-hover:text-white/70 transition-colors">{item.title}</h3>
                  <p className="font-serif italic text-white/50 text-sm">{item.author}</p>
                </div>
                <span className="font-mono text-sm">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

