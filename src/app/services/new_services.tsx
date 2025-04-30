"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, stagger, useAnimate, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { ServicesTextEffect } from "@/components/ui/services-text-effect";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function ServicesPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [scope, animate] = useAnimate();

  // State to track if sections are expanded (single state for all sections)
  const [sectionsExpanded, setSectionsExpanded] = useState(false);

  // Import auth hook at the top of the file
  const { user } = useAuth();

  // Handle plan selection based on authentication status
  const handlePlanSelect = (
    planName: string,
    planType: string,
    price: string,
    days?: number
  ) => {
    // Check if user is logged in
    if (!user) {
      // User is not logged in, redirect to booking menu
      router.push("/book");
      return;
    }

    // User is logged in, redirect to dashboard and automatically trigger message concierge
    router.push("/dashboard?openChat=true");

    // Store selected plan info in localStorage for reference
    const planInfo = {
      planName,
      planType,
      price,
      days,
      selectedAt: new Date().toISOString(),
    };
    localStorage.setItem("selectedPlan", JSON.stringify(planInfo));
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

          <div className="text-center px-4 relative z-30 max-w-5xl mx-auto">
            <ServicesTextEffect
              words={t("howWeServeYou")}
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
              {t("freedom")}
            </motion.p>
          </div>
        </motion.div>
      )}

      {showContent && (
        <div ref={scope} className="flex flex-col pt-24">
          <Navigation />

          {/* Content Section with reduced spacing */}
          <section className="pt-8 bg-black">
            <div className="container mx-auto px-2 md:px-4">
              <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main title */}
                <div className="mb-8 text-center">
                  <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-white mb-6">
                    {t("howWe")} {t("serve")}{" "}
                    <span className="text-[#D4AF37]">{t("you")}</span>
                  </h1>
                </div>

                {/* Main content section */}
                <div className="mb-16">
                  <p className="font-dm-sans text-lg text-white/80 mb-8 text-center">
                    {t("planDescription")}
                  </p>
                </div>

                {/* Plans Overview */}
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* One-Day Experience */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">
                            {t("oneDayExperience")}
                          </h3>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">
                              {t("oneDayPrice")}
                            </p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>

                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("designedFor")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("oneDayDesignedFor")}
                            </p>

                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("whatYouGet")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("oneDayWhatYouGet")}
                            </p>

                            <div className="mb-4">
                              <button
                                onClick={() =>
                                  setSectionsExpanded(!sectionsExpanded)
                                }
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">
                                  {t("examplesInclude")}
                                </h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? "−" : "+"}
                                </span>
                              </button>

                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>{t("oneDayExample1")}</li>
                                        <li>{t("oneDayExample2")}</li>
                                        <li>{t("oneDayExample3")}</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">
                                        {t("oneDayExampleFooter")}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button
                            onClick={() =>
                              handlePlanSelect(
                                t("oneDayExperience"),
                                t("oneDayPlan"),
                                t("oneDayPrice")
                              )
                            }
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("requestOneDayPlan")}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3-Day Concierge Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">
                            {t("threeDayPlan")}
                          </h3>
                          <div className="inline-block bg-[#D4AF37]/20 px-3 py-1 rounded-full mb-3">
                            <span className="text-xs font-dm-sans text-[#D4AF37] font-medium whitespace-nowrap">
                              {t("mostPopular")}
                            </span>
                          </div>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">
                              {t("threeDayPrice")}
                            </p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>

                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("designedFor")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("threeDayDesignedFor")}
                            </p>

                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("whatYouGet")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("threeDayWhatYouGet")}
                            </p>

                            <div className="mb-4">
                              <button
                                onClick={() =>
                                  setSectionsExpanded(!sectionsExpanded)
                                }
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">
                                  {t("includes")}
                                </h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? "−" : "+"}
                                </span>
                              </button>

                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>{t("threeDayInclude1")}</li>
                                        <li>{t("threeDayInclude2")}</li>
                                        <li>{t("threeDayInclude3")}</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">
                                        {t("threeDayIncludeFooter")}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button
                            onClick={() =>
                              handlePlanSelect(
                                t("threeDayPlan"),
                                t("multiDayPlan"),
                                t("threeDayPrice"),
                                3
                              )
                            }
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("startThreeDayPlan")}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Membership */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">
                            {t("monthlyMembership")}
                          </h3>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">
                              {t("monthlyPrice")}
                            </p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>

                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("designedFor")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("monthlyDesignedFor")}
                            </p>

                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">
                              {t("whatYouGet")}
                            </h4>
                            <p className="font-dm-sans text-white/90 mb-4">
                              {t("monthlyWhatYouGet")}
                            </p>

                            <div className="mb-4">
                              <button
                                onClick={() =>
                                  setSectionsExpanded(!sectionsExpanded)
                                }
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">
                                  {t("includes")}
                                </h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? "−" : "+"}
                                </span>
                              </button>

                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>{t("monthlyInclude1")}</li>
                                        <li>{t("monthlyInclude2")}</li>
                                        <li>{t("monthlyInclude3")}</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">
                                        {t("monthlyIncludeFooter")}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button
                            onClick={() =>
                              handlePlanSelect(
                                t("monthlyMembership"),
                                t("membership"),
                                t("monthlyPrice")
                              )
                            }
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            {t("becomeAMember")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Requests */}
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
                      {t("quickRequests")}
                      <span className="text-[#D4AF37]">
                        {" "}
                        — {t("oneTaskHandledFast")}
                      </span>
                    </h2>
                    <p className="font-dm-sans text-lg text-white/80 mb-8">
                      {t("quickRequestsDescription")}
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">
                              {t("howItWorks")}
                            </td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">
                              {t("quickRequestsHowItWorks")}
                            </td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">
                              {t("commissionFee")}
                            </td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">
                              {t("quickRequestsFee")}
                            </td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">
                              {t("idealFor")}
                            </td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">
                              {t("quickRequestsIdealFor")}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">
                              {t("deliveryTime")}
                            </td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">
                              {t("quickRequestsDeliveryTime")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 text-center">
                      <button
                        onClick={() => {
                          if (!user) {
                            // User is not logged in, redirect to booking menu
                            router.push("/book");
                          } else {
                            // User is logged in, redirect to dashboard and trigger message concierge
                            router.push("/dashboard?openChat=true");
                          }
                        }}
                        className="px-8 py-3 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                      >
                        {t("requestABooking")}
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <div
                  className="text-center py-8 animate-item"
                  style={{ opacity: 0, transform: "translateY(20px)" }}
                >
                  <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
                    {t("readyToEnjoyTrip")}
                  </h2>
                  <p className="font-dm-sans text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                    {t("reluxiSavesYouHours")}
                  </p>
                  <motion.button
                    onClick={() => {
                      if (!user) {
                        // User is not logged in, redirect to booking menu
                        router.push("/book");
                      } else {
                        // User is logged in, redirect to dashboard and trigger message concierge
                        router.push("/dashboard?openChat=true");
                      }
                    }}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium text-lg rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {t("bookYourConcierge")}
                  </motion.button>
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
