"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
  FaLock,
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaHeartbeat,
  FaGlassMartiniAlt,
  FaLandmark,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShoppingBag className="w-6 h-6" />,
    title: "VIP Shopping",
    description:
      "Private access to Moscow's most prestigious boutiques. Arabic-speaking stylists. Exclusive time slots.",
  },
  {
    icon: <FaUtensils className="w-6 h-6" />,
    title: "High-End Dining",
    description:
      "Guaranteed tables in Moscow's most in-demand restaurants. Chefs prepared for your preferences.",
  },
  {
    icon: <FaCar className="w-6 h-6" />,
    title: "Chauffeured Vehicles",
    description:
      "Black Mercedes, S-Class, Maybach. Professionally trained drivers. Fully discreet. Hourly or daily.",
  },
  {
    icon: <FaLandmark className="w-6 h-6" />,
    title: "Private Cultural Tours",
    description:
      "Unlock access to palaces, museums, and Islamic heritage sites with elite guides and interpreters.",
  },
  {
    icon: <FaLock className="w-6 h-6" />,
    title: "Personal Protection",
    description:
      "Trained executive protection upon request. For those whose privacy and safety are non-negotiable.",
  },
  {
    icon: <FaHeartbeat className="w-6 h-6" />,
    title: "Health & Wellness",
    description:
      "Exclusive clinics, VIP access to medical care, cosmetic specialists, and spa recovery — without waiting lists.",
  },
  {
    icon: <FaGlassMartiniAlt className="w-6 h-6" />,
    title: "Nightlife & Events",
    description:
      "Entry into closed circles, high society gatherings, and events no tourist can reach.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/images/moscow-4341582_1920.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
            A Service of{" "}
            <span className="text-[#D4AF37]">
              Presence, Power, and Precision
            </span>
          </h2>
          <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
            24/7 is your private gateway to everything Moscow offers — without
            noise, delay, or compromise. We specialize in anticipating your
            desires before you express them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="h-full bg-black/40 backdrop-blur-sm border border-white/10 p-6 group">
                <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-cormorant font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-dm-sans text-white/70">
                  {service.description}
                </p>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
