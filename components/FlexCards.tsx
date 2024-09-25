"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
// import Lenis from "@studio-freight/lenis";
import FlexCard from "./FlexCard";

const FlexCards = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time: any) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });

  return (
    <section
      ref={container}
      className=" bg-slate-800 h-[1000vh] flex justify-center gap-10"
    >
      {["#3b8216", "#f97316", "#eab308", "#10b981"].map((n, i) => {
        const targetScale = 1 - (4 - i) * 0.05;
        const inputStart = 0.2 + i * (0.7 / 4);
        const inputEnd = inputStart + 0.7 / 4;
        const outputEnd = inputEnd + 0.02;

        return (
          <FlexCard
            key={`card-${i}+${Math.random()}+${i}`}
            i={i}
            progress={scrollYProgress}
            inputRange={[inputStart, inputEnd, outputEnd]}
            outputRange={[1, 1.15, 1]}
            targetScale={targetScale}
            color={n}
          />
        );
      })}
    </section>
  );
};

export default FlexCards;
