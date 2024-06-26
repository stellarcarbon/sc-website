"use client";

import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import Button from "@/components/Button";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
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
      <div className="px-4 flex flex-col">
        {/* <div className="flex flex-col gap-2 items-center bg-secondary p-2 mb-6 border rounded w-full">
          <span>Dev buttons</span>
          <div className="flex flex-wrap gap-4 text-xs">
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
                devState === DevState.devAccount
                  ? "!bg-tertiary text-white"
                  : ""
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
        </div> */}

        <div className="flex flex-col gap-2 items-center my-8">
          <h1 className="text-center text-lg font-semibold">
            CARBON pending retirement
          </h1>
          <div className="flex items-center justify-center gap-1 text-3xl">
            <span>{totalCarbonPending}</span>
            <CARBONCurrencyIcon />
          </div>
          <span className="text-xs text-center mx-4">
            This CARBON is waiting to be retired into a certificate on the Verra
            registry.
          </span>
        </div>

        <div
          className={` md:w-[80%] self-center border rounded border-tertiary p-4 text-sm my-10 mt-6 ${
            showCertificateChoice ? "bg-secondary" : ""
          }`}
        >
          {totalCarbonPending % 1 != 0 ? (
            <>
              {showCertificateChoice ? (
                <div className="p-1 flex flex-col gap-4 items-center">
                  <div className="relative flex w-full justify-center">
                    <h2 className="text-xl font-semibold">
                      Requesting a certificate
                    </h2>
                    <Button
                      className="absolute left-[calc(100%-24px)] w-[24px] !py-2 !px-4 bg-secondary text-white"
                      onClick={() => setShowCertificateChoice(false)}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </div>
                  <span>
                    Requesting a certificate at the Verra registry is completely
                    optional. All CARBON transactions will eventually be retired
                    using community certificates. However it also possible to
                    receive a personal certificate.
                  </span>
                  <span>
                    To request a personal certificate we have to submit a round
                    number to the Verra registry. We recommend you add the
                    remaining fraction to request your certificate.
                  </span>
                  {totalCarbonPending > 1 && (
                    <span>
                      Alternatively, you can round down and request a
                      certificate for {Math.floor(totalCarbonPending)} tonnes.
                    </span>
                  )}
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button className="text-sm md:text-base">
                      Sink remaining fraction
                    </Button>
                    <Button
                      className="text-xs md:text-base"
                      disabled={totalCarbonPending < 1}
                    >
                      Round down
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <span className="text-center">
                    If you do not request a personal certificate, your sinking
                    transactions will be automatically retired into the
                    community pool 90 days after the corresponding transaction
                    took place. Read more about pending retirements{" "}
                    <Link href="/explain" className="underline">
                      here
                    </Link>
                    .
                  </span>

                  <Button
                    className="w-[200px]"
                    onClick={() => setShowCertificateChoice(true)}
                  >
                    Request a certificate
                  </Button>
                </div>
              )}
            </>
          ) : totalCarbonPending === 0 ? (
            <span>
              You currently do not have any transactions pending retirement.
            </span>
          ) : (
            <span>
              Your current pending balance is whole number. We are currently
              busy creating a certificate for you. Please be patient and watch
              your email inbox to receive it.
            </span>
          )}
        </div>
      </div>

      <ParallaxDivider image={ParallaxBackgrounds.FOREST} smaller />

      <div className="px-4 w-full mt-10">
        <div className="flex flex-col gap-2">
          <span className="self-center text-xl mb-4">
            Your pending transactions
          </span>
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
      </div>
    </>
  );
}
