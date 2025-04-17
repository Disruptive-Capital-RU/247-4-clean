"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const ServicesTextEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.3),
      }
    );
  }, [animate, duration, filter]);

  const renderWords = () => {
    // Split the words into first line and second line
    const firstLineWords = wordsArray.slice(0, 2); // 'How We'
    const secondLineWords = wordsArray.slice(2); // 'Serve You'

    return (
      <motion.div ref={scope} className="flex flex-col items-center">
        {/* First line */}
        <div className="mb-2">
          {firstLineWords.map((word, idx) => (
            <motion.span
              key={`first-${word}-${idx}`}
              className={cn(
                "opacity-0 inline-block mr-4",
                "text-white"
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Second line */}
        <div>
          {secondLineWords.map((word, idx) => (
            <motion.span
              key={`second-${word}-${idx}`}
              className={cn(
                "opacity-0 inline-block mr-4",
                word.toLowerCase().includes("serve") ? "text-[#D4AF37]" : "text-white"
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-6xl md:text-7xl lg:text-9xl font-cormorant font-bold tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
