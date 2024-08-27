"use client";

import TransactionHistoryService from "@/services/TransactionHistoryService";
import { DEV_ACCOUNT, RetirementStatus } from "@/app/types";
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
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useMemo, useState } from "react";
import RequestCertificateModal from "./RequestCertificateModal";
import RequestCertificate from "./RequestCertificate";
import { AccountService, CarbonService, SinkService } from "@/client";
import PendingRounding from "../../../components/dashboard/PendingRounding";
import RoundingService from "@/services/RoundingService";

enum DevState {
  devAccount = "dev_account",
  walletAccount = "wallet_account",
  first = "1",
  second = "2",
  third = "3",
  fourth = "4",
}

export default function PendingRetirements() {
  const {
    myTransactions,
    setMyTransactions,
    walletConnection,
    hasPendingRounding,
    setHasPendingRounding,
  } = useAppContext();

  const [devState, setDevState] = useState<DevState>(DevState.first);

  const pendingTransactions = useMemo(() => {
    return myTransactions?.filter(
      (tx) =>
        tx.retirementStatus === RetirementStatus.PENDING_USER ||
        tx.retirementStatus === RetirementStatus.PENDING_STELLARCARBON
    );
  }, [myTransactions]);

  useEffect(() => {
    // Check pending rounding status upon rendering this page
    if (walletConnection) {
      RoundingService.hasPendingRounding(walletConnection.stellarPubKey).then(
        (isPending) => setHasPendingRounding(isPending)
      );
    }
  }, [setHasPendingRounding, walletConnection]);

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
          retirementStatus: RetirementStatus.PENDING_USER,
          retirements: [],
        },
        {
          id: "A2",
          createdAt: now.toString(),
          memo: "Tx 2",
          assetAmount: 58.46,
          asset: "USDC",
          sinkAmount: 3.3,
          retirementStatus: RetirementStatus.PENDING_USER,
          retirements: [],
        },
      ]);
    }
    if (devState === DevState.second) {
      const now = new Date();

      setMyTransactions([
        {
          id: "B1",
          createdAt: now.toString(),
          memo: "My first transaction",
          assetAmount: 5.29,
          asset: "USDC",
          sinkAmount: 0.3,
          retirementStatus: RetirementStatus.PENDING_USER,
          retirements: [],
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
          retirementStatus: RetirementStatus.PENDING_USER,
          retirements: [],
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
          retirementStatus: RetirementStatus.RETIRED,
          retirements: [],
        },
      ]);
    }
  }, [devState, setMyTransactions, walletConnection]);

  const totalCarbonPending = useMemo(() => {
    return (
      pendingTransactions?.reduce((sum, tx) => sum + tx.sinkAmount, 0) ?? 0
    );
  }, [pendingTransactions]);

  return (
    <>
      <div className="w-full px-4 flex flex-col border-b border-secondary">
        {false && (
          <div className="flex flex-col gap-2 items-center bg-secondary p-4 border rounded w-full mt-6">
            <span>Dev buttons</span>
            <div className="flex justify-center flex-wrap gap-4 text-xs">
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
          </div>
        )}

        <div className="flex flex-col gap-2 items-center my-8">
          <h1 className="text-center text-lg font-semibold">
            CARBON pending retirement
          </h1>
          <div className="flex items-center justify-center gap-1 text-3xl">
            <span>{totalCarbonPending.toFixed(3)}</span>
            <CARBONCurrencyIcon width={24} height={24} />
          </div>
          {totalCarbonPending > 0 && (
            <span className="text-xs text-center mx-4">
              This CARBON is ready to be retired into a certificate. Read more
              about pending retirements{" "}
              <Link href="/explain" className="underline">
                here
              </Link>
              .
            </span>
          )}
        </div>

        {totalCarbonPending > 0 &&
          totalCarbonPending !== 1 &&
          (!hasPendingRounding ? (
            <RequestCertificate totalCarbonPending={totalCarbonPending} />
          ) : (
            <PendingRounding />
          ))}
      </div>
      <ParallaxDivider
        image={ParallaxBackgrounds.RAINFOREST}
        smallest
        yOffset={-300}
      />
      <div className="flex-1 flex flex-col px-4 w-full py-8 border-y border-secondary">
        <div className="flex-1 flex flex-col gap-2">
          <span className="self-center text-lg mb-4 font-semibold">
            Your pending transactions
          </span>
          {pendingTransactions?.length ?? 0 > 0 ? (
            pendingTransactions?.map((transaction, index) => {
              return (
                <TransactionListItem
                  key={transaction.id}
                  transaction={transaction}
                  onClick={() => {}}
                  showCountdown
                />
              );
            })
          ) : (
            <div className="flex-1 flex flex-col justify-center text-center text-sm">
              No pending transactions found.
            </div>
          )}
        </div>
      </div>
      <ParallaxDivider
        image={ParallaxBackgrounds.RAINFOREST}
        smallest
        yOffset={-400}
      />
    </>
  );
}
