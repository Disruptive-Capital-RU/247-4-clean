"use client";

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, stagger, useAnimate } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { ServicesTextEffect } from "@/components/ui/services-text-effect";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [scope, animate] = useAnimate();

  // Handle plan selection
  const handlePlanSelect = (planName: string, planType: string, price: string, days?: number) => {
    const params = new URLSearchParams();
    params.append('planName', planName);
    params.append('planType', planType);
    params.append('price', price);
    if (days) params.append('days', days.toString());
    
    router.push(`/cart?${params.toString()}`);
  };

  useEffect(() => {
    // The intro animation will show for 5 seconds before fading out
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5 seconds for the animation duration

    return () => clearTimeout(timer);
  }, []);

  // Animate items once content is shown and within the scope
  useEffect(() => {
    if (showContent) {
      // No need for setTimeout or querySelectorAll check when using scope
      // Framer Motion handles timing within the scoped element.
      animate(
        ".animate-item",
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [showContent, animate]); // Keep dependencies

  return (
    <main className="min-h-screen bg-black text-white">
      {!showContent && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 4.2 }}
          onAnimationComplete={() => {}}
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
              words="Concierge Service Plans"
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
              Freedom, Perfected
            </motion.p>
          </div>
        </motion.div>
      )}

      {showContent && (
        <div ref={scope} className="flex flex-col pt-24">
          <Navigation />

          {/* Hero Section */}
          <section className="relative pt-28 pb-16 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
                  {t("planOverview")}
                  <span className="text-[#D4AF37]"> — {t("freedom")}</span>
                </h1>
              </motion.div>
            </div>
          </section>

          {/* Pricing Content */}
          <section className="py-12 bg-black">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* What You Receive Section */}
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-cormorant font-semibold text-white mb-6">
                    {t("whatYouReceive")}
                  </h2>
                  <p className="font-dm-sans text-lg text-white/80 mb-8">
                    {t("planDescription")}
                  </p>
                </div>

                {/* Plan Overview */}
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-cormorant font-semibold text-white mb-8 text-center">
                    {t("planOverview")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 3 Day Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-cormorant font-bold text-white mb-2">3 Day Plan</h3>
                        <div className="mb-4">
                          <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">$36</p>
                          <p className="text-sm font-dm-sans text-white/70">($12/day)</p>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                        <div className="mb-4">
                          <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Ideal For</h4>
                          <p className="font-dm-sans text-white/90">Weekend escapes, romantic city breaks</p>
                        </div>
                        <button 
                          onClick={() => handlePlanSelect("7 Day Plan", "Multi-Day Plan", "$63", 7)}
                          className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                        >
                          {t("selectPlan") || "Select Plan"}
                        </button>
                      </div>
                    </div>

                    {/* 5 Day Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-cormorant font-bold text-white mb-2">5 Day Plan</h3>
                        <div className="mb-4">
                          <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">$50</p>
                          <p className="text-sm font-dm-sans text-white/70">($10/day)</p>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                        <div className="mb-4">
                          <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Ideal For</h4>
                          <p className="font-dm-sans text-white/90">Leisure travel, business-stay support</p>
                        </div>
                        <button 
                          onClick={() => handlePlanSelect("7 Day Plan", "Multi-Day Plan", "$63", 7)}
                          className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                        >
                          {t("selectPlan") || "Select Plan"}
                        </button>
                      </div>
                    </div>

                    {/* 7 Day Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-cormorant font-bold text-white mb-2">7 Day Plan</h3>
                        <div className="mb-4">
                          <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">$63</p>
                          <p className="text-sm font-dm-sans text-white/70">($9/day)</p>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                        <div className="mb-4">
                          <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Ideal For</h4>
                          <p className="font-dm-sans text-white/90">Long vacations, events, or premium hospitality</p>
                        </div>
                        <button 
                          onClick={() => handlePlanSelect("7 Day Plan", "Multi-Day Plan", "$63", 7)}
                          className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                        >
                          {t("selectPlan") || "Select Plan"}
                        </button>
                      </div>
                    </div>

                    {/* Customizable Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-cormorant font-bold text-white mb-2">Customizable Plan</h3>
                        <div className="mb-4">
                          <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">Custom</p>
                          <p className="text-sm font-dm-sans text-white/70">Pricing upon request</p>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                        <div className="mb-4">
                          <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Ideal For</h4>
                          <p className="font-dm-sans text-white/90">High-net-worth individuals, business delegations, VIP events</p>
                        </div>
                        <button 
                          onClick={() => router.push('/contact')}
                          className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                        >
                          {t("contactUs") || "Contact Us"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* One-Day Premium Plans */}
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6 text-center">
                      {t("oneDayPremiumPlans") || "One-Day Premium Plans"}
                      <span className="text-[#D4AF37]"> — {t("everyDetailMasterfully") || "Every Detail, Masterfully Orchestrated"}</span>
                    </h2>
                    <p className="font-dm-sans text-lg text-white/80 mb-8 text-center max-w-4xl mx-auto">
                      When time is limited but the occasion demands perfection, our One-Day Premium Plans offer a level of care, style, and execution that transforms ordinary moments into flawless experiences. 
                      Whether it's a romantic escape or an important business meeting, we deliver an atmosphere of ease, elegance, and complete control — all in just one day.
                    </p>

                    <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-white mb-4 text-center">
                      What's Included in Each Plan:
                    </h3>
                    <p className="font-dm-sans text-lg text-white/80 mb-8 text-center max-w-3xl mx-auto">
                      All plans include personalized coordination, real-time support, and exclusive access — ensuring your day flows effortlessly from start to finish.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                      {/* Date Plan Card */}
                      <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-cormorant font-bold text-white mb-2">Date Plan (1 Day)</h3>
                          <div className="mb-4">
                            <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">$20</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 text-sm">Romantic escapes, anniversaries, private proposals, or memorable first impressions</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Key Services</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm font-dm-sans text-white/90">
                              <li>Romantic venue selection</li>
                              <li>Custom floral arrangements or gifts</li>
                              <li>Elegant dinner reservation</li>
                              <li>Travel arrangements (e.g., taxi premium)</li>
                            </ul>
                            <p className="mt-2 text-white/70 italic text-xs">Prefer a spa instead of flowers? Simply let us know — every detail is tailorable.</p>
                          </div>
                          
                          <button 
                            onClick={() => router.push(`/cart?planName=Date Plan&planType=One-Day Premium Plan&price=$20&days=1`)}
                            className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("selectPlan") || "Select Plan"}
                          </button>
                        </div>
                      </div>

                      {/* Business Meeting Plan Card */}
                      <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-cormorant font-bold text-white mb-2">Business Meeting Plan (1 Day)</h3>
                          <div className="mb-4">
                            <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">$100</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 text-sm">High-stakes meetings, investor presentations, product launches, or confidential briefings</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Key Services</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm font-dm-sans text-white/90">
                              <li>Premium venue booking</li>
                              <li>Professional tech setup (screens, projectors, high-speed Wi-Fi)</li>
                              <li>Full catering or Michelin-level restaurant booking</li>
                              <li>On-site assistant & coordination</li>
                            </ul>
                            <p className="mt-2 text-white/70 italic text-xs">Have special dietary needs or a different setup in mind? We're flexible.</p>
                          </div>
                          
                          <button 
                            onClick={() => router.push(`/cart?planName=Date Plan&planType=One-Day Premium Plan&price=$20&days=1`)}
                            className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("selectPlan") || "Select Plan"}
                          </button>
                        </div>
                      </div>

                      {/* Customizable Plan Card */}
                      <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-cormorant font-bold text-white mb-2">Customizable Plan</h3>
                          <div className="mb-4">
                            <p className="text-2xl font-cormorant font-bold text-[#D4AF37] mb-1">Custom</p>
                            <p className="text-sm font-dm-sans text-white/70">Pricing upon request</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 text-sm">VIP-level custom events — board meetings, celebrations, press events, protocol visits</p>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Key Services</h4>
                            <p className="font-dm-sans text-white/90 text-sm">All services are fully tailored: from logistics to ambiance, security, cultural protocol, and beyond</p>
                          </div>
                          
                          <button 
                            onClick={() => router.push('/contact')}
                            className="w-full py-2 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("contactUs") || "Contact Us"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* À La Carte Services */}
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
                      À La Carte Services
                      <span className="text-[#D4AF37]"> — Spontaneity, Simplified</span>
                    </h2>
                    <p className="font-dm-sans text-lg text-white/80 mb-8">
                      Not ready for a plan? No problem. Whether it's a last-minute dinner reservation, a luxury car, or VIP access — we're here to assist.<br />
                      <strong>Simply request the service you need — and we'll arrange it for a flat $5 commission.</strong>
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">How It Works</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">Pay-per-request concierge service — no plan needed</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Commission Fee</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">$5 per fulfilled request</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Ideal For</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">One-off bookings (e.g., restaurant, taxi, event ticket, courier)</td>
                          </tr>
                          <tr>
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Delivery Time</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">Fast turnaround & real-time coordination</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-8 animate-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                  <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
                    {t("readyToExperience")}
                  </h2>
                  <p className="font-dm-sans text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                    {t("bookYourPersonal")}
                  </p>
                  <motion.a
                    href="/book"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium text-lg rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {t("bookYourConcierge")}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </main>
  );
}