"use client";

import React from "react";
import Image from "next/image";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export default function ContactPage() {
  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky nav */}
      <Header darkTheme={true} />

      {/* Hero section */}
      <section className="relative w-full pt-44 pb-32 overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200" 
            alt="Contact us background"
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
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Get In Touch</span>
            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-white mb-6 leading-none">
              Contact Our Engineers.
            </h1>
            <p className="text-lg md:text-[20px] text-white/80 max-w-xl leading-relaxed">
              We diagnose device logic and perform swaps in Karamana, Thiruvananthapuram.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details & Booking Section (240px vertical spacing) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Details Left */}
            <div className="flex flex-col gap-8 text-left">
              <div className="bg-[#F8F8F8] p-12 rounded-[32px] border border-black/5 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-text-charcoal mb-8">
                  Support Coordinates
                </h3>

                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-6">
                    <Phone className="w-8 h-8 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Contact</h4>
                      <p className="text-lg font-bold text-text-charcoal mt-1">7306243424</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <Mail className="w-8 h-8 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Email Queries</h4>
                      <p className="text-lg font-bold text-text-charcoal mt-1">iphonixmobileliveservicecentre@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <MapPin className="w-8 h-8 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Address Location</h4>
                      <p className="text-lg font-bold text-[#2B2B2B] font-medium mt-1 leading-relaxed">
                        Near Karamana Airtel Office, Karamana, Thiruvananthapuram, Kerala
                      </p>
                      <a 
                        href="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Karamana%20Thiruvananthapuram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-accent-green hover:underline"
                      >
                        Get Directions &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="w-full h-[340px] rounded-[32px] overflow-hidden border border-black/5 relative shadow-sm">
                <iframe 
                  src="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Karamana%20Thiruvananthapuram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-90"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Booking Form Right - embeds highlighted premium component */}
            <div className="w-full flex items-center justify-center">
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
