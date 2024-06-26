import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData } from "@/app/types";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { debounce } from "@/app/utils";
import { CarbonService } from "@/client";

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

  const { call: fetchQuote, cancel: cancelFetchQuote } = useMemo(
    () =>
      debounce((tonnes: number) => {
        setQuote(undefined);

        CarbonService.getCarbonQuoteCarbonQuoteGet({
          carbonAmount: tonnes,
        }).then((result: any) => {
          setQuote(result.total_cost);
        });
      }, 500),
    [setQuote]
  );

  useEffect(() => {
    if (tonnes) {
      fetchQuote(tonnes);
    }
    return () => {
      cancelFetchQuote();
    };
  }, [tonnes, cancelFetchQuote, fetchQuote]);

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
