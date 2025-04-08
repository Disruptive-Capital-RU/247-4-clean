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
  FaApple,
  FaAndroid,
} from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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

// Golden Button Instructions Component
const GoldenButtonInstructions = ({
  deviceType,
}: {
  deviceType: "iphone" | "android" | null;
}) => {
  if (!deviceType) return null;

  const iphoneInstructions = [
    "Open Safari and navigate to our website",
    "Tap the Share icon at the bottom of the screen",
    "Scroll down and tap 'Add to Home Screen'",
    "Keep the default name or customize it, then tap 'Add'",
    "Your Golden Button will appear on your home screen exactly as shown above",
  ];

  const androidInstructions = [
    "Open Chrome and navigate to our website",
    "Tap the three-dot menu in the top right",
    "Select 'Add to Home screen'",
    "Keep the default name or customize it, then tap 'Add'",
    "Your Golden Button will appear on your home screen exactly as shown above",
  ];

  const instructions =
    deviceType === "iphone" ? iphoneInstructions : androidInstructions;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-cormorant font-semibold text-white mb-5">
        {deviceType === "iphone" ? "iPhone" : "Android"} Installation
      </h3>
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center mr-3 shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-white/80">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Golden Button Component
const GoldenButton = () => {
  const [deviceType, setDeviceType] = useState<"iphone" | "android" | null>(
    null
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-8 max-w-3xl mx-auto"
    >
      <div className="bg-black/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl overflow-hidden">
        <div className="p-6 md:p-8 text-center">
          {/* iPhone-style app icon with rounded square shape */}
          <div className="w-24 h-24 rounded-[22%] bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] mx-auto mb-6 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 p-[2px]">
            <div className="w-full h-full rounded-[20%] bg-black flex items-center justify-center">
              <img
                src="/images/logo_2.png"
                alt="24/7 Logo"
                className="w-[70%] h-[70%] object-contain"
              />
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-cormorant font-bold text-[#D4AF37] mb-4">
            Your Golden Button
          </h3>

          <p className="font-dm-sans text-white/80 mb-6 max-w-2xl mx-auto">
            This is more than just a button — it is your direct line to luxury,
            discretion, and the finest the city has to offer. One touch connects
            you to your personal concierge, available day and night.
          </p>

          <p className="font-dm-sans text-white/80 mb-8 italic">
            Press and hold to add it to your home screen.
          </p>

          <p className="font-dm-sans text-white/90 mb-4">
            Choose your device to continue:
          </p>

          <div className="flex justify-center gap-4">
            <Modal>
              <ModalTrigger className="px-6 py-3 bg-black border border-[#D4AF37] rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2">
                <FaApple className="w-5 h-5" />
                <span className="font-dm-sans">iPhone</span>
              </ModalTrigger>
              <ModalBody className="bg-black border border-[#D4AF37]/30 max-w-md">
                <ModalContent>
                  <GoldenButtonInstructions deviceType="iphone" />
                </ModalContent>
              </ModalBody>
            </Modal>

            <Modal>
              <ModalTrigger className="px-6 py-3 bg-black border border-[#D4AF37] rounded-full text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2">
                <FaAndroid className="w-5 h-5" />
                <span className="font-dm-sans">Android</span>
              </ModalTrigger>
              <ModalBody className="bg-black border border-[#D4AF37]/30 max-w-md">
                <ModalContent>
                  <GoldenButtonInstructions deviceType="android" />
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </motion.div>
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
        {/* In our own words section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 relative overflow-hidden rounded-2xl -mx-4 md:-mx-6 lg:-mx-8"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />{" "}
            {/* Black base background */}
            <div className="absolute top-0 right-0 bottom-0 w-3/5 md:w-2/3 lg:w-4/5">
              <div className="absolute inset-0 bg-[url('/images/castle.jpg')] bg-cover bg-[position:75%_top] right-0" />{" "}
              {/* Image positioned further right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />{" "}
              {/* Even lighter gradient */}
            </div>
          </div>
          <div className="relative z-10 container mx-auto flex flex-col items-start text-left min-h-[80vh] py-32">
            <div className="max-w-lg pl-4 md:pl-6">
              <h3 className="text-xl md:text-2xl font-cormorant text-white/80 mb-2">
                In our own words
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-6">
                A Service of Presence, Power, and Precision
              </h2>
              <p className="font-dm-sans text-lg text-white/90">
                Reluxi is your private gateway to everything Moscow offers —
                without noise, delay, or compromise. We specialize in
                anticipating your desires before you express them.
              </p>
            </div>
          </div>
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

        {/* Container Scroll Animation */}
        <div className="mt-6">
          {/* Golden Button Feature */}
          <GoldenButton />

          <ContainerScroll
            titleComponent={
              <div className="-mt-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
                  <span className="text-[#D4AF37]">Access</span> Your Personal
                  Concierge Dashboard
                </h2>
                <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto mb-6">
                  Manage services, explore experiences, and connect directly
                  with your concierge
                </p>
              </div>
            }
          >
            <div className="flex items-center justify-center h-full w-full bg-black text-white p-0">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                  src="/images/dashboard.png"
                  alt="Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
