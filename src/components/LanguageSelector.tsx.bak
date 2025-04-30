"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" }, // Arabic
    { code: "CN", name: "中文" }, // Chinese
    { code: "RU", name: "Русский" }, // Russian
  ];

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center px-3 py-2 text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-sm transition-all duration-300 min-w-[45px]"
      >
        {language}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/70 z-[100]"
                onClick={() => setIsOpen(false)}
              />
            )}

            <motion.div
              initial={
                isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: -10 }
              }
              animate={
                isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }
              }
              exit={
                isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.2 }}
              className={`${
                isMobile
                  ? "fixed left-1/2 top-[50vh] -translate-x-1/2 -translate-y-1/2 w-72 max-w-[90%]"
                  : "absolute top-full mt-1 right-0 w-32"
              } bg-black border border-[#D4AF37]/40 rounded-md shadow-lg overflow-hidden z-[101]`}
            >
              <div className={`${isMobile ? "py-3" : "py-1"}`}>
                {isMobile && (
                  <div className="border-b border-[#D4AF37]/30 pb-2 mb-2 px-4">
                    <h3 className="text-[#D4AF37] text-center text-lg font-medium">
                      Select Language
                    </h3>
                  </div>
                )}
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center w-full px-4 ${
                      isMobile ? "py-3 text-base" : "py-2 text-sm"
                    } ${
                      language === lang.code
                        ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                        : "text-white hover:bg-[#D4AF37]/10"
                    } transition-colors duration-200`}
                  >
                    <span
                      className={`${
                        isMobile ? "text-base mr-3" : "text-sm mr-2"
                      }`}
                    >
                      {lang.code}
                    </span>
                    <span
                      className={`${
                        isMobile ? "text-sm" : "text-xs"
                      } opacity-70`}
                    >
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
