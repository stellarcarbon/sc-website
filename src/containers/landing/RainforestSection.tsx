"use client";

import CTAButton from "@/components/CTAButton";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useCallback, useEffect, useRef, useState } from "react";

export default function RainforestIntro() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const chevDown = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { top } = containerRef.current.getBoundingClientRect();
        setOffset(-top);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const trackScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", trackScroll, { passive: true });

    return () => {};
  }, []);

  useEffect(() => {
    const trackScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const curPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    setScrollPosition(curPos);

    window.addEventListener("scroll", trackScroll, { passive: true });

    const chev = chevDown.current;
    const handleAnimationEnd = () => {
      if (chev) {
        chev.style.visibility = "hidden";
      }
    };

    chev?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      chev?.removeEventListener("animationend", handleAnimationEnd);
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  const onClickChevDown = useCallback(() => {
    window.scrollTo({
      left: 0,
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="bg-forestbomen bg-cover bg-no-repeat top-0 left-0 w-full z-0 block absolute h-[100vh] md:h-[100vh]"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      />

      <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] hero-text flex flex-col items-center justify-center gap-16 z-10 text-center w-[100%]">
        <div className="flex flex-col gap-8 text-md px-5 py-8 md:py-12 w-full bg-darker/[.8]">
          <span className="font-roboto text-5xl md:text-[80px]">
            Stellarcarbon
          </span>
          <div className="flex flex-col gap-8 font-noto">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="md:text-xl">
                Contribute to rainforest conservation projects using the Stellar
                blockchain.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <CTAButton huge white />
          </div>
        </div>

        <div
          ref={chevDown}
          className={`absolute cursor-pointer bottom-0 animate-bounce ${
            scrollPosition > 0 ? "animate-fade" : ""
          }`}
          onClick={onClickChevDown}
        >
          <DoubleChevronDownIcon />
        </div>
      </div>
    </div>
  );
}
