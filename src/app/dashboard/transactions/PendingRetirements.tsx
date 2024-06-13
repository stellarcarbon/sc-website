"use client";

import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import Button from "@/components/Button";
import TransactionListItem from "@/components/dashboard/TransactionListItem";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useAppContext } from "@/context/appContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

enum DevState {
  devAccount = "dev_account",
  walletAccount = "wallet_account",
  first = "1",
  second = "2",
  third = "3",
  fourth = "4",
}

export default function PendingRetirements() {
  const { myTransactions, setMyTransactions, walletConnection } =
    useAppContext();

  const [showCertificateChoice, setShowCertificateChoice] =
    useState<boolean>(false);
  const [devState, setDevState] = useState<DevState>(DevState.first);

  const pendingTransactions = useMemo(() => {
    return myTransactions?.filter((tx) => tx.isPending === true);
  }, [myTransactions]);

  useEffect(() => {
    if (devState === DevState.devAccount) {
      TransactionHistoryService.fetchAccountHistory(DEV_ACCOUNT).then(
        (records) => {
          setMyTransactions(records);
        }
      );
    }

    if (devState === DevState.walletAccount) {
      TransactionHistoryService.fetchAccountHistory(
        walletConnection?.stellarPubKey!
      ).then((records) => {
        setMyTransactions(records);
      });
    }

    if (devState === DevState.first) {
      const now = new Date();
      const d1 = now.addDays(-8);
      const d2 = now.addDays(-2);

      setMyTransactions([
        {
          id: "A1",
          createdAt: d1.toString(),
          memo: "Tx 1",
          assetAmount: 26.48,
          asset: "USDC",
          sinkAmount: 1.5,
          isPending: true,
        },
        {
          id: "A2",
          createdAt: now.toString(),
          memo: "Tx 2",
          assetAmount: 58.46,
          asset: "USDC",
          sinkAmount: 3.3,
          isPending: true,
        },
      ]);
    }
    if (devState === DevState.second) {
      const now = new Date();
      console.log(now);

      setMyTransactions([
        {
          id: "B1",
          createdAt: now.toString(),
          memo: "My first transaction",
          assetAmount: 5.29,
          asset: "USDC",
          sinkAmount: 0.3,
          isPending: true,
        },
      ]);
    }
    if (devState === DevState.third) {
      const now = new Date();

      setMyTransactions([
        {
          id: "C1",
          createdAt: now.toString(),
          memo: "My first transaction",
          assetAmount: 17.63,
          asset: "USDC",
          sinkAmount: 1,
          isPending: true,
        },
      ]);
    }
    if (devState === DevState.fourth) {
      const now = new Date();

      setMyTransactions([
        {
          id: "D1",
          createdAt: now.toString(),
          memo: "My first transaction",
          assetAmount: 17.63,
          asset: "USDC",
          sinkAmount: 1,
          isPending: false,
        },
      ]);
    }
  }, [devState, setMyTransactions]);

  const totalCarbonPending = useMemo(() => {
    return (
      pendingTransactions?.reduce((sum, tx) => sum + tx.sinkAmount, 0) ?? 0
    );
  }, [pendingTransactions]);
  return (
    <>
      <div className="flex flex-col gap-2 items-center bg-secondary p-2 m-2 mb-6 border rounded w-full">
        <span>Dev buttons</span>
        <div className="flex gap-4 h-8 text-xs">
          <Button
            className={
              devState === DevState.walletAccount
                ? "!bg-tertiary text-white"
                : ""
            }
            onClick={() => setDevState(DevState.walletAccount)}
          >
            s_wallet
          </Button>
          <Button
            className={
              devState === DevState.devAccount ? "!bg-tertiary text-white" : ""
            }
            onClick={() => setDevState(DevState.devAccount)}
          >
            s_DEV_ACCOUNT
          </Button>
          <Button
            className={
              devState === DevState.first ? "!bg-tertiary text-white" : ""
            }
            onClick={() => setDevState(DevState.first)}
          >
            state 1
          </Button>
          <Button
            className={
              devState === DevState.second ? "!bg-tertiary text-white" : ""
            }
            onClick={() => setDevState(DevState.second)}
          >
            state 2
          </Button>
          <Button
            className={
              devState === DevState.third ? "!bg-tertiary text-white" : ""
            }
            onClick={() => setDevState(DevState.third)}
          >
            state 3
          </Button>
          <Button
            className={
              devState === DevState.fourth ? "!bg-tertiary text-white" : ""
            }
            onClick={() => setDevState(DevState.fourth)}
          >
            state 4
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-center">
          Total CARBON pending retirement into a certificate
        </h1>
        <div className="flex items-center justify-center gap-1 text-3xl">
          <span>{totalCarbonPending}</span>
          <CARBONCurrencyIcon />
        </div>
        {totalCarbonPending % 1 != 0 && (
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
              <div className="p-1 flex flex-col gap-4 items-center">
                <h2 className="text-xl font-semibold">
                  Requesting a certificate
                </h2>
                <span>
                  Requesting a certificate at the Verra registry is completely
                  optional. All CARBON transactions will eventually be retired
                  using community certificates. However it also possible to
                  receive a personal certificate.
                </span>
                <span>
                  To request a personal certificate we have to submit a round
                  number to the Verra registry. We recommend you add the
                  remaining fraction to request your certificate. Alternatively,
                  you can request your certificate for current whole number.
                </span>
                <div className="flex justify-center gap-4 h-10">
                  <Button className="text-xs md:text-base">
                    Add remaining fraction
                  </Button>
                  <Button
                    className="text-xs md:text-base"
                    disabled={totalCarbonPending < 1}
                  >
                    Round down
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <hr className="w-[90%] mt-10 mb-8" /> */}

      <div className=" border rounded border-tertiary p-4 text-sm my-4 mt-10">
        {totalCarbonPending % 1 != 0 ? (
          <span>
            The list below contains your transaction for which no certificate
            has been issued yet. If you do not request a personal certificate,
            they will be automatically retired into the community pool 90 days
            after the corresponding transaction took place. Read more about
            pending retirements{" "}
            <Link href="/explain" className="underline">
              here
            </Link>
            .
          </span>
        ) : totalCarbonPending === 0 ? (
          <span>
            You currently do not have any transactions pending retirement.
          </span>
        ) : (
          <span>
            Your current pending balance is whole number. We are currently busy
            creating a certificate for you. Please be patient and watch your
            email inbox to receive it.
          </span>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        {pendingTransactions?.map((transaction, index) => {
          return (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              onClick={() => {}}
              isPending={true}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-1"></div>
    </>
  );
}
