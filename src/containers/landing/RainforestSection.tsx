"use client";

import CTAButton from "@/components/CTAButton";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useAppContext } from "@/context/appContext";
import { useCallback, useEffect, useRef, useState } from "react";

export default function RainforestIntro() {
  const { isMobileDevice } = useAppContext();

  const [scrollPosition, setScrollPosition] = useState(0);
  const chevDown = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(-80);

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
    if (isMobileDevice) setOffset(-64);
  }, [isMobileDevice]);

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
        className="bg-foresttrees bg-cover bg-center bg-no-repeat top-0 left-0 w-full z-0 block absolute h-[100vh] md:h-[100vh]"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      />

      <div className="relative h-[calc(100svh-64px)] md:h-[calc(100vh-80px)] hero-text flex flex-col items-center justify-start md:justify-center gap-16 z-10 text-center w-[100%]">
        <div className="flex flex-col justify-center gap-8 py-8 md:py-12 w-full bg-darker/[.3] md:bg-gray-900/[.4] h-full md:h-full">
          <span className="font-noto font-bold text-5xl md:text-[64px] max-w-5xl self-center tracking-normal leading-snug md:leading-normal">
            Protect the rainforest with Stellarcarbon
          </span>
          <div className="flex flex-col gap-8 font-noto">
            <div className="flex flex-col items-center text-center gap-4">
              {/* <div className="text-xl md:text-2xl leading-relaxed">
                Fund certified rainforest conservation projects with just your
                Stellar wallet
                
              </div> */}
              {/* <div className="md:text-2xl">
                Connect your wallet and donate, or integrate with our API &
                Soroban contract.
              </div> */}
            </div>
          </div>
          <div className="flex justify-center">
            <CTAButton huge white />
          </div>
        </div>

        <div
          ref={chevDown}
          className={`absolute cursor-pointer bottom-[32px] animate-bounce ${
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
