"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MessageCircle, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Extended list of authentic reviews with dates and avatars
const INITIAL_REVIEWS = [
  { 
    name: "Aditya Verma", 
    type: "iPhone 14 Pro Screen Replacement", 
    date: "2 weeks ago",
    text: "Truly Apple-level service! They mapped the serial chip data to the new screen, and TrueTone works perfectly. Replaced in under two hours while I waited in Karamana.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
  },
  { 
    name: "Priya Sundar", 
    type: "MacBook Pro Motherboard Repair", 
    date: "1 month ago",
    text: "My MacBook had fluid contact and wouldn't start. Other shops insisted on a full logic board replacement. iPhonix repaired it at micro-level for a fraction of the cost.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300"
  },
  { 
    name: "Rajesh Kannan", 
    type: "Apple Watch Battery Swap", 
    date: "3 weeks ago",
    text: "Excellent and honest service. They analyzed battery health analytics right in front of me, and swapped it with OEM parts. Highly recommended.", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300"
  },
  {
    name: "Rahul Nair",
    type: "OnePlus 11 Curved Display Replacement",
    date: "5 days ago",
    text: "Fixed my OnePlus screen in 3 hours. Frame is perfectly aligned, curved glass has zero gap. Highly skilled team for curved panels in Trivandrum!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300"
  },
  {
    name: "Anjali Menon",
    type: "iPhone 13 Liquid Damage Recovery",
    date: "1 month ago",
    text: "I dropped my iPhone 13 in water. They did ultrasonic descaling and restored my motherboard, saving all my photos. Infinite gratitude!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
  },
  {
    name: "Vivek Shekhar",
    type: "Google Pixel 7 Pro Charging Dock Swap",
    date: "2 months ago",
    text: "Quick charging port repair. Port feels firm and charges at full speed now. Professional and very prompt communication.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300"
  }
];

const MORE_REVIEWS = [
  {
    name: "Meera Krishnan",
    type: "iPad Air Touch Digitizer Repair",
    date: "2 months ago",
    text: "They replaced the glass digitizer of my iPad Air. The touch response is extremely fluid, colors are matching original specs. Beautiful repair.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300"
  },
  {
    name: "Arun Joseph",
    type: "iPhone 15 Pro Max Back Glass Laser Swap",
    date: "3 months ago",
    text: "Professional rear glass replacement using high-precision laser separators. The color and alignment are seamless with no glue residues.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300"
  },
  {
    name: "Suresh Kumar",
    type: "Samsung Galaxy S23 Ultra Camera Lens Swap",
    date: "3 months ago",
    text: "Replaced only the cracked camera protective rings. Zoom focuses properly now. Honest staff, saved me from replacing the entire camera module.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=300"
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setReviews((prev) => [...prev, ...MORE_REVIEWS]);
    setHasMore(false);
  };

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Translucent navigation header */}
      <Header darkTheme={true} />

      {/* Hero Section */}
      <section className="relative w-full pt-44 pb-32 overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200" 
            alt="Customer reviews background banner"
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
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Feedback</span>
            <h1 className="font-display text-[44px] sm:text-[56px] lg:text-[68px] font-extrabold tracking-tight text-white mb-6 leading-none">
              Client Testimonials
            </h1>
            <p className="text-lg md:text-[20px] text-white/80 max-w-xl leading-relaxed">
              Read transparent experiences from device owners across Thiruvananthapuram, Kerala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Statistics Section */}
      <section className="relative z-10 w-full pt-[240px] pb-[120px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Statistics</span>
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal leading-none">
              Trust In Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <span className="font-display text-[42px] md:text-[52px] font-extrabold text-accent-green block mb-2 leading-none">4,800+</span>
              <span className="text-xs uppercase font-bold tracking-wider text-text-muted">Happy Customers</span>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <span className="font-display text-[42px] md:text-[52px] font-extrabold text-accent-green block mb-2 leading-none">6,200+</span>
              <span className="text-xs uppercase font-bold tracking-wider text-text-muted">Devices Repaired</span>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <div className="flex items-center justify-center gap-1.5 mb-2 leading-none">
                <span className="font-display text-[42px] md:text-[52px] font-extrabold text-accent-green block">4.9</span>
                <span className="text-amber-500 text-xl font-bold">★★★★★</span>
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-text-muted">Average Rating</span>
            </div>

            <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04] shadow-sm">
              <span className="font-display text-[42px] md:text-[52px] font-extrabold text-accent-green block mb-2 leading-none">88%</span>
              <span className="text-xs uppercase font-bold tracking-wider text-text-muted">Repeat Customers</span>
            </div>

          </div>

        </div>
      </section>

      {/* Google reviews style feed */}
      <section className="relative z-10 w-full pt-[120px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {reviews.map((rev, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-[#F8F8F8] p-10 rounded-[32px] border border-black/5 shadow-sm text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Avatar, Name, Date */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black/5 bg-black/5 flex-shrink-0">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-base font-bold text-text-charcoal">{rev.name}</span>
                        <span className="text-[11px] font-medium text-text-muted mt-0.5">{rev.date}</span>
                      </div>
                    </div>

                    {/* Star list */}
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-500 stroke-amber-600" />
                      ))}
                    </div>

                    {/* Service type */}
                    <span className="text-xs font-bold text-accent-green uppercase tracking-wider block mb-4">{rev.type}</span>

                    {/* Review copy */}
                    <p className="text-[#2B2B2B] text-base leading-relaxed font-medium mb-6">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More Trigger */}
          {hasMore && (
            <div className="mt-16 text-center">
              <button 
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 py-4 px-8 rounded-xl bg-accent-green hover:bg-accent-green/90 text-white font-bold uppercase tracking-wider transition-colors duration-300 shadow-md"
              >
                Load More Reviews <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          )}

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
