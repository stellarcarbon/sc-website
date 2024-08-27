"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export enum ParallaxBackgrounds {
  FOREST = "bg-forest",
  AUTUMN_FOREST = "bg-autumnforest",
  RIVER_ESTUARY = "bg-riverestuary",
  JADE_WETLANDS = "bg-jadewetlands",
  LAFAYETTE = "bg-lafayette",
  RAINFOREST = "bg-rainforest",
  DALLE = "bg-dalle",
}

interface ParallaxDiverProps {
  image: ParallaxBackgrounds;
  smaller?: boolean;
  smallest?: boolean;
  mini?: boolean;
  mirrored?: boolean;
  xOffset?: number;
  yOffset?: number;
}

export default function ParallaxDivider({
  image,
  smaller = false,
  smallest = false,
  mini = false,
  mirrored = false,
  xOffset = 0,
  yOffset = 0,
}: ParallaxDiverProps) {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<number>(0);

  useEffect(() => {
    let yCoordinate = 0;

    const parallaxer = () => {
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
      setTransform(
        Math.max(Math.min(100, -(yCoordinate - window.scrollY) / 5), -400)
      );
    }
  }, []);

  const t = useMemo(() => {
    let transformStyling = `translate(${xOffset}px, ${transform + yOffset}px)`;
    if (mirrored) {
      transformStyling += ` scaleX(-1)`;
    }
    return { transform: transformStyling };
  }, [xOffset, yOffset, transform, mirrored]);

  const heightSettings = useMemo(() => {
    let styling = "h-[200px] md:h-[300px]";
    if (smaller) {
      styling = "h-[125px] md:h-[175px]";
    }
    if (smallest) {
      styling = "h-[90px] md:h-[110px]";
    }

    if (mini) {
      styling = "h-[0px] md:h-[42px]";
    }
    return styling;
  }, [smaller, smallest, mini]);

  return (
    <div className="relative w-full" ref={componentRef}>
      <div className="absolute overflow-hidden top-0 left-0 right-0 bottom-0">
        <div
          className={`${image} bg-cover bg-top bg-no-repeat w-[100vw] h-[800px]`}
          style={t}
        ></div>
      </div>
      <div className={`${heightSettings} w-full`}></div>
    </div>
  );
}
