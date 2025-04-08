"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SparklesCore } from "@/components/ui/sparkles";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  contact: string;
  arrival: string;
  departure: string;
  language: string;
  interests: string[];
  notes: string;
};

export default function BookingSection() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    arrival: "",
    departure: "",
    language: "arabic",
    interests: [],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((interest) => interest !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.arrival ||
      !formData.departure
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const normalizedEmail = formData.email.trim().toLowerCase();

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

      // If user doesn't exist, create a new auth user
      if (!existingUser) {
        console.log("User doesn't exist, creating new user:", normalizedEmail);

        // Calculate concierge dates
        const arrivalDate = new Date(formData.arrival);
        const departureDate = new Date(formData.departure);
        const conciergeEndDate = new Date(departureDate);

        // For the demo, we'll use the email as the password
        // In a real app, we would NEVER do this
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: normalizedEmail,
            password: normalizedEmail, // For demo only! In a real app use passwordless or secure password
            options: {
              data: {
                full_name: formData.name,
              },
            },
          }
        );

        if (authError) {
          console.error("Auth creation error:", authError);
          throw authError;
        }

        if (!authData?.user?.id) {
          console.error("No user ID returned from auth signup");
          throw new Error("Failed to create user account");
        }

        userId = authData.user.id;
        console.log("Auth user created with ID:", userId);

        // Sign in as the user first so we can insert into the users table
        try {
          console.log("Signing in as the new user");
          const { error: signInError } = await supabase.auth.signInWithPassword(
            {
              email: normalizedEmail,
              password: normalizedEmail, // Demo only!
            }
          );

          if (signInError) {
            console.error("Sign in error:", signInError);
            throw signInError;
          }

          // Small delay to ensure auth state is processed
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (signInError) {
          console.error("Error during sign-in:", signInError);
          // We'll still try to create the user profile directly, even if sign-in fails
        }

        // Create user profile in our users table
        console.log("Creating user profile in users table");
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: userId,
            email: normalizedEmail,
            name: formData.name,
            concierge_end_date: conciergeEndDate.toISOString(),
          },
        ]);

        if (profileError) {
          console.error("Error creating user profile:", profileError);

          // If RLS is preventing insertion, try a direct API call instead
          // This is a fallback approach
          console.log("Attempting direct user creation as fallback");
          try {
            // Make a server-side API call to create the user
            const response = await fetch("/api/create-user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: userId,
                email: normalizedEmail,
                name: formData.name,
                conciergeEndDate: conciergeEndDate.toISOString(),
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("API fallback error:", errorData);
              throw new Error(
                `API error: ${errorData.message || response.statusText}`
              );
            }

            console.log("User created via API fallback");
          } catch (apiError) {
            console.error("Error with API fallback:", apiError);
            // Continue anyway to at least try to create the booking
          }
        } else {
          console.log("User profile created in users table");
        }
      } else {
        console.log("User already exists:", existingUser);
        userId = existingUser.id;
      }

      // Create booking record
      console.log("Creating booking record for user ID:", userId);
      const { error: bookingError } = await supabase.from("bookings").insert([
        {
          user_id: userId,
          name: formData.name,
          email: normalizedEmail,
          contact: formData.contact,
          arrival_date: formData.arrival,
          departure_date: formData.departure,
          language: formData.language,
          interests: formData.interests,
          notes: formData.notes,
          status: "pending",
        },
      ]);

      if (bookingError) {
        console.error("Error creating booking:", bookingError);
        throw bookingError;
      }

      console.log("Booking created successfully");

      // Success!
      setSuccess(true);
      toast.success("Booking submitted successfully!");

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          contact: "",
          arrival: "",
          departure: "",
          language: "arabic",
          interests: [],
          notes: "",
        });
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLoginFromSuccess = async () => {
    try {
      setLoading(true);
      // For demo purposes, we'll sign the user in directly
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim().toLowerCase(),
        password: formData.email.trim().toLowerCase(), // Demo only!
      });

      if (error) throw error;

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Failed to log in. Please use the login button in the navigation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(212,175,55,0.3)",
          },
          success: {
            iconTheme: {
              primary: "#D4AF37",
              secondary: "black",
            },
          },
        }}
      />

      {/* Sparkling Effect */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="booking-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#D4AF37"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/90" />
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
            Your Time Is <span className="text-[#D4AF37]">Precious</span>. Start
            Now.
          </h2>
          <p className="font-dm-sans text-lg text-white/80 max-w-3xl mx-auto">
            Book your personal concierge for 5 days for just $100. Once booked,
            we&apos;ll contact you directly to confirm your arrival details,
            preferences, and priorities.
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
            {success ? (
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
                  Thank you for booking with Reluxi Concierge. You will receive a
                  confirmation email shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLoginFromSuccess}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded transition-colors"
                  >
                    {loading ? "Processing..." : "Go to My Dashboard"}
                  </button>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-dm-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name <span className="text-[#D4AF37]">*</span>
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
                      Email <span className="text-[#D4AF37]">*</span>
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
                      You'll use this email to log into your concierge dashboard
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-white">
                      Phone / WhatsApp <span className="text-[#D4AF37]">*</span>
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
                      Language Preference
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "arabic", label: "Arabic" },
                        { value: "english", label: "English" },
                        { value: "russian", label: "Russian" },
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="arrival" className="text-white">
                      Arrival Date <span className="text-[#D4AF37]">*</span>
                    </Label>
                    <Input
                      id="arrival"
                      name="arrival"
                      value={formData.arrival}
                      onChange={handleChange}
                      type="date"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-white">
                      Departure Date <span className="text-[#D4AF37]">*</span>
                    </Label>
                    <Input
                      id="departure"
                      name="departure"
                      value={formData.departure}
                      onChange={handleChange}
                      type="date"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Shopping",
                      "Dining & Culinary",
                      "Protection",
                      "Medical",
                      "Culture",
                      "Events",
                    ].map((interest) => (
                      <div key={interest} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`interest-${interest.toLowerCase()}`}
                          name="interests"
                          value={interest.toLowerCase()}
                          checked={formData.interests.includes(
                            interest.toLowerCase()
                          )}
                          onChange={handleCheckboxChange}
                          className="rounded border-white/30 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <label
                          htmlFor={`interest-${interest.toLowerCase()}`}
                          className="text-white cursor-pointer"
                        >
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white">
                    Special Instructions
                  </Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific requirements or preferences"
                    className="w-full bg-white/5 border border-white/10 text-white p-2 rounded-md focus:border-[#D4AF37] focus:outline-none placeholder:text-white/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Reserve My Concierge"}
                </button>

                <p className="text-white/60 text-sm text-center">
                  This is a pre-reservation only. You will be contacted within
                  12 hours to confirm availability and preferences. No payment
                  is collected on the website.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
