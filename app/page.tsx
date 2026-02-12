import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { CarouselSection } from "@/components/sections/carousel-section";
import { EditorialGrid } from "@/components/sections/editorial-grid";
import { MinistryCollage } from "@/components/sections/ministry-collage";
import { MarqueeBanner } from "@/components/sections/marquee-banner";
import { ImageMosaic } from "@/components/sections/image-mosaic";
import { MinistryCards } from "@/components/sections/ministry-cards";
import { Newsletter } from "@/components/sections/newsletter";
import { SocialLinks } from "@/components/sections/social-links";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />

        {/* Marquee Banner */}
        <section className="py-12 border-y border-white/10 bg-black">
          <MarqueeBanner words={["FAITH", "HOPE", "LOVE", "COMMUNITY", "WORSHIP", "SERVE", "RESTORE"]} />
        </section>

        <EditorialGrid />
        <CarouselSection />
        <MinistryCollage />

        {/* Reversed Marquee */}
        <section className="py-12 border-y border-white/10 bg-black">
          <MarqueeBanner
            words={["SUNDAYS 10AM", "WEDNESDAYS 6PM", "PARKLANDS", "CAPE TOWN", "COME AS YOU ARE"]}
            reverse
            className="text-white/20"
          />
        </section>

        <ImageMosaic />
        <MinistryCards />
        <Newsletter />
        <SocialLinks />
        
        {/* Footer */}
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
            <span>© 2024 Faith Point Church</span>
            <div className="flex items-center gap-1.5 my-4 md:my-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
            <span>come as you are</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
