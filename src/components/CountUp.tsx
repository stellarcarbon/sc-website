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

  const intervalInMS = props.value > 3000 ? 1 : 1000 / props.value;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isVisible && counter < props.value) {
      interval = setInterval(() => {
        setCounter((prevCounter) =>
          prevCounter < ~~props.value
            ? prevCounter + 1
            : prevCounter < props.value
            ? prevCounter + (props.value - prevCounter)
            : prevCounter
        );
      }, intervalInMS);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVisible]);

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
