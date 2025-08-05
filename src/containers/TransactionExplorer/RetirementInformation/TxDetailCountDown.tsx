import { MyTransactionRecord } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { useEffect, useMemo, useState } from "react";

export default function TxDetailCountdown({
  transaction,
}: {
  transaction: MyTransactionRecord;
}) {
  const { retirementGraceDays } = useAppContext();

  const initialDuration = useMemo(() => {
    if (transaction !== undefined) {
      const txDatePlus90 = transaction.createdAt.addDays(retirementGraceDays);
      const now = new Date();

      const outcome = +txDatePlus90 - +now;

      return outcome / 1000;
    } else {
      return 0;
    }
  }, [transaction, retirementGraceDays]);

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
