import CTAButton from "@/components/CTAButton";
import { useEffect } from "react";

export default function RainforestIntro() {
  useEffect(() => {
    function adjustBackgroundSize() {
      const viewportHeight = window.innerHeight;

      const rainForestbackground = document.querySelector(
        ".bg-rainforest"
      ) as HTMLElement | null;

      if (rainForestbackground) {
        rainForestbackground.style.minHeight = `${viewportHeight}px`;
      }

      const heroText = document.querySelector(
        ".hero-text"
      ) as HTMLElement | null;
      if (heroText) {
        heroText.style.minHeight = `${viewportHeight - 80}px`;
      }
    }
    adjustBackgroundSize();

    // Adjust on resize or orientation changes
    window.addEventListener("resize", adjustBackgroundSize);
    window.addEventListener("orientationchange", adjustBackgroundSize);
  }, []);

  return (
    <>
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full min-h-[calc(100vh)] top-0 left-0 z-0 block absolute" />
      <div className="hero-text flex flex-col items-center justify-center gap-[80px] z-10 text-center w-[100%] max-h-[50%]">
        <div className="flex flex-col leading-8 text-md px-5 py-4 w-full bg-primary/[.54]">
          <h1 className="text-5xl lg:text-6xl font-noto my-2 mb-4">
            Stellarcarbon
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
            users to contribute to high-integrity nature based projects, making
            it effortless to compensate for your remaining emissions.
          </span>
          <CTAButton className="self-center mt-4 md:mt-8" />
        </div>
      </div>
    </>
  );
}
