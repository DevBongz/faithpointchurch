import { Link } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-display font-bold tracking-tighter uppercase hover:opacity-80 transition-opacity">
            Faith<span className="font-light">Point</span>
          </a>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {["About", "Sermons", "Events", "Ministries", "Give"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm uppercase tracking-widest hover:text-white/60 transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="rounded-full px-6 border-white/20 hover:bg-white hover:text-black transition-all uppercase text-xs tracking-widest">
            Plan a Visit
          </Button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in duration-200">
          {["About", "Sermons", "Events", "Ministries", "Give", "Contact"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-4xl font-display font-bold uppercase tracking-tight hover:text-white/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}