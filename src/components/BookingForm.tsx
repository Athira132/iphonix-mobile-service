"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

type BookingFormData = {
  name: string;
  phone: string;
  deviceModel: string;
  problemDescription: string;
  preferredDate: string;
  message: string;
};

interface BookingFormProps {
  defaultDeviceModel?: string;
}

export default function BookingForm({ defaultDeviceModel = "" }: BookingFormProps) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      deviceModel: defaultDeviceModel
    }
  });

  const onSubmitBooking = (data: BookingFormData) => {
    console.log("Booking repair slot requested:", data);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      reset();
    }, 6000);
  };

  return (
    <div className="w-full max-w-[700px] mx-auto z-10">
      
      {/* Small Header Above Form */}
      <div className="text-center mb-8">
        <h3 className="font-display text-[32px] md:text-[38px] font-extrabold text-text-charcoal tracking-tight mb-2">
          Book Your Repair
        </h3>
        <p className="text-[11px] md:text-xs uppercase font-extrabold tracking-widest text-accent-green">
          Fast &bull; Reliable &bull; Professional Service
        </p>
      </div>

      {/* Premium Bordered Glassmorphic Card (2px gradient border, 20-24px rounded corners, glass blur & shadow) */}
      <div className="relative p-[2px] rounded-[24px] bg-gradient-to-br from-white/40 via-accent-green/20 to-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] hover:shadow-accent-green/5 transition-all duration-500 group">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[22px] w-full flex flex-col gap-6">
          
          {bookingSuccess ? (
            <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center gap-4 bg-accent-green/5 border border-accent-green/20 rounded-[18px]">
              <CheckCircle2 className="w-12 h-12 text-accent-green animate-bounce" />
              <h4 className="font-display text-lg font-bold text-text-charcoal">Slot Registered Successfully</h4>
              <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                Thank you! We have logged your device details. An engineer will follow up shortly to coordinate device diagnostics.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitBooking)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Aditya Verma" 
                  className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 73062 43424" 
                  className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Device Model</label>
                <input 
                  type="text" 
                  placeholder="e.g. iPhone 15 Pro" 
                  className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                  {...register("deviceModel", { required: "Model is required" })}
                />
                {errors.deviceModel && <span className="text-xs text-red-500 mt-1">{errors.deviceModel.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Problem / Issue</label>
                <input 
                  type="text" 
                  placeholder="e.g. Flickering screen, battery swelling" 
                  className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300"
                  {...register("problemDescription", { required: "Issue is required" })}
                />
                {errors.problemDescription && <span className="text-xs text-red-500 mt-1">{errors.problemDescription.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Preferred Date</label>
                <input 
                  type="date" 
                  className="h-[58px] px-6 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal transition-all duration-300"
                  {...register("preferredDate", { required: "Preferred Date is required" })}
                />
                {errors.preferredDate && <span className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Additional Message</label>
                <textarea 
                  rows={6} 
                  placeholder="Any specific instructions or context tags." 
                  className="px-6 py-5 rounded-2xl bg-bg-light-grey/60 border border-black/5 text-base focus:outline-none focus:border-accent-green focus:bg-white text-text-charcoal placeholder-black/30 transition-all duration-300 resize-none animate-none"
                  {...register("message")}
                />
              </div>

              {/* Large full-width Book Now button */}
              <button 
                type="submit"
                className="w-full py-5 rounded-[12px] text-[18px] font-bold uppercase tracking-wider bg-accent-green text-white hover:bg-accent-green/90 transition-all duration-300 h-[64px] flex items-center justify-center shadow-lg hover:shadow-accent-green/20"
              >
                Book Now
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
