import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import hoodieImg from "@assets/generated_images/hoodie_merch_black_and_white.png";
import toteImg from "@assets/generated_images/tote_bag_merch_black_and_white.png";
import tshirtImg from "@assets/generated_images/minimalist_merch_black_and_white.png";

const products = [
  { id: 1, name: "Essential Hoodie", price: "$55", img: hoodieImg, tag: "Best Seller" },
  { id: 2, name: "Sunday Tote", price: "$25", img: toteImg, tag: "Limited" },
  { id: 3, name: "Core Tee", price: "$35", img: tshirtImg, tag: "New" },
  { id: 4, name: "Heavyweight Crew", price: "$60", img: hoodieImg, tag: "Sold Out" },
];

export default function Merch() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
          <h1 className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter">
            The <br/> Store
          </h1>
          <div className="hidden md:block text-right">
             <p className="font-serif italic text-white/60 max-w-xs mb-4">
               Wear the message. All proceeds go towards our city outreach programs.
             </p>
             <Button variant="link" className="text-white uppercase tracking-widest p-0 h-auto hover:no-underline border-b border-white/30 pb-1">
               View Lookbook
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group block">
              <div className="relative aspect-[3/4] bg-white/5 mb-4 overflow-hidden">
                 {product.tag && (
                   <div className="absolute top-0 left-0 bg-white text-black px-3 py-1 z-10">
                     <span className="font-mono text-[10px] uppercase font-bold tracking-widest">{product.tag}</span>
                   </div>
                 )}
                 
                 <img 
                   src={product.img} 
                   alt={product.name} 
                   className={`w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 ${product.tag === 'Sold Out' ? 'opacity-50' : ''}`} 
                 />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white text-black">
                    <Button className="w-full bg-black text-white hover:bg-black/80 uppercase tracking-widest text-xs rounded-none h-12">
                      {product.tag === 'Sold Out' ? 'Restocking Soon' : 'Add to Cart'}
                    </Button>
                 </div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <h3 className="font-display text-xl uppercase font-bold">{product.name}</h3>
                <span className="font-mono text-sm text-white/70">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}