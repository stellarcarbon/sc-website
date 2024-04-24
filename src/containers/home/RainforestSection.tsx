"use client";

import CTAButton from "@/components/CTAButton";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useEffect, useRef, useState } from "react";

export default function RainforestIntro() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const chevDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function adjustBackgroundSize() {
      const viewportHeight = window.innerHeight;
      const mHeight = viewportHeight > 400 ? viewportHeight : 375;

      const rainForestbackground = document.querySelector(
        ".bg-rainforest"
      ) as HTMLElement | null;

      if (rainForestbackground) {
        rainForestbackground.style.minHeight = `${mHeight}px`;
      }

      const heroText = document.querySelector(
        ".hero-text"
      ) as HTMLElement | null;
      if (heroText) {
        heroText.style.minHeight = `${mHeight - 80}px`;
      }
    }
    adjustBackgroundSize();

    // Adjust on resize or orientation changes
    // window.addEventListener("resize", adjustBackgroundSize);
    window.addEventListener("orientationchange", adjustBackgroundSize);
  }, []);

  const trackScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", trackScroll, { passive: true });
    setScrollPosition(0);

    const chev = chevDown.current;
    const handleAnimationEnd = () => {
      if (chev) {
        chev.style.visibility = "hidden";
      }
    };

    chev?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      window.removeEventListener("scroll", trackScroll);
      chev?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  const onClickChevDown = () => {
    window.scrollTo({ left: 0, top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full top-0 left-0 z-0 block absolute" />
      <div className="min-h-[calc(100vh-80px)] hero-text flex flex-col items-center justify-center gap-[80px] z-10 text-center w-[100%]">
        <div className="flex flex-col h-[50%] leading-8 text-md px-5 py-8 w-full bg-primary/[.54]">
          <h1 className="px-4 text-4xl lg:text-5xl font-noto mb-4">
            Sinking CARBON with Stellar
          </h1>
          <span className="md:max-w-[50%] self-center">
            We provide a simple way for{" "}
            <a
              className="underline"
              href="https://stellar.org/"
              target="_blank"
            >
              Stellar
            </a>{" "}
            blockchain users to contribute to high-integrity nature based
            projects, making it effortless to compensate for your remaining
            emissions.
          </span>
          <CTAButton className="self-center mt-4 md:mt-8" />
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
    </>
  );
}
