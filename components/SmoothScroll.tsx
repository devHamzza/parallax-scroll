"use client";

import ReactLenis from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode } from "react";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
