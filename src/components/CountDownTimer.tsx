import { ReactNode, useEffect, useState } from "react";

interface CountdownTimerProps {
  initialDuration: number; // duration in seconds
}

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
};

export default function CountDownTimer({
  initialDuration,
}: CountdownTimerProps) {
  const calculateTargetDate = (): Date => {
    const now = new Date();
    const target = new Date(now.getTime() + initialDuration * 1000);
    return target;
  };

  const calculateTimeLeft = (targetDate: Date): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        // seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [targetDate, setTargetDate] = useState<Date>(calculateTargetDate());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate]);

  const timerComponents = Object.entries(timeLeft).reduce<ReactNode[]>(
    (components, [interval, value]) => {
      if (!value) {
        return components;
      }

      components.push(
        <span key={interval}>
          {value} {interval}{" "}
        </span>
      );

      return components;
    },
    []
  );

  return (
    <div className="flex flex-col items-center">
      {timerComponents.length ? (
        <>
          <span className="text-lg font-semibold">{timerComponents}</span>
          <span className="text-xs">left until community retirement.</span>
        </>
      ) : (
        <span>Time is up!</span>
      )}
      {/* <span className="mt-4">Community retirement deadline</span>
      <span className="text-base">{targetDate.toLocaleString()}</span> */}
      {/* <div>End Date: {targetDate.toLocaleString()}</div> */}
    </div>
  );
}
