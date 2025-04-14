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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  name: string;
  email: string;
  contact: string;
  language: string;
  communicationMethod: string;
  password: string;
  captchaToken: string;
  acceptTerms: boolean;
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
    language: "english",
    communicationMethod: "whatsapp",
    password: "",
    captchaToken: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showCaptchaMessage, setShowCaptchaMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailConfirmationPage, setShowEmailConfirmationPage] = useState(false);

  // Check for email verification status when component mounts
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        // Safe access to Supabase client methods
        const client = supabase as ReturnType<typeof createClient>;
        const { data } = await client.auth.getSession();

        if (data?.session?.user) {
          setEmailVerified(true);
          
          // If user has already verified their email and we're on the confirmation page,
          // proceed to the loader
          if (showEmailConfirmationPage) {
            console.log("Email already verified, proceeding to loader");
            setShowEmailConfirmationPage(false);
            setShowLoader(true);
            
            // After loader completes, show success animation then redirect
            setTimeout(() => {
              setShowLoader(false);
              setSuccess(true); // Show success animation

              // Finally redirect to dashboard
              setTimeout(() => {
                router.push("/dashboard");
              }, 3000); // Allow 3 seconds for success animation
            }, 2500); // 2.5 seconds for the loader
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    // Listen for auth state changes (like when user confirms email)
    // Define a proper type for Supabase subscription
    type SupabaseSubscription = { data: { subscription: { unsubscribe: () => void } } };
    let authSubscription: SupabaseSubscription | null = null;

    try {
      // Safe access to Supabase client methods
      const client = supabase as ReturnType<typeof createClient>;
      authSubscription = client.auth.onAuthStateChange(
        async (event: AuthChangeEvent, session: Session | null) => {
          console.log("Auth state changed:", event);
          
          if (event === "SIGNED_IN" && session?.user) {
            console.log("User signed in with email:", session.user.email);
            setEmailVerified(true);
            
            // Update the email_verified status in the database
            try {
              const { error } = await client
                .from("users")
                .update({ email_verified: true })
                .eq("id", session.user.id);
                
              if (error) {
                console.error("Error updating email verification status:", error);
              } else {
                console.log("Email verification status updated in database");
              }
            } catch (error) {
              console.error("Error updating user verification status:", error);
            }
            
            // If user just verified email from the confirmation page
            if (showEmailConfirmationPage) {
              console.log("Email verified, proceeding from confirmation page to loader");
              // Hide confirmation page and show loader
              setShowEmailConfirmationPage(false);
              setShowLoader(true);

              // After loader completes, show success animation then redirect
              setTimeout(() => {
                setShowLoader(false);
                setSuccess(true); // Show success animation

                // Finally redirect to dashboard
                setTimeout(() => {
                  router.push("/dashboard");
                }, 3000); // Allow 3 seconds for success animation
              }, 2500); // 2.5 seconds for the loader
            }
          }
        }
      );

      // Don't check captcha on initial setup, only when user attempts to submit the form
    } catch (error) {
      console.error("Error setting up auth listener:", error);
    }

    checkEmailVerification();

    return () => {
      // Safely unsubscribe if the subscription exists
      if (authSubscription && authSubscription.data && authSubscription.data.subscription) {
        authSubscription.data.subscription.unsubscribe();
      }
    };
  }, [router, emailVerificationSent, formData.captchaToken, t, showEmailConfirmationPage]);

  const loadingStates = [
    { text: t("loadingState1") || "Matching you with a personal concierge" },
    { text: t("loadingState2") || "Checking availability of premium experiences" },
    { text: t("loadingState3") || "Securing your exclusive access" },
    { text: t("loadingState4") || "Confirming luxury partner services" },
    { text: t("loadingState5") || "Finalizing your reservation" },
    { text: t("loadingState6") || "Welcome to the Inner Circle" },
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

    // Show captcha message if not verified
    if (!formData.captchaToken) {
      setShowCaptchaMessage(true);
      toast.error(t("completeCaptcha") || "Please complete the captcha verification.");
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error(t("validEmailRequired") || "Please enter a valid email address.");
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      toast.error(t("passwordMinLength") || "Password must be at least 6 characters.");
      return;
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      toast.error(t("acceptTermsRequired") || "You must accept the terms and conditions to continue.");
      return;
    }

    setLoading(true);
    setIsSubmitted(true);

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
        const { data: authData, error: signInError } =
          await client.auth.signInWithPassword({
            email: normalizedEmail,
            password: formData.password,
          });

        if (signInError) {
          // If login fails, try to create account
          const { data: signUpData, error: signUpError } =
            await client.auth.signUp({
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
        
        // In dev mode, still show the email confirmation page first
        setShowEmailConfirmationPage(true);
        
        return;
      }

      // PRODUCTION MODE: Normal flow with email verification

      // Create a new auth user with this email
      const client = supabase as ReturnType<typeof createClient>;
      const { data: authUser, error: authError } = await client.auth.signUp({
        email: normalizedEmail,
        password: formData.password,
        options: {
          // Redirect to the auth callback handler which will redirect to dashboard after verification
          emailRedirectTo: `https://reluxi.ru/auth/callback`,
        },
      });

      if (authError) {
        console.error("Error creating auth user:", authError);
        throw authError;
      }

      // Set flag that verification email was sent and show email confirmation page
      setEmailVerificationSent(true);
      setIsSubmitted(true);
      // This should immediately show the email confirmation page
      setShowEmailConfirmationPage(true);
      console.log("Email verification sent, showing confirmation page");

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
          display_name: formData.name, // Also use as display name
          phone: formData.contact, // Save the phone number
          email_verified: false, // Initially set to false until verified
          communication_method: formData.communicationMethod,
          language_preference: formData.language,
          concierge_end_date: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ]);

      if (insertError) {
        console.error("Error creating user profile:", insertError);
        throw insertError;
      }

      toast.success(t("checkEmailVerification") || "Please check your email to verify your account");
      console.log("Toast shown for email verification");

      // When account is created and the user has verified email,
      // the auth listener will catch the SIGNED_IN event and redirect
    } catch (error: unknown) {
      const errorWithMessage = error as { message?: string };
      console.error("Error submitting booking:", error);

      // Check if this is an email confirmation error
      if (
        errorWithMessage.message?.includes("confirmation") ||
        errorWithMessage.message?.includes("verify")
      ) {
        setEmailVerificationSent(true);
        toast.error(
          t("verifyEmailPrompt") || "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation."
        );
      } else {
        toast.error(errorWithMessage.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleCaptchaVerify = (token: string) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: token,
    }));
    setShowCaptchaMessage(false); // Hide the message once captcha is verified
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={showLoader}
        duration={500}
      />
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

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <Toaster position="top-center" />
        {showEmailConfirmationPage ? (
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h2 className="text-3xl font-cormorant font-bold text-white mb-4">
                {t("verifyYourEmail") || "Verify Your Email"}
              </h2>
              <p className="text-lg text-white/80 mb-6">
                {t("emailVerificationInstructions") || 
                  "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."}
              </p>
              <div className="text-white/80 mb-6 p-4 border border-[#D4AF37]/20 rounded-lg bg-[#D4AF37]/5">
                <p className="text-sm">
                  <strong>{t("emailSentTo") || "Email sent to"}:</strong> {formData.email}
                </p>
                <p className="text-sm mt-2">
                  {t("clickOnTheLink") || "Click on the link in the email to verify your account and access the dashboard."}
                </p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-6"></div>
              <p className="text-white/60 text-sm mb-4">
                {t("didntReceiveEmail") || "Didn't receive the email? Check your spam folder or"}
              </p>
              <button 
                onClick={() => setShowEmailConfirmationPage(false)}
                className="text-[#D4AF37] hover:underline text-sm"
              >
                {t("backToForm") || "Return to the form"}
              </button>
            </div>
          </motion.div>
        ) : success ? (
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
              <p className="text-white/60 text-sm">{t("redirectMessage")}</p>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isSubmitted && emailVerificationSent && !emailVerified ? (
                <div className="text-center p-8 bg-black/50 rounded-lg border border-[#D4AF37]/30">
                  <h3 className="text-2xl font-cormorant font-semibold text-white mb-4">
                    {t("verificationEmailSent") || "Verification Email Sent"}
                  </h3>
                  <p className="text-white/80 mb-6">{t("checkInbox") || "Please check your inbox and click the verification link we sent to your email address."}</p>
                  <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6"></div>
                  <p className="text-sm text-white/60">
                    {t("afterVerification") || "After verifying your email, return to this page to complete your booking process."}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-8 rounded-md bg-black/40 w-full mx-auto"
                >
                  <h2 className="text-5xl font-cormorant font-bold text-white text-center mb-2">
                    {t("bookingHeadline") || "Your Time Is Precious. Start Now."}
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    {t("bookingSubheading") || "Book your personal concierge for 5 days for just $100. Once booked, we'll contact you directly to confirm your arrival details, preferences, and priorities."}
                  </p>
                  <div className="border border-[#D4AF37] rounded-md p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {/* Left Column - Name, Email, Password */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            {t("fullName") || "Full Name"} *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("yourName") || "Your name"}
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            {t("email") || "Email"} *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("yourEmail") || "Your email"}
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                          <p className="text-xs text-white/60 mt-1">
                            {t("emailLoginInfo") || "You'll use this email to log into your concierge dashboard"}
                          </p>
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
                            placeholder={t("enterPassword") || "Enter your password"}
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                        </div>
                      </div>

                      {/* Right Column - Phone, Communication Method, Language */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="contact" className="text-white">
                            {t("phone") || "Phone"} *
                          </Label>
                          <Input
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder={t("phoneExample") || "+971 55 123 4567"}
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="communicationMethod"
                            className="text-white"
                          >
                            {t("preferredCommunication") || "Preferred Communication Method"}
                          </Label>
                          <Select
                            value={formData.communicationMethod}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                communicationMethod: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full h-12 rounded-none bg-black/60 border border-white/20 text-white focus:border-[#D4AF37] hover:border-[#D4AF37]/70">
                              <SelectValue placeholder={t("selectCommunicationMethod") || "Select communication method"} />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border border-[#D4AF37]/30 text-white">
                              <SelectItem
                                value="whatsapp"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                WhatsApp
                              </SelectItem>
                              <SelectItem
                                value="phone"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Phone
                              </SelectItem>
                              <SelectItem
                                value="email"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Email
                              </SelectItem>
                              <SelectItem
                                value="telegram"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Telegram
                              </SelectItem>
                              <SelectItem
                                value="botim"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Botim
                              </SelectItem>
                              <SelectItem
                                value="wechat"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                WeChat
                              </SelectItem>
                              <SelectItem
                                value="instagram"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Instagram
                              </SelectItem>
                              <SelectItem
                                value="facebook"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                Facebook
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-white">
                            {t("languagePreference") || "Language Preference"}
                          </Label>
                          <Select
                            value={formData.language}
                            onValueChange={(value) =>
                              setFormData({ ...formData, language: value })
                            }
                          >
                            <SelectTrigger className="w-full h-12 rounded-none bg-black/60 border border-white/20 text-white focus:border-[#D4AF37] hover:border-[#D4AF37]/70">
                              <SelectValue placeholder={t("selectLanguage") || "Select language"} />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border border-[#D4AF37]/30 text-white">
                              <SelectItem
                                value="english"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                {t("english") || "English"}
                              </SelectItem>
                              <SelectItem
                                value="russian"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                {t("russian") || "Russian"}
                              </SelectItem>
                              <SelectItem
                                value="arabic"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                {t("arabic") || "Arabic"}
                              </SelectItem>
                              <SelectItem
                                value="chinese"
                                className="text-white hover:text-[#D4AF37] focus:text-[#D4AF37] focus:bg-black/80"
                              >
                                {t("chinese") || "Chinese"}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            acceptTerms: checked as boolean,
                          })
                        }
                        className="border-[#D4AF37]/70 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t("iAcceptThe") || "I accept the"}{" "}
                        <a href="#" className="text-[#D4AF37] hover:underline">
                          {t("termsAndConditions") || "terms and conditions"}
                        </a>{" "}
                        {t("and") || "and"}{" "}
                        <a href="#" className="text-[#D4AF37] hover:underline">
                          {t("privacyPolicy") || "privacy policy"}
                        </a>
                      </label>
                    </div>

                    <div className="flex justify-center my-6 col-span-full">
                      <HCaptcha
                        sitekey="6ee82a4c-7088-43b0-99de-ec9ed0c8c4e4"
                        onVerify={handleCaptchaVerify}
                        ref={captchaRef}
                        theme="dark"
                      />
                    </div>

                    {showCaptchaMessage && (
                      <div className="text-center mb-4">
                        <p className="text-amber-300 text-sm">
                          *{" "}
                          {t("captchaRequired") ||
                            "Captcha verification is required before submitting"}
                        </p>
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={
                          loading || (emailVerificationSent && !emailVerified)
                        }
                        className={`w-full py-3 h-14 ${
                          emailVerified
                            ? "bg-black text-white border border-white/20 hover:border-white/50"
                            : "bg-black text-white border border-white/20 hover:border-white/50"
                        } font-medium transition-all duration-300 ${
                          loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading
                          ? (t("processing") || "Processing...")
                          : emailVerificationSent && !emailVerified
                          ? (t("emailVerificationRequired") || "Email Verification Required")
                          : (t("reserveMyConcierge") || "Reserve My Concierge")}
                      </button>

                      <p className="text-white/60 text-sm text-center mt-4">
                        {t("preReservationNote") || "This is a pre-reservation only. You will be contacted within 12 hours to confirm availability and preferences. No payment is collected on the website."}
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
