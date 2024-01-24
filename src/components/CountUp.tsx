"use client";

import { useIntersectionObserver } from "@/app/utils";
import { HTMLProps, useEffect, useState } from "react";

interface CountUpProps extends HTMLProps<HTMLDivElement> {
  value: number;
  unit: string;
  subject: string;
}

export default function CountUp(props: CountUpProps) {
  const [counter, setCounter] = useState<number>(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  const [mInterval, setMInterval] = useState<NodeJS.Timeout>();

  let intervalInMS = props.value > 1000 ? 1 : 1000 / props.value;

  let step = 1;
  if (props.value <= 999) {
  } else if (props.value > 1000 && props.value <= 9999) {
    step = 10;
  } else if (props.value > 10000 && props.value <= 99999) {
    step = 100;
  } else if (props.value > 100000) {
    step = 1000;
  }

  intervalInMS = (1000 * step) / props.value;

  console.log(counter, props.value, step, intervalInMS);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVisible && counter < props.value) {
      console.log("efffect");
      interval = setInterval(() => {
        setCounter(
          (prevCounter) => {
            let newCounter = prevCounter;
            if (prevCounter < ~~(props.value / step) * step) {
              newCounter += step;
            } else {
              console.log(prevCounter, props.value);
              if (prevCounter < props.value) {
                newCounter += props.value - prevCounter;
              }
            }
            return newCounter;
          }
          // prevCounter < ~~(props.value / step) * step
          //   ? prevCounter + step
          //   : prevCounter > props.value
          //   ? prevCounter + (prevCounter - props.value)
          //   : prevCounter
        );
      }, intervalInMS);
      setMInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (counter === props.value) {
      clearInterval(mInterval);
    }
  }, [counter]);

  return (
    <div ref={ref} className="my-4 w-full flex flex-col items-center">
      <span className="mb-4 text-6xl font-noto">{counter}</span>
      <span className="mb-2 uppercase text-large text-accent font-semibold tracking-widest text-sm">
        {props.unit}
      </span>
      <span className="text-center text-sm text-accent">{props.subject}</span>
    </div>
  );
}
