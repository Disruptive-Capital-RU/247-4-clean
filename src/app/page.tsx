"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";

import Footer from "@/components/Footer";
import HomeIntroAnimation from "@/components/HomeIntroAnimation";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setShowContent(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {showAnimation && (
        <HomeIntroAnimation onComplete={handleAnimationComplete} />
      )}

      {showContent && (
        <>
          <Navigation />
          <HeroSection />
          <ServicesSection />

          <Footer />
        </>
      )}
    </main>
  );
}
