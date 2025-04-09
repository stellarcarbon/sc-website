"use client";

import CTAButton from "@/components/CTAButton";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useAppContext } from "@/context/appContext";
import { faDochub } from "@fortawesome/free-brands-svg-icons";
import {
  faChartLine,
  faFile,
  faFileContract,
  faHistory,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RainforestIntro() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const chevDown = useRef<HTMLDivElement>(null);

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
    window.scrollTo({
      left: 0,
      top: window.innerHeight - 80,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-rainforest bg-fixed bg-cover bg-top bg-no-repeat w-full top-0 left-0 z-0 block absolute h-[100vh]" />

      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] hero-text flex flex-col items-center justify-center gap-[60px] z-10 text-center w-[100%]">
        {/* <span className="font-roboto text-5xl md:text-[80px]"> */}
        {/* <CARBONCurrencyIcon width={56} height={56} /> */}
        {/* Stellarcarbon */}
        {/* </span> */}
        <div className="flex flex-col gap-8 md:gap-16 text-md px-5 py-10 w-full bg-secondary/[.64]">
          {/* <h1 className="px-4 text-lg font-noto mb-4">
            Sinking CARBON with Stellar
          </h1> */}
          {/* <span className="md:max-w-[50%] self-center leading-8 ">
            We provide a simple way for{" "}
            <Link
              className="underline"
              href="https://stellar.org/"
              target="_blank"
            >
              Stellar
            </Link>{" "}
            blockchain users to contribute to high-integrity nature based
            projects, making it effortless to compensate for your remaining
            emissions.
          </span> */}
          <div className="flex flex-col gap-8 font-noto">
            <div className="text-2xl text-center leading-8 ">
              Making the{" "}
              <Link
                className="underline"
                href="https://stellar.org/"
                target="_blank"
              >
                Stellar
              </Link>{" "}
              blockchain carbon neutral
            </div>
            <div className="flex justify-center text-lg">
              <ul className="list-none inline-block text-left space-y-2">
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faSmog} /> Offset personal emissions
                </li>
                <li className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faFile} className="ml-1" />
                  Track your sinking history
                </li>
                <li className="flex gap-3 items-center">
                  <FontAwesomeIcon icon={faFileContract} className="ml-1" />{" "}
                  Integrate our Soroban contract
                </li>
              </ul>
            </div>
          </div>

          {/* <span className="text-sm md:text-base">
            By sinking CARBON you are contributing to high-integrity nature
            based projects. Find out more below.
          </span> */}
        </div>
        <CTAButton />
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
