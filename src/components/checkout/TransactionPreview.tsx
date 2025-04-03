import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Button from "../Button";
import XLMIcon from "../icons/XLMIcon";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import XLMConversionService from "@/services/XLMConversionService";
import { useSinkingContext } from "@/context/SinkingContext";
import { useAppContext } from "@/context/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFileContract,
  faPen,
  faSign,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";

interface TransactionPreviewProps {
  tonnes: number;
  currency: string;
  quote: number;
  memo: string;
  handleSubmit: () => void;
}

export default function TransactionPreview({
  tonnes,
  currency,
  quote,
  memo,
  handleSubmit,
}: TransactionPreviewProps) {
  const { walletConnection } = useAppContext();
  const { USDCPerXLM } = useSinkingContext();
  const [priceInXLM, setPriceInXLM] = useState<string>();

  useEffect(() => {
    if (USDCPerXLM) {
      const price = quote / USDCPerXLM;
      setPriceInXLM(price.toFixed(2));
    }
  }, [quote, currency, USDCPerXLM]);

  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (amount !== null) {
      const preview = document.getElementById("transaction-preview");
      // scroll to preview
      if (preview) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [amount]);

  return (
    <div
      id="transaction-preview"
      className="p-4 py-6 w-full md:max-w-[500px] self-center flex flex-col gap-6 items-center justify-center bg-darker border border-accentSecondary rounded"
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

        <TPKey>Price in $</TPKey>
        <TPValue>{`$ ${Number.isNaN(quote) ? "" : quote.toFixed(2)}`}</TPValue>

        <TPKey>Price in XLM</TPKey>
        <TPValue>
          <div className="flex gap-1 items-center">
            <XLMIcon />
            {priceInXLM}
          </div>
        </TPValue>
      </div>
      <Button
        onClick={handleSubmit}
        className="!py-2 mt-1 mb-2 text-md self-center gap-2 bg-accent !text-black border border-accentSecondary hover:!border-accent hover:!text-white"
        disabled={!walletConnection}
      >
        <FontAwesomeIcon icon={faFileContract} />
        Continue to signing
      </Button>
    </div>
  );
}

function TPKey({ children }: PropsWithChildren) {
  return (
    <div className="text-start col-span-2 md:text-lg inline-flex items-start">
      {children}
    </div>
  );
}

function TPValue({ children }: PropsWithChildren) {
  return (
    <div className="inline-flex justify-end items-start gap-1 col-span-3 md:text-lg font-bold break-all">
      {children}
    </div>
  );
}
