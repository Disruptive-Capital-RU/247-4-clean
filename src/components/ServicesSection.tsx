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
  FaCalendarAlt,
  FaGift,
} from "react-icons/fa";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useLanguage } from "@/lib/LanguageContext";

type Service = {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
};

const GoldenButton = () => {
  const { t } = useLanguage();

  return (
    <div className="my-20 relative p-12 mb-8 bg-black/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] max-w-4xl mx-auto">
      {/* Simple golden border */}
      <div className="absolute inset-0 rounded-xl border border-[#D4AF37]" />
      <div className="relative text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Golden shimmer effect */}
            <div className="absolute -inset-4 bg-gradient-radial from-[#D4AF37]/30 to-transparent rounded-full blur-md animate-pulse" />
            <div className="absolute -inset-8 bg-gradient-radial from-[#D4AF37]/20 to-transparent rounded-full blur-lg" />
            <Image
              src="/images/app-icon.png"
              alt="App Icon"
              width={120}
              height={120}
              className="relative z-10"
            />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-6 text-white">
          {t("goldenButton")}
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {t("goldenButtonDesc")}
        </p>
        <p className="text-2xl md:text-3xl font-cormorant font-medium text-[#D4AF37]">
          {t("yourGoldenButton")}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative flex items-center gap-3 px-6 py-4 bg-black text-[#D4AF37] font-medium border border-[#D4AF37] rounded-md hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:bg-[#D4AF37]/10 transition-all duration-300 overflow-hidden group">
                {/* Inner glow effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <FaApple className="w-6 h-6 relative z-10" />
                <span className="relative z-10">{t("iphone")}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-black/90 border border-[#D4AF37] text-white">
              <div className="space-y-2">
                <h4 className="font-medium text-[#D4AF37] mb-2">
                  {t("iosInstallationSteps")}
                </h4>
                <ol className="text-white/80 list-decimal pl-5 space-y-2">
                  <li>{t("openInSafari")}</li>
                  <li>{t("tapShareIcon")}</li>
                  <li>{t("scrollAddHomeScreen")}</li>
                  <li>{t("tapAdd")}</li>
                </ol>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="relative flex items-center gap-3 px-6 py-4 bg-black text-[#D4AF37] font-medium border border-[#D4AF37] rounded-md hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:bg-[#D4AF37]/10 transition-all duration-300 overflow-hidden group">
                {/* Inner glow effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <FaAndroid className="w-6 h-6 relative z-10" />
                <span className="relative z-10">{t("android")}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-black/90 border border-[#D4AF37] text-white">
              <div className="space-y-2">
                <h4 className="font-medium text-[#D4AF37] mb-2">
                  {t("androidInstallationSteps")}
                </h4>
                <ol className="text-white/80 list-decimal pl-5 space-y-2">
                  <li>{t("openInChrome")}</li>
                  <li>{t("tapThreeDots")}</li>
                  <li>{t("tapAddHomeScreen")}</li>
                  <li>{t("confirmAdd")}</li>
                </ol>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { t } = useLanguage();

  const services: Service[] = [
    {
      icon: <FaCar className="w-6 h-6" />,
      titleKey: "privateTransport",
      descriptionKey: "privateTransportDesc",
    },
    {
      icon: <FaUtensils className="w-6 h-6" />,
      titleKey: "diningArrangements",
      descriptionKey: "diningArrangementsDesc",
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      titleKey: "dayPlanning",
      descriptionKey: "dayPlanningDesc",
    },
    {
      icon: <FaHeartbeat className="w-6 h-6" />,
      titleKey: "healthWellness",
      descriptionKey: "healthWellnessDesc",
    },
    {
      icon: <FaShoppingBag className="w-6 h-6" />,
      titleKey: "vipShopping",
      descriptionKey: "vipShoppingDesc",
    },
    {
      icon: <FaLandmark className="w-6 h-6" />,
      titleKey: "culturalExperiences",
      descriptionKey: "culturalExperiencesDesc",
    },
    {
      icon: <FaGlassMartiniAlt className="w-6 h-6" />,
      titleKey: "eveningAccess",
      descriptionKey: "eveningAccessDesc",
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      titleKey: "security",
      descriptionKey: "securityDesc",
    },
    {
      icon: <FaGift className="w-6 h-6" />,
      titleKey: "gifting",
      descriptionKey: "giftingDesc",
    },
  ];

  return (
    <section className="pt-20 pb-10 bg-black relative overflow-hidden">
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
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 relative overflow-hidden rounded-2xl -mx-4 md:-mx-6 lg:-mx-8"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute top-0 right-0 bottom-0 w-3/5 md:w-2/3 lg:w-4/5">
              {/* Optimize image loading with priority and loading="eager" */}
              <Image
                src="/images/castle.jpg"
                alt="Castle background"
                fill
                className="object-cover object-[30%_top] md:object-[75%_top]"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
            </div>
          </div>
          <div className="relative z-10 container mx-auto flex flex-col items-start text-left min-h-[80vh] py-32">
            <div className="max-w-sm sm:max-w-md md:max-w-lg pl-3 md:pl-6">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-6"
                style={{
                  textShadow: "0 5px 15px #000, 0 0 20px #000",
                }}
              >
                {t("serviceSubtitle")}
              </h2>
              <p
                className="font-dm-sans text-lg pr-2 sm:pr-4 md:pr-0"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 4px #000, 0 0 10px #000",
                }}
              >
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
                <Image
                  src="/images/dashboard1.png"
                  alt="Dashboard"
                  width={800}
                  height={600}
                  className="w-full h-full object-fill md:object-cover"
                  style={{ height: "calc(100% + 10px)" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
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

const ServiceCard = ({ service }: ServiceCardProps) => {
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
