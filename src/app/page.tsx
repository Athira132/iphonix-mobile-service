"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Smartphone, Watch, Laptop, ShieldCheck, Clock, 
  Settings, Award, CheckCircle2, Phone, 
  MapPin, Mail, Calendar, ArrowRight, 
  Star, Cpu, MessageCircle, ArrowUp, Menu, X
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
};

// Core featured services for the storytelling grid (alternating)
const CORE_SERVICES = [
  {
    title: "Screen Replacement",
    tagline: "TrueTone matched premium displays",
    slug: "screen-replacement",
    desc: "Restore visual perfection. We map and transfer screen serial calibrations directly to new OLED panels to keep original Apple TrueTone, brightness levels, and haptic feedback intact.",
    icon: Smartphone,
    color: "text-accent-blue",
    bgClass: "bg-accent-blue/5",
    visualText: "TrueTone Active"
  },
  {
    title: "Battery Restoration",
    tagline: "High-capacity power calibration",
    slug: "battery-replacement",
    desc: "Solve fast draining and sudden shutdowns. We swap degraded batteries with original OEM-grade cells, whitelabeling chip controllers to maintain maximum battery health analytics.",
    icon: Cpu,
    color: "text-orange-500",
    bgClass: "bg-orange-500/5",
    visualText: "100% Health"
  },
  {
    title: "Logic Board Repair",
    tagline: "Microchip-level diagnostic reflows",
    slug: "charging-port-repair",
    desc: "Recover dead devices, charging issues, or power loop failures. Our micro-engineers trace circuit line errors under high-magnification microscopes to avoid board swaps.",
    icon: Settings,
    color: "text-purple-500",
    bgClass: "bg-purple-500/5",
    visualText: "Micro Soldered"
  },
  {
    title: "Water Damage Recovery",
    tagline: "Ultrasonic descaling diagnostics",
    slug: "water-damage-repair",
    desc: "Advanced decontamination for liquid contact. We use specialized laboratory ultrasonic chambers to clear logic board corrosion and restore functional pathways.",
    icon: ShieldCheck,
    color: "text-accent-green",
    bgClass: "bg-accent-green/5",
    visualText: "Dehydrated"
  }
];

const ADVANTAGES = [
  { title: "Laboratory Grade", desc: "Expert micro-engineers certified in chip-level logic board diagnostics.", icon: Award },
  { title: "OEM Quality Parts", desc: "We utilize premium factory-grade replacement components exclusively.", icon: ShieldCheck },
  { title: "90-Day Guarantee", desc: "All screen and component repairs are backed by a complete warranty card.", icon: Clock },
  { title: "Upfront Estimates", desc: "Clear, transparent pricing structures. Zero diagnostics fees.", icon: CheckCircle2 }
];

const REPAIR_CATEGORIES = [
  { title: "iPhone Repair", slug: "iphone-repair", desc: "Face ID sensor matching, glass laminations, back casing swaps, and logic path reballing.", icon: Smartphone },
  { title: "Android Repair", slug: "android-repair", desc: "OEM display fits, charging port updates, and battery calibrations for Samsung and Pixel.", icon: Smartphone },
  { title: "MacBook & iPad", slug: "screen-replacement", desc: "Retina screen laminations, keyboard restorations, battery swaps, and power trace solder fixes.", icon: Laptop },
  { title: "Accessories", slug: "accessories", desc: "CertifiedBIS adapters, magnetic charging pads, premium screen guards, and luxury smartwatch bands.", icon: Watch }
];

const REVIEWS = [
  { name: "Aditya Verma", type: "iPhone 14 Pro Screen Replacement", text: "Truly Apple-level service! They mapped the serial chip data to the new screen, and TrueTone works perfectly. Replaced in under two hours while I waited in Pallikaranai.", rating: 5 },
  { name: "Priya Sundar", type: "MacBook Pro Solder Solder Repair", text: "My MacBook had fluid contact and wouldn't start. Other shops insisted on a full logic board replacement. iPhonix repaired it at micro-level for a fraction of the cost.", rating: 5 },
  { name: "Rajesh Kannan", type: "Apple Watch Battery Swap", text: "Excellent and honest service. They analyzed battery health analytics right in front of me, and swapped it with OEM parts. Highly recommended.", rating: 5 }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Form request submitted:", data);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-blue/10 selection:text-accent-blue">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-accent-blue" 
        style={{ scaleX }}
      />

      {/* Header / Sticky Glass Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 overflow-hidden rounded-full border border-black/5 p-1 bg-black flex items-center justify-center">
              <Image src="/logo.png" alt="iPhonix Logo" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-text-charcoal" : "text-white"
              }`}>
                iPhonix
              </span>
              <span className="text-[8px] tracking-widest text-text-muted uppercase font-bold">
                Apple & Multi-Brand Specialists
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className={`hidden md:flex items-center gap-10 text-sm font-semibold transition-colors duration-300 ${
            scrolled ? "text-text-charcoal" : "text-white/80"
          }`}>
            <a href="#services" className="hover:text-accent-blue transition-colors">Featured Repairs</a>
            <a href="#why-choose" className="hover:text-accent-blue transition-colors">Engineering Strengths</a>
            <a href="#categories" className="hover:text-accent-blue transition-colors">Categories</a>
            <a href="#reviews" className="hover:text-accent-blue transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-accent-blue transition-colors">Book Now</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className={`hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                scrolled 
                  ? "bg-accent-blue text-white hover:bg-accent-blue/90" 
                  : "bg-white text-text-charcoal hover:bg-white/95"
              }`}
            >
              Book Repair
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-text-charcoal" /> : <Menu className={`w-6 h-6 ${scrolled ? "text-text-charcoal" : "text-white"}`} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-black/5 px-6 py-8 flex flex-col gap-6 font-semibold shadow-lg text-text-charcoal"
            >
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-blue py-2">Featured Repairs</a>
              <a href="#why-choose" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-blue py-2">Engineering Strengths</a>
              <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-blue py-2">Categories</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-blue py-2">Reviews</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-blue py-2">Book Now</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
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
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center mt-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/90 mb-8 backdrop-blur-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
            <span className="font-bold tracking-wide uppercase">ISO Certified Lab Diagnostics</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-tight text-white mb-6"
          >
            iPhonix
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl font-semibold tracking-tight leading-relaxed mb-16"
          >
            Professional Mobile Repair & Premium Accessories
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-lg"
          >
            <a 
              href="#contact" 
              className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 transition-all duration-300"
            >
              Book Your Repair
            </a>
            <a 
              href="#services" 
              className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>

        </div>

      </section>

      {/* Featured Services Section (Redesigned Asymmetric Alternating Layout Blocks) */}
      <section id="services" className="relative z-10 w-full py-32 md:py-48 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="max-w-3xl mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-blue mb-4 block">
              Repair Capabilities
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-charcoal leading-none">
              Featured Repair Specialties
            </h2>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {CORE_SERVICES.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-16 md:gap-24`}
                >
                  
                  {/* Text Column */}
                  <div className="w-full md:w-1/2 flex flex-col items-start">
                    <div className="outline-icon-container mb-8">
                      <service.icon className={`w-20 h-20 ${service.color}`} />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-text-muted mb-2 block">
                      {service.tagline}
                    </span>
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-text-charcoal tracking-tight mb-6">
                      {service.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-8 max-w-xl text-sm sm:text-base">
                      {service.desc}
                    </p>
                    <Link 
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-blue hover:text-text-charcoal transition-colors duration-300"
                    >
                      Verify Calibration Process <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Visual Layout Column */}
                  <div className="w-full md:w-1/2 h-[340px] md:h-[440px] rounded-[36px] border border-black/5 relative overflow-hidden flex items-center justify-center bg-bg-gray">
                    <div className="absolute inset-0 glow-grid-light opacity-60" />
                    <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center gap-4">
                      <div className={`w-24 h-24 rounded-[28px] ${service.bgClass} flex items-center justify-center border border-black/5`}>
                        <service.icon className={`w-10 h-10 ${service.color}`} />
                      </div>
                      <span className="font-display text-sm font-bold uppercase tracking-wider text-text-muted">
                        iPhonix Lab Bench
                      </span>
                      <span className="text-2xl font-bold text-text-charcoal tracking-tight">
                        {service.visualText}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why Choose iPhonix (Light Grey Canvas + Asymmetric Cards) */}
      <section id="why-choose" className="relative z-10 w-full py-32 md:py-48 bg-bg-gray">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-blue mb-4 block">
              Core Standards
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-charcoal mb-6">
              Engineering Strengths
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We apply laboratory calibration and diagnostic standards to multi-brand devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ADVANTAGES.map((adv, idx) => {
              const isOffset = idx % 2 !== 0;
              return (
                <div 
                  key={idx}
                  className={`apple-card-light p-10 md:p-14 flex flex-col items-start ${
                    isOffset ? "md:translate-y-8" : ""
                  }`}
                >
                  <div className="outline-icon-container mb-8">
                    <adv.icon className="w-16 h-16 text-accent-blue" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text-charcoal mb-4">
                    {adv.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed max-w-md">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Repair Categories (Pro Black Canvas with Hover Glow) */}
      <section id="categories" className="relative z-10 w-full py-32 md:py-48 bg-bg-dark text-white">
        <div className="absolute inset-0 glow-grid-dark opacity-70" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="max-w-3xl mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-blue mb-4 block">
              Device Support
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
              Repair & Service Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {REPAIR_CATEGORIES.map((cat, idx) => (
              <Link 
                key={idx}
                href={`/services/${cat.slug}`}
                className="apple-card-dark p-10 md:p-14 flex flex-col justify-between group cursor-pointer hover:no-underline text-white"
              >
                <div className="flex items-start justify-between gap-6 mb-12">
                  <div className="outline-icon-container">
                    <cat.icon className="w-16 h-16 text-white group-hover:text-accent-blue transition-colors duration-300" />
                  </div>
                  <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-accent-blue group-hover:border-accent-blue transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Customer Reviews Section (Spacious Single Quote Layout) */}
      <section id="reviews" className="relative z-10 w-full py-32 md:py-48 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-blue mb-4 block">
              Verified Feedback
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-charcoal">
              Testimonials
            </h2>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              className="pb-24"
            >
              {REVIEWS.map((rev, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center text-center px-6 md:px-12">
                    <div className="flex gap-1 mb-8">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-charcoal leading-relaxed max-w-4xl mb-10 italic">
                      &ldquo;{rev.text}&rdquo;
                    </blockquote>
                    <cite className="not-italic flex flex-col items-center">
                      <span className="font-bold text-text-charcoal text-base">{rev.name}</span>
                      <span className="text-xs text-text-muted font-semibold mt-1">{rev.type}</span>
                    </cite>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* Contact & Booking Section (4-Column Action Grid & Form) */}
      <section id="contact" className="relative z-10 w-full py-32 md:py-48 bg-bg-gray">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-blue mb-4 block">
              Contact & Diagnostics
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text-charcoal mb-6">
              Connect With Us
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Use our booking pathways or contact channels for same-day repair slots.
            </p>
          </div>

          {/* 4-Column Core Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            
            <a 
              href="#booking-panel"
              className="apple-card-light p-8 flex flex-col items-center text-center group cursor-pointer hover:no-underline text-text-charcoal"
            >
              <div className="outline-icon-container mb-6 text-accent-blue">
                <Calendar className="w-16 h-16" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Book Online</h3>
              <span className="text-xs text-text-muted font-semibold">Priority Diagnostics Slot</span>
            </a>

            <a 
              href="https://wa.me/919962512345"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card-light p-8 flex flex-col items-center text-center group cursor-pointer hover:no-underline text-text-charcoal"
            >
              <div className="outline-icon-container mb-6 text-accent-green">
                <MessageCircle className="w-16 h-16" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">WhatsApp</h3>
              <span className="text-xs text-text-muted font-semibold">Chat Live with Engineers</span>
            </a>

            <a 
              href="tel:+919962512345"
              className="apple-card-light p-8 flex flex-col items-center text-center group cursor-pointer hover:no-underline text-text-charcoal"
            >
              <div className="outline-icon-container mb-6 text-accent-blue">
                <Phone className="w-16 h-16" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Call Direct</h3>
              <span className="text-xs text-text-muted font-semibold">+91 99625 12345</span>
            </a>

            <div className="apple-card-light p-8 flex flex-col items-center text-center group cursor-default text-text-charcoal">
              <div className="outline-icon-container mb-6 text-accent-blue">
                <MapPin className="w-16 h-16" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Our Store</h3>
              <span className="text-xs text-text-muted font-semibold">Pallikaranai, Chennai</span>
            </div>

          </div>

          {/* Interactive Form & Map Container */}
          <div id="booking-panel" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Booking Form */}
            <div className="apple-card-light p-10 md:p-12">
              <h3 className="font-display text-2xl font-bold text-text-charcoal mb-8">
                Diagnostics Slot Request
              </h3>

              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-accent-green" />
                  <h4 className="font-display text-lg font-bold text-text-charcoal">Slot Request Received</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you. A laboratory representative will contact you in 5 to 10 minutes to verify your model details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Verma" 
                      className="px-4 py-3.5 rounded-xl bg-bg-gray border border-black/5 text-sm focus:outline-none focus:border-accent-blue text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 99625 12345" 
                      className="px-4 py-3.5 rounded-xl bg-bg-gray border border-black/5 text-sm focus:outline-none focus:border-accent-blue text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. iPhone 15 Pro Max" 
                      className="px-4 py-3.5 rounded-xl bg-bg-gray border border-black/5 text-sm focus:outline-none focus:border-accent-blue text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("deviceModel", { required: "Device Model is required" })}
                    />
                    {errors.deviceModel && <span className="text-xs text-red-500">{errors.deviceModel.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Problem Description</label>
                    <textarea 
                      rows={3}
                      placeholder="Specify curved edges, battery degradation levels, or water contact durations." 
                      className="px-4 py-3.5 rounded-xl bg-bg-gray border border-black/5 text-sm focus:outline-none focus:border-accent-blue text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none"
                      {...register("problemDescription", { required: "Problem description is required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/95 transition-all duration-300"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>

            {/* Address Info & Map Embed */}
            <div className="flex flex-col gap-8 justify-between">
              
              <div className="apple-card-light p-10 md:p-12">
                <h3 className="font-display text-2xl font-bold text-text-charcoal mb-6">
                  Store Information
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  Visit our store near the Daikin Showroom on Velachery Main Road. Parking is available.
                </p>

                <div className="flex flex-col gap-4 text-xs font-semibold text-text-muted">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent-blue flex-shrink-0" />
                    <span>Velachery Main Road, Pallikaranai, Chennai - 600100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent-blue flex-shrink-0" />
                    <span>support@iphonix.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent-blue flex-shrink-0" />
                    <span>Monday – Sunday: 10:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="w-full h-[280px] rounded-[32px] border border-black/5 overflow-hidden relative shadow-sm">
                <iframe 
                  src="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Pallikaranai%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-80"
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
      <footer className="relative z-10 w-full bg-bg-dark text-white pt-24 pb-12 dark-mode-scrollbar">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border border-white/10 bg-black flex items-center justify-center p-1">
                  <Image src="/logo.png" alt="iPhonix Logo" width={24} height={24} className="object-contain" />
                </div>
                <span className="font-display text-lg font-bold text-white">iPhonix</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                iPhonix Apple Research and Professional Services Mobile & Service Centre is Chennai&apos;s leading premium repair workshop.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Services</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/50">
                <li><Link href="/services/screen-replacement" className="hover:text-accent-blue transition-colors">Screen Replacement</Link></li>
                <li><Link href="/services/battery-replacement" className="hover:text-accent-blue transition-colors">Battery Swap</Link></li>
                <li><Link href="/services/charging-port-repair" className="hover:text-accent-blue transition-colors">Motherboard Solder</Link></li>
                <li><Link href="/services/water-damage-repair" className="hover:text-accent-blue transition-colors">Water Damage Fixes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/50">
                <li><a href="#why-choose" className="hover:text-accent-blue transition-colors">Why iPhonix</a></li>
                <li><a href="#categories" className="hover:text-accent-blue transition-colors">Categories</a></li>
                <li><a href="#reviews" className="hover:text-accent-blue transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-accent-blue transition-colors">Book Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Location</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Velachery Main Road, Pallikaranai,<br/>
                Chennai - 600100 (Near Daikin Showroom)
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">
              © {new Date().getFullYear()} iPhonix. All rights reserved.
            </span>
            <div className="flex gap-6 text-xs text-white/50">
              <Link href="/" className="hover:text-accent-blue transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-accent-blue transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating CTA Call */}
      <a 
        href="tel:+919962512345"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-blue text-white shadow-xl hover:scale-105 transition-transform duration-300"
        title="Call Support"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating CTA WhatsApp */}
      <a 
        href="https://wa.me/919962512345"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-green text-white shadow-xl hover:scale-105 transition-transform duration-300"
        title="WhatsApp Live Chat"
      >
        <MessageCircle className="w-5 h-5 fill-white text-accent-green" />
      </a>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black/10 border border-black/5 hover:bg-black/20 text-text-charcoal backdrop-blur-sm transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
