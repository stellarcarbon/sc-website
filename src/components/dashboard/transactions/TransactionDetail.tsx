"use client";

import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import TransactionsLoading from "@/components/dashboard/transactions/TransactionsLoading";
import { useSwipeable } from "react-swipeable";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSCRouter } from "@/app/utils";
import { RetirementStatus } from "@/app/types";
import { RetirementDetail, RetirementService } from "@/client";
import RetirementDetailCard from "./RetirementDetailCard";
import { Blocks } from "react-loader-spinner";
import CountDownTimer from "@/components/CountDownTimer";
import appConfig from "@/config";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

interface TransactionDetailProps {
  hash: string;
}

export default function TransactionDetail({ hash }: TransactionDetailProps) {
  const router = useSCRouter();
  const { myTransactions } = useAppContext();
  const [retirementDetails, setRetirementDetails] = useState<
    RetirementDetail[]
  >([]);
  const [isLoadingRetirements, setIsLoadingRetirements] =
    useState<boolean>(true);

  const tx = useMemo(() => {
    return myTransactions?.find((tx) => tx.id === hash);
  }, [myTransactions, hash]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/dashboard");
    },
    onSwipedRight: () => router.push("/dashboard/transactions"),
    delta: 100,
  });

  useEffect(() => {
    const getRetirements = async () => {
      const promises: Promise<RetirementDetail>[] = [];
      tx?.retirements.forEach((ret) => {
        promises.push(
          RetirementService.getRetirementItem({
            certificateId: ret.certificate_id,
          })
        );
      });
      setRetirementDetails(await Promise.all(promises));
      setIsLoadingRetirements(false);
      // RetirementService.getRetirementItem({ certificateId: })
    };

    getRetirements();
  }, [tx]);

  const initialDuration = useMemo(() => {
    if (tx !== undefined) {
      const txDate = new Date(tx.createdAt);
      const txDatePlus90 = txDate.addDays(90); // TODO: Make this the actual 90 days
      const now = new Date();

      const outcome = +txDatePlus90 - +now;

      return outcome / 1000;
    }
  }, [tx]);

  if (myTransactions === null) {
    return (
      <div {...swipeHandlers} className="flex-1 flex flex-col justify-center">
        <TransactionsLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 border border-tertiary bg-secondary rounded m-4">
      <div className="h-12 px-4 flex items-center border-b-tertiary">
        <Button
          onClick={() => router.push("/dashboard/transactions/history/")}
          className="flex gap-1 items-center bg-accent text-primary rounded border !h-6 !py-[2px] !px-[6px] w-fit"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {/* <span>Back to list</span> */}
        </Button>
        <h1 className="flex-1 text-center text-xl font-bold">
          Transaction Details
        </h1>
      </div>

      {tx === undefined ? (
        <div className="flex flex-col text-center justify-center flex-1 p-4 gap-4">
          <span>Could not find transaction with hash:</span>
          <span className="text-xs break-words w-full">{hash}</span>
        </div>
      ) : (
        <>
          {/* <span className="break-words text-xs self-center text-center max-w-[80vw] my-2 border-b">
            {tx.id}
          </span> */}
          <div className="flex flex-col px-4 gap-0 flex-1">
            <div className="flex justify-between items-center gap-6">
              <span className="text-md font-bold flex-1">Hash</span>
              <span className="text-xs break-words min-w-1 text-right">
                {tx.id}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Date</span>
              <span className="text-sm">
                {new Date(tx.createdAt).toDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Sunk</span>
              <div className="flex gap-1 items-center text-sm">
                <CARBONCurrencyIcon />
                <span>{tx.sinkAmount}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Price</span>
              <div className="flex gap-1 text-sm">
                <span>{tx.assetAmount.toFixed(2)}</span>
                <span>{tx.asset}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Memo</span>
              <span className="text-sm break-words">{tx.memo}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-md font-bold flex-1">Status</span>
              <span className="text-sm break-words">{tx.retirementStatus}</span>
            </div>
            {tx.retirementStatus === RetirementStatus.PENDING_USER &&
              initialDuration !== undefined && (
                <div className="my-4">
                  <CountDownTimer initialDuration={initialDuration} />
                </div>
              )}

            <a
              href={
                appConfig.network === WalletNetwork.PUBLIC
                  ? `https://stellar.expert/explorer/public/tx/${tx.id}`
                  : `https://stellar.expert/explorer/testnet/tx/${tx.id}`
              }
              target="_blank"
              className="text-accentSecondary underline mt-3"
            >
              View this transaction on Stellar.expert
            </a>

            {tx.retirementStatus === RetirementStatus.RETIRED && (
              <div className="flex flex-col mt-6 gap-2 flex-1">
                <h1 className="text-center text-xl font-semibold">
                  {RetirementStatus.RETIRED}
                </h1>
                <span className="text-md">
                  The CARBON sunk in this transaction has been retired into one
                  or more Verra Certificates.
                </span>
                {isLoadingRetirements ? (
                  <div className="mx-2 mb-4 text-center flex flex-col justify-center items-center flex-1">
                    <Blocks
                      height="80"
                      width="80"
                      color="#ff0000"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      visible={true}
                    />
                    <span>Fetching retirements...</span>
                  </div>
                ) : (
                  <div className="flex flex-col my-4">
                    {retirementDetails.map((retirement, idx) => {
                      return (
                        <RetirementDetailCard
                          key={`ret_detail_card_${idx}`}
                          retirement={retirement}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
