"use client";

import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DemoLanding() {
  const { walletConnection } = useAppContext();
  const router = useRouter();

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

  return (
    <main className="flex flex-col items-center text-white">
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full top-0 left-0 z-0 block absolute" />
      <div className="min-h-[100dvh] hero-text flex flex-col items-center justify-center gap-[80px] z-10 text-center w-[100%]">
        <span className="font-noto text-4xl md:text-[80px]">Stellarcarbon</span>
        <div className="flex flex-col gap-8 md:gap-16 text-md px-5 py-12 w-full bg-secondary/[.64]">
          <div className="text-sm md:text-lg lg:text-lg flex flex-col items-center text-center gap-8 leading-8 ">
            <span>
              We provide a simple way for{" "}
              <Link
                className="underline"
                href="https://stellar.org/"
                target="_blank"
              >
                Stellar
              </Link>{" "}
              blockchain users to contribute to nature based projects.
            </span>
            <span className="">
              This demo app was created especially for Meridian participants to
              compensate for their flight emissions.
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            let redirectUrl = walletConnection ? "/emissions" : "/connect";
            router.push(redirectUrl);
          }}
          className={`p-1 w-[270px] flex justify-center bg-primary text-white rounded-xl border border-accentSecondary hover:bg-secondary hover:text-white`}
        >
          <div className=" h-11 flex items-center gap-3">
            <CARBONCurrencyIcon width={28} height={28} />
            <span className="font-semibold text-lg">Try it out</span>
          </div>
        </button>
      </div>
    </main>
  );
}
