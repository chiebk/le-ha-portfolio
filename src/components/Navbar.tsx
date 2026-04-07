"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Profile", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-2xl py-4"
          : "bg-transparent"
      }`}
    >
      <div className="font-headline text-xl tracking-widest text-primary uppercase">
        LÊ HÀ
      </div>

      <div className="hidden md:flex gap-12 items-center">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="font-body tracking-tighter uppercase text-xs text-on-surface-variant hover:text-primary transition-colors duration-300 relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-primary text-on-primary px-8 py-2 font-headline text-[10px] tracking-[0.2em] uppercase hover:bg-primary-container transition-all duration-300 active:scale-95">
          Inquire
        </button>
        
        <button 
          className="md:hidden text-on-surface"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface-container shadow-2xl p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-body tracking-tighter uppercase text-sm text-on-surface hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-primary text-on-primary px-8 py-4 font-headline text-[10px] tracking-[0.2em] uppercase">
              Inquire
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
