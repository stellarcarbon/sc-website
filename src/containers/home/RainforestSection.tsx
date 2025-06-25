"use client";

import CTAButton from "@/components/CTAButton";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import DoubleChevronDownIcon from "@/components/icons/DoubleChevronDownIcon";
import { useAppContext } from "@/context/appContext";
import { faDochub } from "@fortawesome/free-brands-svg-icons";
import {
  faChartLine,
  faComputer,
  faFile,
  faFileContract,
  faHistory,
  faSmog,
  faTree,
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
      <div className="bg-forestcreek bg-cover bg-center bg-no-repeat top-0 left-0 w-full z-0 block absolute h-[100vh] md:h-[100vh]" />

      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] hero-text flex flex-col items-center justify-center gap-16 z-10 text-center w-[100%]">
        <span className="font-roboto text-5xl md:text-[80px]">
          Stellarcarbon
        </span>
        <div className="flex flex-col gap-8 text-md px-5 py-8 md:py-12 w-full bg-secondary/[.74]">
          <div className="flex flex-col gap-8 font-noto">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="lg:max-w-[600px] leading-7 lg:leading-10 md:text-xl">
                We provide a simple way to contribute to nature based projects
                through the{" "}
                <a
                  className="underline"
                  href="https://stellar.org/"
                  target="_blank"
                >
                  Stellar
                </a>{" "}
                blockchain
              </div>
            </div>
          </div>

          {/* <div className="flex justify-center text-base font-bold mx-10">
              <ul className="list-none inline-block text-start space-y-1 md:space-y-6">
                <li className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTree} className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    Contribute to climate and biodiversity action
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faFile} className="ml-1 text-2xl" />
                  </div>
                  <div className="flex-1">Track your contributions</div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faComputer}
                      className="ml-1 text-2xl"
                    />
                  </div>
                  <div className="flex-1">Integrate our software</div>
                </li>
              </ul>
            </div> */}

          {/* <span className="text-sm md:text-base">
            By sinking CARBON you are contributing to high-integrity nature
            based projects. Find out more below.
          </span> */}
        </div>
        <div className="flex justify-center my-1">
          <CTAButton huge />
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
