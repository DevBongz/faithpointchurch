"use client";

export function MarqueeBanner({
  words,
  reverse = false,
  className = "",
}: {
  words: string[];
  reverse?: boolean;
  className?: string;
}) {
  const text = words.join(" \u00B7 ") + " \u00B7 ";
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none">
          {text}
        </span>
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none" aria-hidden>
          {text}
        </span>
        <span className="text-5xl md:text-7xl font-bold tracking-tighter pr-8 select-none" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  );
}
