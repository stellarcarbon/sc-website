"use client";

import { CheckoutFormData } from "@/app/types";
import { debounce } from "@/app/utils";
import { CarbonService, CARBONQuoteResponse, USDQuoteResponse } from "@/client";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AmountInputProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
  watch: (name: string) => number;
  // setValue: (name: keyof CheckoutFormData, value: any) => void;
  // quote: string | undefined;
  // setQuote: Dispatch<SetStateAction<string | undefined>>;
}

// Debounce function
// function debounce<T extends (...args: any[]) => void>(
//   callback: T,
//   delay: number
// ): T {
//   let timeout: NodeJS.Timeout;
//   return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => callback.apply(this, args), delay);
//   } as T;
// }

export default function AmountInput({
  register,
  watch,
}: // quote,
// setQuote,
AmountInputProps) {
  const tonnes = watch("tonnes");

  const [carbonAmount, setCarbonAmount] = useState<number>(1);
  const [usdAmount, setUsdAmount] = useState<number>(5);
  const [activeInput, setActiveInput] = useState<"carbon" | "usd">("carbon");

  const { call: carbonToUsd, cancel: cancelCarbonToUsd } = useMemo(() => {
    return debounce(async (carbonAmount: number) => {
      const response = await CarbonService.getCarbonQuoteCarbonQuoteGet({
        carbonAmount,
      });
      const newUsdAmount = Number(response.total_cost);
      if (usdAmount !== newUsdAmount) {
        setUsdAmount(newUsdAmount);
      }
    }, 500);
  }, [setUsdAmount, usdAmount]);

  // const convertCarbonToUsd = async (carbonAmount: number) => {
  //   const usdPrice = await CarbonService.getCarbonQuoteCarbonQuoteGet({
  //     carbonAmount,
  //   });
  //   return usdPrice;
  // };

  const convertUsdToCarbon = async (usdAmount: number) => {
    const carbonPrice = await CarbonService.getUsdQuoteUsdQuoteGet({
      usdAmount,
    });
    return carbonPrice;
  };

  useEffect(() => {
    if (activeInput === "carbon") {
      carbonToUsd(carbonAmount);
      // const handleConvert = async () => {
      //   const response = await convertCarbonToUsd(Number(carbonAmount));
      //   const newUsdAmount = response.total_cost;
      //   if (usdAmount !== newUsdAmount) {
      //     setUsdAmount(newUsdAmount);
      //   }
      // };

      // const debounceConvert = debounce(handleConvert, 300);
      // debounceConvert();
      return () => {
        cancelCarbonToUsd();
      };
    }
  }, [carbonAmount, activeInput, carbonToUsd, cancelCarbonToUsd]);

  // useEffect(() => {
  //   if (activeInput === "usd") {
  //     const handleConvert = async () => {
  //       const response = await convertUsdToCarbon(Number(usdAmount));
  //       const newCarbonAmount = response.total_carbon;
  //       if (carbonAmount !== newCarbonAmount) {
  //         setCarbonAmount(newCarbonAmount);
  //       }
  //     };
  //   }
  // }, [usdAmount, activeInput]);

  return (
    <div className="flex flex-col p-4 gap-1">
      <h1 className="text-xl font-bold">Offset amount</h1>
      <span className="text-xs">
        Specify the amount of CARBON you want to sink. 1 CARBON is equivalent to
        1 ton CO2 emitted.
      </span>

      <div className="flex justify-around items-center gap-2">
        <input
          type="number"
          className="p-1 max-w-[40%] text-black"
          value={carbonAmount}
          onChange={(e) => {
            setCarbonAmount(Number(e.target.value));
            setActiveInput("carbon");
          }}
          // {...register("tonnes")}
        />
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        <input
          type="text"
          className="p-1 max-w-[40%] text-black"
          value={usdAmount}
          onChange={(e) => {
            setUsdAmount(Number(e.target.value));
            setActiveInput("usd");
          }}
        />
      </div>

      {/* <div>{usdAmount}</div> */}
    </div>
  );
}
