import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialDuration: number; // duration in seconds
}

export default function CountDownTimer({
  initialDuration,
}: CountdownTimerProps) {
  const calculateTargetDate = (): Date => {
    const now = new Date();
    const target = new Date(now.getTime() + initialDuration * 1000);
    return target;
  };

  const calculateTimeLeft = (targetDate: Date) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

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

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!(timeLeft as any)[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {(timeLeft as any)[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex flex-col items-center">
      {timerComponents.length ? (
        <>
          <span className="text-lg font-semibold my-1">{timerComponents}</span>
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
