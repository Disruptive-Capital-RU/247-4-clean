"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import logo from "../../Images/logo_2.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { user, profile, loading, signIn, logOut } = useAuth();
  const router = useRouter();

  // Effect to close the login modal when user is authenticated
  useEffect(() => {
    if (user && showLoginModal) {
      setShowLoginModal(false);
      setLoginMessage(null);
      router.push("/dashboard");
    }
  }, [user, showLoginModal, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // If user is already logged in, redirect to dashboard
    if (user) {
      setShowLoginModal(false);
      router.push("/dashboard");
      return;
    }

    if (!email) {
      setLoginMessage({
        type: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    try {
      setLoginMessage(null);
      const normalizedEmail = email.trim().toLowerCase();
      console.log("Attempting login with email:", normalizedEmail);

      // First check if this email exists in our users table
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", normalizedEmail)
        .single();

      console.log("User query result:", existingUser, userError);

      if (userError) {
        if (userError.code === "PGRST116") {
          // PGRST116 is "no rows returned"
          console.error("User not found in database:", normalizedEmail);

          // Double-check auth users as well
          const { data: authUser, error: authError } =
            await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password: normalizedEmail, // Demo only!
            });

          if (authUser && !authError) {
            console.log(
              "User exists in auth but not in users table, attempting to create profile"
            );

            // User exists in auth but not in users table
            // Try to create a profile for them
            try {
              const response = await fetch("/api/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: authUser.id,
                  email: normalizedEmail,
                  name: normalizedEmail.split("@")[0],
                  conciergeEndDate: new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                  ).toISOString(), // 3 days from now
                }),
              });

              if (response.ok) {
                console.log("Profile created, attempting sign in");
                // Now try to sign in
                const result = await signIn(normalizedEmail);
                handleSignInResult(result);
                return;
              }
            } catch (err) {
              console.error("Error creating user profile:", err);
            }
          }

          setLoginMessage({
            type: "error",
            text: "We couldn't find a user with that email. Please make sure you entered the correct email when booking your concierge.",
          });
          return;
        } else {
          console.error("Database error checking user:", userError);
          throw userError;
        }
      }

      // Email exists, attempt to sign in
      console.log("User found, attempting to sign in");
      const result = await signIn(normalizedEmail);
      handleSignInResult(result);
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleSignInResult = (result: {
    success: boolean;
    message: string;
  }) => {
    if (result.success) {
      setLoginMessage({ type: "success", text: result.message });
      // In a real magic link system, the user would receive an email and click a link.
      // For demo purposes, we might skip this step and automatically log them in.
      setTimeout(() => {
        setShowLoginModal(false);
        setLoginMessage(null);
        router.push("/dashboard");
      }, 3000);
    } else {
      setLoginMessage({ type: "error", text: result.message });
    }
  };

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
        {/* Left section */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="text-xl md:text-2xl font-cormorant tracking-wider text-white"
          >
            <span className="font-bold">Reluxi</span>
            <span className="text-[#D4AF37] ml-2">Concierge</span>
          </Link>
        </div>

        {/* Center logo */}
        <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
          <Image
            src={logo}
            alt="Reluxi Concierge Logo"
            width={40}
            height={16}
            className="object-contain"
          />
        </div>

        {/* Right section */}
        <div className="flex-1 flex justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 font-dm-sans">
            {user ? (
              <>
                <NavLink href="/dashboard/services">Access Suite</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-white border border-[#D4AF37] font-medium rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/why-us">Why Us</NavLink>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-2 text-white border border-[#D4AF37] font-medium rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  Log In
                </button>
              </>
            )}

            <Link
              href="/book"
              className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-2.5 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black/95 border-t border-white/10"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {user ? (
              <>
                <NavLink
                  href="/dashboard/services"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Access Suite
                </NavLink>
                <NavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-5 py-3 text-white border border-[#D4AF37] font-medium text-center rounded-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink href="/services" onClick={() => setIsMenuOpen(false)}>
                  Services
                </NavLink>
                <NavLink href="/why-us" onClick={() => setIsMenuOpen(false)}>
                  Why Us
                </NavLink>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="px-5 py-3 text-white border border-[#D4AF37] font-medium text-center rounded-sm"
                >
                  Log In
                </button>
              </>
            )}

            <Link
              href="/book"
              onClick={() => setIsMenuOpen(false)}
              className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium text-center rounded-sm"
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      )}

      {/* Login Modal */}
      {showLoginModal && !user && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-[#111] border border-[#D4AF37]/30 rounded-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-cormorant font-semibold text-white">
                Welcome Back
              </h2>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginMessage(null);
                  setEmail("");
                }}
                className="text-white/60 hover:text-white"
                aria-label="Close login dialog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <p className="text-white/70 mb-6 font-dm-sans">
              Please enter the email you used when booking your concierge
              service.
            </p>

            {loginMessage ? (
              <div
                className={`p-4 mb-4 rounded text-center ${
                  loginMessage.type === "success"
                    ? "bg-green-900/30 text-green-300 border border-green-700"
                    : "bg-red-900/30 text-red-300 border border-red-700"
                }`}
              >
                {loginMessage.text}
              </div>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full p-3 bg-black/50 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-dm-sans"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  {loginMessage?.type === "error" && (
                    <div className="p-3 mt-2 rounded text-red-300 bg-red-900/30 border border-red-700/50 text-sm">
                      {loginMessage.text}
                      {loginMessage.text.includes("couldn't find a user") && (
                        <p className="mt-2">
                          <Link
                            href="/book"
                            className="text-[#D4AF37] underline"
                            onClick={() => setShowLoginModal(false)}
                          >
                            Book a concierge
                          </Link>{" "}
                          first to create your account.
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 font-dm-sans ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-white/90 hover:text-white font-medium tracking-wide transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}
