"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@supabase/supabase-js";

export default function CheckoutPage() {
  // We'll use the language module later when adding translations
  const { } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [planDetails, setPlanDetails] = useState<any>(null);

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuthStatus = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
      
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      // If not authenticated, redirect to booking/registration
      if (!data.session) {
        // Store current path in session storage to return after authentication
        sessionStorage.setItem("redirectAfterAuth", "/checkout");
        router.push("/book");
        return;
      }
      
      // Try to get plan details from session storage
      try {
        const storedPlan = sessionStorage.getItem("selectedPlan");
        if (storedPlan) {
          setPlanDetails(JSON.parse(storedPlan));
        }
      } catch (error) {
        console.error("Error retrieving plan details:", error);
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <div className="text-center">
            <div className="h-12 w-12 border-t-2 border-r-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Processing your order...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!isAuthenticated) {
    // This should not happen due to the redirect in useEffect, but just in case
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Checkout Confirmation Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
              Order Complete
              <span className="text-[#D4AF37]"> — Welcome to Excellence</span>
            </h1>
          </motion.div>
        </div>
      </section>
      
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Confirmation Message */}
            <div className="mb-12">
              <div className="relative bg-black/30 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-[#D4AF37] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <span className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-4 text-center">
                    Your Concierge Service is Ready
                  </h2>
                  
                  <p className="font-dm-sans text-lg text-white/80 mb-6 text-center">
                    Thank you for choosing our premium concierge service. Your order has been confirmed 
                    and our team has been notified to prepare for your experience.
                  </p>
                  
                  {planDetails && (
                    <div className="bg-white/5 p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-cormorant font-semibold text-white mb-2">Plan Selected:</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-dm-sans text-white/90">{planDetails.planName}</p>
                          <p className="font-dm-sans text-sm text-white/70">{planDetails.planType}</p>
                        </div>
                        <p className="text-xl font-cormorant font-bold text-[#D4AF37]">{planDetails.price}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-cormorant font-semibold text-white">Next Steps:</h3>
                    <ol className="list-decimal pl-5 space-y-2 font-dm-sans text-white/80">
                      <li>You will receive a confirmation email with your order details.</li>
                      <li>Your personal concierge will contact you shortly to introduce themselves.</li>
                      <li>They will discuss your preferences and begin planning your experience.</li>
                      <li>All services will be arranged according to your schedule and requirements.</li>
                    </ol>
                  </div>
                  
                  <div className="bg-[#D4AF37]/10 p-4 rounded-lg mb-8">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <p className="font-dm-sans text-sm text-white/90">
                        Our team is available 24/7 for any questions or special requests. 
                        Feel free to reach out at any time through your dashboard or via email.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={() => router.push("/dashboard")}
                      className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Go to Dashboard
                    </motion.button>
                    
                    <button 
                      onClick={() => router.push("/")}
                      className="px-6 py-3 border border-[#D4AF37]/50 text-white font-dm-sans rounded hover:bg-white/5 transition-all duration-300"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
