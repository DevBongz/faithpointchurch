import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import teamImg from "@assets/generated_images/team_portrait_black_and_white.png";
import stageImg from "@assets/generated_images/empty_stage_black_and_white.png";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32"
        >
          <div>
            <h1 className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.85] mb-12">
              Who <br/> We Are
            </h1>
            <div className="w-full h-[1px] bg-white/20 mb-12"></div>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-white/80">
              Faith Point is a community of believers in the heart of the city, dedicated to exploring the mystery of God and the beauty of serving our neighbors.
            </p>
          </div>
          <div className="relative pt-12 md:pt-32">
            <img src={stageImg} alt="Our Space" className="w-full aspect-[3/4] object-cover grayscale contrast-125" />
            <div className="absolute -left-12 top-1/2 -rotate-90 origin-center whitespace-nowrap hidden md:block">
              <span className="font-mono text-xs uppercase tracking-[0.5em] text-white/40">Established MMXXIV • New York City</span>
            </div>
          </div>
        </motion.div>
        
        {/* Values Section */}
        <div className="mb-32 border-t border-white/10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { title: "Authenticity", desc: "We bring our whole selves, messy and imperfect, to the table." },
               { title: "Creativity", desc: "We believe the Creator sparks imagination in all of us." },
               { title: "Compassion", desc: "Love is an action word. We serve our city with open hands." }
             ].map((val, i) => (
               <div key={i} className="group">
                 <span className="font-mono text-xs text-white/30 mb-4 block">0{i+1}</span>
                 <h3 className="text-4xl font-display font-bold uppercase mb-6 group-hover:text-transparent-stroke transition-all duration-500">{val.title}</h3>
                 <p className="font-serif text-white/60 leading-relaxed">{val.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="pb-32">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-5xl font-display font-bold uppercase">Leadership</h2>
            <a href="#" className="font-mono text-xs uppercase tracking-widest border-b border-white/30 pb-1">View All Staff</a>
          </div>
          
          <div className="relative w-full aspect-[21/9] overflow-hidden group">
            <img src={teamImg} alt="Leadership Team" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
              <p className="font-display text-2xl uppercase">Pastors John & Jane Doe</p>
              <p className="font-serif italic text-white/60">Lead Pastors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}