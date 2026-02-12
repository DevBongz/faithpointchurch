"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { User } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Media", href: "/media" },
    { name: "Events", href: "/events" },
    { name: "Merch", href: "/merch" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        isScrolled ? "bg-background/90 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo — faithpointchurch branding */}
        <Link href="/" className="text-lg tracking-tight hover:opacity-80 transition-opacity">
          <span className="font-bold">faithpoint</span>
          <span className="font-serif font-light italic">church</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "text-xs tracking-widest hover:text-white/60 transition-colors font-medium",
                pathname === item.href ? "text-white underline decoration-1 underline-offset-4" : "text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {session ? (
            <Link
              href="/account"
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 border transition-all text-xs tracking-widest",
                pathname === "/account"
                  ? "bg-white text-black border-white"
                  : "border-white/20 hover:bg-white hover:text-black"
              )}
            >
              <User className="w-3.5 h-3.5" />
              {session.user.name?.split(" ")[0] || "Account"}
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-xs tracking-widest text-white/80 hover:text-white/60 transition-colors font-medium px-3 py-2"
              >
                Sign In
              </Link>
              <Button
                variant="outline"
                className="rounded-full px-6 border-white/20 hover:bg-white hover:text-black transition-all text-xs tracking-widest"
                asChild
              >
                <Link href="/sign-up">Join</Link>
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden text-white p-2 -m-2 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in duration-200">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-4xl font-bold tracking-tight hover:text-white/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-white/10 w-48 text-center space-y-4">
            {session ? (
              <Link 
                href="/account"
                className="text-2xl font-bold tracking-tight hover:text-white/50 transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-2xl font-bold tracking-tight hover:text-white/50 transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-lg tracking-tight text-white/50 hover:text-white transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
