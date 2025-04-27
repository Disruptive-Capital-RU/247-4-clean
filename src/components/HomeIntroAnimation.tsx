"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ServicesTextEffect } from "@/components/ui/services-text-effect";
import { useLanguage } from "@/lib/LanguageContext";

export default function HomeIntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: isMobile ? 4.5 : 5.2 }}
      onAnimationComplete={onComplete}
    >
      {/* Background pattern - Arabic-inspired geometric designs */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="arabicPattern"
          x="0"
          y="0"
          width={isMobile ? "80" : "100"}
          height={isMobile ? "80" : "100"}
          patternUnits="userSpaceOnUse"
        >
          <motion.path
            d="M50 0L75 25L50 50L25 25L50 0Z M0 50L25 25L50 50L25 75L0 50Z M50 100L25 75L50 50L75 75L50 100Z M100 50L75 75L50 50L75 25L100 50Z"
            stroke="#D4AF37"
            strokeWidth={isMobile ? "0.4" : "0.5"}
            strokeOpacity="0.15"
            fill="none"
            initial={{ strokeOpacity: 0 }}
            animate={{ strokeOpacity: 0.15 }}
            transition={{ duration: isMobile ? 2 : 3, delay: 0.5 }}
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#arabicPattern)"
        />
      </svg>

      {/* Gold accent lines - more elaborate pattern with Arabic-inspired design */}
      <motion.div
        className="absolute left-0 top-1/4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      <motion.div
        className="absolute left-0 top-3/4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Vertical accent lines */}
      <motion.div
        className={`absolute ${
          isMobile ? "left-1/4" : "left-1/3"
        } top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent h-full`}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />

      <motion.div
        className={`absolute ${
          isMobile ? "right-1/4" : "right-1/3"
        } top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent h-full`}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      />

      {/* New decorative elements - Arabic-inspired star patterns */}
      <motion.div
        className={`absolute ${isMobile ? "w-36 h-36" : "w-56 h-56"} ${
          isMobile ? "left-[12%]" : "left-[18%]"
        } ${isMobile ? "top-[18%]" : "top-[22%]"} opacity-40`}
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
            stroke="#D4AF37"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.8 }}
          />
          <motion.path
            d="M50 15 L57.5 42.5 L85 50 L57.5 57.5 L50 85 L42.5 57.5 L15 50 L42.5 42.5 Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.2 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute ${isMobile ? "w-36 h-36" : "w-56 h-56"} ${
          isMobile ? "right-[12%]" : "right-[18%]"
        } ${isMobile ? "top-[18%]" : "top-[22%]"} opacity-40`}
        initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
        animate={{ opacity: 0.4, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
            stroke="#D4AF37"
            strokeWidth="0.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2 }}
          />
          <motion.path
            d="M50 15 L57.5 42.5 L85 50 L57.5 57.5 L50 85 L42.5 57.5 L15 50 L42.5 42.5 Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.4 }}
          />
        </svg>
      </motion.div>

      {/* New central decorative element - Arabesque pattern */}
      <motion.div
        className={`absolute ${
          isMobile ? "h-20" : "h-28"
        } w-full top-[12%] opacity-30`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      >
        <svg
          viewBox="0 0 1000 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M200,100 C300,10 400,190 500,100 C600,10 700,190 800,100"
            stroke="#D4AF37"
            strokeWidth={isMobile ? "1.2" : "1.5"}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 2.2 }}
          />
          <motion.path
            d="M150,100 C250,30 350,170 450,100 C550,30 650,170 750,100 C850,30 950,170 1050,100"
            stroke="#D4AF37"
            strokeWidth={isMobile ? "0.8" : "1"}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 2.4 }}
          />
          <motion.path
            d="M0,100 C100,50 200,150 300,100 C400,50 500,150 600,100 C700,50 800,150 900,100 C1000,50 1100,150 1200,100"
            stroke="#D4AF37"
            strokeWidth={isMobile ? "0.6" : "0.8"}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 2.6 }}
          />
        </svg>
      </motion.div>

      {/* Decorative geometric pattern in the center */}
      <motion.div
        className={`absolute ${
          isMobile ? "w-40 h-40" : "w-64 h-64"
        } left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 opacity-20`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.2, scale: 1, rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M50 0 L100 50 L50 100 L0 50 Z"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <path
            d="M50 20 L80 50 L50 80 L20 50 Z"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <path
            d="M50 30 L70 50 L50 70 L30 50 Z"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <path
            d="M0 0 L100 100"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <path
            d="M100 0 L0 100"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#D4AF37"
            strokeWidth="0.2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        className={`absolute left-8 top-8 ${
          isMobile ? "w-16 h-16" : "w-24 h-24"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L100 0L100 20L20 20L20 100L0 100L0 0Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            fill="none"
          />
          <path
            d="M0 0L15 15"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            fill="none"
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute right-8 top-8 ${
          isMobile ? "w-16 h-16" : "w-24 h-24"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0L0 0L0 20L80 20L80 100L100 100L100 0Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            fill="none"
          />
          <path
            d="M100 0L85 15"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            fill="none"
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute left-8 bottom-8 ${
          isMobile ? "w-16 h-16" : "w-24 h-24"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100L100 100L100 80L20 80L20 0L0 0L0 100Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            fill="none"
          />
          <path
            d="M0 100L15 85"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            fill="none"
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute right-8 bottom-8 ${
          isMobile ? "w-16 h-16" : "w-24 h-24"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 100L0 100L0 80L80 80L80 0L100 0L100 100Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            fill="none"
          />
          <path
            d="M100 100L85 85"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="text-center px-4 relative z-30 max-w-4xl mx-auto">
        <ServicesTextEffect
          words="Reluxi"
          className="mb-8 text-[#D4AF37]"
          duration={0.8}
        />

        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-12"
          initial={{ width: 0 }}
          animate={{ width: isMobile ? "90%" : "80%" }}
          transition={{
            duration: isMobile ? 1 : 1.2,
            delay: isMobile ? 3 : 3.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.p
          className="mt-8 text-xl md:text-2xl text-white max-w-3xl mx-auto font-cormorant tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isMobile ? 3.5 : 4 }}
        >
          {t("personalTravelAssistant")}
        </motion.p>
      </div>
    </motion.div>
  );
}
