"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "They didn&apos;t just help. They understood.",
    name: "Khalid A.",
    title: "Riyadh",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    quote: "Every detail felt made for me.",
    name: "Salma M.",
    title: "Abu Dhabi",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    quote:
      "I landed in Moscow not knowing a soul — and felt like I never left home.",
    name: "Noura R.",
    title: "Kuwait City",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    quote:
      "The level of personal service was beyond anything I&apos;ve experienced.",
    name: "Fahad K.",
    title: "Dubai",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    quote:
      "My privacy was protected at all times. This is what true luxury means.",
    name: "Aisha L.",
    title: "Doha",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/moscow-3872942_1920.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
            We Don&apos;t Just Provide Service.
            <br /> We Provide <span className="text-[#D4AF37]">Certainty</span>
          </h2>
          <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
            You don&apos;t need a schedule. You need a signal. Your concierge is
            more than a guide — they are your trusted presence in a foreign
            land.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatedTestimonials
            testimonials={testimonials}
            className="bg-black/30 backdrop-blur-sm border border-white/10"
          />

          <div className="text-center mt-16 text-white/80 max-w-3xl mx-auto italic">
            <p className="text-xl font-cormorant">
              &quot;We are with you — always.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
