"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@supabase/supabase-js";

// Safe way to check for browser environment
const isBrowser = typeof window !== 'undefined';

// Define the Plan type
interface PlanDetails {
  planName: string;
  planType: string;
  price: string;
  days?: number;
}

// Component that uses search params - will be wrapped in Suspense
function CartPageContent() {
  // We'll use the language module later when adding translations
  const { } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get plan details from URL parameters
    const planName = searchParams.get("planName");
    const planType = searchParams.get("planType");
    const price = searchParams.get("price");
    const days = searchParams.get("days");

    if (planName && planType && price) {
      setPlanDetails({
        planName,
        planType,
        price,
        days: days ? parseInt(days) : undefined
      });
    } else {
      // If no plan details, redirect back to pricing
      router.push("/pricing");
    }

    // Check if the user is already authenticated
    const checkAuthStatus = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
      
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, [searchParams, router]);

  const handleContinue = () => {
    if (isAuthenticated) {
      // If authenticated, proceed to checkout or confirmation
      // For now, just implement a placeholder
      router.push("/checkout");
    } else {
      // If not authenticated, redirect to registration/login
      // Store the plan details in sessionStorage for retrieval after auth
      if (planDetails && isBrowser) {
        try {
          sessionStorage.setItem("selectedPlan", JSON.stringify(planDetails));
        } catch (e) {
          console.error('Error storing plan details:', e);
        }
      }
      router.push("/book");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <div className="text-center">
            <div className="h-12 w-12 border-t-2 border-r-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Cart Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-6">
              Your Cart
              <span className="text-[#D4AF37]"> — Review Your Selection</span>
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
            {/* Cart Details */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-cormorant font-semibold text-white mb-6">
                Selected Plan
              </h2>
              
              <div className="relative bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-[#D4AF37] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-50"></div>
                
                {planDetails ? (
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-cormorant font-bold text-white">{planDetails.planName}</h3>
                        <p className="text-sm font-dm-sans text-white/70 mt-1">{planDetails.planType}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <p className="text-3xl font-cormorant font-bold text-[#D4AF37]">{planDetails.price}</p>
                        {planDetails.days && (
                          <p className="text-sm font-dm-sans text-white/70">{planDetails.days} days</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-6"></div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-dm-sans font-medium text-white mb-4">What&apos;s Included:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">✓</span>
                          <span className="font-dm-sans text-white/90">Personal concierge service for the duration of your plan</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">✓</span>
                          <span className="font-dm-sans text-white/90">Real-time assistance and coordination</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">✓</span>
                          <span className="font-dm-sans text-white/90">Exclusive access to premium venues and services</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">✓</span>
                          <span className="font-dm-sans text-white/90">Personalized recommendations and custom itineraries</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#D4AF37] mr-2">✓</span>
                          <span className="font-dm-sans text-white/90">Priority service and support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/70">No plan selected. Please return to the pricing page.</p>
                    <button 
                      onClick={() => router.push("/pricing")}
                      className="mt-4 px-6 py-2 border border-[#D4AF37] text-white font-dm-sans text-sm rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all duration-300"
                    >
                      View Plans
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Terms Section */}
            <div className="mb-12 bg-black/20 p-6 rounded-lg border border-white/10">
              <h3 className="text-lg font-dm-sans font-medium text-white mb-4">Terms of Service</h3>
              <p className="font-dm-sans text-sm text-white/70 mb-4">
                By continuing with your purchase, you agree to our Terms of Service and Privacy Policy. 
                All plans are subject to availability and confirmation.
              </p>
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2 h-4 w-4 accent-[#D4AF37]" />
                <label htmlFor="terms" className="font-dm-sans text-sm text-white/90">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <button 
                onClick={() => router.push("/pricing")}
                className="px-6 py-3 border border-white/30 text-white font-dm-sans rounded hover:bg-white/5 transition-all duration-300"
              >
                Back to Plans
              </button>
              
              <motion.button
                onClick={handleContinue}
                className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Continue to {isAuthenticated ? 'Checkout' : 'Registration'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Main component with Suspense boundary
export default function CartPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center">
          <div className="text-center">
            <div className="h-12 w-12 border-t-2 border-r-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </main>
    }>
      <CartPageContent />
    </Suspense>
  );
}
