"use client";

import { SinkingTransaction } from "@/app/dashboard/sink/page";
import { FormStatusMessages, SinkCarbonXdrPostRequest } from "@/app/types";
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
  sinkingTransaction: SinkingTransaction | undefined;
}

export default function FormStatusModal({
  message,
  submissionError,
  closeModal,
  sinkingTransaction,
}: FormStatusModalProps) {
  let status;

  if (message === FormStatusMessages.confirm) {
    status = (
      <div className="flex flex-col items-center">
        <span className="text-center">{message}</span>
        <div className="flex flex-col m-6 w-[80%] items-center gap-2 text-xl">
          <div className="flex justify-between w-full items-center gap-4">
            <span>Sinking</span>
            <div className="flex items-center gap-2">
              <span>
                {sinkingTransaction?.transactionPostRequest.carbonAmount}
              </span>
              <CARBONCurrencyIcon />
            </div>
          </div>
          {/* <span>for</span> */}
          <div className="flex justify-between w-full items-center gap-4">
            <span>Total price</span>
            <span>$ {sinkingTransaction?.estimatedPriceInDollars}</span>
          </div>
          <div className="flex justify-between items-center w-full gap-4">
            <span>using</span>{" "}
            <span>
              ${sinkingTransaction?.transactionPostRequest.paymentAsset}
            </span>
          </div>
          <div className="flex justify-between items-center w-full gap-4">
            <span>Memo</span>
            <span>{sinkingTransaction?.transactionPostRequest.memoValue}</span>
          </div>
        </div>
        <Button className="!py-2 w-[200px] font-bold">Confirm & submit</Button>
      </div>
    );
  }

  if (message === FormStatusMessages.creating) {
    status = (
      <>
        <span className="text-center">{message}</span>
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
      </>
    );
  } else if (message === FormStatusMessages.signTransaction) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="my-4">
          <SignIcon />
        </div>
      </>
    );
  } else if (message === FormStatusMessages.awaitBlockchain) {
    status = (
      <>
        <span className="text-center">{message}</span>
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
      </>
    );
  } else if (message === FormStatusMessages.completed) {
    status = (
      <>
        <span className="text-center">{message}</span>
        <div className="">
          <SuccessIcon />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600 opacity-80 z-10"></div>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <div className="flex flex-col py-8 px-4 justify-between items-center bg-primary w-[80%] md:w-[400px] lg:w-[30%] h-[60%] lg:h-[50%] opacity-100 shadow-xl rounded-md">
          <span className="text-2xl">Transaction submit</span>
          {submissionError ? (
            <>
              <FormError className="text-center text-md">
                {submissionError}
              </FormError>
              <ErrorIcon />
            </>
          ) : (
            status
          )}

          {(message === FormStatusMessages.creating ||
            message === FormStatusMessages.signTransaction) &&
          !submissionError ? (
            <Button className="h-10 !py-2" onClick={closeModal}>
              Cancel Transaction
            </Button>
          ) : (
            <Button className="h-10 !py-2" onClick={closeModal}>
              Return to dashboard
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
