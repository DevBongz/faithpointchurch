import { motion } from "framer-motion";
import img1 from "@assets/generated_images/bible_study_black_and_white.png";
import img2 from "@assets/generated_images/worship_moment_black_and_white.png";
import img3 from "@assets/generated_images/community_gathering_black_and_white.png";

export function EditorialGrid() {
  return (
    <section className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          {/* Large Text Block */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-center pr-0 md:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-7xl md:text-8xl font-display font-bold uppercase leading-[0.8] mb-8">
                Seek <br />
                <span className="text-transparent-stroke text-white/10 ml-12">Truth</span>
              </h2>
              <div className="w-24 h-1 bg-white mb-8"></div>
              <p className="text-lg font-serif text-white/70 leading-relaxed mb-8">
                We believe in a church that is authentic, raw, and real. Not a performance, but a family. 
                Not a building, but a movement.
              </p>
              <a href="#" className="text-sm font-mono uppercase tracking-widest border-b border-white/30 pb-1 self-start hover:border-white transition-colors">
                Read Our Mission
              </a>
            </motion.div>
          </div>
          
          {/* Large Image Block */}
          <div className="col-span-1 md:col-span-7 relative">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <img src={img1} alt="Bible Study" className="w-full h-[600px] object-cover grayscale contrast-110" />
              
              {/* Floating Quote */}
              <div className="absolute -bottom-12 -left-12 bg-white text-black p-8 max-w-xs hidden md:block z-20 shadow-2xl">
                <p className="font-display font-bold text-4xl uppercase leading-none mb-4">
                  "Faith is seeing light with your heart."
                </p>
                <p className="text-xs font-mono uppercase tracking-widest opacity-60">— Pastor John Doe</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="col-span-1 md:col-span-4">
             <img src={img3} alt="Community" className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="mt-4 border-t border-white/20 pt-4">
                <h4 className="font-display text-xl uppercase">Youth Ministry</h4>
                <p className="text-sm text-white/50 mt-1">Fridays @ 7PM</p>
             </div>
          </div>
          
          <div className="col-span-1 md:col-span-4 md:col-start-6">
             <p className="font-serif text-2xl md:text-3xl italic leading-tight mb-12 text-white/80">
               "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science."
             </p>
             <img src={img2} alt="Worship" className="w-full aspect-square object-cover grayscale" />
          </div>
          
          <div className="col-span-1 md:col-span-2 hidden md:block">
             <div className="flex flex-col h-full justify-between py-4 border-l border-white/10 pl-8">
               <span className="vertical-text font-mono text-xs uppercase tracking-[0.5em] text-white/30">
                 Established MMXXIV
               </span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}