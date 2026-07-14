"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Smartphone, Watch, Laptop, Tablet, ShieldCheck, Clock, 
  Settings, Award, CheckCircle2, ChevronDown, Phone, 
  MapPin, Mail, Calendar, Sparkles, ArrowRight, 
  Star, Cpu, MessageCircle, RefreshCw, X, ArrowUp
} from "lucide-react";

// Inline Instagram SVG component
const Instagram = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Form input types
type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
};

// Brand marquee list
const BRANDS = [
  "Apple", "Samsung", "OnePlus", "Google Pixel", "Xiaomi", 
  "Realme", "Oppo", "Vivo", "Nothing", "Motorola", "Asus"
];

// Services list
const SERVICES = [
  {
    title: "iPhone Screen Replacement",
    icon: Smartphone,
    desc: "Restore visual perfection. TrueTone compatibility and high-brightness original panels with warranty.",
    category: "iPhone"
  },
  {
    title: "Battery Replacement",
    icon: Cpu,
    desc: "Restore peak performance. High-capacity OEM batteries with health metrics reporting.",
    category: "Hardware"
  },
  {
    title: "Charging Port Repair",
    icon: Settings,
    desc: "Solve connection errors. Cleaning and replacement of Type-C and Lightning dock flexes.",
    category: "Hardware"
  },
  {
    title: "Face ID Repair",
    icon: ShieldCheck,
    desc: "Microelectronics logic board restoration for dot projectors and ambient light sensors.",
    category: "iPhone"
  },
  {
    title: "Camera Repair",
    icon: Sparkles,
    desc: "Blurry focus or sensor failures solved. Replacement of premium camera lenses and OIS modules.",
    category: "Hardware"
  },
  {
    title: "Speaker & Microphone Repair",
    icon: Award,
    desc: "Crystal-clear audio restoration. Cleaning blockages or replacing audio drivers.",
    category: "Hardware"
  },
  {
    title: "Water Damage Recovery",
    icon: RefreshCw,
    desc: "Advanced ultrasonic bath cleaning and board dehydration. High success recovery rates.",
    category: "Logic Board"
  },
  {
    title: "Back Glass Replacement",
    icon: Smartphone,
    desc: "Laser back glass removal for seamless fit and premium finish.",
    category: "iPhone"
  },
  {
    title: "Motherboard Chip-Level Repair",
    icon: Cpu,
    desc: "IC reballing, trace rebuilding, and capacitor diagnostics under stereo microscopes.",
    category: "Logic Board"
  },
  {
    title: "Software & iOS Issues",
    icon: ShieldCheck,
    desc: "Stuck on boot loops, bricked recovery, memory diagnostics, and firmware upgrades.",
    category: "Software"
  },
  {
    title: "Data Recovery",
    icon: CheckCircle2,
    desc: "Safely extract precious photos, messages, and document storage from dead devices.",
    category: "Software"
  },
  {
    title: "Apple Watch Repair",
    icon: Watch,
    desc: "Digitizer glass replacement, OLED fixes, and battery swaps for series 3 to Ultra.",
    category: "Wearables"
  },
  {
    title: "MacBook Repair",
    icon: Laptop,
    desc: "Keyboard replacements, display fixes, trackpad tuning, and SMC power supply repairs.",
    category: "MacBook"
  },
  {
    title: "iPad Repair",
    icon: Tablet,
    desc: "Laminated glass replacements, chassis straightening, and charging IC diagnostics.",
    category: "iPad"
  },
  {
    title: "Android Phone Repair",
    icon: Smartphone,
    desc: "Specialized diagnostics and repairs for Samsung Ultra, Google Pixel, and OnePlus flagships.",
    category: "Android"
  }
];

// Why Choose Us list
const ADVANTAGES = [
  { title: "Certified Technicians", desc: "Our experts hold certifications in microelectronics and Apple repairs.", icon: Award },
  { title: "Genuine Parts", desc: "We source high-grade original parts that guarantee long-term durability.", icon: ShieldCheck },
  { title: "Affordable Pricing", desc: "Get premium diagnostics and repairs at competitive, upfront rates.", icon: Settings },
  { title: "Warranty Support", desc: "Rest easy with up to 90 days of complete warranty on replacement components.", icon: ShieldCheck },
  { title: "Fast Delivery", desc: "Over 80% of diagnostic, screen, and battery repairs completed on the same day.", icon: Clock },
  { title: "Customer Satisfaction", desc: "Highly rated on local boards with a 98% positive verification index.", icon: Star },
  { title: "Modern Equipment", desc: "We utilize laser removers, advanced oscilloscopes, and thermal cameras.", icon: Cpu },
  { title: "Secure Data Handling", desc: "Privacy is paramount. We enforce strict data protection protocols.", icon: CheckCircle2 }
];

// Testimonials
const REVIEWS = [
  { name: "Aditya Verma", type: "iPhone 14 Pro Screen Replacement", text: "Incredibly professional service! The screen is original and looks beautiful, complete with TrueTone. Done in just 1.5 hours next to the Daikin showroom in Pallikaranai.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
  { name: "Priya Sundar", type: "MacBook Pro Motherboard Repair", text: "My MacBook had a liquid spill and wouldn't power on. Other service centers told me to replace the logic board. iPhonix fixed it at chip-level for a third of the cost. Highly recommended!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
  { name: "Rajesh Kannan", type: "Apple Watch Battery Swap", text: "Excellent and transparent pricing. They showed me the battery health analytics pre- and post-repair. Excellent after-sales support.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200" },
  { name: "Meera Nair", type: "Samsung S23 Ultra Camera Repair", text: "Fixed my focus issue. Extremely prompt response on WhatsApp, booked my slot, and they did same-day handback.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" }
];

// FAQs
const FAQS = [
  { q: "How long does repair take?", a: "Most diagnostic checks, screen replacements, and battery installations are completed within 1 to 2 hours. Complex motherboard repairs can take between 24 and 48 hours." },
  { q: "Do you provide warranty?", a: "Yes, we offer up to 90 days of comprehensive warranty on parts replaced. This warranty covers defect occurrences in visual, audio, or tactile feedback of parts." },
  { q: "Do you use genuine parts?", a: "We utilize original factory-grade OEM components which match original specifications perfectly. We test color balance, battery charge-discharge patterns, and touch sensitivity before installation." },
  { q: "Can I wait during repair?", a: "Yes, our comfortable glass-walled reception area allows you to watch our technicians work through our micro-repair stations, or wait while enjoying air-conditioned comfort." },
  { q: "Do you repair water-damaged phones?", a: "Yes, we perform ultrasonic cleaning of logic boards, strip corrosion under micro-inspection, and reflow logic traces. We recommend power-off immediately and bringing the device to us immediately." },
  { q: "Do you repair MacBooks?", a: "Absolutely. We repair all MacBook Air, Pro, and iMac models. Our board specialists fix power circuitry (SMC/T2 chips), backlight ICs, keyboard switches, and battery lines." },
  { q: "Do you repair Apple Watch?", a: "Yes, we perform glass-only restoration, digitizer laminations, power controller diagnostics, and battery replacements on Apple Watch series and Ultra models." }
];

// Gallery Images
const GALLERY = [
  { title: "Laser Glass Stripping", category: "iPhone Repair", url: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600" },
  { title: "Chip Reflow Station", category: "Board Diagnostics", url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600" },
  { title: "Apple Watch Digitizer Lamination", category: "Wearables", url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600" },
  { title: "Ultrasonic Corrosion Bath", category: "Water Recovery", url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600" },
  { title: "Precision Screwdriver assembly", category: "Assembly", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600" },
  { title: "Finished TrueTone Testing", category: "Quality Assurance", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" }
];

export default function Home() {
  // Navigation & Scroll states
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Before/After comparison state
  const [sliderPosition, setSliderPosition] = useState(50);
  const beforeAfterRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(768);

  useEffect(() => {
    if (beforeAfterRef.current) {
      setContainerWidth(beforeAfterRef.current.getBoundingClientRect().width);
    }
    const handleResize = () => {
      if (beforeAfterRef.current) {
        setContainerWidth(beforeAfterRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Form states
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  // Mouse Glow coordinates
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);

      // Section tracking
      const sections = ["hero", "about", "services", "process", "gallery", "faq", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
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

  const handleSliderMove = (clientX: number) => {
    if (!beforeAfterRef.current) return;
    const rect = beforeAfterRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
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
    <div className="relative w-full glow-grid overflow-hidden bg-bg-primary text-white" onMouseMove={handleMouseMove} onMouseEnter={() => setShowGlow(true)} onMouseLeave={() => setShowGlow(false)}>
      
      {/* Dynamic Mouse Glow Highlight (Tesla/Nothing inspired) */}
      {showGlow && (
        <div 
          className="pointer-events-none absolute z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/4 blur-[120px] transition-all duration-100 ease-out"
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        />
      )}

      {/* Scroll Progress Indicator (Apple/Linear inspired) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent-blue to-accent-green" 
        style={{ scaleX }}
      />

      {/* 1. Header & Navigation (Apple glassmorphic layout) */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
        scrolled ? "bg-bg-primary/70 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["about", "services", "process", "gallery", "faq", "contact"].map((section) => (
              <a 
                key={section} 
                href={`#${section}`} 
                className={`capitalize transition-colors duration-300 hover:text-accent-blue ${
                  activeSection === section ? "text-accent-blue font-semibold" : "text-text-muted"
                }`}
              >
                {section}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-blue hover:bg-accent-blue/90 border border-accent-blue transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,132,255,0.4)]"
            >
              Book Now
            </a>
            
            {/* Direct WhatsApp Call link in header */}
            <a
              href="https://wa.me/919962512345?text=Hi%20iPhonix%2C%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20device."
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

      {/* 2. Hero Section (Cinematic repair background video loop + overlay) */}
      <section id="hero" className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        
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
          {/* Custom cinematic dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/45" />
          <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.85) 80%)" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center mt-8">
          
          {/* Interactive Floating Badge (Stripe-inspired) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="font-medium tracking-wide">ISO Certified Premium Repair Experts</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-blue" />
          </motion.div>

          {/* Space Grotesk Heading (Apple/Nothing style) */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
          >
            Premium Mobile Repair.<br/>
            <span className="text-gradient-blue">Fast.</span>{" "}
            <span className="text-gradient-silver">Reliable.</span>{" "}
            <span className="text-gradient-green">Trusted.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl font-normal leading-relaxed mb-10"
          >
            Repairs for iPhone, iPad, Watch, MacBook, and premium Android devices using high-quality parts and expert micro-technicians in Pallikaranai, Chennai.
          </motion.p>

          {/* Action CTAs (Magnetic hover layout mockup) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,132,255,0.4)]"
            >
              Book a Repair
            </a>
            <a 
              href="https://wa.me/919962512345?text=Hi%20iPhonix%2C%20I%20would%20like%20to%20get%20support%20for%20my%20broken%20device."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-white/5 border border-white/10 hover:border-accent-green hover:bg-accent-green/5 hover:text-accent-green transition-all duration-300"
            >
              Get WhatsApp Support
            </a>
          </motion.div>

          {/* Floating Device Cards Grid (Micro-Animated) */}
          <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { name: "iPhone Repair", desc: "TrueTone & FaceID Restoration", icon: Smartphone, delay: 0.1 },
              { name: "MacBook Repair", desc: "Chip-Level power & keyboard fixes", icon: Laptop, delay: 0.2 },
              { name: "iPad Repair", desc: "OLED displays & digitizer panels", icon: Tablet, delay: 0.3 },
              { name: "Wearables & Watch", desc: "Screen overlays & battery swap", icon: Watch, delay: 0.4 }
            ].map((device, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: device.delay, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="glass-panel p-6 flex flex-col items-center justify-center text-center cursor-default group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all duration-300">
                  <device.icon className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors duration-300" />
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-1 group-hover:text-accent-blue transition-colors duration-300">
                  {device.name}
                </h3>
                <p className="text-xs text-text-muted">
                  {device.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </section>

      {/* 3. Trust Bar (Framer reveals) */}
      <section className="relative z-10 w-full border-y border-white/5 bg-bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { label: "Same-Day Repairs", desc: "80% screen & battery tasks", icon: Clock },
              { label: "Genuine Quality", desc: "High-grade OEM spares", icon: ShieldCheck },
              { label: "Warranty Support", desc: "Up to 90 days guarantee", icon: Award },
              { label: "Certified Experts", desc: "Microelectronics trained", icon: Cpu },
              { label: "Free Diagnostics", desc: "No charge device scanning", icon: Settings },
              { label: "Transparent Rates", desc: "Upfront pricing charts", icon: CheckCircle2 }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center md:items-start md:text-left gap-2 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-blue/30 group-hover:bg-accent-blue/5 transition-all duration-300">
                  <item.icon className="w-4 h-4 text-accent-blue" />
                </div>
                <span className="font-display text-xs font-bold text-white group-hover:text-accent-blue transition-colors duration-300">
                  {item.label}
                </span>
                <span className="text-[10px] text-text-muted">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Section (Split layout with premium aesthetics) */}
      <section id="about" className="relative z-10 w-full py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - Glass Card features */}
            <div className="flex flex-col">
              <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3">
                Precision Craftsmanship
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Redefining Micro-Electronics Repair Services.
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                iPhonix was established to deliver state-of-the-art service quality that mirrors an official service lab. We bypass standard quick-fix setups to provide micro-soldering, trace rebuilding, and precision laminations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Experienced micro-technicians",
                  "Genuine replacement parts",
                  "Fast diagnostic turnaround",
                  "Customer satisfaction guarantee",
                  "Laser back glass stripping",
                  "Ultrasonic liquid diagnostics"
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                    <span className="text-sm font-medium text-white/95">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Company Identity Seal box (from company_name.png) */}
              <div className="glass-panel p-6 mt-10 flex items-start gap-4">
                <div className="relative w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-1">
                  <Image src="/logo.png" alt="Seal logo" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-accent-blue tracking-wide uppercase mb-1">
                    Official Brand Identity
                  </h4>
                  <p className="text-xs font-medium text-white">
                    iPhonix Apple Research and Professional Services
                  </p>
                  <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest">
                    Mobile & Service Centre • Pallikaranai, Chennai
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Large Workshop Image with hover tilt and overlay */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=800" 
                alt="iPhonix Repair Station" 
                className="w-full h-[500px] object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay Glass Card stats */}
              <div className="absolute bottom-6 left-6 right-6 z-20 glass-panel p-6 border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Advanced Labs</h3>
                    <p className="text-xs text-text-muted">Class-100 Cleanroom inspection tools</p>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-bold text-accent-blue">
                    Ready
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Services Section (15 Apple-inspired grid cards) */}
      <section id="services" className="relative z-10 w-full py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Repair Capabilities
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Professional Services
            </h2>
            <p className="text-text-muted leading-relaxed text-sm md:text-base">
              From screen laminations to deep logic board micro-soldering, choose our targeted repair solutions built to restore full factory specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <div 
                key={index}
                className="glass-panel glass-panel-hover p-6 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-text-muted group-hover:text-accent-blue transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-text-muted">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-accent-blue hover:text-white transition-colors duration-300"
                >
                  Book Service <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Repair Process Timeline */}
      <section id="process" className="relative z-10 w-full py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Repair Journey
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              How We Repair Your Device
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We operate on a transparent, 4-step professional pipeline to ensure absolute data security, speed, and validation.
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            {/* Connecting Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-accent-blue/10 via-accent-blue/40 to-accent-green/10 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Book Service", desc: "Schedule online or start a WhatsApp ticket. Same-day drop slots allocated." },
                { step: "02", title: "Inspection", desc: "Class-100 bench diagnostic check with full trace power consumption report." },
                { step: "03", title: "Professional Repair", desc: "Microelectronics soldering, laser back glass, or OLED lamination." },
                { step: "04", title: "Warranty Handover", desc: "Full post-repair calibration testing and 90-day warranty card issuance." }
              ].map((proc, index) => (
                <div key={index} className="relative z-10 glass-panel p-6 flex flex-col items-start gap-4 hover:border-accent-blue/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-sm font-bold text-accent-blue font-display">
                    {proc.step}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white mb-2">{proc.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed">{proc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Why Choose Us Grid */}
      <section className="relative z-10 w-full py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Core Strengths
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Why Choose iPhonix?
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We stand apart from the local store standard. Here is why premium device owners trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, index) => (
              <div 
                key={index}
                className="glass-panel p-6 hover:border-white/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <adv.icon className="w-5 h-5 text-accent-blue" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Statistics Section (Counters) */}
      <section className="relative z-10 w-full py-16 bg-bg-primary border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1000+", label: "Happy Customers" },
              { value: "2500+", label: "Devices Repaired" },
              { value: "98%", label: "Satisfaction Index" },
              { value: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="font-display text-3xl sm:text-5xl font-bold text-accent-blue tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-widest text-text-muted font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Brand marquee slider */}
      <section className="relative z-10 w-full py-12 bg-bg-secondary overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 mb-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
            Supported Device Brands
          </span>
        </div>
        
        {/* Infinite Moving Marquee */}
        <div className="flex w-[200%] overflow-hidden relative">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-2">
            {BRANDS.concat(BRANDS).map((brand, idx) => (
              <span 
                key={idx} 
                className="font-display text-xl sm:text-3xl font-bold tracking-tight text-white/20 hover:text-accent-blue transition-colors duration-300 cursor-default px-4"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Before & After Gallery (Interactive Slider & Masonry) */}
      <section id="gallery" className="relative z-10 w-full py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Proof in Craftsmanship
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Before & After Repair Gallery
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Use the interactive slider to see how we restore heavily damaged devices to like-new condition.
            </p>
          </div>

          {/* Interactive Before/After Screen Slider */}
          <div className="w-full max-w-3xl mx-auto mb-16">
            <div 
              ref={beforeAfterRef}
              className="relative w-full h-[380px] rounded-2xl border border-white/10 overflow-hidden cursor-ew-resize select-none"
              onMouseMove={(e) => handleSliderMove(e.clientX)}
              onTouchMove={handleTouchMove}
            >
              {/* After: Repaired State (Right Side underneath) */}
              <div className="absolute inset-0 w-full h-full bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" 
                  alt="Repaired Screen State" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded bg-accent-green/80 text-[10px] font-bold tracking-wide uppercase text-white">
                  After iPhonix
                </div>
              </div>

              {/* Before: Cracked State (Left Side Overlay) */}
              <div 
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-accent-blue z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* Keep image width fixed at full container width so clipping works */}
                <div className="absolute inset-0 w-full h-full" style={{ width: containerWidth }}>
                  <img 
                    src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800" 
                    alt="Cracked Screen State" 
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
                <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded bg-red-600/80 text-[10px] font-bold tracking-wide uppercase text-white">
                  Before Repair
                </div>
              </div>

              {/* Drag Handle Indicator */}
              <div 
                className="absolute top-0 bottom-0 z-20 w-8 h-8 -ml-4 bg-accent-blue border border-white rounded-full flex items-center justify-center shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%`, top: "50%", transform: "translateY(-50%)" }}
              >
                <div className="flex gap-0.5 items-center">
                  <span className="block w-0.5 h-3 bg-white" />
                  <span className="block w-0.5 h-3 bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Masonry Image Gallery (Lightbox trigger) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY.map((img, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-xl border border-white/10 group cursor-pointer aspect-video"
                onClick={() => setLightboxImage(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-accent-blue mb-1">
                    {img.category}
                  </span>
                  <h4 className="font-display text-sm font-bold text-white">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            >
              <button 
                className="absolute top-6 right-6 text-white/60 hover:text-white w-10 h-10 flex items-center justify-center"
                onClick={() => setLightboxImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
                <img 
                  src={lightboxImage} 
                  alt="Enlarged Gallery Work" 
                  className="object-contain max-w-full max-h-full rounded-lg"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 11. Customer Reviews Swiper */}
      <section className="relative z-10 w-full py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Social Proof
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We pride ourselves on our 5.0 Google ratings. See what our customers say about their repair experience.
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
                  <div className="glass-panel p-8 md:p-12 border-white/5 relative">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <img 
                          src={rev.avatar} 
                          alt={rev.name} 
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
                    <p className="text-sm md:text-base text-white/90 leading-relaxed italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* 12. Instagram reel section */}
      <section className="relative z-10 w-full py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Instagram className="w-10 h-10 text-accent-blue mx-auto mb-4" />
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Follow Us on Instagram
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              @iphonix_mobile_service
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              We update our feed with cool macro microelectronics repairs, diagnostic reels, and customer collections daily.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { type: "Reel", desc: "Liquid water damage cleaning", url: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=400" },
              { type: "Video", desc: "Laser glass removing iPhone 13 Pro", url: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=400" },
              { type: "Post", desc: "Happy customer delivery iPhone 15 Pro", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400" },
              { type: "Reel", desc: "IC micro soldering diagnostic reflow", url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=400" }
            ].map((post, idx) => (
              <a 
                key={idx}
                href="https://www.instagram.com/iphonix_mobile_service"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-xl border border-white/10 aspect-square group"
              >
                <img src={post.url} alt={post.desc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2">
                  <Instagram className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue">{post.type}</span>
                  <p className="text-[11px] text-center px-4 text-white/80">{post.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="https://www.instagram.com/iphonix_mobile_service" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:border-accent-blue hover:text-accent-blue transition-colors duration-300"
            >
              Follow on Instagram
            </a>
          </div>

        </div>
      </section>

      {/* 13. FAQ Accordion */}
      <section id="faq" className="relative z-10 w-full py-24 md:py-32 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Common Inquiries
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="glass-panel border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-blue" : ""}`} />
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="px-6 py-5 text-xs sm:text-sm text-text-muted leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 14. Contact Section (Embedded map, Form) */}
      <section id="contact" className="relative z-10 w-full py-24 md:py-32 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-semibold tracking-widest text-accent-blue mb-3 block">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Book a Service & Repair
            </h2>
            <p className="text-text-muted leading-relaxed text-sm">
              Use our booking form for priority diagnostics, or drop by our showroom. We respond within minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column: Form & Booking state */}
            <div className="glass-panel p-8 border-white/5">
              <h3 className="font-display text-xl font-bold text-white mb-6">
                Service Booking Form
              </h3>

              {bookingSuccess ? (
                <div className="w-full py-12 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-xl">
                  <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
                  <h4 className="font-display text-base font-bold text-white">Booking Request Successful</h4>
                  <p className="text-xs text-text-muted max-w-xs">
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
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 border border-accent-blue hover:shadow-lg transition-all duration-300"
                  >
                    Book Repair
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Google Maps Embed & info cards */}
            <div className="flex flex-col gap-8 justify-between">
              
              <div className="glass-panel p-8 border-white/5">
                <h3 className="font-display text-xl font-bold text-white mb-6">
                  Store Contact Info
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Our Address</h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        iPhonix Mobile Service, Velachery Main Road, Pallikaranai, Chennai - 600100<br/>
                        (Next to Daikin Showroom)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Call Support</h4>
                      <p className="text-xs text-text-muted">
                        +91 99625 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Email Us</h4>
                      <p className="text-xs text-text-muted">
                        support@iphonix.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Store Hours</h4>
                      <p className="text-xs text-text-muted">
                        Monday – Sunday: 10:00 AM – 10:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed iframe */}
              <div className="w-full h-[280px] rounded-2xl border border-white/10 overflow-hidden relative">
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

      {/* 15. Premium Dark Footer */}
      <footer className="relative z-10 w-full bg-bg-secondary border-t border-white/5 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Col 1: Brand & Logo */}
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

            {/* Col 2: Services links */}
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-text-muted">
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Screen Replacement</a></li>
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Battery Swap</a></li>
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Motherboard Repairs</a></li>
                <li><a href="#services" className="hover:text-accent-blue transition-colors">Water Damage Fixes</a></li>
              </ul>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-text-muted">
                <li><a href="#about" className="hover:text-accent-blue transition-colors">About Our Labs</a></li>
                <li><a href="#process" className="hover:text-accent-blue transition-colors">Repair Pipeline</a></li>
                <li><a href="#gallery" className="hover:text-accent-blue transition-colors">Before & After</a></li>
                <li><a href="#faq" className="hover:text-accent-blue transition-colors">Common FAQs</a></li>
              </ul>
            </div>

            {/* Col 4: Business Hours */}
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
              <a href="#privacy" className="hover:text-accent-blue transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent-blue transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call CTA (Bottom-Right) */}
      <a 
        href="tel:+919962512345"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-blue text-white shadow-[0_4px_20px_rgba(10,132,255,0.4)] hover:scale-105 hover:bg-accent-blue/95 transition-all duration-300 animate-pulse-slow"
        title="Call Support Now"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Floating WhatsApp CTA (Bottom-Left) */}
      <a 
        href="https://wa.me/919962512345?text=Hi%20iPhonix%2C%20I%20would%20like%20to%20get%20support%20for%20my%20broken%20device."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-green text-white shadow-[0_4px_20px_rgba(48,209,88,0.4)] hover:scale-105 hover:bg-accent-green/95 transition-all duration-300 animate-pulse-slow"
        title="WhatsApp Live Chat"
      >
        <MessageCircle className="w-6 h-6 fill-white text-accent-green" />
      </a>

      {/* Floating Back to Top Button */}
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
