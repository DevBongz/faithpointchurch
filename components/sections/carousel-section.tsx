"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const communityImg = "/images/insta-fp/IMG_8708.jpg";
const bibleStudyImg = "/images/insta-fp/landscape-3.JPG";
const emptyStageImg = "/images/insta-fp/IMG_8747.jpg";

const slides = [
  {
    id: 1,
    image: communityImg,
    title: "Community First",
    subtitle: "Life is better together",
    desc: "Small groups meeting weekly across the city."
  },
  {
    id: 2,
    image: emptyStageImg,
    title: "Deep Roots",
    subtitle: "Scripture & Study",
    desc: "Dive deeper into the word every Wednesday."
  },
  {
    id: 3,
    image: bibleStudyImg,
    title: "Worship Nights",
    subtitle: "Monthly Gatherings",
    desc: "An evening of prayer, music, and reflection."
  }
];

export function CarouselSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 border-t border-white/5 bg-black relative">
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <h3 className="text-xs text-white/50 tracking-widest mb-2">Our Gallery</h3>
          <h2 className="text-4xl font-bold">Life at Faith Point</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-white/20 hover:bg-white hover:text-black">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-white/20 hover:bg-white hover:text-black">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing pl-6" ref={emblaRef}>
        <div className="flex gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_85%] md:flex-[0_0_45%] min-w-0 relative group">
              <div className="aspect-[16/9] overflow-hidden mb-6 rounded-2xl">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pr-12">
                <div className="w-12 h-[1px] bg-white/30 mb-4"></div>
                <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                <p className="font-serif italic text-white/60">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
