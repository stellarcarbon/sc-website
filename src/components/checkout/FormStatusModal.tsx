"use client";

import { SinkingTransaction } from "@/app/dashboard/sink/page";
import { FormStatusMessages, SinkCarbonXdrPostRequest } from "@/app/types";
import { useViewportWidth } from "@/app/utils";
import { SinkingResponse } from "@/client";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import SignIcon from "@/components/icons/SignIcon";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { useEffect } from "react";
import { Hourglass } from "react-loader-spinner";

interface FormStatusModalProps {
  message: FormStatusMessages;
  submissionError?: string;
  closeModal: () => void;
  confirmSubmission: () => void;
  sinkingTransaction: SinkingTransaction;
}

export default function FormStatusModal({
  message,
  submissionError,
  closeModal,
  confirmSubmission,
  sinkingTransaction,
}: FormStatusModalProps) {
  const isWide = useViewportWidth();
  let status;

  if (message === FormStatusMessages.confirm) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-2xl">{message}</span>
        <div className="w-full flex flex-col gap-8 m-6 justify-center items-center bg-secondary py-6 rounded lg:max-w-[75%]">
          <div className="flex flex-col w-full px-6 items-center gap-2 text-lg">
            <div className="flex justify-between w-full items-center gap-4">
              <span>Sinking</span>
              <div className="flex items-center gap-1">
                <span>
                  {Number(
                    sinkingTransaction.transactionPostResponse?.carbon_amount
                  ).toFixed(3)}
                </span>
                <CARBONCurrencyIcon />
              </div>
            </div>
            <div className="flex justify-between w-full items-center gap-4">
              <span>Price in USDC</span>
              <div className="flex gap-[2px]">
                <span>$</span>
                <span>
                  {Number(
                    sinkingTransaction.transactionPostResponse?.usdc_amount
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <span>Asset</span>{" "}
              <span>
                {sinkingTransaction.transactionPostRequest?.paymentAsset}
              </span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <span>Memo</span>
              <span>
                {sinkingTransaction.transactionPostRequest?.memoValue}
              </span>
            </div>
          </div>
          <Button
            className="!py-2 w-[200px] font-bold !bg-accentSecondary !text-white hover:!bg-tertiary"
            onClick={confirmSubmission}
          >
            Sign with wallet
          </Button>
        </div>
      </div>
    );
  }

  if (message === FormStatusMessages.creating) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center text-lg md:text-2xl">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </div>
    );
  } else if (message === FormStatusMessages.signTransaction) {
    status = (
      // <div className="flex flex-col justify-center items-center flex-1 gap-2">
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-2xl">{message}</span>
        <div className="my-4">
          <SignIcon large={isWide} />
        </div>
      </div>
      // </div>
    );
  } else if (message === FormStatusMessages.awaitBlockchain) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-2xl">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </div>
    );
  } else if (message === FormStatusMessages.completed) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-2xl">{message}</span>
        <SuccessIcon />
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600 opacity-80 z-10"></div>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <div className="flex flex-col py-8 px-6 md:px-12 justify-start items-center bg-primary w-[80%] md:w-[60%] lg:w-[60%] h-[60%] lg:h-[70%] max-w-[800px] opacity-100 shadow-xl rounded-md">
          {/* <span className="text-2xl">Transaction submit</span> */}
          {submissionError ? (
            <div className="flex flex-col justify-center items-center flex-1 gap-8">
              <FormError className="text-center text-md">
                {submissionError}
              </FormError>
              <ErrorIcon />
            </div>
          ) : (
            status
          )}

          {(message === FormStatusMessages.creating ||
            message === FormStatusMessages.signTransaction) &&
          !submissionError ? (
            <Button className="h-10 !py-2 mt-auto" onClick={closeModal}>
              Cancel Transaction
            </Button>
          ) : (
            <Button className="h-10 !py-2 mt-auto" onClick={closeModal}>
              Return to dashboard
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
