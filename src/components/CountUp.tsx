/* eslint-disable react-hooks/exhaustive-deps */
/* 
TODO: do not cheat React by disabling exhaustive deps. 

Not very important, but nice programming challenge.

https://overreacted.io/a-complete-guide-to-useeffect/

*/
"use client";

import { useIntersectionObserver } from "@/utils";
import { HTMLProps, useEffect, useState } from "react";

interface CountUpProps extends HTMLProps<HTMLDivElement> {
  value: number;
  unit: string;
  subject: string;
  decimals?: number;
}

export default function CountUp({
  value,
  unit,
  subject,
  decimals = 0,
}: CountUpProps) {
  const [counter, setCounter] = useState<number>(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  const [mInterval, setMInterval] = useState<NodeJS.Timeout>();

  let intervalInMS = value > 1000 ? 1 : 1000 / value;

  let step = 1;
  if (value <= 999) {
  } else if (value > 1000 && value <= 9999) {
    step = 10;
  } else if (value > 10000 && value <= 99999) {
    step = 100;
  } else if (value > 100000) {
    step = value / 1000;
  }

  intervalInMS = (1000 * step) / value;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVisible && counter < value) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          let newCounter = prevCounter;
          if (prevCounter < ~~(value / step) * step) {
            newCounter += step;
          } else {
            if (prevCounter < value) {
              newCounter += value - prevCounter;
            }
          }
          return newCounter;
        });
      }, intervalInMS);
      setMInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible]);

  const toNumberWithCommas = (x: number) => {
    return x.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (counter === value) {
      clearInterval(mInterval);
    }
  }, [counter]);

  return (
    <div ref={ref} className="mb-4 w-full flex flex-col items-center">
      <span className="mb-4 text-6xl font-noto">
        {toNumberWithCommas(counter)}
      </span>
      <span className="mb-2 uppercase text-large text-accent font-semibold tracking-widest text-sm">
        {unit}
      </span>
      <span className="text-center text-sm text-accent">{subject}</span>
    </div>
  );
}
