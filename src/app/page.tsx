"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Smartphone, Watch, Laptop, ShieldCheck, Clock, 
  Settings, Award, CheckCircle2, Phone, 
  MapPin, Mail, Calendar, Sparkles, ArrowRight, 
  Star, Cpu, MessageCircle, ArrowUp
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Form input types
type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
};

// Featured services for the homepage
const FEATURED_SERVICES = [
  {
    title: "Screen Replacement",
    slug: "screen-replacement",
    icon: Smartphone,
    desc: "TrueTone matched premium displays with precise glass laminations.",
  },
  {
    title: "Battery Replacement",
    slug: "battery-replacement",
    icon: Cpu,
    desc: "Original-grade capacity cells with complete battery health telemetry.",
  },
  {
    title: "Charging Port Repair",
    slug: "charging-port-repair",
    icon: Settings,
    desc: "Lightning and Type-C dock replacements with strict power flow checking.",
  },
  {
    title: "Water Damage Repair",
    slug: "water-damage-repair",
    icon: Cpu,
    desc: "Advanced microcircuit cleaning using ultrasonic diagnostic benches.",
  },
  {
    title: "Camera Repair",
    slug: "camera-repair",
    icon: Sparkles,
    desc: "Focus, OIS stabilizer, and camera lens restorations.",
  },
  {
    title: "Software Solutions",
    slug: "software-solutions",
    icon: ShieldCheck,
    desc: "Firmware loop fixes, secure data extraction, and memory diagnostics.",
  }
];

// Why Choose Us list
const ADVANTAGES = [
  { title: "Certified Technicians", desc: "Expert micro-engineers certified in board diagnostics.", icon: Award },
  { title: "Genuine Parts", desc: "Only factory-grade replacement components are installed.", icon: ShieldCheck },
  { title: "Warranty Support", desc: "Up to 90 days of complete post-repair assurance.", icon: Clock },
  { title: "Transparent Pricing", desc: "Upfront pricing structures. No diagnostic fees.", icon: CheckCircle2 }
];

// Core Repair Categories
const REPAIR_CATEGORIES = [
  {
    title: "iPhone Repair",
    slug: "iphone-repair",
    desc: "Specialized service path for iPhone screen, logic board, back glass, and chip-level repairs.",
    icon: Smartphone,
  },
  {
    title: "Android Repair",
    slug: "android-repair",
    desc: "Diagnostics and screen/battery service pathways for Samsung Ultra, Pixel, and OnePlus flagships.",
    icon: Smartphone,
  },
  {
    title: "MacBook & iPad Repair",
    slug: "screen-replacement", // Fallback path
    desc: "Glass laminations, power board trace repairs, keyboard swaps, and battery maintenance.",
    icon: Laptop,
  },
  {
    title: "Accessories Store",
    slug: "accessories",
    desc: "Premium device protection overlays, adapters, MagSafe components, and luxury straps.",
    icon: Watch,
  }
];

// Testimonials
const REVIEWS = [
  { name: "Aditya Verma", type: "iPhone 14 Pro Screen Replacement", text: "Incredibly professional service! The screen is original and looks beautiful, complete with TrueTone. Done in just 1.5 hours next to the Daikin showroom in Pallikaranai.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
  { name: "Priya Sundar", type: "MacBook Pro Motherboard Repair", text: "My MacBook had a liquid spill and wouldn't power on. Other service centers told me to replace the logic board. iPhonix fixed it at chip-level for a third of the cost. Highly recommended!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
  { name: "Rajesh Kannan", type: "Apple Watch Battery Swap", text: "Excellent and transparent pricing. They showed me the battery health analytics pre- and post-repair. Excellent after-sales support.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Booking request received:", data);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <div 
      className="relative w-full glow-grid overflow-hidden bg-bg-primary text-white" 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setShowGlow(true)} 
      onMouseLeave={() => setShowGlow(false)}
    >
      
      {/* Dynamic Mouse Glow Highlight */}
      {showGlow && (
        <div 
          className="pointer-events-none absolute z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/3 blur-[140px] transition-all duration-100 ease-out"
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        />
      )}

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent-blue to-accent-green" 
        style={{ scaleX }}
      />

      {/* Header & Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
        scrolled ? "bg-bg-primary/70 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/10 p-1 bg-black flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="iPhonix Logo" 
                width={36} 
                height={36} 
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-accent-blue transition-colors duration-300">
                iPhonix
              </span>
              <span className="text-[9px] tracking-widest text-text-muted uppercase font-medium">
                Apple & Multi-Brand Service
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="text-text-muted hover:text-accent-blue transition-colors duration-300">Featured Services</a>
            <a href="#why-choose" className="text-text-muted hover:text-accent-blue transition-colors duration-300">Why iPhonix</a>
            <a href="#categories" className="text-text-muted hover:text-accent-blue transition-colors duration-300">Categories</a>
            <a href="#reviews" className="text-text-muted hover:text-accent-blue transition-colors duration-300">Reviews</a>
            <a href="#contact" className="text-text-muted hover:text-accent-blue transition-colors duration-300">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-blue hover:bg-accent-blue/90 border border-accent-blue transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,132,255,0.4)]"
            >
              Book Repair
            </a>
            
            <a
              href="https://wa.me/919962512345?text=Hi%20iPhonix%2C%20I%20would%20like%20to%20book%20a%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-accent-green hover:bg-accent-green/5 text-text-muted hover:text-accent-green transition-all duration-300"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-105"
            poster="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1200"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-microchip-repair-41270-large.mp4" type="video/mp4" />
          </video>
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/90 to-bg-primary/50" />
          <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 10%, rgba(5,5,5,0.9) 80%)" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center mt-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="font-medium tracking-wide">ISO Certified Premium Mobile Repair & Accessories</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl md:text-9xl font-bold tracking-tight text-white mb-6"
          >
            iPhonix
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-3xl font-medium tracking-tight leading-relaxed mb-12"
          >
            Professional Mobile Repair & Premium Accessories
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
          >
            <a 
              href="#contact" 
              className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-5 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,132,255,0.4)]"
            >
              Book Your Repair
            </a>
            <a 
              href="#services" 
              className="inline-flex w-full sm:w-auto items-center justify-center px-10 py-5 rounded-full text-sm font-semibold uppercase tracking-wider bg-white/5 border border-white/10 hover:border-accent-blue hover:bg-accent-blue/5 hover:text-accent-blue transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>

        </div>

      </section>

      {/* Featured Services Section (Redesigned with dedicated landing page links) */}
      <section id="services" className="relative z-10 w-full py-32 md:py-48 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-4 block">
              Repair Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Featured Services
            </h2>
            <p className="text-text-muted leading-relaxed text-sm md:text-base">
              Select a specialized diagnostic pipeline below to learn more, verify pricing structures, and schedule repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_SERVICES.map((service, index) => (
              <Link 
                key={index}
                href={`/services/${service.slug}`}
                className="glass-panel glass-panel-hover p-8 flex flex-col justify-between group h-full cursor-pointer hover:no-underline"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-8">
                    {service.desc}
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent-blue group-hover:text-white transition-colors duration-300">
                  Explore Repair Pathway <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose iPhonix */}
      <section id="why-choose" className="relative z-10 w-full py-32 md:py-48 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-4 block">
              Core Strengths
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Why Choose iPhonix?
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Spacious laboratory-level engineering built around device privacy, fast handbacks, and quality assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((adv, index) => (
              <div 
                key={index}
                className="glass-panel p-8 hover:border-white/10 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  <adv.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{adv.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Repair Categories */}
      <section id="categories" className="relative z-10 w-full py-32 md:py-48 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-4 block">
              Device Support
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Repair Categories
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We diagnose and repair all premium hardware form factors. Select a route to initialize booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REPAIR_CATEGORIES.map((cat, index) => (
              <Link
                key={index}
                href={`/services/${cat.slug}`}
                className="glass-panel glass-panel-hover p-8 md:p-12 flex flex-col justify-between group cursor-pointer hover:no-underline"
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all duration-300">
                    <cat.icon className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors duration-300" />
                  </div>
                  <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted group-hover:text-accent-blue group-hover:border-accent-blue transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="relative z-10 w-full py-32 md:py-48 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-4 block">
              Social Proof
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Highly rated for transparency, quality, and quick repair turnarounds.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              className="pb-16"
            >
              {REVIEWS.map((rev, idx) => (
                <SwiperSlide key={idx}>
                  <div className="glass-panel p-10 md:p-14 border-white/5 relative">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <Image 
                          src={rev.avatar} 
                          alt={rev.name} 
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full border border-white/10 object-cover" 
                        />
                        <div>
                          <h4 className="font-display text-base font-bold text-white">{rev.name}</h4>
                          <span className="text-xs text-text-muted">{rev.type}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-base text-white/90 leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 w-full py-32 md:py-48 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Book a Service & Repair
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Use our booking form for priority diagnostics, or drop by our showroom. We respond within minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form */}
            <div className="glass-panel p-10 border-white/5">
              <h3 className="font-display text-2xl font-bold text-white mb-8">
                Service Booking Form
              </h3>

              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-xl">
                  <CheckCircle2 className="w-14 h-14 text-accent-green animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-white">Booking Request Successful</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you! We have received your booking details and our repair specialists will text/call you back in 5-10 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Verma" 
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-accent-blue text-white placeholder-white/20 transition-all duration-300"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 99625 12345" 
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-accent-blue text-white placeholder-white/20 transition-all duration-300"
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. iPhone 15 Pro Max" 
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-accent-blue text-white placeholder-white/20 transition-all duration-300"
                      {...register("deviceModel", { required: "Device Model is required" })}
                    />
                    {errors.deviceModel && <span className="text-xs text-red-500">{errors.deviceModel.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Problem Description</label>
                    <textarea 
                      rows={4}
                      placeholder="e.g. Front glass is cracked and screen is flickering, Touch digitizer works." 
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-accent-blue text-white placeholder-white/20 transition-all duration-300 resize-none"
                      {...register("problemDescription", { required: "Problem details are required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 border border-accent-blue hover:shadow-lg transition-all duration-300"
                  >
                    Book Repair
                  </button>
                </form>
              )}
            </div>

            {/* Info Cards & Maps */}
            <div className="flex flex-col gap-8 justify-between">
              
              <div className="glass-panel p-10 border-white/5">
                <h3 className="font-display text-2xl font-bold text-white mb-8">
                  Store Contact Info
                </h3>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Our Address</h4>
                      <p className="text-xs text-text-muted leading-relaxed mt-1">
                        iPhonix Mobile Service, Velachery Main Road, Pallikaranai, Chennai - 600100<br/>
                        (Next to Daikin Showroom)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Call Support</h4>
                      <p className="text-xs text-text-muted mt-1">
                        +91 99625 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Email Us</h4>
                      <p className="text-xs text-text-muted mt-1">
                        support@iphonix.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Store Hours</h4>
                      <p className="text-xs text-text-muted mt-1">
                        Monday – Sunday: 10:00 AM – 10:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maps Embed */}
              <div className="w-full h-[320px] rounded-3xl border border-white/10 overflow-hidden relative">
                <iframe 
                  src="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Pallikaranai%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale invert contrast-125 opacity-70"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-bg-secondary border-t border-white/5 pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border border-white/10 bg-black flex items-center justify-center p-1">
                  <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                </div>
                <span className="font-display text-lg font-bold text-white">iPhonix</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                iPhonix Apple Research and Professional Services Mobile & Service Centre is Chennai&apos;s leading premium repair shop.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-text-muted">
                <li><Link href="/services/screen-replacement" className="hover:text-accent-blue transition-colors">Screen Replacement</Link></li>
                <li><Link href="/services/battery-replacement" className="hover:text-accent-blue transition-colors">Battery Swap</Link></li>
                <li><Link href="/services/charging-port-repair" className="hover:text-accent-blue transition-colors">Motherboard Repairs</Link></li>
                <li><Link href="/services/water-damage-repair" className="hover:text-accent-blue transition-colors">Water Damage Fixes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-text-muted">
                <li><a href="#why-choose" className="hover:text-accent-blue transition-colors">Why iPhonix</a></li>
                <li><a href="#categories" className="hover:text-accent-blue transition-colors">Categories</a></li>
                <li><a href="#reviews" className="hover:text-accent-blue transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-accent-blue transition-colors">Book Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Location Details</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                iPhonix Mobile Service Centre<br/>
                Velachery Main Road, Pallikaranai,<br/>
                Chennai - 600100 (Near Daikin Showroom)
              </p>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-text-muted">
              © {new Date().getFullYear()} iPhonix. All rights reserved.
            </span>
            <div className="flex gap-6 text-xs text-text-muted">
              <Link href="/" className="hover:text-accent-blue transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-accent-blue transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call CTA */}
      <a 
        href="tel:+919962512345"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-blue text-white shadow-[0_4px_20px_rgba(10,132,255,0.4)] hover:scale-105 hover:bg-accent-blue/95 transition-all duration-300 animate-pulse-slow"
        title="Call Support Now"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/919962512345?text=Hi%20iPhonix%2C%20I%20would%20like%20to%20get%20support%20for%20my%20broken%20device."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-green text-white shadow-[0_4px_20px_rgba(48,209,88,0.4)] hover:scale-105 hover:bg-accent-green/95 transition-all duration-300 animate-pulse-slow"
        title="WhatsApp Live Chat"
      >
        <MessageCircle className="w-6 h-6 fill-white text-accent-green" />
      </a>

      {/* Floating Back to Top */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-sm transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
