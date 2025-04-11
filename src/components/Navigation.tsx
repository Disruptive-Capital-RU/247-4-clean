"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import logo from "../../Images/logo_2.png";
import LanguageSelector from "./LanguageSelector";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [loginMessageType, setLoginMessageType] = useState<"success" | "error" | null>(null);
  const { user, loading, logOut } = useAuth();
  const { t } = useLanguage();
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

    if (!email || !password) {
      setLoginMessageType("error");
      setLoginMessage("Please enter both email and password.");
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
          console.log("Checking auth for user:", normalizedEmail);

          // Double-check auth users as well
          const { data: authUser, error: authError } =
            await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password: password,
            });

          if (authUser && !authError && authUser.user) {
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
                  id: authUser.user.id,
                  email: normalizedEmail,
                  name: normalizedEmail.split("@")[0],
                  conciergeEndDate: new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                  ).toISOString(), // 3 days from now
                }),
              });

              if (response.ok) {
                console.log("Profile created, attempting sign in");
                // Now try to sign in with password
                const { data, error } = await supabase.auth.signInWithPassword({
                  email: normalizedEmail,
                  password: password,
                });
                
                if (!error && data) {
                  handleSignInResult({ success: true, message: "Login successful!" });
                } else {
                  handleSignInResult({ success: false, message: "Invalid credentials. Please try again." });
                }
                return;
              }
            } catch (err) {
              console.error("Error creating user profile:", err);
            }
          }

          setLoginMessageType("error");
          setLoginMessage("We couldn't find a user with that email. Please make sure you entered the correct email when booking your concierge.");
          return;
        } else {
          console.error("Database error checking user:", userError);
          throw userError;
        }
      }

      // Email exists, attempt to sign in
      console.log("User found, attempting to sign in");
      
      // Sign in with email and password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      });
      
      if (authError) {
        console.error("Auth error during login:", authError);
        setLoginMessageType("error");
        setLoginMessage("Invalid email or password. Please try again.");
        return;
      }
      
      // If authentication succeeded, proceed with login flow
      setLoginMessageType("success");
      setLoginMessage("Login successful!");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        setShowLoginModal(false);
        setLoginMessage(null);
        setLoginMessageType(null);
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setLoginMessageType("error");
      setLoginMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleSignInResult = (result: {
    success: boolean;
    message: string;
  }) => {
    if (result.success) {
      setLoginMessageType("success");
      setLoginMessage(result.message);
      // In a real magic link system, the user would receive an email and click a link.
      // For demo purposes, we might skip this step and automatically log them in.
      setTimeout(() => {
        setShowLoginModal(false);
        setLoginMessage(null);
        setLoginMessageType(null);
        router.push("/dashboard");
      }, 1500);
    } else {
      setLoginMessageType("error");
      setLoginMessage(result.message);
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
                <NavLink href="/dashboard/services">{t("accessSuite")}</NavLink>
                <NavLink href="/dashboard">{t("dashboard")}</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-white border border-[#D4AF37] font-medium rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <NavLink href="/pricing">{t("pricing")}</NavLink>
                <NavLink href="/services">{t("services")}</NavLink>
                <NavLink href="/why-us">{t("whyUs")}</NavLink>
                <LanguageSelector />
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-2 text-white border border-[#D4AF37] font-medium rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  {t("login")}
                </button>
                <Link
                  href="/book"
                  className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
                >
                  {t("bookNow")}
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              className="flex items-center ml-2"
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
                  {t("accessSuite")}
                </NavLink>
                <NavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  {t("dashboard")}
                </NavLink>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-5 py-3 text-white border border-[#D4AF37] font-medium text-center rounded-sm"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <NavLink href="/pricing" onClick={() => setIsMenuOpen(false)}>
                  {t("pricing")}
                </NavLink>
                <NavLink href="/services" onClick={() => setIsMenuOpen(false)}>
                  {t("services")}
                </NavLink>
                <NavLink href="/why-us" onClick={() => setIsMenuOpen(false)}>
                  {t("whyUs")}
                </NavLink>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="px-5 py-3 text-white border border-[#D4AF37] font-medium text-center rounded-sm"
                >
                  {t("login")}
                </button>
                <Link
                  href="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium text-center rounded-sm"
                >
                  {t("bookNow")}
                </Link>
              </>
            )}
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
                {t("welcomeBack")}
              </h2>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginMessage(null);
                  setLoginMessageType(null);
                  setEmail("");
                  setPassword("");
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
                  loginMessageType === "success"
                    ? "bg-green-900/30 text-green-300 border border-green-700"
                    : "bg-red-900/30 text-red-300 border border-red-700"
                }`}
              >
                {loginMessage}
              </div>
            ) : (
              <form onSubmit={handleLogin} className="mb-2">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="w-full p-3 bg-black/50 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-dm-sans"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="password"
                      placeholder="Your Password"
                      className="w-full p-3 bg-black/50 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-dm-sans"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {loginMessage && loginMessageType === "error" && (
                    <div className="p-3 mt-2 rounded text-red-300 bg-red-900/30 border border-red-700/50 text-sm">
                      {loginMessage}
                      {loginMessage.includes("couldn't find a user") && (
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
                <div className="flex justify-between items-center text-sm text-white/60 mt-2 mb-4">
                  <div>Enter the password you used during registration</div>
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
