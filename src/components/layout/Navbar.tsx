"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 pointer-events-auto",
        "transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-rose text-blush py-5 shadow-xl shadow-rose/20 backdrop-blur-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          className={clsx(
            "font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-opacity duration-200 hover:opacity-70",
            !isScrolled ? "text-plum" : "text-blush"
          )}
        >
          Luxury Events
        </Link>

        {/* Desktop Links */}
        <div className={clsx(
          "hidden md:flex items-center space-x-12 text-[11px] tracking-[0.25em] font-sans uppercase",
          !isScrolled ? "text-blush" : "text-blush"
        )}>
          {[
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/press", label: "Press" },
          ].map((link) => (
            <Link key={link.href} to={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <Link
            to="/inquiry"
            className="nav-link transition-opacity duration-200 hover:opacity-80"
          >
            Inquire
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={clsx(
            "md:hidden transition-transform duration-200 active:scale-90",
            !isScrolled ? "text-blush" : "text-blush"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full bg-rose text-blush overflow-hidden",
          "transition-all duration-400 ease-in-out",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6 flex flex-col space-y-6 text-sm font-sans tracking-[0.2em] uppercase border-t border-blush/10 shadow-xl">
          <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="nav-link">Portfolio</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="nav-link">About</Link>
          <Link to="/press" onClick={() => setMenuOpen(false)} className="nav-link">Press</Link>
          <Link to="/inquiry" onClick={() => setMenuOpen(false)} className="nav-link">Inquire</Link>
        </div>
      </div>
    </nav>
  );
}
