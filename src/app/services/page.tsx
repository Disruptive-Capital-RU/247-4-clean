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
  const handlePlanSelect = (planName: string, planType: string, price: string, days?: number) => {
    // Check if user is logged in
    if (!user) {
      // User is not logged in, redirect to booking menu
      router.push('/book');
      return;
    }
    
    // User is logged in, redirect to dashboard and automatically trigger message concierge
    router.push('/dashboard?openChat=true');
    
    // Store selected plan info in localStorage for reference
    const planInfo = {
      planName,
      planType,
      price,
      days,
      selectedAt: new Date().toISOString()
    };
    localStorage.setItem('selectedPlan', JSON.stringify(planInfo));
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
              words="How We Serve You"
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

          {/* Content Section with reduced spacing */}
          <section className="pt-8 bg-black">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div 
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main title */}
                <div className="mb-8 text-center">
                  <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-white mb-6">
                    How We <span className="text-[#D4AF37]">Serve</span> You
                  </h1>
                </div>
                
                {/* Main content section */}
                <div className="mb-16">
                  <p className="font-dm-sans text-lg text-white/80 mb-8">
                    {t("planDescription")}
                  </p>
                </div>

                {/* Plans Overview */}
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* One-Day Experience */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">One-Day Experience</h3>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">$75</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 mb-4">Special occasions, business needs, or quality time with family — when one day deserves to be perfectly handled.</p>
                            
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">What You Get</h4>
                            <p className="font-dm-sans text-white/90 mb-4">A curated one-day experience tailored around your goals — personal or professional. We handle the bookings, timing, and flow so your day feels effortless.</p>
                            
                            <div className="mb-4">
                              <button 
                                onClick={() => setSectionsExpanded(!sectionsExpanded)}
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">Examples Include</h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? '−' : '+'}
                                </span>
                              </button>
                              
                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>A romantic evening with private transport, dinner reservations, and a floral surprise</li>
                                        <li>A family day with thoughtfully planned activities, cultural visits, and group-friendly dining — all arranged to keep the day flowing with ease</li>
                                        <li>A business day with meeting space bookings, restaurant coordination, and transport between locations</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">Tell us the kind of day you need — and we'll make it seamless.</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button 
                            onClick={() => handlePlanSelect("One-Day Experience", "One-Day Plan", "$75")}
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            Request One-Day Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 3-Day Concierge Plan */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div className="absolute top-10 right-2 bg-[#D4AF37]/20 px-3 py-1 rounded-full">
                          <span className="text-xs font-dm-sans text-[#D4AF37] font-medium">Most Popular</span>
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">3-Day Concierge Plan</h3>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">$139</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 mb-4">Short getaways, city breaks, or visitors who want complete support without long-term commitment.</p>
                            
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">What You Get</h4>
                            <p className="font-dm-sans text-white/90 mb-4">Three full days of unlimited, personalized concierge assistance — available at any hour. Ideal for those who want to experience the best of Moscow without stress or planning.</p>
                            
                            <div className="mb-4">
                              <button 
                                onClick={() => setSectionsExpanded(!sectionsExpanded)}
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">Includes</h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? '−' : '+'}
                                </span>
                              </button>
                              
                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>24/7 concierge access via your preferred messaging app</li>
                                        <li>Booking & coordination across dining, transport, wellness, events, and more</li>
                                        <li>Option to add additional days for $39/day — same service, same ease</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">Start your journey with Reluxi — and experience how effortless travel can feel.</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button 
                            onClick={() => handlePlanSelect("3-Day Concierge Plan", "Multi-Day Plan", "$139", 3)}
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            Start 3-Day Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Membership */}
                    <div className="animate-item relative bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#D4AF37] hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div>
                          <h3 className="text-xl md:text-2xl font-cormorant font-bold text-white mb-2">Monthly Membership</h3>
                          <div className="mb-4">
                            <p className="text-xl font-cormorant font-bold text-[#D4AF37] mb-1">$339/month</p>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">Designed For</h4>
                            <p className="font-dm-sans text-white/90 mb-4">Frequent travelers, busy professionals, and city residents who want continuous access to Reluxi's full support.</p>
                            
                            <h4 className="text-sm font-dm-sans font-medium text-white/80 mb-2">What You Get</h4>
                            <p className="font-dm-sans text-white/90 mb-4">Unlimited monthly concierge access with a dedicated point of contact who learns your preferences and adapts to your rhythm.</p>
                            
                            <div className="mb-4">
                              <button 
                                onClick={() => setSectionsExpanded(!sectionsExpanded)}
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h4 className="text-sm font-dm-sans font-medium text-white/80">Includes</h4>
                                <span className="text-[#D4AF37]">
                                  {sectionsExpanded ? '−' : '+'}
                                </span>
                              </button>
                              
                              <AnimatePresence>
                                {sectionsExpanded && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 pl-1 border-l border-[#D4AF37]/30">
                                      <ul className="font-dm-sans text-white/90 mb-4 list-disc pl-5 space-y-2">
                                        <li>24/7 availability with no limitations</li>
                                        <li>Personalized planning across daily life, travel, dining, and more</li>
                                        <li>Consistent care and service across multiple trips or ongoing needs</li>
                                      </ul>
                                      <p className="font-dm-sans text-white/90">Enjoy continuous, elevated support — no matter how often you need us.</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <button 
                            onClick={() => handlePlanSelect("Monthly Membership", "Membership", "$339")}
                            className="w-full py-3 mt-4 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                          >
                            Become a Member
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
                      Quick Requests
                      <span className="text-[#D4AF37]"> — One Task, Handled Fast</span>
                    </h2>
                    <p className="font-dm-sans text-lg text-white/80 mb-8">
                      Text us your request — we&apos;ll confirm it for a flat $5 commission. Perfect for spontaneous needs or first-time users who want to try Reluxi — one message at a time.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">How It Works</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">Pay-per-request concierge service — no plan required</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Commission Fee</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">$5 per fulfilled request</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Ideal For</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">One-off bookings (e.g., restaurant, transportation, event tickets, courier)</td>
                          </tr>
                          <tr>
                            <td className="py-4 px-2 font-dm-sans font-medium text-white">Delivery Time</td>
                            <td className="py-4 px-2 font-dm-sans text-white/90">Everything arranged within minutes — smooth, fast, and confirmed in real time</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <button 
                        onClick={() => {
                          if (!user) {
                            // User is not logged in, redirect to booking menu
                            router.push('/book');
                          } else {
                            // User is logged in, redirect to dashboard and trigger message concierge
                            router.push('/dashboard?openChat=true');
                          }
                        }}
                        className="px-8 py-3 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-white font-dm-sans text-sm transition-all duration-300 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20"
                      >
                        Request a Booking
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-8 animate-item" style={{ opacity: 0, transform: 'translateY(20px)' }}>
                  <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-6">
                    Ready to Actually Enjoy Your Trip — Without Wasting Time or Energy?
                  </h2>
                  <p className="font-dm-sans text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                    Reluxi saves you hours of searching and planning. You focus on the experience — we&apos;ll handle everything else.
                  </p>
                  <motion.button
                    onClick={() => {
                      if (!user) {
                        // User is not logged in, redirect to booking menu
                        router.push('/book');
                      } else {
                        // User is logged in, redirect to dashboard and trigger message concierge
                        router.push('/dashboard?openChat=true');
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