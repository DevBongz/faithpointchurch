"use client";

import { Instagram, Youtube, Music } from "lucide-react";

const socials = [
  { label: "INSTAGRAM", icon: Instagram, href: "#" },
  { label: "YOUTUBE", icon: Youtube, href: "#" },
  { label: "PODCAST", icon: Music, href: "#" },
];

export function SocialLinks() {
  return (
    <section className="py-6 border-t border-white/10 bg-black">
      <div className="container mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-xs tracking-[0.2em] text-white/40">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <social.icon className="w-4 h-4" />
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
