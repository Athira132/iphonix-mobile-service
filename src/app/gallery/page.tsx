"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Play, Image as ImageIcon, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GALLERY_ITEMS = [
  { type: "image", url: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800" },
  { type: "image", url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800" }
];

export default function GalleryPage() {
  const [activeLightboxItem, setActiveLightboxItem] = useState<{ type: string; url: string } | null>(null);

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky nav */}
      <Header darkTheme={true} />

      {/* Hero section displaying ONLY the centered page heading over the banner */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/ccSs6vDx/image.png" 
            alt="Gallery banner background"
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
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {GALLERY_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveLightboxItem(item)}
                className="relative overflow-hidden rounded-[32px] border border-black/5 group aspect-video cursor-pointer shadow-sm bg-white"
              >
                {item.type === "video" ? (
                  <div className="w-full h-full relative">
                    <video 
                      src={item.url} 
                      muted 
                      loop 
                      playsInline 
                      autoPlay 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <Play className="w-12 h-12 text-white fill-white animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <Image 
                      src={item.url} 
                      alt="Gallery repair snapshot" 
                      fill 
                      priority={idx === 0} 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6"
          >
            <button 
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              title="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              {activeLightboxItem.type === "video" ? (
                <video 
                  src={activeLightboxItem.url} 
                  controls 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <Image 
                  src={activeLightboxItem.url} 
                  alt="Enlarged gallery snap" 
                  fill 
                  className="object-contain" 
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
