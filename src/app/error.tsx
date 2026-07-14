"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an analytics service or logger
    console.error("Application error registered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col justify-between relative glow-grid">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="w-full py-6 border-b border-white/5 bg-black/20 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full border border-white/10 bg-black flex items-center justify-center p-1">
              <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            <span className="font-display text-base font-bold text-white">iPhonix</span>
          </Link>
          <a 
            href="tel:+919962512345"
            className="text-xs font-semibold text-accent-blue hover:text-white transition-colors duration-300"
          >
            Call Support
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 z-10 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 md:p-12 max-w-lg w-full flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-red-500">
            Error 500 • Internal Interruption
          </span>
          
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            System Failure
          </h1>
          
          <p className="text-sm text-text-muted leading-relaxed">
            An unexpected glitch has interrupted our diagnostic diagnostics line. Don&apos;t worry, your system is safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center">
            <button 
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-blue text-white hover:bg-accent-blue/90 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" /> Reset Application
            </button>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300"
            >
              <Home className="w-4 h-4" /> Return Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-white/5 bg-black/10 text-center z-10">
        <span className="text-[10px] text-text-muted uppercase tracking-widest">
          © {new Date().getFullYear()} iPhonix Service Centre Chennai • Precision Engineering
        </span>
      </footer>

    </div>
  );
}
