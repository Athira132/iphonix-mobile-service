"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, ShieldCheck, Clock, Settings, Award, 
  CheckCircle2, Phone, MapPin, Mail, 
  Sparkles, ArrowRight, Star, Cpu, MessageCircle, 
  ArrowUp, Menu, X, Image as ImageIcon,
  Watch, ChevronDown
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

// Whitelabeled Repair Services List (12 items)
const SERVICES_DATA = [
  { title: "iPhone Repair", desc: "Face ID sensor alignment, logic board micro-soldering, casing repairs.", icon: Smartphone, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400" },
  { title: "Android Repair", desc: "Motherboard diagnostics and screen calibrations for Samsung and Pixel.", icon: Smartphone, img: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=400" },
  { title: "Display Replacement", desc: "TrueTone matched premium displays with high color accuracy layers.", icon: Sparkles, img: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=400" },
  { title: "Battery Replacement", desc: "OEM-grade battery cells with safety chips and capacity analytics.", icon: Cpu, img: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=400" },
  { title: "Camera Repair", desc: "Restore autofocus engines, OIS stabilizers, and cracked lens glass.", icon: Sparkles, img: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=400" },
  { title: "Charging Port Repair", desc: "Lightning and Type-C dock flex swaps for stable current flow.", icon: Settings, img: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=400" },
  { title: "Chip-Level Motherboard", desc: "IC replacements, board track jumps, and detailed short diagnostics.", icon: Cpu, img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=400" },
  { title: "Water Damage Repair", desc: "De-scaling board layers and ultrasonic cleaning under microscope benches.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=400" },
  { title: "Doorstep Mobile Repair", desc: "Schedule diagnostics and micro-repairs in our mobile diagnostic van.", icon: Clock, img: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=400" },
  { title: "Software Installation", desc: "OS restores, secure data backup solutions, and system upgrades.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=400" },
  { title: "Phone Unlocking", desc: "Network lock removals, carrier updates, and security recoveries.", icon: Settings, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400" },
  { title: "Accessories", desc: "Certified bis adapters, premium tempered shields, MagSafe components.", icon: Watch, img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400" }
];

const WHY_CHOOSE_US = [
  { title: "Certified Technicians", desc: "Experienced specialists trained in board diagnostics.", icon: Award },
  { title: "Premium Equipment", desc: "Ultrasonic cleaners and micro-soldering alignment scopes.", icon: Settings },
  { title: "Genuine Spare Parts", desc: "We utilize high-quality factory-grade components exclusively.", icon: ShieldCheck },
  { title: "Fast Delivery", desc: "Most screens, battery swaps, and docks are resolved in under 2 hours.", icon: Clock },
  { title: "Affordable Pricing", desc: "No hidden charges or diagnostic fees. Upfront calculations.", icon: CheckCircle2 },
  { title: "Repair Warranty", desc: "Every component is covered by up to 90 days of replacement warranty.", icon: ShieldCheck },
  { title: "Doorstep Service", desc: "On-site repairs or device pickup/delivery arrangements.", icon: MapPin },
  { title: "Trusted by Thousands", desc: "Highly rated in Chennai for visual device servicing.", icon: CheckCircle2 }
];

const FEATURED_REPAIRS = [
  { title: "iPhone Display Replacement", time: "45 mins", warranty: "90 Days", category: "iOS Display", img: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600" },
  { title: "Battery Replacement", time: "30 mins", warranty: "90 Days", category: "OEM Power", img: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600" },
  { title: "Charging Port Repair", time: "40 mins", warranty: "90 Days", category: "Connectivity", img: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600" },
  { title: "Motherboard Repair", time: "2-24 hours", warranty: "60 Days", category: "IC Solder", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600" },
  { title: "Back Glass Replacement", time: "3 hours", warranty: "90 Days", category: "Glass Fit", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" },
  { title: "Camera Lens Repair", time: "1 hour", warranty: "90 Days", category: "Optics Fit", img: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600" }
];

const BRANDS = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Google Pixel", "Motorola", "Nothing"];

const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800",
  "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800",
  "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800",
  "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800"
];

const FAQS = [
  { q: "Do you use original parts for repairs?", a: "We utilize premium factory-grade OEM replacement parts of the highest quality available in the market. Each part is thoroughly tested for performance before installation." },
  { q: "How long does a screen replacement take?", a: "Most screen replacements and battery swaps are completed on the same day within 45 to 90 minutes. Complex motherboard diagnostics may take 24 to 48 hours." },
  { q: "Is there a charge for diagnostics if I do not proceed?", a: "No. Our basic diagnosis and testing are completely free. You only pay for the actual repairs we perform after your approval." },
  { q: "Do you offer warranty support?", a: "Yes. Every display, battery, and logic board repair is backed by up to 90 days of complete replacement warranty for your peace of mind." }
];

const REVIEWS = [
  { name: "Aditya Verma", type: "iPhone 14 Pro Screen Replacement", text: "Truly Apple-level service! They mapped the serial chip data to the new screen, and TrueTone works perfectly. Replaced in under two hours while I waited in Pallikaranai.", rating: 5 },
  { name: "Priya Sundar", type: "MacBook Pro Motherboard Repair", text: "My MacBook had fluid contact and wouldn't start. Other shops insisted on a full logic board replacement. iPhonix repaired it at micro-level for a fraction of the cost.", rating: 5 },
  { name: "Rajesh Kannan", type: "Apple Watch Battery Swap", text: "Excellent and honest service. They analyzed battery health analytics right in front of me, and swapped it with OEM parts. Highly recommended.", rating: 5 }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sticky Bottom CTA state
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Before/After comparison slider position state
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Lightbox Modal state
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // FAQ state
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Form submission state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  useEffect(() => {
    // 1.5s Loading Animation
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowStickyCta(window.scrollY > 500);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

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
      
      {/* 1. Elegant Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark"
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-20 h-20 overflow-hidden rounded-full border border-white/10 p-1 bg-black flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={64} height={64} className="object-contain animate-pulse-slow" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-4">iPhonix</h2>
              <span className="text-[10px] tracking-widest text-text-muted uppercase font-bold">Diagnostics Lab Loading</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
        scrolled ? "glass-nav py-4 shadow-sm" : "bg-transparent py-6"
      }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 overflow-hidden rounded-full border border-black/5 p-1 bg-black flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-lg font-bold tracking-tight leading-none ${
                scrolled ? "text-text-charcoal" : "text-white"
              }`}>
                iPhonix
              </span>
              <span className="text-[7.5px] tracking-widest text-text-muted uppercase font-bold mt-1">
                MOBILE & SERVICE CENTRE
              </span>
            </div>
          </Link>

          <nav className={`hidden lg:flex items-center gap-8 text-xs uppercase tracking-wider font-bold transition-colors duration-300 ${
            scrolled ? "text-text-charcoal" : "text-white/80"
          }`}>
            <a href="#home" className="hover:text-accent-green transition-colors">Home</a>
            <a href="#services" className="hover:text-accent-green transition-colors">Services</a>
            <a href="#why-choose" className="hover:text-accent-green transition-colors">Why Us</a>
            <a href="#featured" className="hover:text-accent-green transition-colors">Repairs</a>
            <a href="#gallery" className="hover:text-accent-green transition-colors">Gallery</a>
            <a href="#about" className="hover:text-accent-green transition-colors">About</a>
            <a href="#testimonials" className="hover:text-accent-green transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-accent-green transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className={`hidden sm:inline-flex items-center justify-center px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                scrolled 
                  ? "bg-text-charcoal text-white hover:bg-accent-green" 
                  : "bg-white text-text-charcoal hover:bg-accent-green hover:text-white"
              }`}
            >
              Book Repair
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-black/5"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-text-charcoal" /> : <Menu className={`w-6 h-6 ${scrolled ? "text-text-charcoal" : "text-white"}`} />}
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
              className="absolute top-full left-0 right-0 bg-white border-b border-black/5 px-6 py-8 flex flex-col gap-4 font-bold text-xs uppercase tracking-wider text-text-charcoal shadow-lg"
            >
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Services</a>
              <a href="#why-choose" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Why Us</a>
              <a href="#featured" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Repairs</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Gallery</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">About</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Reviews</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent-green py-2">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center pt-16">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-none"
            >
              Professional Smartphone Repairs You Can Trust
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/80 max-w-2xl tracking-normal leading-relaxed mb-12"
            >
              Expert iPhone & Android Repairs with Genuine Parts, Chip-Level Expertise, Fast Turnaround & Doorstep Service.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-10 py-5 rounded-xl text-sm font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300"
              >
                Book Repair
              </a>
              <a 
                href="tel:7306243424" 
                className="inline-flex items-center justify-center px-10 py-5 rounded-xl text-sm font-bold uppercase tracking-wider bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Call Now
              </a>
            </motion.div>
          </div>

          {/* Hero Side Content: Floating Rectangular Glass Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md lg:max-w-none mx-auto">
            {[
              { title: "Genuine Spare Parts", desc: "Factory OEM grade components." },
              { title: "Same Day Repair", desc: "Most screens & battery updates in under 2 hours." },
              { title: "Doorstep Service Available", desc: "Mobile diagnostic technicians come to you." },
              { title: "Warranty Support", desc: "Backed by a 90-day comprehensive coverage." }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * idx + 0.4 }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-accent-green/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center text-accent-green font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h3>
                  <p className="text-xs text-white/60 mt-1">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 w-full py-32 md:py-48 bg-white border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-6 relative h-[360px] md:h-[500px] rounded-[32px] overflow-hidden border border-black/5 shadow-sm">
            <Image 
              src="https://i.ibb.co/pBGN8Nz1/Whats-App-Image-2026-07-14-at-4-01-58-PM.jpg" 
              alt="iPhonix Service Centre Storefront" 
              fill
              className="object-cover hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Content Right */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">
              About the Centre
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal leading-tight mb-8">
              About iPhonix Mobile Service Centre
            </h2>
            <p className="text-text-muted leading-relaxed text-sm md:text-base mb-8">
              iPhonix Mobile Service Centre is a trusted destination for professional smartphone repair solutions. With experienced technicians, advanced repair equipment, and genuine spare parts, we specialize in repairing iPhones and Android smartphones with precision and care. From minor issues to complex chip-level motherboard repairs, we are committed to delivering fast, reliable, and affordable services while ensuring complete customer satisfaction.
            </p>
            <div className="flex gap-4">
              <a 
                href="#services" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-green hover:text-text-charcoal transition-colors duration-300"
              >
                View Repair Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section (12-Card Grid Layout) */}
      <section id="services" className="relative z-10 w-full py-32 md:py-48 bg-bg-light-grey">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">
              Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal">
              Repair & Restoration Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES_DATA.map((service, idx) => (
              <div 
                key={idx}
                className="apple-card-light overflow-hidden flex flex-col h-full group"
              >
                <div className="relative h-48 w-full overflow-hidden border-b border-black/5">
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="outline-icon-container mb-6 text-accent-green">
                      <service.icon className="w-12 h-12" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-charcoal mb-3 group-hover:text-accent-green transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-8">
                      {service.desc}
                    </p>
                  </div>
                  <Link 
                    href={`/services/screen-replacement`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-green group-hover:text-text-charcoal transition-colors duration-300"
                  >
                    Explore Route <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us Section (8 Horizontal Cards) */}
      <section id="why-choose" className="relative z-10 w-full py-32 md:py-48 bg-white border-y border-black/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">
              Core Principles
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx}
                className="apple-card-light p-8 flex flex-col sm:flex-row items-start gap-6 cursor-default"
              >
                <div className="outline-icon-container text-accent-green flex-shrink-0">
                  <item.icon className="w-16 h-16" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-charcoal mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Statistics Counters & Brands We Repair */}
      <section className="relative z-10 w-full py-24 bg-bg-dark-grey text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col gap-24">
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "25,000+", label: "Devices Repaired" },
              { val: "12+", label: "Years of Experience" },
              { val: "98%", label: "Happy Customers" },
              { val: "99%", label: "Repair Success Rate" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-accent-green">{stat.val}</span>
                <span className="text-[10px] tracking-widest uppercase font-bold text-white/50">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Brands List */}
          <div className="border-t border-white/10 pt-16">
            <h3 className="text-center text-[10px] tracking-widest uppercase font-bold text-white/50 mb-8">
              Brands We Repair
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm font-bold text-white/70">
              {BRANDS.map((brand, idx) => (
                <span key={idx} className="hover:text-accent-green transition-colors duration-300">
                  {brand}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Repair Process Timeline (Diagnosis -> Delivery) */}
      <section className="relative z-10 w-full py-32 md:py-48 bg-white border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">
              Repair Pipeline
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal">
              Our Repair Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Diagnosis", desc: "Thorough testing of display, trace lines, and battery currents." },
              { step: "02", title: "Approval", desc: "Upfront pricing summary shared for customer check." },
              { step: "03", title: "Repair", desc: "Servicing done inside high-precision clean benches." },
              { step: "04", title: "Quality Check", desc: "Rigorous diagnostic verify tests post component fits." },
              { step: "05", title: "Delivery", desc: "Device handed back to customer with warranty card." }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="apple-card-light p-8 relative flex flex-col justify-between group hover:border-accent-green/20"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-xs font-bold text-accent-green font-display mb-6">
                    {item.step}
                  </div>
                  <h3 className="font-display text-base font-bold text-text-charcoal mb-2">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Repairs Section with Before/After Drag Slider */}
      <section id="featured" className="relative z-10 w-full py-32 md:py-48 bg-bg-light-grey">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">
              Showcase
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal mb-6">
              Featured Repairs
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Explore before/after comparison structures and estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Before/After Comparison Widget */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 block">
                Drag Slider to view screen repair
              </span>
              <div 
                ref={sliderRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-square rounded-[32px] border border-black/5 overflow-hidden cursor-ew-resize select-none shadow-md bg-white"
              >
                {/* After Image */}
                <Image 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" 
                  alt="After repair display" 
                  fill 
                  className="object-cover pointer-events-none" 
                />
                
                {/* Before Image Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-0 w-[500px] lg:w-[600px] aspect-square">
                    <Image 
                      src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800" 
                      alt="Before repair screen cracked" 
                      fill 
                      className="object-cover pointer-events-none filter saturate-50 contrast-125 brightness-75" 
                    />
                  </div>
                </div>

                {/* Handle bar */}
                <div 
                  className="comparison-slider-handle"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="comparison-slider-button">
                    ↔
                  </div>
                </div>
              </div>
            </div>

            {/* Featured repairs cards list */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {FEATURED_REPAIRS.map((repair, idx) => (
                <div 
                  key={idx}
                  className="apple-card-light p-6 overflow-hidden flex flex-col justify-between group cursor-default"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white px-2.5 py-1 rounded bg-bg-dark-grey">
                      {repair.category}
                    </span>
                    <span className="text-xs text-text-muted font-bold">
                      Warranty: {repair.warranty}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-charcoal mb-4 group-hover:text-accent-green transition-colors duration-300">
                    {repair.title}
                  </h3>
                  <div className="border-t border-black/5 pt-4 flex justify-between items-center text-xs font-semibold text-text-muted">
                    <span>Est. Time: {repair.time}</span>
                    <a href="#contact" className="text-accent-green hover:underline">Book &rarr;</a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Local Recognition Section (Newspaper design mockup) */}
      <section className="relative z-10 w-full py-32 md:py-48 bg-white border-b border-black/5">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          
          <div className="news-paper-block">
            <div className="news-paper-header">
              <span className="text-xs uppercase font-extrabold tracking-widest text-text-charcoal block mb-2">Daily Chronicle</span>
              <h2 className="text-4xl md:text-5xl font-black text-text-charcoal leading-none tracking-tight">
                Featured in Local News
              </h2>
            </div>
            
            <p className="font-serif text-sm sm:text-base leading-relaxed text-text-charcoal italic mb-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-accent-green">
              iPhonix Mobile Service Centre has gained local recognition for delivering trusted smartphone repair services. Our technicians demonstrate professional repair techniques using advanced tools, showcasing expertise in chip-level servicing, display replacement, battery replacement, charging repairs, and complete smartphone restoration. This recognition reflects our commitment to quality workmanship, customer satisfaction, and dependable mobile repair solutions.
            </p>
            <div className="border-t border-black/10 pt-4 flex justify-between items-center text-[10px] tracking-wider uppercase font-bold text-text-muted">
              <span>Local Service Spotlight</span>
              <span>Chennai Edition</span>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Section with Masonry & Lightbox Modal */}
      <section id="gallery" className="relative z-10 w-full py-32 md:py-48 bg-bg-light-grey">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal mb-6">
              Gallery Showcase
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Click on an image to view inside our premium modal slider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_PHOTOS.map((url, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveLightboxImage(url)}
                className="relative overflow-hidden rounded-[32px] border border-black/5 group aspect-video cursor-pointer shadow-sm bg-white"
              >
                <Image 
                  src={url} 
                  alt="Gallery repair snap" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          >
            <button 
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              title="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              <Image 
                src={activeLightboxImage} 
                alt="Enlarged gallery snap" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Slider */}
      <section id="testimonials" className="relative z-10 w-full py-32 md:py-48 bg-white border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">Testimonials</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal">
              What Customers Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6500 }}
              className="pb-20"
            >
              {REVIEWS.map((rev, idx) => (
                <SwiperSlide key={idx}>
                  <div className="apple-card-light p-10 md:p-14 relative flex flex-col items-center text-center">
                    <div className="flex gap-1 text-yellow-500 mb-6">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="font-display text-xl sm:text-2xl font-bold text-text-charcoal leading-relaxed max-w-3xl mb-8 italic">
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

      {/* FAQ Accordion Section */}
      <section className="relative z-10 w-full py-32 bg-bg-light-grey">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">FAQ</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-charcoal">Common Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                  <button 
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-display text-base font-bold text-text-charcoal pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-green" : ""}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[250px] border-t border-black/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <p className="px-8 py-6 text-sm text-text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Emergency Call Banner */}
      <section className="relative z-10 w-full py-16 bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <span className="text-[10px] tracking-widest uppercase font-bold text-white/70 block mb-1">Urgent Support</span>
            <h3 className="font-display text-2xl font-bold leading-none">Need immediate micro-soldering or liquid diagnostics?</h3>
          </div>
          <a 
            href="tel:7306243424"
            className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-red-600 hover:bg-white/95 transition-colors duration-300"
          >
            Call Hot-line: 7306243424
          </a>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="contact" className="relative z-10 w-full py-32 md:py-48 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-32">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">Get in Touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-charcoal leading-none mb-6">
              Book Your Repair Slot
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We respond to booking slots and diagnostics queries in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Details Left */}
            <div className="flex flex-col gap-8">
              <div className="apple-card-light p-10">
                <h3 className="font-display text-2xl font-bold text-text-charcoal mb-8">
                  Support Coordinates
                </h3>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Contact</h4>
                      <p className="text-sm font-bold text-text-charcoal mt-1">7306243424</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Email Queries</h4>
                      <p className="text-sm font-bold text-text-charcoal mt-1">iphonixmobileliveservicecentre@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent-green mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Address Location</h4>
                      <p className="text-sm font-bold text-text-charcoal mt-1 leading-relaxed">
                        Velachery Main Road, Pallikaranai, Chennai - 600100<br/>
                        (Next to Daikin Showroom)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="w-full h-[280px] rounded-[32px] overflow-hidden border border-black/5 relative shadow-sm">
                <iframe 
                  src="https://maps.google.com/maps?q=Iphonix%20Mobile%20Service%20Pallikaranai%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-90"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Booking Form Right */}
            <div className="apple-card-light p-10 md:p-12">
              <h3 className="font-display text-2xl font-bold text-text-charcoal mb-8">
                Request Diagnostics Slot
              </h3>

              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-text-charcoal">Slot Registered Successfully</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you! We have logged your device details. An engineer will follow up shortly to coordinate device diagnostics.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitBooking)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Verma" 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 73062 43424" 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. iPhone 15 Pro" 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("deviceModel", { required: "Model is required" })}
                    />
                    {errors.deviceModel && <span className="text-xs text-red-500">{errors.deviceModel.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Problem / Issue</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Flickering screen, charging loop error" 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("problemDescription", { required: "Issue is required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Preferred Date</label>
                    <input 
                      type="date" 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal transition-all duration-300"
                      {...register("preferredDate", { required: "Preferred Date is required" })}
                    />
                    {errors.preferredDate && <span className="text-xs text-red-500">{errors.preferredDate.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Additional Message</label>
                    <textarea 
                      rows={3} 
                      placeholder="Any specific requests or detail tags." 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none"
                      {...register("message")}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300"
                  >
                    Book My Repair
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Footer (Spacious Dark Theme) */}
      <footer className="relative z-10 w-full bg-bg-dark text-white pt-24 pb-12 dark-mode-scrollbar">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full border border-white/10 bg-black flex items-center justify-center p-1">
                  <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
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
                <li><a href="#services" className="hover:text-accent-green transition-colors">Services</a></li>
                <li><a href="#why-choose" className="hover:text-accent-green transition-colors">Why Choose Us</a></li>
                <li><a href="#featured" className="hover:text-accent-green transition-colors">Featured Repairs</a></li>
                <li><a href="#gallery" className="hover:text-accent-green transition-colors">Gallery</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Services</h4>
              <ul className="flex flex-col gap-3 text-xs text-white/50">
                <li><Link href="/services/screen-replacement" className="hover:text-accent-green transition-colors">Screen Replacement</Link></li>
                <li><Link href="/services/battery-replacement" className="hover:text-accent-green transition-colors">Battery Replacement</Link></li>
                <li><Link href="/services/charging-port-repair" className="hover:text-accent-green transition-colors">Port Repairs</Link></li>
                <li><Link href="/services/water-damage-repair" className="hover:text-accent-green transition-colors">Water damage recovery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-6">Store Location</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                iPhonix Mobile Service Centre<br/>
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
              <Link href="/" className="hover:text-accent-green transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-accent-green transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating CTA WhatsApp (Rectangular) */}
      <a 
        href="https://wa.me/917306243424"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-6 py-4.5 rounded-2xl bg-accent-green text-white shadow-xl hover:scale-103 transition-transform duration-300 font-bold text-xs uppercase tracking-wider"
        title="WhatsApp Chat"
      >
        <MessageCircle className="w-4 h-4 fill-white text-accent-green" /> WhatsApp
      </a>

      {/* Floating CTA Call (Rectangular) */}
      <a 
        href="tel:7306243424"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-4.5 rounded-2xl bg-text-charcoal text-white shadow-xl hover:scale-103 transition-transform duration-300 font-bold text-xs uppercase tracking-wider"
        title="Call Support"
      >
        <Phone className="w-4 h-4" /> Call: 7306243424
      </a>

      {/* Sticky bottom Book Repair CTA bar */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md p-4 rounded-2xl bg-bg-dark text-white flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-[9px] uppercase font-bold text-accent-green">Priority Service</span>
              <span className="text-xs font-bold leading-none">Fast diagnostics booking</span>
            </div>
            <a 
              href="#contact"
              className="px-6 py-3 rounded-xl bg-accent-green text-white text-xs font-bold uppercase tracking-wider"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-40 right-8 z-40 flex items-center justify-center w-10 h-10 rounded-xl bg-bg-light border border-black/5 hover:bg-bg-light-grey text-text-charcoal shadow-md backdrop-blur-sm transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
