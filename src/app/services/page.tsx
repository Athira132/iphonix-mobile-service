"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header, { SERVICES_DATA } from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky header */}
      <Header darkTheme={true} />

      {/* Hero section displaying ONLY the centered page heading over the banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/ccSs6vDx/image.png" 
            alt="Services banner background"
            fill
            priority
            className="w-full h-full object-cover scale-102"
          />
          {/* 50% dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-[48px] sm:text-[64px] md:text-[76px] font-extrabold tracking-tight text-white leading-none uppercase"
          >
            Services
          </motion.h1>
        </div>
      </section>

      {/* Services Grid (240px spacing, premium cards with borders, shadows, lift animations, green accent lines) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES_DATA.map((srv, idx) => (
              <Link 
                key={idx}
                href={`/services/${srv.slug}`}
                className="group relative flex flex-col justify-between rounded-[24px] border-2 border-black/[0.05] hover:border-accent-green transition-all duration-300 bg-white p-8 shadow-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 text-left"
              >
                {/* Accent border highlight line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent-green rounded-t-[22px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6">
                    <Image 
                      src={srv.image} 
                      alt={srv.title} 
                      fill 
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-display text-2.5xl font-bold text-text-charcoal mb-4 group-hover:text-accent-green transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[#2B2B2B] text-base leading-relaxed mb-6 font-medium line-clamp-2">
                    {srv.desc}
                  </p>
                </div>
                
                <span className="inline-flex items-center justify-center rounded-[12px] text-sm font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 h-[48px] w-full mt-auto transition-colors duration-300">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Animated WhatsApp Icon-Only CTA */}
      <motion.a 
        href="https://wa.me/917306243424"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ 
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 15px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-accent-green text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
        title="WhatsApp Support"
      >
        <MessageCircle className="w-7 h-7 fill-white text-accent-green" />
      </motion.a>

    </div>
  );
}
