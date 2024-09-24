"use client";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Card = ({
  color,
  progress,
  range,
  targetScale,
  i,
}: {
  color: string;
  progress: any;
  range: any;
  targetScale: number;
  i: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="card flex flex-col items-center justify-center relative -top-[25%] h-[400px] w-[1000px] origin-top rounded-lg"
      >
        <h1 className="text-4xl font-bold">Card {i}</h1>
      </motion.div>
    </div>
  );
};

export default Card;
