"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    let scrollTween: gsap.core.Tween;

    const setupScrollTrigger = () => {
      scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.1,
          end: "+=3000",
        },
      });

      gsap.set(".box-1, .box-2", { y: 100 });
      ScrollTrigger.defaults({
        markers: { startColor: "white", endColor: "white" },
      });

      // Red section
      gsap.to(".box-1", {
        y: -130,
        duration: 2,
        ease: "elastic",
        scrollTrigger: {
          trigger: ".box-1",
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none none reset",
          id: "1",
        },
      });

      // Gray section
      gsap.to(".box-2", {
        y: -120,
        backgroundColor: "#1e90ff",
        ease: "none",
        scrollTrigger: {
          trigger: ".box-2",
          containerAnimation: scrollTween,
          start: "center 80%",
          end: "center 20%",
          scrub: true,
          id: "2",
        },
      });

      // Purple section
      ScrollTrigger.create({
        trigger: ".box-3",
        containerAnimation: scrollTween,
        toggleClass: "active",
        start: "center 60%",
        id: "3",
      });

      // Green section
      ScrollTrigger.create({
        trigger: ".green",
        containerAnimation: scrollTween,
        start: "center 65%",
        end: "center 51%",
        onEnter: () => console.log("enter"),
        onLeave: () => console.log("leave"),
        onEnterBack: () => console.log("enterBack"),
        onLeaveBack: () => console.log("leaveBack"),
        onToggle: (self) => console.log("active", self.isActive),
        id: "4",
      });

      // Show only relevant section's markers
      gsap.set(
        ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end",
        { autoAlpha: 0 }
      );
      ["red", "gray", "purple", "green"].forEach((triggerClass, i) => {
        ScrollTrigger.create({
          trigger: "." + triggerClass,
          containerAnimation: scrollTween,
          start: "left 30%",
          end: i === 3 ? "right right" : "right 30%",
          markers: false,
          onToggle: (self) =>
            gsap.to(".marker-" + (i + 1), {
              duration: 0.25,
              autoAlpha: self.isActive ? 1 : 0,
            }),
        });
      });
    };

    setupScrollTrigger();

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <div className={"description"}>
        <div>
          <h1>
            Horizontal "<code>containerAnimation</code>"
          </h1>
          <p>
            Scroll this page vertically and you'll see a horizontal
            fake-scrolling section where a container is animated on the x-axis
            using a ScrollTrigger animation. With{" "}
            <code>containerAnimation</code> you can trigger animations when
            certain elements <i>inside</i> that container enter the viewport
            horizontally! It's like a ScrollTrigger inside of a ScrollTrigger.
            🤯
          </p>
        </div>
        <div className={"scrollDown"}>
          Scroll down<div className={"arrow"}></div>
        </div>
      </div>

      <div ref={containerRef} className={"container"}>
        <div
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className={`panel blue`}
        >
          Scroll down to animate horizontally &gt;
        </div>

        <section
          ref={(el) => {
            sectionsRef.current[1] = el as HTMLDivElement;
          }}
          className={`panel blue`}
        >
          <div>Fire an animation at a particular spot...</div>
          <div className={`box box1`}>box-1</div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current[2] = el as HTMLDivElement;
          }}
          className={`panel gray`}
        >
          <div>
            <pre className={"codeBlock"}></pre>
            ...or scrub it back &amp; forth with the scrollbar
          </div>
          <div className={`box} box2`}>box-2</div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current[3] = el as HTMLDivElement;
          }}
          className={`panel purple`}
        >
          <div>
            <pre className={"codeBlock"}>
              {`ScrollTrigger.create({
  trigger: ".box-3",
  containerAnimation: scrollTween,
  toggleClass: "active",
  start: "center 60%"
});`}
            </pre>
            Toggle a CSS class
          </div>
          <div className={`box} box3`}>box-3</div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current[4] = el as HTMLDivElement;
          }}
          className={`panel green`}
        >
          <div>
            <pre className={"codeBlock"}>
              {`ScrollTrigger.create({
  trigger: ".green",
  containerAnimation: scrollTween,
  start: "center 65%",
  end: "center 51%",
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack: () => console.log("leaveBack"),
  onToggle: self => console.log("active", self.isActive)
});`}
            </pre>
            Use the rich callback system
          </div>
        </section>
      </div>

      <div className={"final"}>
        <div>
          <h1>Wasn't that fun?</h1>
          <p>Here are a few caveats to keep in mind:</p>
          <ul>
            <li>
              The fake-scrolling animation (just the part that's moving the
              container horizontally) must have no easing (
              <code>ease: "none"</code>).
            </li>
            <li>
              Pinning and snapping won't work on ScrollTriggers with a{" "}
              <code>containerAnimation</code>.
            </li>
            <li>
              The mapping of scroll position trigger points are based on the
              trigger element itself not being animated horizontally (inside the
              container). If you need to animate the trigger, you can either
              wrap it in a &lt;div&gt; and use that as the trigger instead or
              just factor the trigger's movement into your end position. For
              example, if you animate it left 100px, make the <code>end</code>{" "}
              100px further to the left.
            </li>
            <li>Requires ScrollTrigger 3.8.0 or later</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
