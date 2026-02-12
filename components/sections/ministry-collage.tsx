import { ArrowUpRight } from "lucide-react";
const merchImg = "/images/insta-fp/potrait-5.jpg";
const stageImg = "/images/insta-fp/landscape-4.JPG";
const outreachImg = "/images/insta-fp/IMG_8768.jpg";

export function MinistryCollage() {
  return (
    <section className="py-32 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-8">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none">
            connect
            <br />
            <span className="text-black/20">&amp; grow.</span>
          </h2>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <p className="font-serif italic text-lg leading-relaxed opacity-60">
              Join a serving team today and be plugged in our church community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Faith Point Worship", img: stageImg, tag: "Auditions Open" },
            { title: "The Store", img: merchImg, tag: "New Collection" },
            { title: "Outreach", img: outreachImg, tag: "Join The Team" }
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-[#f5f5f0] h-[500px] overflow-hidden p-8 flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-500 rounded-2xl">
              <div className="flex justify-between items-start z-10 relative">
                <span className="text-xs tracking-widest border rounded-full px-3 py-1 border-current opacity-50">
                  {item.tag}
                </span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                 <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
              </div>

              <h3 className="text-4xl font-bold z-10 relative tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
