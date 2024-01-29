"use client";

import { useEffect, useRef, useState } from "react";

export enum ParallaxBackgrounds {
  FOREST = "bg-forest",
  AUTUMN_FOREST = "bg-autumnforest",
}

interface ParallaxDiverProps {
  image: ParallaxBackgrounds;
}

export default function ParallaxDivider({ image }: ParallaxDiverProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<number>(0);

  let yCoordinate = 0;

  useEffect(() => {
    const parallaxer = () => {
      const screenFactor = 50;

      const newT = Math.max(
        Math.min(0, -(yCoordinate - window.scrollY) / 3),
        -400
      );

      setTransform(newT);
    };

    window.addEventListener("scroll", parallaxer);

    if (componentRef.current) {
      const rect = componentRef.current.getBoundingClientRect();
      yCoordinate = rect.top + window.scrollY;
      console.log("Y Coordinate:", image, yCoordinate);
    }
  }, []);

  const t = {
    transform: `translate(0px, ${transform}px)`,
  };

  return (
    <div className="relative" ref={componentRef}>
      <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0">
        <div
          className={`${image} bg-cover bg-top  bg-no-repeat w-screen h-[800px]`}
          style={t}
        ></div>
      </div>
      <div className="h-[300px] w-screen"></div>
    </div>
  );
}
