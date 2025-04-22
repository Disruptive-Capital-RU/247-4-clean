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
  const [showEmailConfirmationPage, setShowEmailConfirmationPage] =
    useState(false);

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
    type SupabaseSubscription = {
      data: { subscription: { unsubscribe: () => void } };
    };
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

            // Update the email_verified status in database only - we'll avoid modifying auth metadata during verification
            try {
              // Update in 'users' table
              const { error } = await client
                .from("users")
                .update({ email_verified: true })
                .eq("id", session.user.id);

              if (error) {
                console.error(
                  "Error updating email verification status:",
                  error
                );
                // Don't block the flow on error - user is still verified in Supabase Auth
              } else {
                console.log("Email verification status updated in database");
              }

              // We'll skip updating auth metadata during verification as it might cause issues
              // The important thing is that the user is verified in Supabase Auth
            } catch (error) {
              console.error("Error updating user verification status:", error);
              // Don't block the verification flow on database errors
              // The user is still authenticated via Supabase Auth even if our database update fails
            }

            // If user just verified email from the confirmation page
            if (showEmailConfirmationPage) {
              console.log(
                "Email verified, proceeding from confirmation page to loader"
              );
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
      if (
        authSubscription &&
        authSubscription.data &&
        authSubscription.data.subscription
      ) {
        authSubscription.data.subscription.unsubscribe();
      }
    };
  }, [
    router,
    emailVerificationSent,
    formData.captchaToken,
    t,
    showEmailConfirmationPage,
  ]);

  const loadingStates = [
    { text: t("loadingState1") || "Matching you with a personal concierge" },
    {
      text:
        t("loadingState2") || "Checking availability of premium experiences",
    },
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
      toast.error(
        t("completeCaptcha") || "Please complete the captcha verification."
      );
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error(
        t("validEmailRequired") || "Please enter a valid email address."
      );
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      toast.error(
        t("passwordMinLength") || "Password must be at least 6 characters."
      );
      return;
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      toast.error(
        t("acceptTermsRequired") ||
          "You must accept the terms and conditions to continue."
      );
      return;
    }

    setLoading(true);
    setIsSubmitted(true);

    try {
      let userId = "";
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
          // Use the correct Supabase v2 API structure for signUp
          const { data: signUpData, error: signUpError } =
            await client.auth.signUp({
              email: normalizedEmail,
              password: formData.password,
              options: {
                // Store all form data in metadata
                data: {
                  full_name: formData.name,
                  phone: formData.contact,
                  language: formData.language,
                  communication_method: formData.communicationMethod,
                  accepted_terms: formData.acceptTerms,
                  captcha_verified: !!formData.captchaToken,
                  signup_date: new Date().toISOString(),
                },
              },
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

      // Create a new auth user with this email and store all form data in user_metadata
      const client = supabase as ReturnType<typeof createClient>;

      // Create a new auth user with this email and store all form data in user_metadata
      // Following exact Supabase v2 API structure
      const { data: authUser, error: authError } = await client.auth.signUp({
        email: normalizedEmail,
        password: formData.password,
        options: {
          // Redirect to the auth callback handler which will redirect to dashboard after verification
          // Add timestamp to avoid browser caching issues
          emailRedirectTo: `https://reluxi.ru/auth/callback?t=${Date.now()}`,
          // Using raw names for metadata to improve visibility in Auth Users table
          data: {
            name: formData.name, // Use 'name' to populate display_name in table
            phone: formData.contact,
            language: formData.language,
            communication_method: formData.communicationMethod,
            accepted_terms: formData.acceptTerms ? "yes" : "no",
            captcha_verified: formData.captchaToken ? "yes" : "no",
            signup_date: new Date().toISOString(),
          },
        },
      });

      if (authError) {
        console.error("Error creating auth user:", authError);
        throw authError;
      }

      // Make a separate API call to explicitly set metadata after signup
      // This ensures all form data appears in the Authentication > Users table
      if (authUser && authUser.user) {
        try {
          console.log(
            "Adding explicit direct metadata update for user:",
            authUser.user.id
          );

          // Try the direct updateUser method which should apply metadata
          // immediately to the Supabase Auth Users table - use raw field names for better display
          const { error: metadataError } = await client.auth.updateUser({
            data: {
              name: formData.name, // 'name' is displayed better than 'full_name' in Auth table
              phone: formData.contact,
              language: formData.language,
              communication_method: formData.communicationMethod,
              accepted_terms: formData.acceptTerms ? "yes" : "no",
              captcha_verified: formData.captchaToken ? "yes" : "no",
              signup_date: new Date().toISOString(),
            },
          });

          if (metadataError) {
            console.error("Error using updateUser:", metadataError);

            // Try directly updating Raw User Metadata via an API call
            try {
              console.log("Attempting direct signup with user_metadata");
              // Try a different approach using Supabase's REST API directly
              console.log("Attempting to set metadata via REST API");
              // Use direct URL construction instead of accessing protected property
              const adminAuthUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users/${authUser.user.id}`;

              // Make a direct PATCH request to modify the user
              const response = await fetch(adminAuthUrl, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                  user_metadata: {
                    name: formData.name, // Use 'name' instead of 'full_name' for better display
                    phone: formData.contact,
                    language: formData.language,
                    communication_method: formData.communicationMethod,
                    accepted_terms: formData.acceptTerms ? "yes" : "no",
                    captcha_verified: formData.captchaToken ? "yes" : "no",
                    signup_date: new Date().toISOString(),
                  },
                }),
              });

              const fallbackError = !response.ok ? await response.json() : null;

              if (fallbackError) {
                console.error(
                  "REST API metadata update failed:",
                  fallbackError
                );

                // Final approach - try server-side admin API in next.js
                console.log(
                  "All client-side approaches failed. Consider implementing a server-side API endpoint"
                );
              } else {
                console.log("Metadata successfully set via REST API");
              }
            } catch (fallbackError) {
              console.error("Exception in fallback update:", fallbackError);
            }
          } else {
            console.log(
              "User metadata successfully updated via standard updateUser"
            );
          }
        } catch (updateError) {
          console.error(
            "Exception during explicit metadata update:",
            updateError
          );
          // Continue with the flow even if metadata update fails
        }
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
      // Update the userId we declared earlier
      // We rely on the database trigger to create the user record
      userId = authUser.user.id;

      // Note: We're NOT going to try to create records in the database tables manually.
      // Instead, we'll rely on your database trigger 'on_auth_user_created' to create
      // the user record in the users table automatically when the auth user is created.
      // This avoids permission issues with RLS.

      // Skip direct database manipulation and focus on ensuring the auth metadata is correct
      console.log(
        "Auth user created, database record will be created by trigger for user ID:",
        userId
      );

      toast.success(
        t("checkEmailVerification") ||
          "Please check your email to verify your account"
      );
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
          t("verifyEmailPrompt") ||
            "Please verify your email address before continuing. Check your inbox for a confirmation link and return to this page after confirmation."
        );
      } else {
        toast.error(
          errorWithMessage.message || "An error occurred. Please try again."
        );
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
                {t("verifyYourEmail") || "One Last Step to Exclusive Access"}
              </h2>
              <p className="text-lg text-white/80 mb-6">
                {t("emailVerificationInstructions") ||
                  "We've sent a secure verification link to your email address. Please check your inbox and click the link to complete your registration and unlock your premium concierge experience."}
              </p>
              <div className="text-white/80 mb-6 p-4 border border-[#D4AF37]/20 rounded-lg bg-[#D4AF37]/5">
                <p className="text-sm">
                  <strong>{t("emailSentTo") || "Verification sent to"}:</strong>{" "}
                  {formData.email}
                </p>
                <p className="text-sm mt-2">
                  {t("clickOnTheLink") ||
                    "Simply click the secure link in your email to activate your account and access your personal concierge dashboard."}
                </p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-6"></div>
              <p className="text-white/60 text-sm mb-4">
                {t("didntReceiveEmail") ||
                  "Haven't received your verification email? Please check your spam or junk folder, or"}
              </p>
              <button
                onClick={() => setShowEmailConfirmationPage(false)}
                className="text-[#D4AF37] hover:underline text-sm"
              >
                {t("backToForm") || "Return to registration form"}
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
                  <p className="text-white/80 mb-6">
                    {t("checkInbox") ||
                      "Please check your inbox and click the verification link we sent to your email address."}
                  </p>
                  <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6"></div>
                  <p className="text-sm text-white/60">
                    {t("afterVerification") ||
                      "After verifying your email, return to this page to complete your booking process."}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 p-8 rounded-md bg-black/40 w-full mx-auto"
                >
                  <h2 className="text-5xl font-cormorant font-bold text-white text-center mb-2">
                    {t("bookingHeadline") || (
                      <>
                        Your Time Is{" "}
                        <span className="text-[#D4AF37]">Precious</span>. Start
                        Now.
                      </>
                    )}
                  </h2>
                  <p className="text-white/70 text-center mb-8">
                    {t("bookingSubheading") ||
                      "Share a few details with us, and we'll be in touch right away to lift the stress off your stay — so you can focus on what matters, while we take care of the rest."}
                  </p>
                  <div className="border border-[#D4AF37] rounded-md p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {/* Left Column - Name, Email, Password */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            {t("fullName") || "Full Name"}
                            <span className="text-[#D4AF37] ml-1">*</span>
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
                            {t("email") || "Email"}
                            <span className="text-[#D4AF37] ml-1">*</span>
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
                            {t("emailLoginInfo") ||
                              "You'll use this email to log into your concierge dashboard"}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white">
                            {t("password") || "Password"}
                            <span className="text-[#D4AF37] ml-1">*</span>
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={
                              t("enterPassword") || "Enter your password"
                            }
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                        </div>
                      </div>

                      {/* Right Column - Phone, Communication Method, Language */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="contact" className="text-white">
                            {t("phone") || "Phone"}
                            <span className="text-[#D4AF37] ml-1">*</span>
                          </Label>
                          <Input
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder={
                              t("phoneExample") || "+971 55 123 4567"
                            }
                            className="bg-black/60 border border-white/20 text-white placeholder:text-white/50 focus:border-[#D4AF37] hover:border-[#D4AF37]/70 rounded-none h-12"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="communicationMethod"
                            className="text-white"
                          >
                            {t("preferredCommunication") ||
                              "Preferred Communication Method"}
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
                              <SelectValue
                                placeholder={
                                  t("selectCommunicationMethod") ||
                                  "Select communication method"
                                }
                              />
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
                              <SelectValue
                                placeholder={
                                  t("selectLanguage") || "Select language"
                                }
                              />
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
                        {t("iHaveReadAgree") ||
                          "I have read and agree to the terms of the"}{" "}
                        <a
                          href="/legal/oferta_reluxi1.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] hover:underline"
                        >
                          {t("offer") || "offer"}
                          <span className="text-[#D4AF37] ml-0.5">*</span>
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
                          ? t("processing") || "Processing..."
                          : emailVerificationSent && !emailVerified
                          ? t("emailVerificationRequired") ||
                            "Email Verification Required"
                          : t("reserveMyConcierge") || "Reserve My Concierge"}
                      </button>
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
