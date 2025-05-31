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
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [loginMessageType, setLoginMessageType] = useState<
    "success" | "error" | null
  >(null);
  const { user, loading, logOut } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Check if language is Arabic to handle RTL, but keep navigation LTR
  const isArabic =
    language === "ar" || language === "AR" || language === "arabic";

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

            // Get user metadata if available
            const userMetadata = authUser.user.user_metadata || {};

            // User exists in auth but not in users table
            // Try to create a profile for them
            try {
              const response = await fetch("/api/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: authUser.user.id,
                  email: normalizedEmail,
                  name:
                    userMetadata.name ||
                    userMetadata.full_name ||
                    normalizedEmail.split("@")[0],
                  phone: userMetadata.phone,
                  language: userMetadata.language || "english",
                  communicationMethod:
                    userMetadata.communication_method || "email",
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
                  handleSignInResult({
                    success: true,
                    message: "Login successful!",
                  });
                } else {
                  handleSignInResult({
                    success: false,
                    message: "Invalid credentials. Please try again.",
                  });
                }
                return;
              }
            } catch (err) {
              console.error("Error creating user profile:", err);
            }
          }

          setLoginMessageType("error");
          setLoginMessage(
            "We couldn't find a user with that email. Please make sure you entered the correct email when booking your concierge."
          );
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
    <div
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10"
      dir="ltr"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center">
        {/* Left section */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="flex items-center text-xl md:text-2xl font-cormorant tracking-wider text-white"
          >
            <Image
              src={logo}
              alt="Reluxi Concierge Logo"
              width={40}
              height={16}
              className="object-contain mr-4"
            />
            <span className="font-bold text-[#D4AF37]">Reluxi</span>
            <span className="text-white ml-2">Concierge</span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex-1 flex justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 font-dm-sans">
            {user ? (
              <>
                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                >
                  <NavLink href="/services">{t("services")}</NavLink>

                  {/* Dropdown Menu */}
                  {showServicesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2 w-56 z-50"
                    >
                      <div className="bg-black/95 border border-[#D4AF37]/30 rounded-lg shadow-lg overflow-hidden">
                        <Link
                          href="/services?category=lifestyle"
                          className="block px-4 py-3 text-white hover:bg-[#D4AF37]/10 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div>
                            <div className="font-medium">Reluxi Lifestyle</div>
                            <div className="text-xs text-white/70 mt-1">
                              Luxury & Romantic Experiences
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/family"
                          className="block px-4 py-3 text-white hover:bg-[#D4AF37]/10 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div>
                            <div className="font-medium">Reluxi Family</div>
                            <div className="text-xs text-white/70 mt-1">
                              Family & Cultural Experiences
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>

                <NavLink href="/why-us">{t("whyUs")}</NavLink>
                <NavLink href="/dashboard">{t("dashboard")}</NavLink>
                <LanguageSelector />
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-white border border-[#D4AF37] font-medium rounded-sm hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                >
                  <NavLink href="/services">{t("services")}</NavLink>

                  {/* Dropdown Menu */}
                  {showServicesDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2 w-56 z-50"
                    >
                      <div className="bg-black/95 border border-[#D4AF37]/30 rounded-lg shadow-lg overflow-hidden">
                        <Link
                          href="/services?category=lifestyle"
                          className="block px-4 py-3 text-white hover:bg-[#D4AF37]/10 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div>
                            <div className="font-medium">Reluxi Lifestyle</div>
                            <div className="text-xs text-white/70 mt-1">
                              Luxury & Romantic Experiences
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="/family"
                          className="block px-4 py-3 text-white hover:bg-[#D4AF37]/10 transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <div>
                            <div className="font-medium">Reluxi Family</div>
                            <div className="text-xs text-white/70 mt-1">
                              Family & Cultural Experiences
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>

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
                  {t("signUp")}
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="mr-2">
              <LanguageSelector />
            </div>
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
          className="md:hidden bg-black/95 border-t border-white/10 overflow-y-auto max-h-[calc(100vh-70px)] fixed left-0 right-0 z-50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          dir="ltr"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {user ? (
              <>
                <NavLink href="/services" onClick={() => setIsMenuOpen(false)}>
                  {t("services")}
                </NavLink>
                {/* Mobile Services Sub-items */}
                <div className="pl-4 space-y-4">
                  <Link
                    href="/services?category=lifestyle"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/80 hover:text-[#D4AF37] transition-colors font-dm-sans"
                  >
                    <div>
                      <div className="font-medium">Reluxi Lifestyle</div>
                      <div className="text-xs text-white/60 mt-1">
                        Luxury & Romantic Experiences
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/family"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/80 hover:text-[#D4AF37] transition-colors font-dm-sans"
                  >
                    <div>
                      <div className="font-medium">Reluxi Family</div>
                      <div className="text-xs text-white/60 mt-1">
                        Family & Cultural Experiences
                      </div>
                    </div>
                  </Link>
                </div>
                <NavLink href="/why-us" onClick={() => setIsMenuOpen(false)}>
                  {t("whyUs")}
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
                <NavLink href="/services" onClick={() => setIsMenuOpen(false)}>
                  {t("services")}
                </NavLink>
                {/* Mobile Services Sub-items */}
                <div className="pl-4 space-y-4">
                  <Link
                    href="/services?category=lifestyle"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/80 hover:text-[#D4AF37] transition-colors font-dm-sans"
                  >
                    <div>
                      <div className="font-medium">Reluxi Lifestyle</div>
                      <div className="text-xs text-white/60 mt-1">
                        Luxury & Romantic Experiences
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/family"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white/80 hover:text-[#D4AF37] transition-colors font-dm-sans"
                  >
                    <div>
                      <div className="font-medium">Reluxi Family</div>
                      <div className="text-xs text-white/60 mt-1">
                        Family & Cultural Experiences
                      </div>
                    </div>
                  </Link>
                </div>
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
                  {t("signUp")}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Login Modal */}
      {showLoginModal && !user && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 h-screen overflow-y-auto">
          <motion.div
            className="bg-[#111] border border-[#D4AF37]/30 rounded-lg p-6 w-full max-w-md mx-auto my-auto sm:my-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            dir={isArabic ? "rtl" : "ltr"}
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
              {language === "RU"
                ? "Пожалуйста, введите электронную почту, которую вы использовали при бронировании услуги консьержа."
                : language === "AR"
                ? "الرجاء إدخال البريد الإلكتروني الذي استخدمته عند حجز خدمة الكونسيرج."
                : language === "CN"
                ? "请输入您在预订礼宾服务时使用的电子邮件。"
                : t("emailLoginPrompt") ||
                  "Please enter the email you used when booking your concierge service."}
            </p>

            {loginMessage ? (
              <div
                className={`p-4 mb-4 rounded text-center ${
                  loginMessageType === "success"
                    ? "bg-green-900/30 text-green-300 border border-green-700"
                    : "bg-red-900/30 text-red-300 border border-red-700"
                }`}
              >
                {getTranslatedMessage(loginMessage, language)}
              </div>
            ) : (
              <form onSubmit={handleLogin} className="mb-2">
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder={
                        language === "RU"
                          ? "Ваш адрес электронной почты"
                          : language === "AR"
                          ? "عنوان بريدك الإلكتروني"
                          : language === "CN"
                          ? "您的电子邮件地址"
                          : t("yourEmailAddress") || "Your Email Address"
                      }
                      className="w-full p-3 bg-black/50 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-dm-sans"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder={
                        language === "RU"
                          ? "Ваш пароль"
                          : language === "AR"
                          ? "كلمة المرور الخاصة بك"
                          : language === "CN"
                          ? "您的密码"
                          : t("yourPassword") || "Your Password"
                      }
                      className="w-full p-3 bg-black/50 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-dm-sans"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      dir={isArabic ? "rtl" : "ltr"}
                    />
                  </div>

                  {loginMessage && loginMessageType === "error" && (
                    <div className="p-3 mt-2 rounded text-red-300 bg-red-900/30 border border-red-700/50 text-sm">
                      {getTranslatedMessage(loginMessage, language)}
                      {loginMessage.includes("couldn't find a user") && (
                        <p className="mt-2">
                          <Link
                            href="/book"
                            className="text-[#D4AF37] underline"
                            onClick={() => setShowLoginModal(false)}
                          >
                            {language === "RU"
                              ? "Забронировать консьержа"
                              : language === "AR"
                              ? "احجز كونسيرج"
                              : language === "CN"
                              ? "预订礼宾服务"
                              : "Book a concierge"}
                          </Link>{" "}
                          {language === "RU"
                            ? "сначала для создания учетной записи."
                            : language === "AR"
                            ? "أولاً لإنشاء حسابك."
                            : language === "CN"
                            ? "首先创建您的账户。"
                            : "first to create your account."}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-white/60 mt-2 mb-4">
                  <div>
                    {language === "RU"
                      ? "Введите пароль, который вы использовали при регистрации"
                      : language === "AR"
                      ? "أدخل كلمة المرور التي استخدمتها أثناء التسجيل"
                      : language === "CN"
                      ? "输入您在注册时使用的密码"
                      : t("enterPassword") ||
                        "Enter the password you used during registration"}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300 font-dm-sans ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading
                    ? language === "RU"
                      ? "Обработка..."
                      : language === "AR"
                      ? "جاري المعالجة..."
                      : language === "CN"
                      ? "处理中..."
                      : t("processing")
                    : language === "RU"
                    ? "Продолжить"
                    : language === "AR"
                    ? "متابعة"
                    : language === "CN"
                    ? "继续"
                    : t("continue")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
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

function getTranslatedMessage(message: string, language: string): string {
  if (language === "RU") {
    if (message === "Login successful!") {
      return "Вход выполнен успешно!";
    } else if (message === "Invalid email or password. Please try again.") {
      return "Неверный адрес электронной почты или пароль. Пожалуйста, попробуйте снова.";
    } else if (message === "An unexpected error occurred. Please try again.") {
      return "Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.";
    } else if (message === "Please enter both email and password.") {
      return "Пожалуйста, введите и электронную почту, и пароль.";
    } else if (message.includes("We couldn't find a user")) {
      return "Мы не нашли пользователя с такой электронной почтой. Пожалуйста, убедитесь, что вы ввели правильную электронную почту при бронировании услуги консьержа.";
    } else if (message === "Invalid credentials. Please try again.") {
      return "Неверные учетные данные. Пожалуйста, попробуйте снова.";
    }
  } else if (language === "AR") {
    if (message === "Login successful!") {
      return "تم تسجيل الدخول بنجاح!";
    } else if (message === "Invalid email or password. Please try again.") {
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.";
    } else if (message === "An unexpected error occurred. Please try again.") {
      return "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
    } else if (message === "Please enter both email and password.") {
      return "الرجاء إدخال البريد الإلكتروني وكلمة المرور معًا.";
    } else if (message.includes("We couldn't find a user")) {
      return "لم نتمكن من العثور على مستخدم بهذا البريد الإلكتروني. يرجى التأكد من إدخال البريد الإلكتروني الصحيح الذي استخدمته عند حجز خدمة الكونسيرج.";
    } else if (message === "Invalid credentials. Please try again.") {
      return "بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.";
    }
  } else if (language === "CN") {
    if (message === "Login successful!") {
      return "登录成功！";
    } else if (message === "Invalid email or password. Please try again.") {
      return "电子邮件或密码无效。请重试。";
    } else if (message === "An unexpected error occurred. Please try again.") {
      return "发生意外错误。请重试。";
    } else if (message === "Please enter both email and password.") {
      return "请输入电子邮件和密码。";
    } else if (message.includes("We couldn't find a user")) {
      return "我们找不到使用此电子邮件的用户。请确保输入了您在预订礼宾服务时使用的正确电子邮件。";
    } else if (message === "Invalid credentials. Please try again.") {
      return "凭据无效。请重试。";
    }
  }

  return message;
}
