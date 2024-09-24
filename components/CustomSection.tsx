"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Card from "./Card";
import Lenis from "@studio-freight/lenis";

const CustomSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <section ref={container} className=" bg-gray-900 relative">
      {["#3b8216", "#f97316", "#eab308", "#10b981", "#6366f1"].map((n, i) => {
        const targetScale = 1 - (4 - i) * 0.05;
        return (
          <Card
            key={`card-${i}+${Math.random()}+${i}`}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            color={n}
          />
        );
      })}
    </section>
  );
};

export default CustomSection;
