"use client";

import { motion } from "framer-motion";

const img4 = "/images/insta-fp/IMG_8708.jpg";
const img5 = "/images/insta-fp/potrait-1.jpg";
const img6 = "/images/insta-fp/landscape-2.jpg";
const img9 = "/images/insta-fp/IMG_8768.jpg";
const img11 = "/images/insta-fp/potrait-3.jpg";
const img12 = "/images/insta-fp/IMG_8748.JPG";

const items = [
  { src: img4, alt: "Community gathering", span: "col-span-2 row-span-2" },
  { src: img5, alt: "Portrait", span: "col-span-1 row-span-1" },
  { src: img11, alt: "Worship", span: "col-span-1 row-span-1" },
  { src: img12, alt: "Bible study", span: "col-span-1 row-span-2" },
  { src: img6, alt: "Gathering", span: "col-span-1 row-span-1" },
  { src: img9, alt: "Outreach", span: "col-span-1 row-span-1" },
];

export function ImageMosaic() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-3">OUR GALLERY</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              LIFE AT <span className="text-transparent-stroke">FAITHPOINT</span>
            </h2>
          </div>
          <p className="font-serif italic text-white/50 max-w-sm text-lg">
            Moments of worship, community, and transformation captured in real time.
          </p>
        </motion.div>
      </div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-2">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`${item.span} overflow-hidden group`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
