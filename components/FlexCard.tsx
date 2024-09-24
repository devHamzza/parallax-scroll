"use client";
import { useTransform, motion, useSpring } from "framer-motion";

const FlexCard = ({
  color,
  progress,
  inputRange,
  outputRange,
  i,
}: {
  color: string;
  progress: any;
  inputRange: number[];
  outputRange: number[];
  targetScale: number;
  i: number;
}) => {
  const scale = useSpring(useTransform(progress, inputRange, outputRange));

  return (
    <div className="h-[90vh] flex items-center justify-center sticky top-[5vh]">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          //   top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="card flex items-center justify-center relative top-0 h-[500px] w-[200px] origin-top rounded-lg"
      >
        <h1 className="text-4xl font-bold">Card {i}</h1>
      </motion.div>
    </div>
  );
};

export default FlexCard;
