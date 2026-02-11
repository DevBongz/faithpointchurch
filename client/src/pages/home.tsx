import React from "react";
import { Navbar } from "../../../components/layout/navbar";
import { Hero } from "../../../components/sections/hero";
import { CarouselSection } from "../../../components/sections/carousel-section";
import { EditorialGrid } from "../../../components/sections/editorial-grid";
import { MinistryCollage } from "../../../components/sections/ministry-collage";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <EditorialGrid />
        <CarouselSection />
        <MinistryCollage />
        
        {/* Minimal Footer */}
        <footer className="py-20 border-t border-white/10 bg-black text-center md:text-left">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-display text-4xl font-bold uppercase mb-6">Faith Point</h2>
              <p className="font-serif text-white/50 max-w-sm">
                124 Faith Avenue, New York, NY 10012 <br />
                hello@faithpoint.church <br />
                (555) 123-4567
              </p>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Connect</h4>
              <ul className="space-y-4 font-display uppercase text-sm tracking-wider">
                <li><a href="#" className="hover:text-white/60">Instagram</a></li>
                <li><a href="#" className="hover:text-white/60">Youtube</a></li>
                <li><a href="#" className="hover:text-white/60">Podcast</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Times</h4>
              <ul className="space-y-4 font-serif italic text-white/70">
                <li>Sunday 9:00 AM</li>
                <li>Sunday 11:00 AM</li>
                <li>Wednesday 7:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 font-mono uppercase tracking-widest">
            <span>© 2024 Faith Point Church</span>
            <span>Designed with Soul</span>
          </div>
        </footer>
      </main>
    </div>
  );
}