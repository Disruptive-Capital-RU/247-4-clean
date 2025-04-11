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
  const [success, setSuccess] = useState(false); // Used for the success view
  const [showCaptchaMessage, setShowCaptchaMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
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
            // Redirect to dashboard if they just confirmed email
            if (emailVerificationSent) {
              router.push("/dashboard");
            }
          }
          }
        );
      
      subscription = authListener.data.subscription;
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Make hCaptcha verification mandatory
    if (!formData.captchaToken) {
      toast.error("Please complete the captcha verification to continue");
      captchaRef.current?.execute();
      setShowCaptchaMessage(true); // Show the captcha message when user tries to submit without completing captcha
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = formData.email.trim().toLowerCase();
      
      // If we already sent a verification email but it's not verified yet
      if (emailVerificationSent && !emailVerified) {
        setLoading(false);
        toast.error("Please verify your email before continuing");
        return;
      }

      // Check if the user already exists
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", normalizedEmail)
        .single();

      if (queryError && queryError.code !== "PGRST116") {
        // PGRST116 is "no rows returned"
        console.error("Error checking existing user:", queryError);
        throw queryError;
      }

      let userId;

      // If user exists in our database, use that ID
      if (existingUser) {
        console.log("User already exists:", existingUser);
        userId = existingUser.id;
      } else {
        // User doesn't exist, try to create a new auth user
        console.log("Creating new user for:", normalizedEmail);

        // Create a new auth user with this email
        const client = supabase as ReturnType<typeof createClient>;
        const { data: authUser, error: authError } = await client.auth.signUp(
          {
            email: normalizedEmail,
            password: formData.password,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`,
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
            ).toISOString(), // 5 days from now
          },
        ]);

        if (insertError) {
          console.error("Error creating user profile:", insertError);
          throw insertError;
        }

        console.log("User profile created successfully");
      }

      // Now create a booking linked to this user
      console.log("Creating booking for user:", userId);

      const dbClient = supabase as ReturnType<typeof createClient>;
      const { error: bookingError } = await dbClient.from("bookings").insert([
        {
          user_id: userId,
          name: formData.name,
          email: normalizedEmail,
          contact: formData.contact,
          language: formData.language,
          status: "pending",
        },
      ]);

      if (bookingError) {
        console.error("Error creating booking:", bookingError);
        throw bookingError;
      }

      console.log("Booking created successfully");

      // Handle verification flow or success
      // Check if this is a new user who needs to verify their email
      if (!emailVerified && !existingUser) {
        setLoading(false);
        toast.success("Verification email sent! Please check your inbox and confirm your email address.");
        return;
      }
      
      // If it's an existing user or email is already verified
      
      // If we reached here, email is verified or user already existed
      setShowLoader(true);
      toast.success("Booking submitted successfully!");
      
      // Show loader for a few seconds before redirecting to dashboard
      setTimeout(() => {
        setShowLoader(false);
        setSuccess(true); // Set success to true to show success message briefly before redirect
        
        // Redirect after showing success message briefly
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }, 15000); // 15 seconds for the loader to show all steps
    } catch (error) {
      console.error("Error submitting booking:", error);
      
      // Check if this is an email confirmation error
      if (error.message?.includes("confirmation") || error.message?.includes("verify")) {
        setEmailVerificationSent(true);
        toast.error("Please verify your email address before continuing. Check your inbox for a confirmation link.");
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
          className="w-full h-full"
          particleColor="#D4AF37"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4">
            {t("bookingHeader")}
          </h2>
          <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
            {t("bookingDesc")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-md"
          >
            {emailVerificationSent && !emailVerified ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-10 h-10 text-amber-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-3">
                  Email Verification Required
                </h3>
                <p className="text-white/80 mb-6">
                  Please check your inbox and click the verification link to complete your registration.
                  Once verified, you will be automatically redirected to your dashboard.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-white/10 text-white font-medium rounded-sm hover:bg-white/20 transition-all duration-300 mr-3"
                >
                  I&apos;ve Verified My Email
                </button>
              </div>
            ) : success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-cormorant font-bold text-white mb-3">
                  Booking Confirmed
                </h3>
                <p className="text-white/80 mb-6">
                  Thank you for booking with Reluxi Concierge. You will receive
                  a confirmation email shortly.
                </p>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
                >
                  {t("dashboard")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-dm-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      {t("fullName")}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-white">
                      {t("phoneWhatsapp")}
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+971 55 123 4567"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                      required
                    />
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
      </div>
    </section>
  );
}
