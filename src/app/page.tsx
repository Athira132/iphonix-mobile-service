"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Header, { SERVICES_DATA } from "@/components/Header";
import Footer from "@/components/Footer";

// Display exactly 4 featured services on the homepage
const FEATURED_SERVICES = SERVICES_DATA.slice(0, 4);

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky Translucent Header */}
      <Header darkTheme={true} />

      {/* Hero Section with video background */}
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
            iPhonix
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-[22px] text-white/85 max-w-2xl tracking-normal leading-relaxed mb-1"
          >
            Premium Smartphone Repairs &amp; Calibration Services.
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

      {/* Featured Services Section */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Repair Catalog</span>
              <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal leading-none">
                Featured Services
              </h2>
            </div>
            <Link 
              href="/services" 
              className="text-xs uppercase font-extrabold tracking-widest text-accent-green hover:underline flex-shrink-0"
            >
              View All Services &rarr;
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
