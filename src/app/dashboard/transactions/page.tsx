"use client";

import { useSCRouter } from "@/app/utils";
import Button from "@/components/Button";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import {
  faChevronDown,
  faClose,
  faCross,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function DashboardMyTransactions() {
  const router = useSCRouter();
  const { myTransactions } = useAppContext();

  const [showCertificateChoice, setShowCertificateChoice] =
    useState<boolean>(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (ed) => {
      router.push("/dashboard/transactions/history");
    },
    onSwipedRight: () => router.push("/dashboard/sink"),
    delta: 100,
  });

  return (
    <div
      {...swipeHandlers}
      className="flex-1 flex flex-col justify-start items-center px-4 mt-6 mb-12"
    >
      {/* <div className="flex flex-col justify-center self-start h-12">
        <span className="text-sm">These are your pending retirements.</span>
      </div> */}

      <div className="flex flex-col gap-2 items-center">
        <h1>Total CARBON pending retirement into a certificate</h1>
        <div className="flex items-center justify-center gap-1 text-3xl">
          <span>{"0.33"}</span>
          <CARBONCurrencyIcon />
        </div>
        <div
          className={`flex flex-col items-center p-4 m-2 ${
            showCertificateChoice &&
            "bg-secondary border rounded border-tertiary"
          }`}
        >
          {/* <Button>Sink my pending retirements</Button> */}
          {/* <Button>Add remaining fraction</Button> */}
          <div className="flex w-full justify-center relative">
            <Button
              className={`w-[200px] flex-end absolute ${
                showCertificateChoice
                  ? "w-[24px] !px-2 bg-secondary text-white animate-showrequestcertificate"
                  : "animate-hiderequestcertificate"
              }`}
              onClick={() => setShowCertificateChoice(!showCertificateChoice)}
            >
              {!showCertificateChoice ? (
                `Request a certificate`
              ) : (
                <FontAwesomeIcon icon={faClose} />
              )}
            </Button>
          </div>
          {showCertificateChoice && (
            <div className="p-4 flex flex-col gap-4 items-center">
              <h2 className="text-xl font-semibold">
                Requesting a certificate
              </h2>
              <span>
                Requesting a certificate at the Verra registry is completely
                optional. All CARBON transactions will eventually be retired
                using community certificates. You can view the countdown on each
                of your transactions that are pending retirement below.
              </span>
              <span>
                To request a personal certificate with the Verra registry we
                need to submit a round number. We recommend you add the
                remaining fraction to request your certificate. Alternatively,
                you can request your certificate for current whole number.
              </span>
              <div className="flex justify-center gap-4 h-10">
                <Button>Add remaining fraction</Button>
                <Button>Round down</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <hr className="w-[90%] mt-10 mb-8" /> */}

      <div className=" border rounded border-tertiary p-4 text-sm my-4 mt-10">
        <span>
          The list below contains your transaction for which no certificate has
          been issued yet. If you do not request a personal certificate, they
          will be automatically retired into the community pool 90 days after
          the corresponding transaction took place. Read more about pending
          retirements{" "}
          <Link href="/explain" className="underline">
            here
          </Link>
          .
        </span>
      </div>

      <div className="flex flex-col w-full gap-2">
        {myTransactions?.map((transaction, index) => {
          return (
            <TransactionListItem
              key={index}
              transaction={transaction}
              onClick={() => {}}
            />
          );
        })}
        <div className="bg-secondary p-2">Item 1</div>
        <div className="bg-secondary p-2">Item 2</div>
        <div className="bg-secondary p-2">Item 3</div>
        <div className="bg-secondary p-2">Item 4</div>
        <div className="bg-secondary p-2">Item 5</div>
        <div className="bg-secondary p-2">Item 6</div>
      </div>

      <div className="flex flex-col gap-1"></div>
    </div>
  );
}
