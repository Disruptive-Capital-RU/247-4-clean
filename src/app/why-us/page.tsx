"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MovingBorder } from "@/components/ui/moving-border";
import { useLanguage } from "@/lib/LanguageContext";
import { FaComments, FaCalendarCheck, FaKey } from "react-icons/fa";

const advantages = [
  {
    icon: <FaCalendarCheck className="w-6 h-6" />,
    title: "Always-On Support",
    description:
      "We handle your plans with speed, care, and quiet consistency — 24/7. Most of our clients never travel without us again.",
  },
  {
    icon: <FaComments className="w-6 h-6" />,
    title: "Effortless Communication",
    description:
      "Most clients send one message — we take it from there. No apps, no calls, no back-and-forth. Just smooth, immediate support when you need it.",
  },
  {
    icon: <FaKey className="w-6 h-6" />,
    title: "Tailored Access",
    description:
      "We don&apos;t just book what&apos;s available. We arrange what brings the trip you&apos;ve been wishing for to life — thoughtfully and precisely.",
  },
];

interface AdvantageCardProps {
  advantage: (typeof advantages)[0];
  index: number;
}

const AdvantageCard = ({ advantage }: AdvantageCardProps) => {
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
          relative z-10 h-full bg-black/40 backdrop-blur-sm 
          border ${isHovered ? "border-[#D4AF37]/30" : "border-white/10"} 
          p-6 rounded-xl group transition-all duration-300
        `}
      >
        <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
          {advantage.icon}
        </div>
        <h3 className="text-xl font-cormorant font-semibold text-white mb-3">
          {advantage.title}
        </h3>
        <p className="font-dm-sans text-white/70">{advantage.description}</p>
      </div>
    </div>
  );
};

export default function WhyUsPage() {
  const { t } = useLanguage();

  const translatedAdvantages = [
    {
      icon: <FaCalendarCheck className="w-6 h-6" />,
      title: t("alwaysOnSupport") || "Always-On Support",
      description:
        t("alwaysOnSupportDesc") ||
        "We handle your plans with speed, care, and quiet consistency — 24/7. Most of our clients never travel without us again.",
    },
    {
      icon: <FaComments className="w-6 h-6" />,
      title: t("effortlessCommunication") || "Effortless Communication",
      description:
        t("effortlessCommunicationDesc") ||
        "Most clients send one message — we take it from there. No apps, no calls, no back-and-forth. Just smooth, immediate support when you need it.",
    },
    {
      icon: <FaKey className="w-6 h-6" />,
      title: t("tailoredAccess") || "Tailored Access",
      description:
        t("tailoredAccessDesc") ||
        "We don't just book what's available. We arrange what brings the trip you've been wishing for to life — thoughtfully and precisely.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main content starts directly with Advantages Section */}

      {/* Advantages Section */}
      <section className="pt-32 pb-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
              {t("whyChooseReluxi") || "Why Choose "}
              <span className="text-[#D4AF37]"> Reluxi</span>
            </h2>
            <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
              {t("whyChooseReluxiDesc") ||
                "Reluxi is more than a concierge — it&apos;s your trusted presence in a foreign city. With too many options, not enough time, and no one to filter the noise, we&apos;re here to guide, simplify, and support. Our mission is to remove the stress and friction of unfamiliar places, so every moment feels purposeful, cared for, and entirely your own."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {translatedAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AdvantageCard advantage={advantage} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Testimonial Box Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-10 border border-[#D4AF37]/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden relative">
              {/* Subtle gold gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-30 z-0"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[#D4AF37] mb-6 text-center">
                  {t("trustedByThoseWhoDeserveMore") ||
                    "Trusted by Those Who Deserve More"}
                </h2>

                <div className="space-y-4 font-dm-sans text-white/80 max-w-3xl mx-auto text-center">
                  <p>
                    {t("trustedByDesc1") ||
                      "From international travelers and public figures to entrepreneurs, diplomats, and creatives — Reluxi is the quiet constant behind their time in Moscow."}
                  </p>
                  <p>
                    {t("trustedByDesc2") ||
                      "They come for the reputation, stay for the peace of mind, and return because no one understands them quite like we do."}
                  </p>
                  <p className="italic">
                    {t("trustedByDesc3") ||
                      "This isn&apos;t just a service you try — it&apos;s one you come to rely on."}
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <a
                      href="/book"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                    >
                      {t("bookYourConcierge") || "Book Your Concierge"}
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
