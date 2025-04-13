"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight-new";
import { MovingBorder } from "@/components/ui/moving-border";
import {
  FaGem,
  FaUserShield,
  FaComments,
  FaGlobeAfrica,
  FaCalendarCheck,
  FaKey,
} from "react-icons/fa";

const advantages = [
  {
    icon: <FaGem className="w-6 h-6" />,
    title: "Uncompromising Quality",
    description:
      "Every detail is carefully considered and meticulously executed to provide the highest standard of service.",
  },
  {
    icon: <FaUserShield className="w-6 h-6" />,
    title: "Complete Discretion",
    description:
      "Your privacy is sacred. Our staff maintain absolute confidentiality about your activities and preferences.",
  },
  {
    icon: <FaComments className="w-6 h-6" />,
    title: "Fluent Arabic Service",
    description:
      "Communicate effortlessly with our Arabic-speaking concierges who understand your cultural expectations.",
  },
  {
    icon: <FaGlobeAfrica className="w-6 h-6" />,
    title: "Cultural Connection",
    description:
      "We bridge cultures, helping you navigate Moscow while honoring your traditions and preferences.",
  },
  {
    icon: <FaCalendarCheck className="w-6 h-6" />,
    title: "Instant Responsiveness",
    description:
      "Available 24/7 with immediate assistance, no matter the request or time of day.",
  },
  {
    icon: <FaKey className="w-6 h-6" />,
    title: "Exclusive Access",
    description:
      "We open doors to experiences unavailable to the general public through our extensive local networks.",
  },
];

interface AdvantageCardProps {
  advantage: typeof advantages[0];
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
        <p className="font-dm-sans text-white/70">
          {advantage.description}
        </p>
      </div>
    </div>
  );
};

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <Spotlight 
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(47, 69%, 52%, .08) 0, hsla(47, 69%, 52%, .02) 50%, hsla(47, 69%, 52%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(47, 69%, 52%, .06) 0, hsla(47, 69%, 52%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(47, 69%, 52%, .04) 0, hsla(47, 69%, 52%, .02) 80%, transparent 100%)"
          className="top-10 left-0" 
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
              We Don't Just Provide Service.
              <br />
              We Provide <span className="text-[#D4AF37]">Certainty</span>
            </h1>
            <p className="font-dm-sans text-lg md:text-xl text-white/80 mb-8">
              You don't need a schedule. You need a signal. Your concierge is
              more than a guide — they are your trusted presence in a foreign
              land.
            </p>
            <div className="flex justify-center">
              <a
                href="/book"
                className="font-dm-sans px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                Reserve Your Concierge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-b from-black to-black/95">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-cormorant italic text-white/90">
              <span className="text-[#D4AF37]">"</span>
              Even when you're far, you're close to my heart.
              <span className="text-[#D4AF37]">"</span>
            </p>
            <p className="mt-4 text-white/50 font-dm-sans">
              Inspired by Amr Diab's "Tamly Ma'ak"
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
              Why Choose <span className="text-[#D4AF37]">Reluxi</span>
            </h2>
            <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
              We elevate your Moscow experience through a commitment to
              excellence that goes beyond conventional concierge services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((advantage, index) => (
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

      {/* Philosophy Section */}
      <section className="py-16 bg-black/95 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/moscow-1556561_1920.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/90 to-black/90" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-8 text-center">
              Our Service <span className="text-[#D4AF37]">Philosophy</span>
            </h2>

            <div className="space-y-8">
              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-3">
                  You don't need a schedule. You need a signal.
                </h3>
                <p className="text-white/70">
                  Your concierge is more than a guide — they are your trusted
                  presence in a foreign land. They speak your language. They
                  sense your energy. No delays. No scripts. No compromises.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-3">
                  Your time is precious. Your trust is invaluable.
                </h3>
                <p className="text-white/70">
                  We honor both through perfect execution and unwavering
                  dedication. Every request is treated with the importance it
                  deserves, no matter how large or small.
                </p>
              </div>

              <div className="p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md">
                <h3 className="text-xl font-cormorant text-white mb-3">
                  Luxury isn't just what we provide. It's how we think.
                </h3>
                <p className="text-white/70">
                  True luxury is invisible until you need it. It's the secure
                  feeling that everything is taken care of. It's having someone
                  who understands your unspoken needs.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 italic text-white/80">
              <p className="text-xl font-cormorant">
                "We are with you — always."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-4">
              Ready for <span className="text-[#D4AF37]">True Luxury</span>?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Begin your journey with us today. Our concierge team is ready to
              create an experience perfectly tailored to your needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="/book"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                Book Your Concierge
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
