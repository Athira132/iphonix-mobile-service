"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, MapPin, Mail, Star, MessageCircle, 
  Menu, X, Play, Image as ImageIcon, ChevronDown, CheckCircle2
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
  preferredDate: string;
  message: string;
};

// 11 services mapped to dynamic slugs, descriptions, and premium Unsplash photos
const SERVICES_DATA = [
  { 
    title: "iPhone Repair", 
    slug: "iphone-repair",
    desc: "Face ID sensor alignment, logic board micro-soldering, casing repairs.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800"
  },
  { 
    title: "Android Repair", 
    slug: "android-repair",
    desc: "Motherboard diagnostics and screen calibrations for Samsung and Pixel.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800"
  },
  { 
    title: "Display Replacement", 
    slug: "display-replacement",
    desc: "TrueTone matched premium displays with high color accuracy layers.",
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800"
  },
  { 
    title: "Battery Replacement", 
    slug: "battery-replacement",
    desc: "OEM-grade battery cells with safety chips and capacity analytics.",
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800"
  },
  { 
    title: "Camera Repair", 
    slug: "camera-repair",
    desc: "Restore autofocus engines, OIS stabilizers, and cracked lens glass.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800"
  },
  { 
    title: "Charging Port Repair", 
    slug: "charging-port-repair",
    desc: "Lightning and Type-C dock flex swaps for stable current flow.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800"
  },
  { 
    title: "Chip-Level Repair", 
    slug: "motherboard-repair",
    desc: "IC replacements, board track jumps, and detailed short diagnostics.",
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800"
  },
  { 
    title: "Water Damage Repair", 
    slug: "water-damage-repair",
    desc: "De-scaling board layers and ultrasonic cleaning under microscope benches.",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800"
  },
  { 
    title: "Software Solutions", 
    slug: "software-solutions",
    desc: "OS restores, secure data backup solutions, and system upgrades.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800"
  },
  { 
    title: "Mobile Accessories", 
    slug: "mobile-accessories",
    desc: "Certified BIS adapters, premium tempered shields, MagSafe components.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800"
  },
  { 
    title: "Doorstep Mobile Repair", 
    slug: "doorstep-mobile-repair",
    desc: "We come to your location for safe, fast, on-site device diagnostics.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800"
  }
];

// Mixed media gallery items: images and loop MP4 clips
const GALLERY_ITEMS = [
  { type: "image", url: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" },
  { type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" },
  { type: "image", url: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800" },
  { type: "image", url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800" }
];

const REVIEWS = [
  { name: "Aditya Verma", type: "iPhone 14 Pro Screen Replacement", text: "Truly Apple-level service! They mapped the serial chip data to the new screen, and TrueTone works perfectly. Replaced in under two hours while I waited in Karamana.", rating: 5 },
  { name: "Priya Sundar", type: "MacBook Pro Motherboard Repair", text: "My MacBook had fluid contact and wouldn't start. Other shops insisted on a full logic board replacement. iPhonix repaired it at micro-level for a fraction of the cost.", rating: 5 },
  { name: "Rajesh Kannan", type: "Apple Watch Battery Swap", text: "Excellent and honest service. They analyzed battery health analytics right in front of me, and swapped it with OEM parts. Highly recommended.", rating: 5 }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<{ type: string; url: string } | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmitBooking = (data: BookingFormData) => {
    console.log("Booking slot requested:", data);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      reset();
    }, 6000);
  };

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Navigation Bar (Clean circular logo crop, no UI ornaments, Services Dropdown mega-menu) */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 h-28 flex items-center ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}>
        <div className="mx-auto w-full max-w-[1440px] px-8 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            {/* Perfect circular cropped container (aspect ratio locked, no rectangle borders) */}
            <div className="relative w-14 h-14 rounded-full border-2 border-white shadow bg-black overflow-hidden flex items-center justify-center p-0.5">
              <Image src="/logo.png" alt="Logo" width={56} height={56} className="rounded-full object-cover w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-extrabold leading-none tracking-tight text-[22px] md:text-[26px] lg:text-[32px] ${
                scrolled ? "text-text-charcoal" : "text-white"
              }`}>
                iPhonix
              </span>
              <span className="text-[9px] tracking-widest text-text-muted uppercase font-bold mt-1.5">
                Mobile & Service Centre
              </span>
            </div>
          </Link>

          {/* Centered Navigation Menu */}
          <nav className={`hidden lg:flex items-center gap-10 text-xs uppercase tracking-wider font-bold transition-colors duration-300 mx-auto ${
            scrolled ? "text-text-charcoal" : "text-white/80"
          }`}>
            <a href="#home" className="hover:text-accent-green transition-colors">Home</a>
            <a href="#about" className="hover:text-accent-green transition-colors">About</a>
            
            {/* Services Mega Dropdown menu (Hover state, wider, larger font, rounded, comfortable padding) */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="hover:text-accent-green flex items-center gap-1.5 transition-colors uppercase tracking-wider font-bold">
                Services <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[360px] bg-white border border-black/5 rounded-[24px] shadow-2xl py-6 text-left flex flex-col font-sans normal-case text-text-charcoal z-50 overflow-hidden"
                  >
                    {SERVICES_DATA.map((srv, index) => (
                      <Link 
                        key={index} 
                        href={`/services/${srv.slug}`}
                        className="px-8 py-3 hover:bg-bg-light-grey hover:text-accent-green transition-all duration-200 text-[18px] font-bold block"
                      >
                        {srv.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#gallery" className="hover:text-accent-green transition-colors">Gallery</a>
            <a href="#testimonials" className="hover:text-accent-green transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-accent-green transition-colors">Contact</a>
          </nav>

          {/* Top Right Book Repair Button (Only 1 of 2 CTA buttons on site) */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <a 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md bg-accent-green text-white hover:bg-accent-green/90 h-[56px] w-[200px]"
            >
              Book Repair
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-2xl hover:bg-black/5"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-text-charcoal" /> : <Menu className={`w-7 h-7 ${scrolled ? "text-text-charcoal" : "text-white"}`} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-black/5 px-8 py-10 flex flex-col gap-5 font-bold text-sm uppercase tracking-wider text-text-charcoal shadow-xl"
            >
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">About</a>
              {/* Mobile Services List expanded */}
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-accent-green/30">
                <span className="text-[10px] tracking-widest text-text-muted font-bold block uppercase mb-1">Services</span>
                {SERVICES_DATA.map((srv, idx) => (
                  <Link key={idx} href={`/services/${srv.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold py-1.5 hover:text-accent-green">
                    {srv.title}
                  </Link>
                ))}
              </div>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Gallery</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Reviews</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section (No bottom gradient overlay, 40px gap below copy, 30px gap between rectangular CTAs) */}
      <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-102"
            poster="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1200"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
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
            Expert iPhone & Android Repairs with Genuine Parts, Chip-Level Expertise, Fast Turnaround & Doorstep Service.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-[30px] w-full sm:w-auto mt-[40px] justify-center items-center"
          >
            {/* Primary Rectangular CTA */}
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 shadow-md transition-all duration-300 h-[56px] w-[200px]"
            >
              Book Repair
            </a>
            {/* Secondary Rectangular Outline CTA */}
            <a 
              href="tel:7306243424" 
              className="inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-transparent text-white border border-white/20 hover:bg-white/10 shadow-md transition-all duration-300 h-[56px] w-[200px]"
            >
              Call Now
            </a>
          </motion.div>
        </div>

      </section>

      {/* About Section (bg: #FFFFFF, 240px vertical gaps, large section heading, 40px paragraph spacing, 60px grid gap) */}
      <section id="about" className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal leading-tight">
              About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center">
            {/* Image Left */}
            <div className="lg:col-span-6 relative h-[450px] md:h-[580px] rounded-[32px] overflow-hidden border border-black/5 shadow-sm">
              <Image 
                src="https://i.ibb.co/pBGN8Nz1/Whats-App-Image-2026-07-14-at-4-01-58-PM.jpg" 
                alt="iPhonix Service Centre Storefront" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Content Right */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-[40px]">
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium">
                iPhonix Mobile Service Centre is a trusted destination for professional smartphone repair solutions. With experienced technicians, advanced repair equipment, and genuine spare parts, we specialize in repairing iPhones and Android smartphones with precision and care.
              </p>
              <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium">
                From minor issues to complex chip-level motherboard repairs, we are committed to delivering fast, reliable, and affordable services while ensuring complete customer satisfaction.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Doorstep Mobile Phone Repair Service Section (bg: #F8F8F8, 240px spacing, 80px below heading, 60px gap) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8] border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <span className="text-[13px] uppercase font-bold tracking-widest text-accent-green mb-4 block">Convenience At Your Door</span>
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Door-to-Door Mobile Phone Repair Service
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center">
            {/* Image Left */}
            <div className="lg:col-span-6 relative h-[450px] md:h-[580px] rounded-[32px] overflow-hidden border border-black/5 shadow-sm bg-white">
              <Image 
                src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800" 
                alt="Mobile technician repairing device on-site" 
                fill
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Door-to-Door Highlights Content Right */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-[40px]">
              <div>
                <h3 className="font-display text-[26px] font-semibold text-text-charcoal mb-6">
                  Fast & Affordable Mobile Repair Services at Your Home or Office
                </h3>
                <p className="text-[#2B2B2B] leading-[1.8] text-[20px] font-medium">
                  Cannot visit our service center? No worries! Our expert technician comes straight to your location to perform on-site diagnoses and repairs securely.
                </p>
              </div>
              
              <ul className="flex flex-col gap-4 text-[#2B2B2B] font-medium text-[20px] leading-[1.8]">
                <li className="flex items-center gap-3">
                  <span className="text-accent-green text-2xl font-bold">✓</span> We come to your location.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent-green text-2xl font-bold">✓</span> Professional doorstep repairs.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent-green text-2xl font-bold">✓</span> Safe handling & diagnostic protocols.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-accent-green text-2xl font-bold">✓</span> Convenient home and office visits.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Homepage Services Section Redesigned: Large cards with images, name, desc, Learn More CTA, clicking navigates to subpages */}
      <section id="services" className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES_DATA.map((service, idx) => (
              <Link 
                key={idx}
                href={`/services/${service.slug}`}
                className="group flex flex-col bg-[#F8F8F8] rounded-[32px] overflow-hidden border border-black/5 shadow-sm hover:border-accent-green/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* High-quality Dummy Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-10 flex flex-col flex-grow justify-between min-h-[220px]">
                  <div>
                    <h3 className="font-display text-2.5xl font-bold text-text-charcoal mb-4 group-hover:text-accent-green transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#2B2B2B] leading-[1.8] text-[18px] font-medium mb-6">
                      {service.desc}
                    </p>
                  </div>

                  {/* Clean Learn More button */}
                  <span className="inline-flex items-center justify-center rounded-[12px] text-base font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 shadow-sm h-[48px] w-full mt-auto transition-all duration-300">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Section supporting both Images and Videos (Autoplay muted videos inside masonry cards and fullscreen lightboxes) */}
      <section id="gallery" className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8] border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Gallery
            </h2>
          </div>

          {/* Masonry media layout with eager/lazy visibility guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {GALLERY_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveLightboxItem(item)}
                className="relative overflow-hidden rounded-[32px] border border-black/5 group aspect-video cursor-pointer shadow-sm bg-white"
              >
                {item.type === "video" ? (
                  // Autoplay inline muted loops for videos inside masonry grid
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
                  // Image
                  <div className="w-full h-full relative">
                    <Image 
                      src={item.url} 
                      alt="Gallery repair photo" 
                      fill 
                      priority={idx === 0} // Eager load first image to guarantee visibility
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
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

      {/* Testimonials Section Redesigned: Independent section with py-200px and spacious layout */}
      <section id="testimonials" className="relative z-10 w-full pt-[200px] pb-[200px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal">
              Customer Reviews
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6500 }}
              className="pb-20"
            >
              {REVIEWS.map((rev, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-[#F8F8F8] p-16 md:p-24 relative flex flex-col items-center text-center rounded-[32px] border border-black/5 shadow-sm">
                    <div className="flex gap-1 text-yellow-500 mb-8">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="font-display text-xl sm:text-[26px] font-semibold text-text-charcoal leading-relaxed max-w-3xl mb-8 italic">
                      &ldquo;{rev.text}&rdquo;
                    </blockquote>
                    <span className="text-sm font-bold text-text-charcoal">{rev.name}</span>
                    <span className="text-xs text-text-muted font-semibold mt-1">{rev.type}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* Contact & Booking Section Redesigned: Independent section with py-200px, enlarged booking input controls */}
      <section id="contact" className="relative z-10 w-full pt-[200px] pb-[200px] bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="mb-[80px] text-left">
            <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal leading-none">
              Contact Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Details Left */}
            <div className="flex flex-col gap-8">
              <div className="bg-white p-12 rounded-[32px] border border-black/5 shadow-sm">
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
                      {/* Google Maps redirect button */}
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
              <div className="w-full h-[320px] rounded-[32px] overflow-hidden border border-black/5 relative shadow-sm">
                <iframe 
                  src="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Karamana%20Thiruvananthapuram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-90"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Booking Form Right - enlarged padding, input sizes, and taller textarea */}
            <div className="bg-white p-12 md:p-14 rounded-[32px] border border-black/5 shadow-sm w-full max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold text-text-charcoal mb-8">
                Request Diagnostics Slot
              </h3>

              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-[24px]">
                  <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-text-charcoal">Slot Registered Successfully</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you! We have logged your device details. An engineer will follow up shortly to coordinate device diagnostics.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitBooking)} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Verma" 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 73062 43424" 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. iPhone 15 Pro" 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("deviceModel", { required: "Model is required" })}
                    />
                    {errors.deviceModel && <span className="text-xs text-red-500">{errors.deviceModel.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Problem / Issue</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Flickering screen, charging loop error" 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("problemDescription", { required: "Issue is required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Preferred Date</label>
                    <input 
                      type="date" 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal transition-all duration-300"
                      {...register("preferredDate", { required: "Preferred Date is required" })}
                    />
                    {errors.preferredDate && <span className="text-xs text-red-500">{errors.preferredDate.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Additional Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="Any specific requests or detail tags." 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey border border-black/5 text-base focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none animate-none"
                      {...register("message")}
                    />
                  </div>

                  {/* Form submit button */}
                  <button 
                    type="submit"
                    className="w-full py-5 rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 h-[56px]"
                  >
                    Book My Repair
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Footer (bg: #050505, perfect circle logo crop, no rectangular margins, border-2 white) */}
      <footer className="relative z-10 w-full bg-[#050505] text-white pt-24 pb-12 dark-mode-scrollbar">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {/* Perfect circular cropped container (aspect ratio locked, no rectangle borders) */}
                <div className="relative w-12 h-12 rounded-full border-2 border-white/20 bg-black overflow-hidden flex items-center justify-center p-0.5 shadow-md">
                  <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-full object-cover w-full h-full" />
                </div>
                <span className="font-display text-lg font-bold text-white leading-none">iPhonix</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                iPhonix Apple Research and Professional Services MOBILE & SERVICE CENTRE
              </p>
              
              {/* Social icons */}
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

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/50">
                <li><a href="#about" className="hover:text-accent-green transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-accent-green transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-accent-green transition-colors">Gallery</a></li>
                <li><a href="#testimonials" className="hover:text-accent-green transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Services</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/50">
                <li><Link href="/services/display-replacement" className="hover:text-accent-green transition-colors">Screen Replacement</Link></li>
                <li><Link href="/services/battery-replacement" className="hover:text-accent-green transition-colors">Battery Replacement</Link></li>
                <li><Link href="/services/charging-port-repair" className="hover:text-accent-green transition-colors">Port Repairs</Link></li>
                <li><Link href="/services/water-damage-repair" className="hover:text-accent-green transition-colors">Water damage recovery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Store Location</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                iPhonix Mobile Service Centre<br/>
                Near Karamana Airtel Office, Karamana,<br/>
                Thiruvananthapuram, Kerala
              </p>
              {/* Google Maps link redirection */}
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

      {/* Floating Animated WhatsApp Icon-Only CTA Button (Bottom-Right, glowing scale pulse) */}
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
