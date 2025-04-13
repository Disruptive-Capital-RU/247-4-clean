"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" }, // Arabic
    { code: "CN", name: "中文" }, // Chinese
    { code: "RU", name: "Русский" }, // Russian
  ];

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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 right-0 w-32 bg-black border border-[#D4AF37]/40 rounded-sm shadow-lg overflow-hidden z-50"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    language === lang.code
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "text-white hover:bg-[#D4AF37]/10"
                  } transition-colors duration-200`}
                >
                  <span className="mr-2">{lang.code}</span>
                  <span className="text-xs opacity-70">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
