"use client";

import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Button from "../../../components/Button";
import { PropsWithChildren, useEffect, useState } from "react";
import { useSinkingContext } from "@/context/SinkingContext";
import { useAppContext } from "@/context/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import TransactionPrice from "./TransactionPrice";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function TransactionPreview() {
  const { watch, quote, handleSubmit, onSubmit, onError } =
    useSinkFormContext();
  const { walletConnection } = useAppContext();
  const { USDCPerXLM } = useSinkingContext();
  const [priceInXLM, setPriceInXLM] = useState<string>();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const memo = watch("memo");

  useEffect(() => {
    if (USDCPerXLM) {
      const price = quote / USDCPerXLM;
      setPriceInXLM(price.toFixed(2));
    }
  }, [quote, currency, USDCPerXLM]);

  useEffect(() => {
    if (tonnes !== 1) {
      const preview = document.getElementById("transaction-preview");
      // scroll to preview
      if (preview) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, []);

  return (
    <div
      id="transaction-preview"
      className="bg-primary p-4 py-6 w-full md:max-w-[500px] self-center flex flex-col gap-6 items-center justify-center border border-accentSecondary rounded"
    >
      <h3 className="text-2xl font-bold">Transaction preview</h3>
      <div className="grid grid-cols-5 gap-1 text-center w-full">
        <TPKey>Reason</TPKey>

        <TPValue>
          {memo === "" ? (
            <div className="text-gray-400 italic font-normal">
              Not specified
            </div>
          ) : (
            <div className="text-accentSecondary">{memo}</div>
          )}
        </TPValue>

        <TPKey>Amount to sink</TPKey>
        <TPValue>
          <div className="flex gap-1 items-center">
            {tonnes && Number(tonnes).toFixed(3)}
            <CARBONCurrencyIcon />
          </div>
        </TPValue>

        <TPKey>Currency</TPKey>
        <TPValue>
          {currency === "any" ? (
            <div className="text-gray-400 italic font-normal">
              No preference
            </div>
          ) : (
            currency
          )}
        </TPValue>

        <hr className="col-span-5 my-3 w-[100%]" />

        <TransactionPrice currency={currency} quote={quote} />
      </div>
      <div className="py-1 flex flex-col items-center">
        <Button
          onClick={() => handleSubmit(onSubmit, onError)()}
          disabled={!walletConnection}
        >
          <FontAwesomeIcon icon={faFileContract} />
          <div>Continue to signing</div>
        </Button>
        {!walletConnection && (
          <div className="italic text-gray-500 text-sm mt-1">
            Connect your wallet to sign
          </div>
        )}
      </div>
    </div>
  );
}

export function TPKey({ children }: PropsWithChildren) {
  return (
    <div className="text-start col-span-2 md:text-lg inline-flex items-start">
      {children}
    </div>
  );
}

export function TPValue({ children }: PropsWithChildren) {
  return (
    <div className="inline-flex justify-end items-start gap-1 col-span-3 md:text-lg font-bold break-all">
      {children}
    </div>
  );
}
