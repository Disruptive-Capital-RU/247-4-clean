"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";

export const RotatingMovingBorder = ({
  children,
  duration = 6000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  // Use animation frame for continuous animation
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  // Get x and y coordinates
  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  // Calculate rotation based on position derivatives
  const angle = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;

    // Get total length of the path
    const length = pathRef.current.getTotalLength();

    // Calculate next point (slightly ahead on the path)
    const nextVal = (val + 2) % length;

    // Get current and next points
    const currentPoint = pathRef.current.getPointAtLength(val);
    const nextPoint = pathRef.current.getPointAtLength(nextVal);

    // Calculate angle based on direction of movement
    const dx = nextPoint.x - currentPoint.x;
    const dy = nextPoint.y - currentPoint.y;

    // Convert to degrees and return
    return Math.atan2(dy, dx) * (180 / Math.PI);
  });

  // Combine transforms: position and rotation
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%) rotate(${angle}deg)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
