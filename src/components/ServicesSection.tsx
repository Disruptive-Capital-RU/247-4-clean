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
import { useLanguage } from "@/lib/LanguageContext";

type Service = {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
};

const GoldenButton = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="my-36 relative bg-black/50 border border-white/10 rounded-xl p-10 mb-8">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[url('/images/city-lights.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/20 text-[#D4AF37] text-sm mb-6">
          {t("goldLogo")}
        </span>
        <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-6 text-white">
          {t("goldenButton")}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {t("goldenButtonDesc")}
        </p>
        <p className="text-white/60 mb-8">{t("goldenButtonInstructions")}</p>

        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <ModalTrigger className="inline-block px-6 py-3 bg-black border border-[#D4AF37] rounded-md text-white hover:bg-[#D4AF37]/10 transition-colors">
            {t("chooseDevice")}
          </ModalTrigger>
          <ModalContent className="bg-gray-900 border border-[#D4AF37]/40 rounded-lg p-0 w-full max-w-md">
            <ModalBody className="p-0">
              <div className="divide-y divide-[#D4AF37]/10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-3 w-full p-6 text-left hover:bg-[#D4AF37]/10 transition-colors"
                >
                  <FaApple className="text-white/90 w-6 h-6" />
                  <span className="text-lg text-white">{t("iphone")}</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center gap-3 w-full p-6 text-left hover:bg-[#D4AF37]/10 transition-colors"
                >
                  <FaAndroid className="text-white/90 w-6 h-6" />
                  <span className="text-lg text-white">{t("android")}</span>
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { t } = useLanguage();

  const services: Service[] = [
    {
      icon: <FaShoppingBag className="w-6 h-6" />,
      titleKey: "vipShopping",
      descriptionKey: "vipShoppingDesc",
    },
    {
      icon: <FaUtensils className="w-6 h-6" />,
      titleKey: "highEndDining",
      descriptionKey: "highEndDiningDesc",
    },
    {
      icon: <FaCar className="w-6 h-6" />,
      titleKey: "chauffeuredVehicles",
      descriptionKey: "chauffeuredVehiclesDesc",
    },
    {
      icon: <FaLandmark className="w-6 h-6" />,
      titleKey: "privateCulturalTours",
      descriptionKey: "privateCulturalToursDesc",
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      titleKey: "personalProtection",
      descriptionKey: "personalProtectionDesc",
    },
    {
      icon: <FaHeartbeat className="w-6 h-6" />,
      titleKey: "healthWellness",
      descriptionKey: "healthWellnessDesc",
    },
    {
      icon: <FaGlassMartiniAlt className="w-6 h-6" />,
      titleKey: "nightlifeEvents",
      descriptionKey: "nightlifeEventsDesc",
    },
  ];

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
                {t("serviceMainTitle")}
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-6">
                {t("serviceSubtitle")}
              </h2>
              <p className="font-dm-sans text-lg text-white/90">
                {t("serviceIntro")}
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
        <div className="mt-36">
          {/* Golden Button Feature */}
          <GoldenButton />

          <ContainerScroll
            titleComponent={
              <div className="-mt-64">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
                  <span className="text-[#D4AF37]">{t("accessDashboard")}</span>
                </h2>
                <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto mb-6">
                  {t("dashboardDesc")}
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

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

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
          {t(service.titleKey)}
        </h3>
        <p className="font-dm-sans text-white/70">
          {t(service.descriptionKey)}
        </p>
      </div>
    </div>
  );
};
