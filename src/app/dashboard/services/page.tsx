"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import {
  IconWifi,
  IconWorld,
  IconShieldLock,
  IconCurrencyDollar,
  IconPhone,
  IconBuildingBank,
  IconHeart,
  IconAlertCircle,
  IconBolt,
  IconDeviceMobile,
} from "@tabler/icons-react";

export default function AccessSuiteServices() {
  const serviceCategories = [
    {
      title: "eSIM Activation",
      description:
        "Instant activation of local eSIMs for reliable data connectivity throughout Russia.",
      icon: <IconDeviceMobile className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1",
    },
    {
      title: "VPN Setup Guidance",
      description:
        "Step-by-step assistance in configuring secure VPN connections for unrestricted internet access.",
      icon: <IconShieldLock className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1",
    },
    {
      title: "Local Health Support",
      description:
        "Access to English-speaking medical specialists and premium healthcare facilities with priority booking.",
      icon: <IconHeart className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1",
    },
    {
      title: "Currency Exchange",
      description:
        "Real-time information on currency exchange locations with the best rates across major Russian cities.",
      icon: <IconCurrencyDollar className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Emergency Numbers",
      description:
        "Comprehensive list of emergency contacts and services with instructions in multiple languages.",
      icon: <IconAlertCircle className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1",
    },
    {
      title: "Embassy Contacts",
      description:
        "Direct access to your country's embassy and consular services for urgent assistance and documentation.",
      icon: <IconBuildingBank className="h-8 w-8 text-[#D4AF37]" />,
      className: "md:col-span-1",
    },
  ];

  const quickLinks = [
    {
      title: "eSIM Fast Track",
      description: "Express activation - get online in under 5 minutes",
      icon: <IconBolt className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "WiFi Hotspots",
      description: "Map of verified secure WiFi locations across major cities",
      icon: <IconWifi className="h-8 w-8 text-[#D4AF37]" />,
    },
    {
      title: "Global Roaming",
      description: "International calling packages with reduced rates",
      icon: <IconWorld className="h-8 w-8 text-[#D4AF37]" />,
    },
  ];

  const handleRequestAssistance = (service: string) => {
    // This would typically integrate with a contact system
    alert(
      `Assistance requested for ${service}. A concierge representative will contact you shortly.`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-6 bg-gradient-to-b from-black to-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-cormorant font-semibold text-white mb-2">
            Access <span className="text-[#D4AF37]">Suite</span>
          </h1>
          <p className="text-white/80 text-lg max-w-3xl">
            Essential digital and practical services every tourist in Russia
            needs. Request immediate assistance with any of our offerings below.
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <BentoGrid>
            {serviceCategories.map((service, i) => (
              <BentoGridItem
                key={i}
                title={service.title}
                description={
                  <div>
                    <p className="mb-4">{service.description}</p>
                    <button
                      onClick={() => handleRequestAssistance(service.title)}
                      className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-md transition-colors border border-[#D4AF37]/30"
                    >
                      Request Assistance
                    </button>
                  </div>
                }
                icon={service.icon}
                className={service.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-[#111]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-cormorant font-semibold mb-8">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] hover:bg-[#222] border border-white/10 rounded-xl p-6 transition-all hover:border-[#D4AF37]/30"
              >
                <div className="mb-4">{link.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-white/70 mb-4">{link.description}</p>
                <button
                  onClick={() => handleRequestAssistance(link.title)}
                  className="px-4 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-md transition-colors border border-[#D4AF37]/30"
                >
                  Access Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
