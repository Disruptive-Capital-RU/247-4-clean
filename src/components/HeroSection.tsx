"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play the video on component mount
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source
          src="/videos/5058324-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white">
            <span className="block text-[#D4AF37] text-5xl md:text-7xl lg:text-8xl">
              Reluxi
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-normal block mt-4">
              {t("alwaysWithYou")}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-dm-sans text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6 mb-8 leading-relaxed"
          >
            {t("heroDescription")}
            <span className="block mt-2">{t("heroDescription2")}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16"
          >
            <Link
              href="/book"
              className="font-dm-sans inline-block px-7 py-3 border border-[#D4AF37] text-[#D4AF37] bg-black/60 font-medium text-base rounded-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-black capitalize"
              style={{ minWidth: "180px" }}
            >
              <span className="block font-dm-sans text-base capitalize">
                {t("reserveYourConcierge")}
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center font-dm-sans">
        <span className="text-white/70 text-sm mb-2">{t("discoverMore")}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </div>
    </div>
  );
}
