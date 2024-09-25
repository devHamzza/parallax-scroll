"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const GsapCards = () => {
  const container = useRef(null);

  return (
    <section ref={container} className="bg-slate-800 ">
      <div className="h-80 w-60 bg-blue-500 rounded-lg"></div>
      <div className="h-80 w-60 bg-blue-500 rounded-lg"></div>
      <div className="h-80 w-60 bg-blue-500 rounded-lg"></div>
      <div className="h-80 w-60 bg-blue-500 rounded-lg"></div>
    </section>
  );
};

export default GsapCards;
