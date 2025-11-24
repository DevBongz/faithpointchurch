import { ArrowUpRight } from "lucide-react";
import merchImg from "@assets/generated_images/minimalist_merch_black_and_white.png";
import stageImg from "@assets/generated_images/empty_stage_black_and_white.png";

export function MinistryCollage() {
  return (
    <section className="py-32 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-8">
          <h2 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-none">
            Connect <br/> & Grow
          </h2>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <p className="font-serif text-lg leading-relaxed opacity-80">
              From outreach programs to creative arts, there is a place for you to serve and be served.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {[
            { title: "FP Music", img: stageImg, tag: "Auditions Open" },
            { title: "The Store", img: merchImg, tag: "New Collection" },
            { title: "Outreach", img: stageImg, tag: "Join The Team" } // Reusing stage img for placeholder variety if needed, or keep consistent
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-white h-[500px] overflow-hidden p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500">
              <div className="flex justify-between items-start z-10 relative">
                <span className="font-mono text-xs uppercase tracking-widest border rounded-full px-3 py-1 border-current opacity-70">
                  {item.tag}
                </span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                 <img src={item.img} className="w-full h-full object-cover grayscale" alt={item.title} />
              </div>

              <h3 className="text-5xl font-display font-bold uppercase z-10 relative tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}