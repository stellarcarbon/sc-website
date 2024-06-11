"use client";

import CTAButton from "@/components/CTAButton";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useAppContext } from "@/context/appContext";
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
        heroText.style.minHeight = `${mHeight}px`;
      }
    }
    adjustBackgroundSize();

    // Adjust on resize or orientation changes
    // window.addEventListener("resize", adjustBackgroundSize);
    window.addEventListener("orientationchange", adjustBackgroundSize);
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

  const onClickChevDown = () => {
    window.scrollTo({ left: 0, top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full top-0 left-0 z-0 block absolute" />
      <div className="min-h-[100vh] hero-text flex flex-col items-center justify-center gap-[80px] z-10 text-center w-[100%]">
        <div className="flex flex-col gap-8 text-md px-5 py-12 w-full bg-secondary/[.44]">
          <span className="font-mono text-5xl md:text-[80px]">
            {/* <CARBONCurrencyIcon width={56} height={56} /> */}
            Stellarcarbon
          </span>
          {/* <h1 className="px-4 text-lg font-noto mb-4">
            Sinking CARBON with Stellar
          </h1> */}
          {/* <span className="md:max-w-[50%] self-center leading-8 ">
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
          </span> */}
          <div className="text-sm md:text-lg lg:text-xl flex flex-col items-center text-center  gap-4 leading-8 ">
            <span>
              We provide a simple way for{" "}
              <a
                className="underline"
                href="https://stellar.org/"
                target="_blank"
              >
                Stellar
              </a>{" "}
              blockchain users to compensate for their CO2 emissions.
            </span>
          </div>
          <CTAButton className="self-center" />
          <span className="text-sm md:text-base">
            By sinking CARBON you are contributing to high-integrity nature
            based projects. Find out more below.
          </span>
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
