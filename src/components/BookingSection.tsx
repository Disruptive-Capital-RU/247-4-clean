"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SparklesCore } from "@/components/ui/sparkles";
// Import Supabase with proper types to avoid TypeScript errors
import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

type FormData = {
  name: string;
  email: string;
  contact: string;
  language: string;
  password: string;
  captchaToken: string;
};

// Development mode flag to bypass email verification
const isDev = process.env.NODE_ENV !== "production";

export default function BookingSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const captchaRef = useRef(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    language: "arabic",
    password: "",
    captchaToken: "",
  });
  const [loading, setLoading] = useState(false);
  const [showCaptchaMessage, setShowCaptchaMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  // Check for email verification status when component mounts
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        // Safe access to Supabase client methods
        const client = supabase as ReturnType<typeof createClient>;
        const { data } = await client.auth.getSession();
        
        if (data?.session?.user) {
          setEmailVerified(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    
    // Listen for auth state changes (like when user confirms email)
    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    
    try {
      // Safe access to Supabase client methods
      const client = supabase as ReturnType<typeof createClient>;
      const authListener = client.auth.onAuthStateChange(
        (event: AuthChangeEvent, session: Session | null) => {
          if (event === "SIGNED_IN" && session?.user) {
            setEmailVerified(true);
            // Don't redirect to dashboard - stay on the same page and show loader
            if (emailVerificationSent) {
              // Start the multi-step loader animation
              setShowLoader(true);
              
              // After loader completes, show success animation then redirect
              setTimeout(() => {
                setShowLoader(false);
                setSuccess(true); // Show success animation
                
                // Finally redirect to dashboard
                setTimeout(() => {
                  router.push("/dashboard");
                }, 3000); // Allow 3 seconds for success animation
              }, 15000); // 15 seconds for the loader
            }
          }
        }
      );
      
      if (!formData.captchaToken) {
        toast.error("Please complete the captcha verification");
      }
    } catch (error) {
      console.error("Error setting up auth listener:", error);
    }
    
    checkEmailVerification();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [router, emailVerificationSent]);
  
  const loadingStates = [
    { text: "Matching you with a personal concierge" },
    { text: "Checking availability of premium experiences" },
    { text: "Securing your exclusive access" },
    { text: "Confirming luxury partner services" },
    { text: "Finalizing your reservation" },
    { text: "Welcome to the Inner Circle" }
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show captcha message if not verified
    if (!formData.captchaToken) {
      setShowCaptchaMessage(true);
      toast.error("Please complete the captcha verification.");
      return;
    }
    
    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    // Validate password
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    
    setLoading(true);
    
    try {
      let userId: string;
      const normalizedEmail = formData.email.toLowerCase().trim();
      
      // DEV MODE: Skip email verification for development
      if (isDev) {
        console.log("DEV MODE: Bypassing email verification");
        
        // Clean existing session if any
        const client = supabase as ReturnType<typeof createClient>;
        await client.auth.signOut();
        
        // Create a new session directly
        const { data: authData, error: signInError } = await client.auth.signInWithPassword({
          email: normalizedEmail,
          password: formData.password
        });
        
        if (signInError) {
          // If login fails, try to create account
          const { data: signUpData, error: signUpError } = await client.auth.signUp({
            email: normalizedEmail,
            password: formData.password,
          });
          
          if (signUpError) {
            throw signUpError;
          }
          
          userId = signUpData.user?.id || "";
        } else {
          userId = authData.user?.id || "";
        }
        
        // Start loader animation
        setShowLoader(true);
        
        // After loader completes, show success animation then redirect
        setTimeout(() => {
          setShowLoader(false);
          setSuccess(true);
          
          // Finally redirect to dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }, 15000);
        
        return;
      }
      
      // PRODUCTION MODE: Normal flow with email verification
      
      // Create a new auth user with this email
      const client = supabase as ReturnType<typeof createClient>;
      const { data: authUser, error: authError } = await client.auth.signUp(
        {
          email: normalizedEmail,
          password: formData.password,
          options: {
            // Redirect back to the same page on production domain, not directly to dashboard
            emailRedirectTo: `https://reluxi.ru${window.location.pathname}`,
          }
        }
      );

      if (authError) {
        console.error("Error creating auth user:", authError);
        throw authError;
      }
      
      // Set flag that verification email was sent
      setEmailVerificationSent(true);

      if (!authUser || !authUser.user) {
        throw new Error("Failed to create user account.");
      }

      console.log("Auth user created:", authUser);
      userId = authUser.user.id;

      // Now create a user profile in our database
      const dbClient = supabase as ReturnType<typeof createClient>;
      const { error: insertError } = await dbClient.from("users").insert([
        {
          id: userId,
          email: normalizedEmail,
          name: formData.name,
          concierge_end_date: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ]);

      if (insertError) {
        console.error("Error creating user profile:", insertError);
        throw insertError;
      }
      
      toast.success("Please check your email to verify your account");
      
      // When account is created and the user has verified email,
      // the auth listener will catch the SIGNED_IN event and redirect
      
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      
      // Check if this is an email confirmation error
      if (error.message?.includes("confirmation") || error.message?.includes("verify")) {
        setEmailVerificationSent(true);
        toast.error("Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation.");
      } else {
        toast.error(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleCaptchaVerify = (token: string) => {
    setFormData(prev => ({
      ...prev,
      captchaToken: token
    }));
    setShowCaptchaMessage(false); // Hide the message once captcha is verified
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <MultiStepLoader loadingStates={loadingStates} loading={showLoader} duration={2500} loop={false} />
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <SparklesCore
          id="booking-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={20}
          speed={0.3}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Toaster position="top-center" />
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="bg-gradient-to-b from-[#D4AF37]/20 to-transparent p-10 rounded-lg border border-[#D4AF37]/30">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-3xl font-cormorant font-bold text-white mb-4">
                {t("successTitle")}
              </h2>
              <p className="text-lg text-white/80 mb-6">
                {t("successMessage")}
              </p>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-6"></div>
              <p className="text-white/60 text-sm">
                {t("redirectMessage")}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isSubmitted && emailVerificationSent && !emailVerified ? (
                <div className="text-center p-8 bg-black/50 rounded-lg border border-[#D4AF37]/30">
                  <h3 className="text-2xl font-cormorant font-semibold text-white mb-4">
                    {t("verificationEmailSent")}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {t("checkInbox")}
                  </p>
                  <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6"></div>
                  <p className="text-sm text-white/60">
                    {t("afterVerification")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-cormorant font-bold text-white text-center mb-2">
                    {t("bookingHeading")}
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    {t("bookingSubheading")}
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        {t("name")}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {t("email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                        required
                      />
                      <p className="text-xs text-white/60 mt-1">
                        {t("emailHint")}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-white">
                        {t("languagePreference")}
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "arabic", label: t("arabic") },
                          { value: "english", label: t("english") },
                          { value: "russian", label: t("russian") },
                        ].map((lang) => (
                          <div
                            key={lang.value}
                            onClick={() =>
                              setFormData({ ...formData, language: lang.value })
                            }
                            className={`relative cursor-pointer rounded-md px-4 py-3 transition-all duration-300 border ${
                              formData.language === lang.value
                                ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/20 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                : "border-white/10 bg-white/5 hover:border-white/30"
                            }`}
                          >
                            <input
                              type="radio"
                              id={`language-${lang.value}`}
                              name="language"
                              value={lang.value}
                              checked={formData.language === lang.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`language-${lang.value}`}
                              className="flex justify-center items-center cursor-pointer font-medium text-center"
                            >
                              <span
                                className={`${
                                  formData.language === lang.value
                                    ? "text-[#D4AF37]"
                                    : "text-white"
                                }`}
                              >
                                {lang.label}
                              </span>
                            </label>
                            {formData.language === lang.value && (
                              <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      {t("password") || "Password"}
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                      required
                    />
                    <p className="text-xs text-white/60 mt-1">
                      {t("passwordHint") || "Password must be at least 6 characters"}
                    </p>
                  </div>

                  <div className="flex justify-center my-6">
                    <HCaptcha
                      sitekey="6ee82a4c-7088-43b0-99de-ec9ed0c8c4e4"
                      onVerify={handleCaptchaVerify}
                      ref={captchaRef}
                    />
                  </div>
                  
                  {showCaptchaMessage && (
                    <div className="text-center mb-4">
                      <p className="text-amber-300 text-sm">
                        * {t("captchaRequired") || "Captcha verification is required before submitting"}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || (emailVerificationSent && !emailVerified)}
                    className={`w-full py-3 ${emailVerified 
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                      : "bg-white/10 text-white hover:bg-white/20"} font-medium rounded-sm transition-all duration-300 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Processing..." : emailVerificationSent && !emailVerified 
                      ? "Email Verification Required" 
                      : t("reserveButton")}
                  </button>
                  
                  <p className="text-white/60 text-sm text-center">
                    {t("reserveDisclaimer")}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
