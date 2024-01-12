"use client";

import Button from "@/app/components/Button";
import { Payment } from "@/app/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const mockPayments = () => {
    const mockedPayments: Payment[] = [
      {
        hash: "63f55c3ff92b239ecdb774c336cb91e896a3e4906a81cbeb23a60f20563c198f",
        transactionSuccesful: true,
        createdAt: new Date(),
        transaction: {
          paymentAmount: 10,
          paymentAsset: "XLM",
          memo: "My memo",
        },
      },
      {
        hash: "20dbafdc604fc1a48eafc4ce0df2b6151dfa5a5241c307f811a99ce4ddf2fb7f",
        transactionSuccesful: true,
        createdAt: new Date(2001),
        transaction: {
          paymentAmount: 1,
          paymentAsset: "USDC",
          memo: "Another very long memo containing all kinds of text. Lorem ipsum dolor sit amet.",
        },
      },
      {
        hash: "20dbafdc604fc1a48eafc4ce0df2b6151dfa5a5241c307f811a99ce4ddf2fb71",
        transactionSuccesful: true,
        createdAt: new Date(2001),
        transaction: {
          paymentAmount: 1,
          paymentAsset: "USDC",
          memo: "Another very long memo containing all kinds of text. Lorem ipsum dolor sit amet.",
        },
      },
      {
        hash: "20dbafdc604fc1a48eafc4ce0df2b6151dfa5a5241c307f811a99ce4ddf2fb72",
        transactionSuccesful: true,
        createdAt: new Date(2001),
        transaction: {
          paymentAmount: 1,
          paymentAsset: "USDC",
          memo: "Another very long memo containing all kinds of text. Lorem ipsum dolor sit amet.",
        },
      },
    ];

    if (payments.length === 0) {
      setPayments(mockedPayments);
    } else {
      setPayments([]);
    }
  };

  return (
    <div className="text-accent m-2 flex flex-col gap-2">
      <h1 className="text-lg font-bold text-center">Transaction history</h1>
      {!isLoading ? (
        payments.length === 0 ? (
          <div className="flex flex-col items-center m-4 gap-2">
            <span className=" text-sm text-center">
              Looks like you don't have any transactions yet. After sinking
              carbon you can view your history here.
            </span>
          </div>
        ) : (
          payments.map((payment) => {
            return (
              <div
                onClick={() => {
                  router.push(`/wallet/transaction/${payment.hash}`);
                }}
                className="flex flex-col text-sm text-accent bg-tertiary rounded-md border border-accentSecondary p-2 "
                key={`payment_${payment.hash}`}
              >
                <div className="flex justify-between">
                  <span>Hash</span>
                  <span className="text-xs truncate max-w-[60%]">
                    {payment.hash}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{payment.createdAt.toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>

                  <span>{payment.transaction?.paymentAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset used</span>

                  <span>{payment.transaction?.paymentAsset}</span>
                </div>
                <div className="flex justify-between">
                  <span>Memo</span>

                  <span className="text-xs truncate max-w-[60%]">
                    {payment.transaction?.memo}
                  </span>
                </div>
                {/* <span>
                {payment.transactionSuccesful ? "Succesful" : "Failed"}
              </span> */}
              </div>
            );
          })
        )
      ) : (
        <div className="text-center py-4">Loading blockchain data...</div>
      )}
      <Button onClick={mockPayments} className="!p-2">
        Swap state (dev only)
      </Button>
    </div>
  );
}
