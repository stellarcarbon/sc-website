"use client";

import { useEffect, useRef, useState } from "react";

export enum ParallaxBackgrounds {
  FOREST = "bg-forest",
  AUTUMN_FOREST = "bg-autumnforest",
  RIVER_ESTUARY = "bg-riverestuary",
  JADE_WETLANDS = "bg-jadewetlands",
  LAFAYETTE = "bg-lafayette",
}

interface ParallaxDiverProps {
  image: ParallaxBackgrounds;
  smaller?: boolean;
}

export default function ParallaxDivider({
  image,
  smaller = false,
}: ParallaxDiverProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<number>(0);

  useEffect(() => {
    let yCoordinate = 0;

    const parallaxer = () => {
      const screenFactor = 50;

      const newT = Math.max(
        Math.min(100, -(yCoordinate - window.scrollY) / 5),
        -400
      );

      setTransform(newT < 0 ? newT : 0);
    };

    window.addEventListener("scroll", parallaxer);

    if (componentRef.current) {
      const rect = componentRef.current.getBoundingClientRect();
      yCoordinate = rect.top + window.scrollY;
    }
  }, []);

  const t = {
    transform: `translate(0px, ${transform}px)`,
  };

  return (
    <div className="relative w-full" ref={componentRef}>
      <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0">
        <div
          className={`${image} bg-cover bg-top bg-no-repeat w-screen h-[800px]`}
          style={t}
        ></div>
      </div>
      <div
        className={`${smaller ? "h-[150px]" : "h-[200px] md:h-[300px]"} w-full`}
      ></div>
    </div>
  );
}
