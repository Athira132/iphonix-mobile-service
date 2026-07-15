"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

// The 11 updated services requested by the user
export const SERVICES_DATA = [
  { 
    title: "Screen Replacement", 
    slug: "display-replacement",
    desc: "TrueTone matched premium OLED screen restorations.",
    image: "https://i.ibb.co/xKjCL5W3/image.png"
  },
  { 
    title: "Battery Replacement", 
    slug: "battery-replacement",
    desc: "Original capacity cells with safety health parameters.",
    image: "https://i.ibb.co/qFgM6Kjf/image.png"
  },
  { 
    title: "Charging Port Repair", 
    slug: "charging-port-repair",
    desc: "Lightning & USB-C ports replacements under microscope.",
    image: "https://i.ibb.co/CKjv2D0n/image.png"
  },
  { 
    title: "Back Glass Replacement", 
    slug: "back-glass-replacement",
    desc: "Laser separator alignments for precise rear glass swaps.",
    image: "https://i.ibb.co/HD7TzxCB/image.png"
  },
  { 
    title: "Camera Repair", 
    slug: "camera-repair",
    desc: "Optical stabilizers and camera module restores.",
    image: "https://i.ibb.co/jZBFtzgm/image.png"
  },
  { 
    title: "Speaker Repair", 
    slug: "speaker-repair",
    desc: "Audio descaling and internal speaker swaps.",
    image: "https://i.ibb.co/xKjCL5W3/image.png"
  },
  { 
    title: "Mic Repair", 
    slug: "mic-repair",
    desc: "Primary and environmental noise-canceling mic recoveries.",
    image: "https://i.ibb.co/qFgM6Kjf/image.png"
  },
  { 
    title: "Water Damage Repair", 
    slug: "water-damage-repair",
    desc: "Ultrasonic cleaning chambers and line repairs.",
    image: "https://i.ibb.co/CKjv2D0n/image.png"
  },
  { 
    title: "Motherboard Repair", 
    slug: "motherboard-repair",
    desc: "IC chip reballing, logic soldering, and trace jumps.",
    image: "https://i.ibb.co/HD7TzxCB/image.png"
  },
  { 
    title: "Software Repair", 
    slug: "software-solutions",
    desc: "Loop recoveries, firmware flash solutions, and backups.",
    image: "https://i.ibb.co/jZBFtzgm/image.png"
  },
  { 
    title: "Face ID Repair", 
    slug: "face-id-repair",
    desc: "TrueDepth sensor calibrations and chip transplant repairs.",
    image: "https://i.ibb.co/xKjCL5W3/image.png"
  }
];

interface HeaderProps {
  darkTheme?: boolean;
}

export default function Header({ darkTheme = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textClass = scrolled 
    ? "text-text-charcoal" 
    : (darkTheme ? "text-white" : "text-text-charcoal");

  const brandTextClass = scrolled
    ? "text-text-charcoal"
    : (darkTheme ? "text-white" : "text-text-charcoal");

  const navClass = scrolled 
    ? "text-text-charcoal hover:text-accent-green" 
    : (darkTheme ? "text-white/80 hover:text-white" : "text-text-charcoal hover:text-accent-green");

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 h-24 flex items-center ${
      scrolled ? "glass-nav shadow-sm border-b border-black/[0.04]" : "bg-transparent"
    }`}>
      <div className="mx-auto w-full max-w-[1440px] px-8 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo Crop */}
        <Link href="/" className="flex items-center gap-4 flex-shrink-0">
          <div className="relative w-12 h-12 rounded-full border-2 border-white shadow bg-black overflow-hidden flex items-center justify-center p-0.5">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-full object-cover w-full h-full" />
          </div>
          <div className="flex flex-col text-left">
            <span className={`font-display font-extrabold leading-none tracking-tight text-[22px] md:text-[26px] ${brandTextClass}`}>
              iPhonix
            </span>
            <span className="text-[8px] tracking-widest text-text-muted uppercase font-bold mt-1">
              Mobile &amp; Service Centre
            </span>
          </div>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden lg:flex items-center gap-9 text-xs uppercase tracking-wider font-bold transition-colors duration-300 mx-auto">
          <Link href="/" className={`${navClass} transition-colors`}>Home</Link>
          <Link href="/about" className={`${navClass} transition-colors`}>About</Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button className={`${navClass} flex items-center gap-1 transition-colors uppercase tracking-wider font-bold`}>
              Services <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white border border-black/[0.08] rounded-[24px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] p-6 text-left grid grid-cols-2 gap-x-6 gap-y-4 font-sans normal-case text-text-charcoal z-50"
                >
                  {SERVICES_DATA.map((srv, index) => (
                    <Link 
                      key={index} 
                      href={`/services/${srv.slug}`}
                      className="pl-4 pr-3 py-3 rounded-xl hover:bg-black/[0.01] hover:text-accent-green border-l-2 border-transparent hover:border-accent-green transition-all duration-200 text-[18px] font-bold flex items-center justify-between group/item"
                    >
                      <div className="flex flex-col gap-0.5 pr-2">
                        <span className="text-[18px] font-bold text-text-charcoal group-hover/item:text-accent-green transition-colors">{srv.title}</span>
                        <span className="text-[12px] font-medium text-text-muted normal-case tracking-normal line-clamp-1 group-hover/item:text-text-charcoal transition-colors">
                          {srv.desc}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all text-accent-green flex-shrink-0" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/gallery" className={`${navClass} transition-colors`}>Gallery</Link>
          <Link href="/reviews" className={`${navClass} transition-colors`}>Reviews</Link>
          <Link href="/contact" className={`${navClass} transition-colors`}>Contact</Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link 
            href="/book-repair" 
            className="hidden sm:inline-flex items-center justify-center rounded-[12px] text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-md bg-accent-green text-white hover:bg-accent-green/90 h-[52px] w-[180px]"
          >
            Book Repair
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl hover:bg-black/5"
            title="Toggle Menu"
          >
            {mobileMenuOpen 
              ? <X className="w-6 h-6 text-text-charcoal" /> 
              : <Menu className={`w-6 h-6 ${textClass}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 px-8 py-10 flex flex-col gap-5 font-bold text-sm uppercase tracking-wider text-text-charcoal shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-1.5 text-left">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-1.5 text-left">About</Link>
            
            <div className="flex flex-col gap-2 pl-4 border-l-2 border-accent-green/30 text-left">
              <span className="text-[10px] tracking-widest text-text-muted font-bold block uppercase mb-1">Services</span>
              {SERVICES_DATA.map((srv, idx) => (
                <Link key={idx} href={`/services/${srv.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold py-1 hover:text-accent-green">
                  {srv.title}
                </Link>
              ))}
            </div>

            <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-1.5 text-left">Gallery</Link>
            <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-1.5 text-left">Reviews</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-1.5 text-left">Contact</Link>
            <Link href="/book-repair" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center rounded-[12px] text-xs font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 h-[52px] w-full mt-4">
              Book Repair
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
