"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export default function BookRepairPage() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Translucent header */}
      <Header darkTheme={true} />

      {/* Hero section displaying ONLY the centered page heading over the banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/ccSs6vDx/image.png" 
            alt="Book repair background"
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
            Book Repair
          </motion.h1>
        </div>
      </section>

      {/* Form panel section (240px vertical gaps) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Context Left */}
            <div className="lg:col-span-5 text-left">
              <h2 className="font-display text-[38px] md:text-[48px] font-bold tracking-tight text-text-charcoal mb-8 leading-tight">
                Quick Calibration Setup
              </h2>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium mb-12">
                Provide your device model name, preferred date of appointment, and fault description details. We prepare anti-static repair benches with certified adapters before you arrive.
              </p>
              
              <div className="flex flex-col gap-6 text-[#2B2B2B] text-base font-bold">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-accent-green" /> Tel Direct: +91 73062 43424
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-accent-green" /> Diagnostics time: 5 - 10 minutes
                </div>
              </div>
            </div>

            {/* Highlighting form right */}
            <div className="lg:col-span-7 flex justify-center">
              <BookingForm />
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
