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
import RequestCertificateModal from "./RequestCertificateModal";
import RequestCertificate from "./RequestCertificate";

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
  const [showCertificateModal, setShowCertificateModal] =
    useState<boolean>(false);

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
      {showCertificateModal && (
        <RequestCertificateModal
          onClose={() => setShowCertificateModal(false)}
          totalCarbonPending={totalCarbonPending}
        />
      )}

      <ParallaxDivider image={ParallaxBackgrounds.AUTUMN_FOREST} smallest />

      <div className="px-4 flex flex-col border-0 border-tertiary">
        {/* <div className="flex flex-col gap-2 items-center bg-secondary p-2 mb-6 border rounded w-full mt-6">
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
            This CARBON is waiting to be retired into a certificate. Read more
            about pending retirements{" "}
            <Link href="/explain" className="underline">
              here
            </Link>
            .
          </span>
        </div>

        <RequestCertificate totalCarbonPending={totalCarbonPending} />
      </div>
      <ParallaxDivider image={ParallaxBackgrounds.FOREST} smallest />
      <div className="px-4 w-full mt-10">
        <div className="flex flex-col gap-2">
          <span className="self-center text-lg mb-4 font-semibold">
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
