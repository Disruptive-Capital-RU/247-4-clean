"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ServicesTextEffect } from "@/components/ui/services-text-effect";

export default function HomeIntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 5.2 }}
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
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <motion.path
            d="M50 0L75 25L50 50L25 25L50 0Z M0 50L25 25L50 50L25 75L0 50Z M50 100L25 75L50 50L75 75L50 100Z M100 50L75 75L50 50L75 25L100 50Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
            strokeOpacity="0.15"
            fill="none"
            initial={{ strokeOpacity: 0 }}
            animate={{ strokeOpacity: 0.15 }}
            transition={{ duration: 3, delay: 0.5 }}
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
        className="absolute left-1/3 top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent h-full"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />

      <motion.div
        className="absolute right-1/3 top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent h-full"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      />

      {/* Arabic-inspired decorative pattern elements */}
      <motion.div
        className="absolute w-48 h-48 left-1/4 top-1/4 border border-[#D4AF37]/20 rounded-full"
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      >
        <motion.div
          className="absolute inset-2 border border-[#D4AF37]/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        />
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 right-1/4 top-1/4 border border-[#D4AF37]/20 rounded-full"
        initial={{ opacity: 0, scale: 0, rotate: 30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
      >
        <motion.div
          className="absolute inset-2 border border-[#D4AF37]/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />
      </motion.div>

      {/* Arabic-inspired decorative arches */}
      <motion.svg
        className="absolute top-10 w-full h-32 opacity-20"
        viewBox="0 0 1000 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      >
        <path
          d="M0 200 Q 250 0 500 200 Q 750 0 1000 200"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M50 200 Q 275 50 500 200 Q 725 50 950 200"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
        />
      </motion.svg>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute left-8 top-8 w-24 h-24"
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
        className="absolute right-8 top-8 w-24 h-24"
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
        className="absolute left-8 bottom-8 w-24 h-24"
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
        className="absolute right-8 bottom-8 w-24 h-24"
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
          words="Reluxi Elite Concierge"
          className="mb-8"
          duration={0.8}
        />

        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-12"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{
            duration: 1.2,
            delay: 3.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <motion.p
          className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-cormorant tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          Always With You
        </motion.p>
      </div>
    </motion.div>
  );
}
