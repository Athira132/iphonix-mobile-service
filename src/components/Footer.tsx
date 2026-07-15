"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-[#050505] text-white pt-24 pb-12 dark-mode-scrollbar border-t border-white/5">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full border-2 border-white/20 bg-black overflow-hidden flex items-center justify-center p-0.5 shadow-md">
                <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-full object-cover w-full h-full" />
              </div>
              <span className="font-display text-lg font-bold text-white leading-none">iPhonix</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              iPhonix Apple Research and Professional Services MOBILE &amp; SERVICE CENTRE
            </p>
            
            {/* Social accounts */}
            <div className="flex gap-4 mt-2">
              <a 
                href="https://www.instagram.com/iphonix_mobile_service?igsh=YnVib2hoamZ5ZDBi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-accent-green hover:border-accent-green/30 transition-colors duration-300"
                title="Instagram"
              >
                <Star className="w-4 h-4 fill-current" />
              </a>
              <a 
                href="https://wa.me/917306243424"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-accent-green hover:border-accent-green/30 transition-colors duration-300"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className="text-left">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/50">
              <li><Link href="/" className="hover:text-accent-green transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent-green transition-colors">About</Link></li>
              <li><Link href="/gallery" className="hover:text-accent-green transition-colors">Gallery</Link></li>
              <li><Link href="/reviews" className="hover:text-accent-green transition-colors">Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-accent-green transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Mapped Services */}
          <div className="text-left">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-3 text-xs text-white/50">
              <li><Link href="/services/display-replacement" className="hover:text-accent-green transition-colors">Screen Replacement</Link></li>
              <li><Link href="/services/battery-replacement" className="hover:text-accent-green transition-colors">Battery Replacement</Link></li>
              <li><Link href="/services/charging-port-repair" className="hover:text-accent-green transition-colors">Port Repairs</Link></li>
              <li><Link href="/services/water-damage-repair" className="hover:text-accent-green transition-colors">Water damage recovery</Link></li>
              <li><Link href="/services/motherboard-repair" className="hover:text-accent-green transition-colors">Motherboard Repair</Link></li>
            </ul>
          </div>

          {/* Column 4: Store Location details */}
          <div className="text-left">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Store Location</h4>
            <p className="text-xs text-white/50 leading-relaxed">
              iPhonix Mobile Service Centre<br/>
              Near Karamana Airtel Office, Karamana,<br/>
              Thiruvananthapuram, Kerala
            </p>
            <a 
              href="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Karamana%20Thiruvananthapuram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-bold text-accent-green uppercase tracking-wider hover:underline"
            >
              Open Google Maps &rarr;
            </a>
          </div>

        </div>

        {/* Bottom border & copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/50">
            © {new Date().getFullYear()} iPhonix. All rights reserved.
          </span>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/" className="hover:text-accent-green transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-accent-green transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
