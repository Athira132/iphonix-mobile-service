"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  Smartphone, ShieldCheck, Clock, Settings, 
  Phone, Sparkles, ArrowRight, Cpu, 
  MessageCircle, Watch, CheckCircle2
} from "lucide-react";

type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
  preferredDate: string;
  message: string;
};

// Services dynamic data map handling exactly 11 items
const SERVICES_DATA: Record<string, {
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  faqs: { q: string; a: string }[];
  image: string;
  highlights: string[];
}> = {
  "iphone-repair": {
    title: "iPhone Repair",
    tagline: "Apple Micro-Soldering & Calibrations Specialists",
    desc: "Complete repair catalog for iPhone. We specialize in Face ID components, TrueTone matching, micro-soldering logic boards, and camera screen restorations.",
    icon: Smartphone,
    faqs: [
      { q: "Are your technicians certified for iOS devices?", a: "Our team consists of specialists trained in Apple board-level logic repair, including chip reballing, micro-welding, and component swaps." },
      { q: "Do you repair bent iPhone frames?", a: "Yes. We can safely transfer your components into a new original chassis or straighten minor chassis bends." }
    ],
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800",
    highlights: [
      "Face ID sensor calibration alignment",
      "Logic board micro-soldering component restoration",
      "TrueTone serialization chip transfers",
      "Chassis alignment & premium screen swap bays"
    ]
  },
  "android-repair": {
    title: "Android Flagship Repair",
    tagline: "Samsung, Pixel, and OnePlus Experts",
    desc: "Dedicated service bay for Android flagships. We perform display swaps, motherboard diagnoses, back glass repairs, and high-capacity battery installations.",
    icon: Smartphone,
    faqs: [
      { q: "Do you repair curved OLED screens?", a: "Yes, we are equipped with specialized vacuum frame separators and UV alignment tools for Samsung and OnePlus curved OLED displays." },
      { q: "Can you fix motherboard errors on OnePlus or Google Pixel?", a: "Yes, we troubleshoot logic loop errors and power management IC failures on Android board layers." }
    ],
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800",
    highlights: [
      "Curved OLED panel replacement tools",
      "Samsung and Pixel factory-grade screen calibrations",
      "Charging flex board trace jump operations",
      "Back glass laser separator overlays"
    ]
  },
  "display-replacement": {
    title: "Display Replacement",
    tagline: "TrueTone Matched Display Restoration",
    desc: "We replace cracked glass and failed OLED panels on iPhones and premium Android flagships. All replacements maintain original refresh rates, active color values, and Touch ID / Face ID calibrations.",
    icon: Sparkles,
    faqs: [
      { q: "Do you maintain TrueTone after replacement?", a: "Yes. We copy the screen serial data from your original screen controller to the replacement panel using advanced programmer blocks. This preserves Apple TrueTone functionality." },
      { q: "How long does a screen replacement take?", a: "Typically 1 to 2 hours. We perform frame cleaning, gasket alignment, and lamination testing before handback." }
    ],
    image: "https://images.unsplash.com/photo-1580983218765-f663becf4859?q=80&w=800",
    highlights: [
      "Serial chip programming for Apple TrueTone",
      "Zero dead pixel quality checkpoints",
      "Gorilla Glass Victus overlay matches",
      "Frame cleanup, gasket alignment, water seal tapes"
    ]
  },
  "battery-replacement": {
    title: "Battery Replacement",
    tagline: "Original Capacity Power Restoration",
    desc: "Solve quick draining, shut-offs, and performance throttling. We swap degraded batteries with original OEM cells, preserving battery safety chips.",
    icon: Cpu,
    faqs: [
      { q: "Will my iPhone show battery health after swap?", a: "For newer iPhone models, a message may display in settings unless the original battery controller board is micro-welded onto the new cells. We offer both standard and premium chip-transfer options." },
      { q: "How do I know my battery needs replacement?", a: "If your battery health is below 80% or if your device shuts down unexpectedly in low charge, it is time for a replacement." }
    ],
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800",
    highlights: [
      "High capacity battery cells (zero cycle status)",
      "Battery health calibrations & cycle counts reset",
      "Overcharge safety protection controllers",
      "Micro-welding battery controller boards"
    ]
  },
  "camera-repair": {
    title: "Camera Repair",
    tagline: "Precision Lens & Stabilizer Alignment",
    desc: "Solve camera focus errors, lens cracks, and sensor shake issues. We install brand-new camera modules and outer glass overlays.",
    icon: Sparkles,
    faqs: [
      { q: "Can you fix a cracked camera glass without replacing the whole camera?", a: "Yes. If the underlying camera sensor is scratch-free and focuses properly, we can replace just the external glass ring." },
      { q: "Why is my camera shaking or making buzzing noises?", a: "This indicates a failure in the Optical Image Stabilization (OIS) gyro motors, usually caused by heavy vibrations (e.g. motorcycle mounts)." }
    ],
    image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=800",
    highlights: [
      "Optical Image Stabilization (OIS) calibrations",
      "Scratch-resistant sapphire camera glass plates",
      "Multi-focus lens system replacements",
      "Under-microscope dust cleaning checkpoints"
    ]
  },
  "charging-port-repair": {
    title: "Charging Port Repair",
    tagline: "Stable Power Connection Calibration",
    desc: "We diagnose loose connections, slow charging, and failed data synchronization. We clean dust packings or replace complete sub-charging flex boards.",
    icon: Settings,
    faqs: [
      { q: "Do you clean charging ports or replace them?", a: "We first perform precision cleaning under microscopes. If contacts are corroded or worn, we replace the charging port flex board." },
      { q: "Why is my phone charging very slowly?", a: "This can be caused by dirt buildup in the port, a faulty charging adapter, or a degraded dock connector pins." }
    ],
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=800",
    highlights: [
      "Type-C & Lightning connector replacements",
      "Fast charging protocol diagnostics",
      "Microscope-level pin trace repair checks",
      "Gasket replacements to maintain dust protection"
    ]
  },
  "water-damage-repair": {
    title: "Water Damage Recovery",
    tagline: "Corrosion Descaling & Circuit Diagnostics",
    desc: "Advanced ultrasonic descaling, board dehydration, and microchip-level reflows to restore water-damaged components.",
    icon: ShieldCheck,
    faqs: [
      { q: "What should I do if my phone falls in water?", a: "Power off the device immediately. Do not charge it. Bring it to our service center as fast as possible to avoid logic board corrosion." },
      { q: "Can you recover data from a dead water-damaged phone?", a: "Yes. Even if the device cannot be fully repaired, we can often temporarily bridge board lines to extract your data." }
    ],
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800",
    highlights: [
      "Ultrasonic descaling clean chambers",
      "Moisture extraction & board dehydration ovens",
      "Micro-soldering jump lines for damaged tracks",
      "IC chip reflow operations"
    ]
  },
  "motherboard-repair": {
    title: "Motherboard Repair",
    tagline: "Logic Board Micro-Soldering & IC Chips",
    desc: "Diagnostics and replacements for short circuits, power management IC failures, network loop faults, and micro-track repairs under clean microscope benches.",
    icon: Cpu,
    faqs: [
      { q: "How long does a complex motherboard repair take?", a: "Normally 24 to 48 hours depending on line tracing complexity and replacement chip availability." },
      { q: "What is your success rate on motherboard repairs?", a: "We successfully restore over 95% of dead boards, excluding those with severe multi-layer fractures or extensive water corrosion." }
    ],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800",
    highlights: [
      "Power Management IC (PMIC) replacements",
      "Multi-layer board track micro-jumper traces",
      "BGA chip reballing operations",
      "Detailed short circuit thermal diagnostics checks"
    ]
  },
  "software-solutions": {
    title: "Software Solutions",
    tagline: "Firmware Loop & Data Recovery bay",
    desc: "Diagnostics for bricked devices, boot loop screen freezes, storage overflow issues, and system upgrades.",
    icon: ShieldCheck,
    faqs: [
      { q: "Will I lose my data during software restore?", a: "We prioritize data retention. We attempt diagnostic boot recoveries first. If formatting is required, we request client approval." },
      { q: "Can you resolve devices stuck on the Apple logo?", a: "Yes. This is often caused by system storage overflow or firmware corruption, which we resolve using specialized diagnostic interfaces." }
    ],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800",
    highlights: [
      "Firmware flashes & loop recoveries",
      "Data extraction from damaged memory blocks",
      "Boot loop diagnostics & OS restorations",
      "System storage clearance & cleanup options"
    ]
  },
  "mobile-accessories": {
    title: "Mobile Accessories",
    tagline: "Luxury Protection & Certified Power Supplies",
    desc: "Explore our collection of protective layers, MagSafe chargers, high-frequency connectors, and luxury watch straps available at our Karamana store.",
    icon: Watch,
    faqs: [
      { q: "Do you sell screen protection overlays?", a: "Yes. We offer high-impact tempered glass, matte anti-glare screen protectors, and privacy panels with layout alignment assistance." },
      { q: "Are your adapters certified safe?", a: "All power supplies and cables are fully certified (BIS/CE) to ensure stable current flow without heating your phone's PMIC controller." }
    ],
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800",
    highlights: [
      "High-impact 9H tempered glass screen overlays",
      "BIS certified charging docks & MagSafe bricks",
      "Premium watch straps & protective frame shells",
      "Smart layout alignment assistance in-store"
    ]
  },
  "doorstep-mobile-repair": {
    title: "Doorstep Mobile Repair",
    tagline: "Convenient On-Site Mobile Diagnostics",
    desc: "We bring our professional tools and technicians straight to your home or office, resolving issues on the spot.",
    icon: Clock,
    faqs: [
      { q: "Which areas do you cover for doorstep service?", a: "We cover all major locations in Trivandrum. Contact us to verify coverage at your home or office." },
      { q: "Is doorstep service more expensive?", a: "We charge a minimal convenience fee for diagnostics at your location. The repair costs remain standard." }
    ],
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=800",
    highlights: [
      "On-site repair diagnostics & replacements",
      "Secure handling with anti-static toolsets",
      "Convenient home & office repair appointments",
      "Trained technicians at your doorstep"
    ]
  }
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const data = SERVICES_DATA[slug] || SERVICES_DATA["display-replacement"];
  
  const [scrolled, setScrolled] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookingSubmit = (formData: BookingFormData) => {
    console.log(`Booking for ${data.title} received:`, formData);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-accent-green" />

      {/* Header (Clean branding, circle logo, returning home link, no UI ornaments) */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 h-28 flex items-center ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}>
        <div className="mx-auto w-full max-w-[1440px] px-8 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            {/* Perfect circular cropped container */}
            <div className="relative w-14 h-14 rounded-full border-2 border-white shadow bg-black overflow-hidden flex items-center justify-center p-0.5">
              <Image src="/logo.png" alt="Logo" width={56} height={56} className="rounded-full object-cover w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-extrabold leading-none tracking-tight text-[22px] md:text-[26px] lg:text-[32px] transition-colors duration-300 ${
                scrolled ? "text-text-charcoal" : "text-white"
              }`}>
                iPhonix
              </span>
              <span className="text-[9px] tracking-widest text-text-muted uppercase font-bold mt-1.5">Mobile & Service Centre</span>
            </div>
          </Link>

          <Link href="/" className={`text-[18px] font-bold transition-colors duration-300 flex items-center gap-2 ${
            scrolled ? "text-accent-green hover:text-text-charcoal" : "text-white hover:text-accent-green"
          }`}>
            Return Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Hero Section Simplified: Contains ONLY large heading, short subtitle (2-3 lines max), Request a Slot button, and one premium service image */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src={data.image} 
            alt={data.title}
            fill
            priority
            className="w-full h-full object-cover opacity-25 scale-102"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center text-left">
            
            {/* Left Side Column (40% width / lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h1 className="font-display text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-extrabold tracking-tight text-white mb-6 leading-tight">
                {data.title}
              </h1>

              <p className="text-[20px] sm:text-[22px] lg:text-[24px] text-accent-green font-semibold tracking-tight mb-8 max-w-lg leading-relaxed">
                {data.tagline}
              </p>

              {/* One large Request a Slot button */}
              <a 
                href="#booking-bay"
                className="inline-flex items-center justify-center rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 shadow-md h-[56px] w-[220px]"
              >
                Request a Slot
              </a>
            </div>

            {/* Right Side Column (60% width / lg:col-span-7) */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[650px] aspect-video rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl bg-black"
              >
                <Image 
                  src={data.image} 
                  alt={data.title}
                  fill 
                  className="object-cover" 
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Description & Key Benefits Section (240px spacing, high contrast body text color #1F2937, font-medium, leading 1.8, size 20px) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-start text-left">
            
            {/* Left Description Column */}
            <div className="lg:col-span-6">
              <h2 className="font-display text-[38px] md:text-[48px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-[40px]">
                Service Overview
              </h2>
              <p className="text-[#1F2937] leading-[1.8] text-[20px] font-medium mb-[40px]">
                {data.desc}
              </p>
            </div>

            {/* Right Key Benefits Column */}
            <div className="lg:col-span-6 bg-[#F8F8F8] p-12 rounded-[32px] border border-black/5">
              <h3 className="font-display text-[26px] font-bold text-text-charcoal mb-[40px]">
                Key Benefits
              </h3>
              <ul className="flex flex-col gap-5 text-[#1F2937] font-medium text-[20px] leading-[1.8]">
                {data.highlights.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-accent-green text-2xl font-bold mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Booking Form & Contact Section (240px spacing, enlarged booking inputs) */}
      <section id="booking-bay" className="relative z-10 w-full pt-[240px] pb-[240px] bg-white">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-6">Book Repair Slots</h2>
              <p className="text-[#1F2937] leading-[1.8] text-[20px] font-medium mb-12">
                Send details of your device. Our micro-diagnostics team will reach out with pricing quotes within 5 to 10 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="tel:7306243424"
                  className="inline-flex items-center justify-center gap-3 py-[18px] px-[40px] rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-bg-light-grey border border-black/5 hover:border-accent-green hover:text-accent-green transition-colors duration-300 text-text-charcoal h-[56px]"
                >
                  <Phone className="w-5 h-5" /> Call Direct
                </a>
                <a 
                  href="https://wa.me/917306243424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 py-[18px] px-[40px] rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-bg-light-grey border border-black/5 hover:border-accent-green hover:text-accent-green transition-colors duration-300 text-text-charcoal h-[56px]"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Booking Form Right - premium elevated card with white background, large padding, soft shadow, and glass details */}
            <div className="bg-white p-10 md:p-12 rounded-[18px] border border-black/[0.04] hover:border-accent-green/[0.12] transition-colors duration-300 shadow-[0_30px_80px_rgba(0,0,0,0.06)] w-full max-w-[700px] mx-auto z-10">
              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-[18px]">
                  <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-text-charcoal">Diagnostics Request Sent</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you. We have logged your request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditya Verma" 
                      className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 73062 43424" 
                      className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                      {...register("phone", { required: "Phone is required" })}
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                    <input 
                      type="text" 
                      value={data.title}
                      readOnly
                      className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/30 border border-black/5 text-base text-text-muted outline-none select-none font-medium"
                      {...register("deviceModel")}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Fault Specifications</label>
                    <textarea 
                      rows={6}
                      placeholder="Specify curved edges, battery degradation levels, or water contact durations." 
                      className="px-6 py-5 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none animate-none"
                      {...register("problemDescription", { required: "Fault details are required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  {/* Form submit button - enlarged height and shadow styling */}
                  <button 
                    type="submit"
                    className="w-full py-5 rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 h-[64px] flex items-center justify-center shadow-lg hover:shadow-accent-green/20"
                  >
                    Book Repair
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer (Karamana Trivandrum location details, Perfect circle logo, no rectangular overlays) */}
      <footer className="w-full py-24 bg-bg-dark border-t border-white/5 text-center text-white dark-mode-scrollbar">
        <div className="mx-auto w-full max-w-[1440px] px-8 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full border-2 border-white/20 bg-black overflow-hidden flex items-center justify-center p-0.5 shadow-md">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-full object-cover w-full h-full" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">iPhonix</span>
          </div>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">
            Near Karamana Airtel Office, Karamana, Thiruvananthapuram, Kerala
          </p>
          <span className="text-xs text-white/40 mt-4">
            © {new Date().getFullYear()} iPhonix Service Centre • Apple & Multi-Brand Specialists
          </span>
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
