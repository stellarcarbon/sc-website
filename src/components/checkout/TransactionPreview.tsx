import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Button from "../Button";
import XLMIcon from "../icons/XLMIcon";
import { useEffect, useMemo, useState } from "react";
import XLMConversionService from "@/services/XLMConversionService";
import { useSinkingContext } from "@/context/SinkingContext";
import { useAppContext } from "@/context/appContext";

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

  return (
    <div className="p-6 w-[90%] md:max-w-[500px] self-center flex flex-col gap-6 items-center justify-center bg-darker border border-accentSecondary rounded">
      <h3 className="text-xl md:text-2xl font-bold">Transaction preview</h3>
      <div className="grid grid-cols-3 gap-1 text-center w-full">
        <div className="col-span-1 text-start text-sm">Reason</div>
        <div className="col-span-2 inline-flex justify-end items-center">
          {memo === "" ? (
            <div className="text-xs">No reason specified</div>
          ) : (
            memo
          )}
        </div>

        <span className="text-start col-span-2 text-sm">Amount to sink</span>
        <div className="flex gap-1 items-center justify-end text-accent">
          <CARBONCurrencyIcon />
          <span className="font-bold text-end ">{tonnes}</span>
        </div>

        <span className="text-start col-span-2 text-sm">
          Preferred currency
        </span>
        <span className="font-bold text-end text-accent">{currency}</span>

        <hr className="col-span-3 mt-2 mb-4 w-[100%]" />

        <span className="text-start col-span-2 text-sm">Price in $</span>
        <span className="font-bold text-end text-accent">{`$ ${
          Number.isNaN(quote) ? "" : quote.toFixed(2)
        }`}</span>

        <span className="text-start col-span-2 text-sm">Price in XLM</span>
        <div className="flex gap-1 items-center justify-end text-accent">
          <XLMIcon />
          <span className="font-bold text-end ">{priceInXLM}</span>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="!py-2 !w-[60%] max-w-[200px] mt-1 mb-2 text-md self-center"
        disabled={!walletConnection}
      >
        Continue to sign
      </Button>
    </div>
  );
}
