"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Clock, Award, Hammer, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Translucent navigation header */}
      <Header darkTheme={true} />

      {/* Hero Banner */}
      <section className="relative w-full pt-44 pb-32 overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200" 
            alt="About us background"
            fill
            className="w-full h-full object-cover opacity-20 scale-102"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-left"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">About iPhonix</span>
            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-white mb-6 leading-none">
              Precision Engineering For Mobile Systems.
            </h1>
            <p className="text-lg md:text-[20px] text-white/80 max-w-xl leading-relaxed">
              We trace motherboard faults, replace screen assemblies, and recondition hardware in Karamana, Thiruvananthapuram.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story Block (240px vertical gaps) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center">
            
            {/* Story Text Left */}
            <div className="lg:col-span-6 text-left">
              <h2 className="font-display text-[36px] sm:text-[44px] lg:text-[54px] font-bold tracking-tight text-text-charcoal leading-tight mb-8">
                Our History &amp; Work Ethic
              </h2>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium mb-6">
                iPhonix was founded to bridge the gap between expensive brand replacements and local service shops. We focus on diagnosing individual board-level circuits rather than replacing complete assemblies, saving customers time and repair costs.
              </p>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium mb-6">
                Our workshop is fully equipped with advanced digital microscopes, chip reballing platforms, vacuum screen separators, and dust-free chamber overlays.
              </p>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium">
                Every repair process is handled under static-controlled conditions by specialized technicians certified in multi-brand board traces.
              </p>
            </div>

            {/* Shop Image Right */}
            <div className="lg:col-span-6 relative h-[450px] md:h-[580px] rounded-[32px] overflow-hidden border border-black/5 shadow-sm">
              <Image 
                src="https://i.ibb.co/pBGN8Nz1/Whats-App-Image-2026-07-14-at-4-01-58-PM.jpg" 
                alt="iPhonix Service Desk layout" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section (240px vertical gaps) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 text-left">
          
          <div className="mb-[80px]">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Standards</span>
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <ShieldCheck className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Integrity First</h3>
              <p className="text-[#2B2B2B] text-sm leading-relaxed font-medium">
                We open and test your device right in front of you. No hidden charges, no unapproved swaps.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <Clock className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Absolute Speed</h3>
              <p className="text-[#2B2B2B] text-sm leading-relaxed font-medium">
                We maintain massive stocks of OEM parts in-store to deliver quick turnaround.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <Award className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Certified Skill</h3>
              <p className="text-[#2B2B2B] text-sm leading-relaxed font-medium">
                Our repair technicians hold advanced certifications in Apple micro-soldering.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <Hammer className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Zero Wastage</h3>
              <p className="text-[#2B2B2B] text-sm leading-relaxed font-medium">
                We focus on restoring individual components rather than replacing intact modules.
              </p>
            </div>

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
