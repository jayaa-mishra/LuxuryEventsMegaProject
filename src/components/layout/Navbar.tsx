"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-rose shadow-lg shadow-rose/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <Link to="/" className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-blush hover:opacity-70 transition-opacity">
          Luxury Events
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 font-sans text-[11px] tracking-[0.25em] uppercase text-blush">
          {[
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/press", label: "Press" },
            { href: "/inquiry", label: "Inquire" },
          ].map(link => (
            <Link key={link.href} to={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </Link>
          ))}
          <Link
            to="/client/login"
            className="px-4 py-2 bg-blush text-plum font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200 rounded-sm"
          >
            Client Portal
          </Link>
          <Link
            to="/admin/login"
            className="px-4 py-2 bg-blush text-plum font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200 rounded-sm"
          >
            Admin
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-blush"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-5 font-sans text-sm tracking-[0.2em] uppercase text-blush border-t border-blush/10">
          <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/press" onClick={() => setMenuOpen(false)}>Press</Link>
          <Link to="/inquiry" onClick={() => setMenuOpen(false)}>Inquire</Link>
          <Link to="/client/login" onClick={() => setMenuOpen(false)}>Client Portal</Link>
          <Link to="/admin/login" onClick={() => setMenuOpen(false)}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}
