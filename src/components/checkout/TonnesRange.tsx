import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData } from "@/app/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import carbonApi from "@/app/carbonApi";
import { debounce } from "@/app/utils";

interface TonnesRangeProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
  watch: (name: string) => number;
  setValue: (name: keyof CheckoutFormData, value: any) => void;
  quote: string | undefined;
  setQuote: Dispatch<SetStateAction<string | undefined>>;
}

export default function TonnesRange({
  register,
  watch,
  quote,
  setQuote,
}: TonnesRangeProps) {
  const tonnes = watch("tonnes");

  const { call: fetchQuote, cancel: cancelFetchQuote } = debounce(
    (tonnes: number) => {
      setQuote(undefined);
      carbonApi
        .getCarbonQuoteCarbonQuoteGet({
          carbonAmount: tonnes,
        })
        .then((result: any) => {
          console.log(result);
          setQuote(result.totalCost);
        });
    },
    500
  );

  useEffect(() => {
    if (tonnes) {
      fetchQuote(tonnes);
    }
    return () => {
      cancelFetchQuote();
    };
  }, [tonnes]);

  return (
    <div className="flex flex-col p-4">
      <span className="font-bold">How much would you like to offset?</span>
      <span className="text-xs mb-2 mt-1">
        Amount CARBON (in tonnes CO2-equivalent: tCO₂-e)
      </span>
      <div className="md:flex items-center gap-4">
        <div className="flex gap-2 justify-center md:justify-start">
          <div className="flex gap-1 items-center">
            <span>1</span>
            <input
              className="w-64 range-lg"
              type="range"
              min="1"
              max="120"
              step="1"
              placeholder="slider"
              {...register("tonnes")}
            />
            <span>120</span>
          </div>
          <div className="border border-black p-2 font-bold rounded-sm bg-gray-400">
            {tonnes}
          </div>
        </div>

        <span>
          {quote !== undefined
            ? `Cost: $${Number(quote).toFixed(2)}`
            : `Calculating price...`}
        </span>
      </div>
    </div>
  );
}
