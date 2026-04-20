"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Quem Somos", href: "#quem-somos" },
    { name: "Soluções", href: "#solucoes" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logostartnexuspng.png"
                alt="Start Nexus Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tighter text-dark leading-none">
                START NEXUS
              </span>
              <span className="text-[10px] font-bold text-gradient uppercase tracking-widest leading-tight mt-1">
                Tecnologia • Educação • Sustentabilidade
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-dark/70 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#inicio"
              className="text-sm font-bold text-dark/80 hover:text-primary transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link
              href="#inicio"
              className="bg-primary hover:bg-secondary text-white hover:text-dark px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-secondary/20 transition-all duration-300 active:scale-95"
            >
              Cadastrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-dark/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Link
                  href="#inicio"
                  className="text-center py-3 font-bold text-dark/80 border border-gray rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="#inicio"
                  className="text-center py-3 font-bold text-white bg-primary rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
