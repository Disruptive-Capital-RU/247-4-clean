"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MovingBorder } from "@/components/ui/moving-border";
import {
  FaLock,
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaHeartbeat,
  FaGlassMartiniAlt,
  FaLandmark,
} from "react-icons/fa";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const services: Service[] = [
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

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 z-0">
          <MovingBorder duration={8000} rx="12px" ry="12px">
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </MovingBorder>
        </div>
      )}
      <div
        className={`
          relative z-10 h-full bg-black/60 backdrop-blur-sm 
          border ${isHovered ? "border-[#D4AF37]/30" : "border-white/10"} 
          p-6 rounded-xl group transition-all duration-300
        `}
      >
        <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="text-xl font-cormorant font-semibold text-white mb-3">
          {service.title}
        </h3>
        <p className="font-dm-sans text-white/70">{service.description}</p>
      </div>
    </div>
  );
};

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
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
