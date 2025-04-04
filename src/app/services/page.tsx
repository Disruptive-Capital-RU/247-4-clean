"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  FaLock,
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaHeartbeat,
  FaGlassMartiniAlt,
  FaLandmark,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { ServicesTextEffect } from "@/components/ui/services-text-effect";

export default function ServicesPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay showing the main content until after the intro animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5 seconds for the animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {!showContent && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          onAnimationComplete={() => setShowContent(true)}
        >
          {/* Gold accent lines */}
          <motion.div
            className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />

          <motion.div
            className="absolute left-1/4 top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
          />

          <motion.div
            className="absolute right-1/4 top-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />

          <div className="text-center px-4 relative z-30 max-w-4xl mx-auto">
            <ServicesTextEffect
              words="Our Elite Services"
              className="mb-8"
              duration={0.8}
            />

            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-12"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{
                duration: 1.2,
                delay: 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            <motion.p
              className="mt-8 text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
            >
              Luxury concierge services for the elite
            </motion.p>
          </div>
        </motion.div>
      )}

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AuroraBackground
            showRadialGradient={true}
            className="h-[70vh] opacity-60"
          >
            <div className="hidden">placeholder</div>
          </AuroraBackground>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
              Our Elite <span className="text-[#D4AF37]">Services</span>
            </h1>
            <p className="font-dm-sans text-lg md:text-xl text-white/80">
              24/7 is your private gateway to everything Moscow offers — without
              noise, delay, or compromise. We specialize in anticipating your
              desires before you express them.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          {/* VIP Shopping */}
          <ServiceDetail
            icon={<FaShoppingBag className="w-8 h-8" />}
            title="VIP Shopping"
            description="Private access to Moscow's most prestigious boutiques. Arabic-speaking stylists. Exclusive time slots."
            details={[
              "Skip-the-line access to GUM, TSUM, and Vremena Goda luxury galleries",
              "Personal stylist who speaks Arabic fluently",
              "After-hours private shopping experiences",
              "VIP rooms and personalized consultations",
              "Assistance with tax-free shopping and international shipping",
            ]}
            imageSrc="/images/moscow-3010344_1920.jpg"
            reverse={false}
          />

          {/* High-End Dining */}
          <ServiceDetail
            icon={<FaUtensils className="w-8 h-8" />}
            title="High-End Dining"
            description="Guaranteed tables in Moscow's most in-demand restaurants. Chefs prepared for your preferences."
            details={[
              "Priority reservations at Michelin-starred and elite restaurants",
              "Halal dining options at premium establishments",
              "Chef's table experiences and personalized menu creation",
              "Private dining rooms and discreet service",
              "Dietary preferences communicated in advance to kitchen staff",
            ]}
            imageSrc="/images/downtown-7142516_1920.jpg"
            reverse={true}
          />

          {/* Chauffeured Vehicles */}
          <ServiceDetail
            icon={<FaCar className="w-8 h-8" />}
            title="Chauffeured Vehicles"
            description="Black Mercedes, S-Class, Maybach. Professionally trained drivers. Fully discreet. Hourly or daily."
            details={[
              "Luxury fleet of Mercedes S-Class, Maybach, and armored vehicles when required",
              "Professional security-trained drivers who maintain absolute discretion",
              "Arabic-speaking chauffeurs available on request",
              "24/7 on-call service with no waiting times",
              "Luxury airport transfers with VIP terminal access",
            ]}
            imageSrc="/images/moscow-4332695.jpg"
            reverse={false}
          />

          {/* Private Cultural Tours */}
          <ServiceDetail
            icon={<FaLandmark className="w-8 h-8" />}
            title="Private Cultural Tours"
            description="Unlock access to palaces, museums, and Islamic heritage sites with elite guides and interpreters."
            details={[
              "Private after-hours access to the Kremlin, Bolshoi Theater, and major museums",
              "Expert guides with specialization in Islamic art and architecture",
              "Exclusive tours of Moscow's historical mosques and cultural centers",
              "Personalized cultural itineraries based on your specific interests",
              "VIP access to sold-out performances and cultural events",
            ]}
            imageSrc="/images/the-kremlin-3872941_1920.jpg"
            reverse={true}
          />

          {/* Personal Protection */}
          <ServiceDetail
            icon={<FaLock className="w-8 h-8" />}
            title="Personal Protection"
            description="Trained executive protection upon request. For those whose privacy and safety are non-negotiable."
            details={[
              "Discreet, professionally trained security personnel",
              "Close protection officers with international experience",
              "Pre-visit security assessments of venues and locations",
              "Secure transportation with defensive driving capabilities",
              "Coordination with local authorities when necessary",
            ]}
            imageSrc="/images/moscow-1029667_1920.jpg"
            reverse={false}
          />

          {/* Health & Wellness */}
          <ServiceDetail
            icon={<FaHeartbeat className="w-8 h-8" />}
            title="Health & Wellness"
            description="Exclusive clinics, VIP access to medical care, cosmetic specialists, and spa recovery — without waiting lists."
            details={[
              "Priority access to Moscow's elite medical specialists and facilities",
              "Luxury wellness retreats and premium spa experiences",
              "In-suite massage and wellness services at your accommodation",
              "Nutritionist and personal trainer arrangements",
              "Medical interpreting services for all appointments",
            ]}
            imageSrc="/images/hd-wallpapers-7289497_1920.jpg"
            reverse={true}
          />

          {/* Nightlife & Events */}
          <ServiceDetail
            icon={<FaGlassMartiniAlt className="w-8 h-8" />}
            title="Nightlife & Events"
            description="Entry into closed circles, high society gatherings, and events no tourist can reach."
            details={[
              "VIP table reservations at Moscow's most exclusive clubs",
              "Access to private parties and invitation-only events",
              "Connections to Moscow's high society gatherings",
              "Personal host and concierge throughout the evening",
              "Discreet transportation and security arrangements",
            ]}
            imageSrc="/images/monument-6387465_1920.jpg"
            reverse={false}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-[#111]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
            Experience Moscow Like Never Before
          </h2>
          <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Book your personal concierge and unlock a world of exclusive
            experiences.
          </p>
          <a
            href="/book"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            Reserve Your Concierge
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ServiceDetail({
  icon,
  title,
  description,
  details,
  imageSrc,
  reverse,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  imageSrc: string;
  reverse: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-12 items-center my-16 md:my-24`}
    >
      <div className="w-full md:w-1/2">
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-[#D4AF37]">{icon}</div>
          <h3 className="text-2xl md:text-3xl font-cormorant font-bold text-white">
            {title}
          </h3>
        </div>

        <p className="font-dm-sans text-lg text-white/80">{description}</p>

        <ul className="space-y-3 font-dm-sans">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">•</span>
              <span className="text-white/70">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
