"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

// Full details for all 15 slugs (11 new + 4 legacy redirects) with distributed 5 image links
const SERVICES_DATA: Record<string, {
  title: string;
  tagline: string;
  desc: string;
  image: string;
  benefits: string[];
  whyChoose: string;
  process: string[];
  supportedDevices: string[];
  faqs: { q: string; a: string }[];
  gallery: string[];
  related: { title: string; slug: string }[];
}> = {
  "display-replacement": {
    title: "Screen Replacement",
    tagline: "TrueTone Calibration & High-Fidelity OLED Panel Swaps",
    desc: "Precision display replacement services for cracked glass or malfunctioning OLED panels. We copy original serial chip identifiers to maintain Apple TrueTone calibrations, multi-touch sensitivity, and exact refresh rates.",
    image: "https://i.ibb.co/xKjCL5W3/image.png",
    benefits: [
      "OEM-grade high-contrast OLED display panels",
      "Apple TrueTone serialization data copied",
      "Multi-touch layer alignment calibration",
      "Gasket seal tape to resist dust and moisture"
    ],
    whyChoose: "We use high-end EEPROM programmers to clone display credentials, preventing 'Important Display Message' alerts and retaining face biometrics alignment.",
    process: [
      "Microscope chassis frame heat separation",
      "Serialization chip programmer serialization cloning",
      "Precision bezel dust descaling",
      "Final touch, brightness, and Face ID validation checks"
    ],
    supportedDevices: [
      "iPhone 15 / 14 / 13 / 12 Pro Max",
      "Samsung Galaxy S24 / S23 / S22 Ultra",
      "Google Pixel 8 Pro / 7 Pro / 6a"
    ],
    gallery: [
      "https://i.ibb.co/xKjCL5W3/image.png",
      "https://i.ibb.co/qFgM6Kjf/image.png",
      "https://i.ibb.co/CKjv2D0n/image.png"
    ],
    faqs: [
      { q: "Will I lose TrueTone feature after display replacement?", a: "No. We clone your original screen's calibration values onto the replacement panel to preserve TrueTone color profiles." },
      { q: "Is display replacement covered under warranty?", a: "Yes, we provide a robust warranty covering display panel malfunctions, touch latency, or dead pixels." }
    ],
    related: [
      { title: "Battery Replacement", slug: "battery-replacement" },
      { title: "Back Glass Replacement", slug: "back-glass-replacement" }
    ]
  },
  "battery-replacement": {
    title: "Battery Replacement",
    tagline: "Original Capacity Batteries & Health Diagnostics",
    desc: "Solve battery health degradation, fast discharge, unexpected device shutdowns, and performance throttling with OEM battery swaps.",
    image: "https://i.ibb.co/qFgM6Kjf/image.png",
    benefits: [
      "Zero-cycle premium capacity batteries",
      "Retained battery health percentages",
      "Overcharging PMIC controller calibration",
      "Adhesive battery pull tabs alignment"
    ],
    whyChoose: "We perform micro-spot welding to transplant the original Battery Management System (BMS) logic board onto the new cells, preserving battery metrics.",
    process: [
      "Safe heat separation and frame disassembly",
      "Spot welding of the original battery BMS chip",
      "Adhesive tab placement & battery cycle counters reset",
      "Thermal load testing under charge-discharge cycles"
    ],
    supportedDevices: [
      "iPhone 15 / 14 / 13 / 11 Series",
      "Samsung Galaxy S24 / S23 Series",
      "OnePlus 12 / 11 / 10 Pro"
    ],
    gallery: [
      "https://i.ibb.co/qFgM6Kjf/image.png",
      "https://i.ibb.co/CKjv2D0n/image.png",
      "https://i.ibb.co/HD7TzxCB/image.png"
    ],
    faqs: [
      { q: "Why is battery health percentage important?", a: "Batteries with under 80% maximum capacity can throttle performance and lead to unexpected shutdowns." },
      { q: "How long does battery swap take?", a: "Normally completed within 45 to 60 minutes in-store." }
    ],
    related: [
      { title: "Charging Port Repair", slug: "charging-port-repair" },
      { title: "Motherboard Repair", slug: "motherboard-repair" }
    ]
  },
  "charging-port-repair": {
    title: "Charging Port Repair",
    tagline: "Stable Charging Docks & Multi-Protocol Flex Restorations",
    desc: "Diagnose loose cables, slow charging, and failed data connections. We clean compacted debris under microscope or swap broken charging port dock ribbons.",
    image: "https://i.ibb.co/CKjv2D0n/image.png",
    benefits: [
      "High-speed charging connections restored",
      "Clean USB-C and Lightning pin contact tracks",
      "Moisture indicator validation checks",
      "Firm mechanical cord feedback loops"
    ],
    whyChoose: "We align standard charging ports and clean main ports under microscopes to maintain safe fast-charging voltage traces.",
    process: [
      "Compacted lint debris extraction under microscope",
      "Flex trace validation check",
      "Dock board ribbon swap",
      "Amperage testing on original charger blocks"
    ],
    supportedDevices: [
      "iPhone Series",
      "Samsung Note / S Series",
      "Google Pixel / OnePlus devices"
    ],
    gallery: [
      "https://i.ibb.co/CKjv2D0n/image.png",
      "https://i.ibb.co/HD7TzxCB/image.png",
      "https://i.ibb.co/jZBFtzgm/image.png"
    ],
    faqs: [
      { q: "Can a dirty charging port be repaired without replacement?", a: "Yes. We clean ports under digital microscopes. If contacts are corroded, we replace the charging ribbon." }
    ],
    related: [
      { title: "Battery Replacement", slug: "battery-replacement" },
      { title: "Motherboard Repair", slug: "motherboard-repair" }
    ]
  },
  "back-glass-replacement": {
    title: "Back Glass Replacement",
    tagline: "High-Precision Laser Glass Backing Swaps",
    desc: "Clean rear glass replacement for cracked or shattered backs. We utilize laser separation tables to cleanly clear fractured backing glass without heating battery cells.",
    image: "https://i.ibb.co/HD7TzxCB/image.png",
    benefits: [
      "Precise laser separation with zero frame heat damage",
      "Original color match rear glass plates",
      "MagSafe charging magnet alignments",
      "Flush frame edge alignments"
    ],
    whyChoose: "Our laser separator software has precise templates for all phone models, cleanly stripping shattered glass without tearing wireless charging coils.",
    process: [
      "Laser trace sweep to dissolve adhesive bonds",
      "Shattered glass residue cleanup and frame descaling",
      "Cold-cure epoxy backing placement",
      "Clamping press validation alignment"
    ],
    supportedDevices: [
      "iPhone 15 / 14 / 13 / 12 / 11 Series",
      "Samsung Galaxy S24 / S23 / S22 Series"
    ],
    gallery: [
      "https://i.ibb.co/HD7TzxCB/image.png",
      "https://i.ibb.co/jZBFtzgm/image.png",
      "https://i.ibb.co/xKjCL5W3/image.png"
    ],
    faqs: [
      { q: "Does laser separation damage the phone components?", a: "No. The laser target frequency only melts the color glue layer underneath the glass back, avoiding components." }
    ],
    related: [
      { title: "Screen Replacement", slug: "display-replacement" },
      { title: "Camera Repair", slug: "camera-repair" }
    ]
  },
  "camera-repair": {
    title: "Camera Repair",
    tagline: "OIS Stabilizer & Lens Optical Alignments",
    desc: "Fix blurry camera shots, autofocus failures, cracked outer lens elements, or vibrating Optical Image Stabilization (OIS) gyro boards.",
    image: "https://i.ibb.co/jZBFtzgm/image.png",
    benefits: [
      "Sharp optical image focus tracking",
      "Autofocus gyro calibrations",
      "Hardened sapphire protective lens glass",
      "Clean CMOS sensor chambers"
    ],
    whyChoose: "We replace broken outer glass elements without replacing expensive camera modules when the underlying CMOS sensors are undamaged.",
    process: [
      "CMOS chamber dust clearing under microscope",
      "Sapphire glass replacement",
      "Camera module swap",
      "Autofocus zoom test metrics validation"
    ],
    supportedDevices: [
      "iPhone 15 / 14 / 13 Pro Max",
      "Samsung Galaxy S24 Ultra",
      "Google Pixel 8 Pro"
    ],
    gallery: [
      "https://i.ibb.co/jZBFtzgm/image.png",
      "https://i.ibb.co/xKjCL5W3/image.png",
      "https://i.ibb.co/qFgM6Kjf/image.png"
    ],
    faqs: [
      { q: "Why does my camera shake and make a buzzing noise?", a: "This happens when the OIS actuator motors fail, commonly due to high-frequency motorcycle engine vibrations." }
    ],
    related: [
      { title: "Back Glass Replacement", slug: "back-glass-replacement" },
      { title: "Display Replacement", slug: "display-replacement" }
    ]
  },
  "speaker-repair": {
    title: "Speaker Repair",
    tagline: "Distorted Audio & Internal Speaker Recoveries",
    desc: "Solve crackling sounds, low call volumes, or absolute speaker silence. We descale acoustic dust meshes or swap audio drivers.",
    image: "https://i.ibb.co/xKjCL5W3/image.png",
    benefits: [
      "Loud and clear media playback levels",
      "Clean acoustic mesh grilles",
      "Original impedance match audio drivers",
      "Rescaled call speaker alignment"
    ],
    whyChoose: "We perform digital cleaning and grill treatments before swapping drivers to save unnecessary costs.",
    process: [
      "Audio grill descaling with solvent treatments",
      "Earpiece speaker alignment check",
      "Sub-speaker module swap",
      "Frequency sweep validation tests"
    ],
    supportedDevices: [
      "iPhone Series",
      "Samsung S Series",
      "OnePlus/Pixel devices"
    ],
    gallery: [
      "https://i.ibb.co/xKjCL5W3/image.png",
      "https://i.ibb.co/qFgM6Kjf/image.png"
    ],
    faqs: [
      { q: "Why is my earpiece speaker very quiet?", a: "Often, earwax and dust clog the acoustic mesh. We offer deep mesh cleaning that restores sound levels immediately." }
    ],
    related: [
      { title: "Mic Repair", slug: "mic-repair" },
      { title: "Water Damage Repair", slug: "water-damage-repair" }
    ]
  },
  "mic-repair": {
    title: "Mic Repair",
    tagline: "Crystal-Clear Call & Environmental Mic Alignments",
    desc: "Resolve low microphone volume, call sound drops, and background noise-cancel errors with precision mic ribbon replacements.",
    image: "https://i.ibb.co/qFgM6Kjf/image.png",
    benefits: [
      "Clear voice call transmission tracking",
      "Noise-canceling secondary mic calibration",
      "Clean audio ports",
      "Gasket dampeners placement"
    ],
    whyChoose: "We align standard microphones and clean primary inputs under microscopes to maintain safe fast-charging voltage traces.",
    process: [
      "Acoustic input port cleaning",
      "Oscilloscope mic validation test",
      "Primary charging dock/mic ribbon swap",
      "Real-world audio capture validations"
    ],
    supportedDevices: [
      "iPhone Series",
      "Samsung flagship devices",
      "Pixel / OnePlus devices"
    ],
    gallery: [
      "https://i.ibb.co/qFgM6Kjf/image.png",
      "https://i.ibb.co/CKjv2D0n/image.png"
    ],
    faqs: [
      { q: "Can people not hear me on speakerphone?", a: "Smartphones use different mics for standard calls vs speaker calls. We test all mics to pinpoint which ribbon is faulty." }
    ],
    related: [
      { title: "Speaker Repair", slug: "speaker-repair" },
      { title: "Charging Port Repair", slug: "charging-port-repair" }
    ]
  },
  "water-damage-repair": {
    title: "Water Damage Recovery",
    tagline: "Descaling Chambers & Logic Corrosion Restorations",
    desc: "Ultrasonic descaling, Dehydration bake chambers, and chip-level micro-soldering reflows to rescue water-damaged logic boards.",
    image: "https://i.ibb.co/CKjv2D0n/image.png",
    benefits: [
      "Ultrasonic descaling clean chambers",
      "Baking dehydration ovens for mainboards",
      "Micro-soldering jump lines for trace logic",
      "Corrosion-resistant protection coatings"
    ],
    whyChoose: "We have a 90%+ data recovery rate on wet motherboards by avoiding simple power-ups and treating boards in chemical descaling chambers.",
    process: [
      "Immediate battery track isolation",
      "Ultrasonic solvent bath cycles",
      "Infrared bake chamber trace checking",
      "PMIC loop check and short desoldering"
    ],
    supportedDevices: [
      "iPhone Series",
      "Samsung S / Note Series",
      "Premium Android devices"
    ],
    gallery: [
      "https://i.ibb.co/CKjv2D0n/image.png",
      "https://i.ibb.co/HD7TzxCB/image.png"
    ],
    faqs: [
      { q: "What is the first step for a wet phone?", a: "Turn it off immediately. Do not connect it to a charger. Bring it in for cleaning to stop trace corrosion." }
    ],
    related: [
      { title: "Motherboard Repair", slug: "motherboard-repair" },
      { title: "Display Replacement", slug: "display-replacement" }
    ]
  },
  "motherboard-repair": {
    title: "Motherboard Repair",
    tagline: "Chip-Level IC Swaps & Logic Diagnostics",
    desc: "Deep circuit-level repair under high-magnification microscopes. We troubleshoot short circuits, power loop errors, memory chips, and audio IC faults.",
    image: "https://i.ibb.co/HD7TzxCB/image.png",
    benefits: [
      "Power Management IC (PMIC) replacements",
      "BGA chip micro-soldering reballing",
      "Circuit layer logic trace jumps",
      "Oscilloscope validation logs"
    ],
    whyChoose: "Our lab specializes in logic trace repairs, restoring motherboards that other centers dismiss as unrepairable.",
    process: [
      "Thermal diagnostic camera checks to spot shorts",
      "Solder paste application & stencil reballing",
      "Mainboard line trace micro-soldering",
      "PMIC voltage line validation testing"
    ],
    supportedDevices: [
      "iPhone Series (Multi-layer split boards)",
      "Samsung Galaxy flagship boards",
      "MacBook Pro Logic Boards"
    ],
    gallery: [
      "https://i.ibb.co/HD7TzxCB/image.png",
      "https://i.ibb.co/jZBFtzgm/image.png",
      "https://i.ibb.co/xKjCL5W3/image.png"
    ],
    faqs: [
      { q: "Can a phone motherboard be repaired?", a: "Yes. By utilizing microscopic soldering and hot-air reflow tables, we swap damaged chips without replacing the whole board." }
    ],
    related: [
      { title: "Water Damage Repair", slug: "water-damage-repair" },
      { title: "Software Repair", slug: "software-solutions" }
    ]
  },
  "software-solutions": {
    title: "Software Repair",
    tagline: "Firmware Loops & Storage Recoveries",
    desc: "Diagnostics and resolutions for boot loops, system crash codes, Apple logo screen freezes, storage memory issues, and backups.",
    image: "https://i.ibb.co/jZBFtzgm/image.png",
    benefits: [
      "Firmware flashes & loop recoveries",
      "Bricked phone storage extraction",
      "Boot loop diagnostics & OS restorations",
      "System storage clearance & cleanup options"
    ],
    whyChoose: "We prioritize local user data and attempt diagnostic recovery loops to retain photos and settings.",
    process: [
      "Safe-mode storage checks",
      "Firmware flash updates",
      "Data block diagnostic scans",
      "OS calibration checks"
    ],
    supportedDevices: [
      "iOS / iPadOS Devices",
      "Android OS variants (Samsung OneUI, Pixel OS)"
    ],
    gallery: [
      "https://i.ibb.co/jZBFtzgm/image.png",
      "https://i.ibb.co/xKjCL5W3/image.png"
    ],
    faqs: [
      { q: "Will I lose my files during software flashing?", a: "We prioritize diagnostic recoveries first to retain your local storage files." }
    ],
    related: [
      { title: "Motherboard Repair", slug: "motherboard-repair" },
      { title: "Face ID Repair", slug: "face-id-repair" }
    ]
  },
  "face-id-repair": {
    title: "Face ID Repair",
    tagline: "TrueDepth Calibrations & Sensor Alignments",
    desc: "Complete repair catalog for iPhone. We specialize in Face ID components, TrueTone matching, micro-soldering logic boards, and camera screen restorations.",
    image: "https://i.ibb.co/xKjCL5W3/image.png",
    benefits: [
      "TrueDepth dot projector alignments",
      "Face ID ribbon transplants",
      "Ambient light sensor calibrations",
      "Original serialization mappings"
    ],
    whyChoose: "We transplant the original Face ID serialization chip onto replacement ribbons, restoring biometrics functionality safely.",
    process: [
      "Face ID matrix scans under oscilloscope",
      "Shattered sensor alignments",
      "TrueDepth chip welding",
      "Calibration and security validation checks"
    ],
    supportedDevices: [
      "iPhone 15 / 14 / 13 / 12 / 11 Series",
      "iPhone XS / XS Max / XR / X"
    ],
    gallery: [
      "https://i.ibb.co/xKjCL5W3/image.png",
      "https://i.ibb.co/qFgM6Kjf/image.png"
    ],
    faqs: [
      { q: "Can Face ID be fixed if it says disabled?", a: "Yes. This is often caused by micro-fractures in the dot projector module, which we repair under microscopes." }
    ],
    related: [
      { title: "Screen Replacement", slug: "display-replacement" },
      { title: "Software Repair", slug: "software-solutions" }
    ]
  }
};

// Mappings for legacy slugs to prevent crashes
const LEGACY_SLUG_MAP: Record<string, string> = {
  "iphone-repair": "display-replacement",
  "android-repair": "motherboard-repair",
  "mobile-accessories": "display-replacement",
  "doorstep-mobile-repair": "display-replacement"
};

export default function ServicePageClient({ slug }: { slug: string }) {
  // Resolve legacy slugs or fallback to display replacement
  const resolvedSlug = LEGACY_SLUG_MAP[slug] || slug;
  const data = SERVICES_DATA[resolvedSlug] || SERVICES_DATA["display-replacement"];

  return (
    <div className="relative w-full overflow-hidden bg-bg-light text-text-charcoal selection:bg-accent-green/20 selection:text-accent-green">
      
      {/* Sticky translucent header */}
      <Header darkTheme={true} />

      {/* Hero Banner Section (Clean displaying ONLY page heading over the banner) */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/ccSs6vDx/image.png" 
            alt={data.title}
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
            {data.title}
          </motion.h1>
        </div>
      </section>

      {/* Service Overview & Specific Category Image (240px vertical padding) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-center text-left">
            
            {/* Overview Column */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-xs uppercase font-extrabold tracking-widest text-accent-green mb-4 block">Overview &amp; Tagline</span>
              <h3 className="text-lg md:text-[22px] text-text-charcoal/80 max-w-xl leading-relaxed mb-6 font-medium">
                {data.tagline}
              </h3>
              <p className="text-[#1F2937] leading-[1.8] text-[20px] font-medium mb-8">
                {data.desc}
              </p>
              
              {/* Only One Request a Slot button situated in this section */}
              <a 
                href="#booking-bay"
                className="inline-flex items-center justify-center rounded-[12px] text-base font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 shadow-md h-[52px] px-8 mb-8"
              >
                Request a Slot
              </a>

              <div className="bg-[#F8F8F8] p-10 rounded-[24px] border border-black/[0.04] w-full">
                <h4 className="font-display text-xl font-bold text-text-charcoal mb-4">Why Choose iPhonix?</h4>
                <p className="text-[#1F2937] leading-[1.8] text-[18px] font-medium">
                  {data.whyChoose}
                </p>
              </div>
            </div>

            {/* Specific Category Image Column */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[550px] aspect-video rounded-[24px] overflow-hidden border-2 border-black/5 shadow-2xl bg-black"
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

      {/* Key Benefits List */}
      <section className="relative z-10 w-full pt-[120px] pb-[120px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 text-left">
          <div className="bg-[#F8F8F8] p-12 rounded-[32px] border border-black/5 max-w-4xl mx-auto">
            <h3 className="font-display text-[26px] font-bold text-text-charcoal mb-8 text-center">
              Key Benefits
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#1F2937] font-medium text-[20px] leading-[1.8]">
              {data.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-accent-green text-2xl font-bold mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Repair Process & Supported Devices (240px spacing) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8] border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-start text-left">
            
            {/* Process Column */}
            <div className="lg:col-span-6">
              <h3 className="font-display text-[32px] font-bold text-text-charcoal mb-8">
                Repair Process
              </h3>
              <div className="flex flex-col gap-6">
                {data.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-accent-green text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-text-charcoal mb-1">{step}</h4>
                      <p className="text-sm text-text-muted">Standard protocol validation trace checks.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Devices Column */}
            <div className="lg:col-span-6 bg-white p-12 rounded-[32px] border border-black/5">
              <h3 className="font-display text-[26px] font-bold text-text-charcoal mb-8">
                Supported Devices
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.supportedDevices.map((device, idx) => (
                  <span key={idx} className="px-5 py-2.5 bg-[#F8F8F8] border border-black/5 rounded-full text-sm font-semibold text-text-charcoal">
                    {device}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery & FAQs Section (240px vertical gaps) */}
      <section className="relative z-10 w-full pt-[240px] pb-[240px] bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12 text-left">
          
          {/* Gallery subgrid */}
          <div className="mb-20">
            <h3 className="font-display text-[32px] font-bold text-text-charcoal mb-8">Repair Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-black/5 shadow-sm">
                  <Image src={img} alt="Repair snapshot" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQs list */}
          <div>
            <h3 className="font-display text-[32px] font-bold text-text-charcoal mb-8">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-6 max-w-4xl">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#F8F8F8] p-8 rounded-2xl border border-black/[0.04]">
                  <h4 className="font-display text-lg font-bold text-text-charcoal mb-3">{faq.q}</h4>
                  <p className="text-[#2B2B2B] text-base leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Related Services & Booking (240px vertical gaps) */}
      <section id="booking-bay" className="relative z-10 w-full pt-[240px] pb-[240px] bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px] px-8 md:px-12">
          
          {/* Related services listing */}
          <div className="mb-20 text-left">
            <h3 className="font-display text-[32px] font-bold text-text-charcoal mb-8">Related Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.related.map((rel, idx) => (
                <Link 
                  key={idx} 
                  href={`/services/${rel.slug}`}
                  className="p-8 rounded-2xl bg-white border border-black/[0.05] hover:border-accent-green hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-lg font-bold text-text-charcoal group-hover:text-accent-green transition-colors">{rel.title}</span>
                  <ArrowRight className="w-5 h-5 text-accent-green opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Booking Form CTA centrally aligned */}
          <div className="mt-12">
            <BookingForm defaultDeviceModel={data.title} />
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}
