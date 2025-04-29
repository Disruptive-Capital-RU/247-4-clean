"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    // Use a throttled resize listener to avoid frequent updates
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Use a smaller range for the transform to reduce computational work
  const rotate = useTransform(scrollYProgress, [0.2, 0.8], [20, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0.2, 0.8], [0, -100]);

  return (
    <div
      className="h-auto md:h-[80rem] min-h-[55rem] flex items-center justify-center relative p-0 md:p-6 will-change-transform"
      ref={containerRef}
    >
      <div
        className="py-0 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-full px-4 mx-auto text-center will-change-transform"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 9px 20px rgba(0, 0, 0, 0.29), 0 37px 37px rgba(0, 0, 0, 0.26)",
      }}
      className="max-w-full -mt-6 md:-mt-12 mx-auto h-auto md:h-[40rem] aspect-[16/10] md:aspect-auto w-full border-4 border-[#6C6C6C] p-1 md:p-4 bg-[#222222] rounded-[30px] shadow-2xl will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-black md:rounded-2xl p-0">
        {children}
      </div>
    </motion.div>
  );
};
