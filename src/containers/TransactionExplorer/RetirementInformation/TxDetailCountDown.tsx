import { MyTransactionRecord } from "@/app/types";
import { useEffect, useMemo, useState } from "react";

export default function TxDetailCountdown({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const initialDuration = useMemo(() => {
    if (transaction !== undefined) {
      const txDatePlus90 = transaction.createdAt.addDays(90); // TODO: Make this the actual 90 days
      const now = new Date();

      const outcome = +txDatePlus90 - +now;

      return outcome / 1000;
    } else {
      return 0;
    }
  }, [transaction]);

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

  const targetDate = useMemo(() => {
    const now = new Date();
    const target = new Date(now.getTime() + initialDuration * 1000);
    return target;
  }, [initialDuration]);

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

  return <div>{timerComponents}</div>;
}
