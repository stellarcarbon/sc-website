import { useSinkingContext } from "@/context/SinkingContext";
import XLMIcon from "../../../components/icons/XLMIcon";
import { TPKey, TPValue } from "./TransactionPreview";
import { useEffect, useState } from "react";

export default function TransactionPrice({
  quote,
  currency,
}: {
  quote: number;
  currency: string;
}) {
  const { USDCPerXLM } = useSinkingContext();
  const [priceInXLM, setPriceInXLM] = useState<string>();

  useEffect(() => {
    if (USDCPerXLM) {
      const price = quote / USDCPerXLM;
      setPriceInXLM(price.toFixed(2));
    }
  }, [quote, currency, USDCPerXLM]);

  const xlmPrice = (
    <div
      className={`grid grid-cols-5 gap-1 ${
        currency === "USDC" ? "text-xs" : currency === "XLM" && "text-xl"
      }`}
    >
      <div className="text-start col-span-2 inline-flex items-start">
        Price in XLM
      </div>
      <div className="inline-flex justify-end items-start gap-1 col-span-3 font-bold break-all">
        <div className="flex gap-1 items-center">{priceInXLM} XLM</div>
      </div>
    </div>
  );

  const usdcPrice = (
    <div
      className={`grid grid-cols-5 gap-1 ${
        currency === "XLM" ? "text-xs" : currency === "USDC" && "text-xl"
      }`}
    >
      <div className="text-start col-span-2 inline-flex items-start">
        Price in $
      </div>
      <div className="inline-flex justify-end items-start gap-1 col-span-3 font-bold break-all">
        {`$ ${Number.isNaN(quote) ? "" : quote.toFixed(2)}`}
      </div>
    </div>
  );

  return (
    <div className="w-full col-span-5 md:text-lg">
      {currency === "XLM" ? (
        <>
          {xlmPrice}
          {usdcPrice}
        </>
      ) : (
        <>
          {usdcPrice}
          {xlmPrice}
        </>
      )}
    </div>
  );
}
