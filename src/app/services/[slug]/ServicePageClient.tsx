"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { 
  Smartphone, ShieldCheck, Clock, Settings, Award, 
  ChevronDown, Phone, Sparkles, ArrowRight, Star, Cpu, 
  MessageCircle, ArrowUp, Watch, CheckCircle2
} from "lucide-react";

type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
  preferredDate: string;
  message: string;
};

// Services dynamic data map
const SERVICES_DATA: Record<string, {
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  faqs: { q: string; a: string }[];
  gallery: string[];
}> = {
  "screen-replacement": {
    title: "Screen Replacement",
    tagline: "TrueTone Matched Display Restoration",
    desc: "We replace cracked glass and failed OLED panels on iPhones and premium Android flagships. All replacements maintain original refresh rates, active color values, and Touch ID / Face ID calibrations.",
    icon: Smartphone,
    faqs: [
      { q: "Do you maintain TrueTone after replacement?", a: "Yes. We copy the screen serial data from your original screen controller to the replacement panel using advanced programmer blocks. This preserves Apple TrueTone functionality." },
      { q: "How long does a screen replacement take?", a: "Typically 1 to 2 hours. We perform frame cleaning, gasket alignment, and lamination testing before handback." },
      { q: "Is there a warranty on the new screen?", a: "Yes, we provide a 90-day comprehensive warranty covering display issues or touch response errors." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600",
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600"
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
    gallery: [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600"
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
    gallery: [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600",
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600"
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
    gallery: [
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600"
    ]
  },
  "speaker-microphone-repair": {
    title: "Audio & Speaker Repair",
    tagline: "Acoustic Clarity Level Testing",
    desc: "Fix low earpiece sound, crackling speakers, and microphone recording issues. We clean dust grilles or replace audio transducers.",
    icon: Award,
    faqs: [
      { q: "Why is my earpiece sound suddenly very low?", a: "Usually, this is due to fine dirt, cosmetics, or sweat clogging the mesh. A deep micro-cleaning solves this in minutes." },
      { q: "Do you replace speaker components?", a: "Yes. If cleaning does not restore audio clarity, we install replacement speaker drivers." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600"
    ]
  },
  "camera-repair": {
    title: "Camera & Sensor Repair",
    tagline: "Precision Lens & Stabilizer Alignment",
    desc: "Solve camera focus errors, lens cracks, and sensor shake issues. We install brand-new camera modules and outer glass overlays.",
    icon: Sparkles,
    faqs: [
      { q: "Can you fix a cracked camera glass without replacing the whole camera?", a: "Yes. If the underlying camera sensor is scratch-free and focuses properly, we can replace just the external glass ring." },
      { q: "Why is my camera shaking or making buzzing noises?", a: "This indicates a failure in the Optical Image Stabilization (OIS) gyro motors, usually caused by heavy vibrations (e.g. motorcycle mounts)." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600"
    ]
  },
  "software-solutions": {
    title: "Software & Diagnostics",
    tagline: "Firmware Loop & Data Recovery bay",
    desc: "Diagnostics for bricked devices, boot loop screen freezes, storage overflow issues, and system upgrades.",
    icon: ShieldCheck,
    faqs: [
      { q: "Will I lose my data during software restore?", a: "We prioritize data retention. We attempt diagnostic boot recoveries first. If formatting is required, we request client approval." },
      { q: "Can you resolve devices stuck on the Apple logo?", a: "Yes. This is often caused by system storage overflow or firmware corruption, which we resolve using specialized diagnostic interfaces." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600",
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600"
    ]
  },
  "iphone-repair": {
    title: "iPhone Repair",
    tagline: "Apple Micro-Soldering Specialists",
    desc: "Complete repair catalog for iPhone. We specialize in Face ID components, TrueTone matching, micro-soldering logic boards, and screen restorations.",
    icon: Smartphone,
    faqs: [
      { q: "Are your technicians certified for iOS devices?", a: "Our team consists of specialists trained in Apple board-level logic repair, including chip reballing and micro-welding." },
      { q: "Do you repair bent iPhone frames?", a: "Yes. We can safely transfer your components into a new original chassis or straighten minor chassis bends." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600",
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600"
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
    gallery: [
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600",
      "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600"
    ]
  },
  "accessories": {
    title: "Premium Accessories",
    tagline: "Luxury Protection & Power Adaptations",
    desc: "Explore our collection of protective layers, MagSafe chargers, high-frequency connectors, and luxury watch straps available at our Pallikaranai store.",
    icon: Watch,
    faqs: [
      { q: "Do you sell screen protection overlays?", a: "Yes. We offer high-impact tempered glass, matte anti-glare screen protectors, and privacy panels with layout alignment assistance." },
      { q: "Are your adapters certified safe?", a: "All power supplies and cables are fully certified (BIS/CE) to ensure stable current flow without heating your phone's PMIC controller." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600"
    ]
  }
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const data = SERVICES_DATA[slug] || SERVICES_DATA["screen-replacement"];
  
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
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

  const ServiceIcon = data.icon;

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-accent-green" />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 h-28 flex items-center ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}>
        <div className="mx-auto w-full max-w-[1440px] px-8 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            {/* Circular Logo Container */}
            <div className="relative w-14 h-14 rounded-full border border-white/20 shadow bg-black flex items-center justify-center p-2 overflow-visible">
              <Image src="/logo.png" alt="Logo" width={38} height={38} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-extrabold leading-none tracking-tight text-[22px] md:text-[26px] lg:text-[32px] transition-colors duration-300 ${
                scrolled ? "text-text-charcoal" : "text-white"
              }`}>
                iPhonix
              </span>
              <span className="text-[9px] tracking-widest text-text-muted uppercase font-bold mt-1.5">Apple & Multi-Brand Service</span>
            </div>
          </Link>

          <Link href="/" className={`text-[18px] font-bold transition-colors duration-300 flex items-center gap-2 ${
            scrolled ? "text-accent-green hover:text-text-charcoal" : "text-white hover:text-accent-green"
          }`}>
            Return Home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/pBGN8Nz1/Whats-App-Image-2026-07-14-at-4-01-58-PM.jpg" 
            alt={data.title}
            fill
            priority
            className="w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 md:px-12 text-center flex flex-col items-center">
          <div className="outline-icon-container mb-8 text-accent-green">
            <ServiceIcon className="w-20 h-20" />
          </div>

          <h1 className="font-display text-[48px] sm:text-[68px] md:text-[80px] lg:text-[90px] font-extrabold tracking-tight text-white mb-6">
            {data.title}
          </h1>

          <p className="text-[20px] sm:text-[22px] lg:text-[26px] text-accent-green font-semibold tracking-tight mb-8">
            {data.tagline}
          </p>

          <p className="text-base sm:text-lg lg:text-[20px] text-white/80 max-w-2xl leading-relaxed mb-12">
            {data.desc}
          </p>

          <a 
            href="#booking-bay"
            className="inline-flex items-center justify-center py-[18px] px-[40px] rounded-[16px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 shadow-md"
          >
            Request Diagnostics Slot
          </a>
        </div>
      </section>

      {/* Why Choose iPhonix Section */}
      <section className="relative z-10 w-full pt-[160px] pb-[160px] bg-bg-light-grey mt-[60px]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[13px] uppercase font-bold tracking-widest text-accent-green mb-6 block">Diagnostics Bay</span>
            <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-6">Why Choose iPhonix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Laboratory Technicians", desc: "Expert motherboard micro-soldering certified technicians.", icon: Award },
              { title: "OEM Quality Components", desc: "We utilize premium factory-grade replacement components exclusively.", icon: ShieldCheck },
              { title: "90-Day Guarantee", desc: "Every component swap is backed by a complete replacement warranty card.", icon: Clock }
            ].map((card, idx) => (
              <div key={idx} className="apple-card-light p-10 bg-white rounded-[32px] cursor-default">
                <div className="outline-icon-container mb-8 text-accent-green">
                  <card.icon className="w-20 h-20" />
                </div>
                <h3 className="font-display text-2xl font-bold text-text-charcoal mb-4">{card.title}</h3>
                <p className="text-base sm:text-lg text-text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Repair Process */}
      <section className="relative z-10 w-full pt-[160px] pb-[160px] bg-bg-dark text-white dark-mode-scrollbar mt-[60px]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-green mb-4 block">Repair Pipeline</span>
            <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-white mb-6">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Book Your Device", desc: "Schedule online or request drop-off slots via WhatsApp call." },
              { step: "02", title: "Free Diagnosis", desc: "Diagnostics checks and trace checking at no charge." },
              { step: "03", title: "Expert Repair", desc: "Repair conducted inside clean micro-repair enclosures." },
              { step: "04", title: "Quality Check & Delivery", desc: "Post-repair test verification and warranty card issue." }
            ].map((step, idx) => (
              <div key={idx} className="apple-card-dark p-8 rounded-[32px] hover:border-accent-green/20 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-accent-green/15 border border-accent-green/30 flex items-center justify-center text-sm font-bold text-accent-green font-display mb-8">
                  {step.step}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="relative z-10 w-full pt-[160px] pb-[160px] bg-white mt-[60px]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[13px] uppercase font-bold tracking-widest text-accent-green mb-6 block">Visual Evidence</span>
            <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-6">Gallery Showcase</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {data.gallery.map((url, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-[32px] border border-black/5 group aspect-video cursor-pointer shadow-sm bg-white">
                <Image 
                  src={url} 
                  alt="Repair gallery photo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <Star className="w-10 h-10 text-accent-green animate-pulse" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative z-10 w-full pt-[160px] pb-[160px] bg-bg-light-grey mt-[60px]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[13px] uppercase font-bold tracking-widest text-accent-green mb-6 block">Faq</span>
            <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-6">Common Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {data.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="bg-white border border-black/5 rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm">
                  <button
                    className="w-full px-10 py-8 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className="font-display text-lg font-bold text-text-charcoal pr-4">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 text-text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-accent-green" : ""}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] border-t border-black/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                    <div className="px-10 py-8 text-sm sm:text-base text-text-muted leading-relaxed">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Booking Form CTA */}
      <section id="booking-bay" className="relative z-10 w-full pt-[160px] pb-[160px] bg-white mt-[60px]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-[13px] uppercase font-bold tracking-widest text-accent-green mb-6 block">Service Area</span>
              <h2 className="font-display text-[40px] md:text-[50px] lg:text-[60px] font-bold tracking-tight text-text-charcoal mb-6">Book Repair Slots</h2>
              <p className="text-text-muted leading-relaxed text-lg md:text-[20px] mb-12">
                Send details of your device. Our micro-diagnostics team will reach out with pricing quotes within 5 to 10 minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="tel:7306243424"
                  className="inline-flex items-center justify-center gap-3 py-[18px] px-[40px] rounded-[16px] text-[18px] font-bold uppercase tracking-wider bg-bg-light-grey border border-black/5 hover:border-accent-green hover:text-accent-green transition-colors duration-300 text-text-charcoal"
                >
                  <Phone className="w-5 h-5" /> Call Direct
                </a>
                <a 
                  href="https://wa.me/917306243424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 py-[18px] px-[40px] rounded-[16px] text-[18px] font-bold uppercase tracking-wider bg-bg-light-grey border border-black/5 hover:border-accent-green hover:text-accent-green transition-colors duration-300 text-text-charcoal"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Chat
                </a>
              </div>
            </div>

            <div className="apple-card-light p-10 md:p-12 bg-white rounded-[32px]">
              {bookingSuccess ? (
                <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-2xl">
                  <CheckCircle2 className="w-12 h-12 text-accent-green" />
                  <h4 className="font-display text-lg font-bold text-text-charcoal">Diagnostics Request Sent</h4>
                  <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                    Thank you. We have logged your request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Name</label>
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
                      value={data.title}
                      readOnly
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm text-text-muted outline-none select-none"
                      {...register("deviceModel")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Fault Specifications</label>
                    <textarea 
                      rows={3}
                      placeholder="Specify curved edges, battery degradation levels, or water contact durations." 
                      className="px-4 py-3.5 rounded-xl bg-bg-light-grey border border-black/5 text-sm focus:outline-none focus:border-accent-green text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none"
                      {...register("problemDescription", { required: "Fault details are required" })}
                    />
                    {errors.problemDescription && <span className="text-xs text-red-500">{errors.problemDescription.message}</span>}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 rounded-[16px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/95 transition-all duration-300 shadow-md"
                  >
                    Confirm Diagnostic Slot
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-bg-dark border-t border-white/5 text-center text-white">
        <span className="text-xs text-white/50">
          © {new Date().getFullYear()} iPhonix Service Centre Chennai • Apple & Multi-Brand Specialists
        </span>
      </footer>

      {/* Floating CTA */}
      <a 
        href="https://wa.me/917306243424"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-accent-green text-white shadow-lg animate-pulse-slow"
      >
        <MessageCircle className="w-5 h-5 fill-white text-accent-green" />
      </a>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-black/10 backdrop-blur border border-black/5 text-text-charcoal"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
