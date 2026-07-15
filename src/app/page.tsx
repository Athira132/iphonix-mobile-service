"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Clock, Settings, MessageCircle } from "lucide-react";
import Header, { SERVICES_DATA } from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

// Display exactly 4 featured services on the homepage
const FEATURED_SERVICES = SERVICES_DATA.slice(0, 4);

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky Header Navigation with translucent backdrop */}
      <Header darkTheme={true} />

      {/* Hero Section with video background (YouTube iframe loop) */}
      <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1200")' }}
          />
          <iframe
            src="https://www.youtube.com/embed/cwPthSTrtp4?autoplay=1&mute=1&loop=1&playlist=cwPthSTrtp4&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1"
            className="absolute top-1/2 left-1/2 w-[115vw] h-[64.68vw] min-h-[115vh] min-w-[204.44vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            allow="autoplay; encrypted-media"
            title="Hero Background Video"
            frameBorder="0"
          />
          {/* 50% dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12 flex flex-col items-center justify-center text-center pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[48px] sm:text-[68px] md:text-[80px] lg:text-[90px] font-extrabold tracking-tight text-white mb-8 leading-none max-w-5xl"
          >
            Professional Smartphone Repairs You Can Trust
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-[20px] text-white/80 max-w-2xl tracking-normal leading-relaxed"
          >
            Expert iPhone &amp; Android Repairs with Genuine Parts, Chip-Level Motherboard Diagnostics &amp; Doorstep Services.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-[30px] w-full sm:w-auto mt-[40px] justify-center items-center"
          >
            <Link 
              href="/book-repair" 
              className="inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 shadow-md transition-all duration-300 h-[56px] w-[200px]"
            >
              Book Repair
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-transparent text-white border border-white/20 hover:bg-white/10 shadow-md transition-all duration-300 h-[56px] w-[200px]"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

      </section>

      {/* Short Brand Introduction (240px vertical gaps) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-[11px] uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Premium Engineering</span>
              <h2 className="font-display text-[42px] sm:text-[52px] font-bold tracking-tight text-text-charcoal leading-tight mb-8">
                Apple-Inspired Care For Premium Hardware.
              </h2>
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent-green hover:underline uppercase tracking-wider"
              >
                More About Us &rarr;
              </Link>
            </div>

            <div className="lg:col-span-7 text-left">
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium mb-8">
                iPhonix Mobile Service Centre is Trivandrum&apos;s premier destination for high-end micro-welding, logic diagnostics, and component calibrations. We restore screens, replace OEM battery cells, and repair circuit issues with certified tools.
              </p>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium">
                Our workshop is designed around clean, anti-static workbenches where specialists trace motherboard faults and restore water-damaged systems with extreme detail.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Services (Exactly 3-4 cards with premium borders, rounded corners, soft shadows, hover accent lines) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8] border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Repair Catalog</span>
              <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal leading-none">
                Featured Services
              </h2>
            </div>
            <Link 
              href="/services" 
              className="text-xs uppercase font-extrabold tracking-widest text-accent-green hover:underline flex-shrink-0"
            >
              View All 11 Services &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_SERVICES.map((service, idx) => (
              <Link 
                key={idx}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col justify-between rounded-[24px] border-2 border-black/[0.05] hover:border-accent-green transition-all duration-300 bg-white p-6 shadow-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 text-left"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent-green rounded-t-[22px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-charcoal mb-3 group-hover:text-accent-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#2B2B2B] text-sm leading-relaxed mb-6 font-medium line-clamp-2">
                    {service.desc}
                  </p>
                </div>
                
                <span className="inline-flex items-center justify-center rounded-[12px] text-xs font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 h-[44px] w-full mt-auto transition-colors duration-300">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us Section (Spacious layout, clean grid spacing) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <span className="text-[11px] uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Our Standards</span>
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            
            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04]">
              <ShieldCheck className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Genuine Parts &amp; Warranty</h3>
              <p className="text-[#2B2B2B] text-base leading-relaxed font-medium">
                We repair devices utilizing original OEM-grade screens, high-capacity zero-cycle batteries, and flex modules backed by store warranty.
              </p>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04]">
              <Clock className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Same-Day Deliveries</h3>
              <p className="text-[#2B2B2B] text-base leading-relaxed font-medium">
                Over 90% of screen alignments, battery replacements, and camera module installations are delivered back to you in 1 to 2 hours.
              </p>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04]">
              <Settings className="w-10 h-10 text-accent-green mb-6" />
              <h3 className="font-display text-xl font-bold text-text-charcoal mb-4">Micro-Soldering Lab</h3>
              <p className="text-[#2B2B2B] text-base leading-relaxed font-medium">
                Our chip-level diagnostics benches restore shorted logic boards, trace dead circuit loops, and perform custom reballing.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Customer Rating Preview (Teaser slot pointing to /reviews) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8] border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            
            {/* 5 stars */}
            <div className="flex gap-1.5 text-amber-500 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-9 h-9 fill-amber-500 stroke-amber-600 animate-pulse" />
              ))}
            </div>

            <h2 className="font-display text-[38px] md:text-[54px] font-extrabold text-text-charcoal tracking-tight leading-tight mb-6">
              Loved by Thousands of Apple &amp; Smartphone Owners
            </h2>

            <p className="text-[#2B2B2B] text-[20px] font-medium leading-relaxed mb-10 max-w-xl">
              We hold a 4.9+ star average rating in Thiruvananthapuram for prompt, reliable chip-level engineering and honest customer services.
            </p>

            <Link 
              href="/reviews"
              className="inline-flex items-center justify-center rounded-[12px] text-base font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 shadow-md h-[52px] px-8"
            >
              Read Customer Reviews &rarr;
            </Link>

          </div>
        </div>
      </section>

      {/* Book Repair CTA Block (Renders BookingForm component) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <BookingForm />
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
