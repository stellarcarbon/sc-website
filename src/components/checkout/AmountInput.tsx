"use client";

import { SinkingFormData } from "@/app/types";
import { debounce } from "@/utils";
import { CarbonService } from "@/client";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Blocks } from "react-loader-spinner";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSearchParams } from "next/navigation";
import appConfig from "@/config";

interface AmountInputProps {
  register: UseFormRegister<SinkingFormData>;
  watch: (name: string) => number;
  setValue: (name: keyof SinkingFormData, value: any) => void;
  quote: number;
  setQuote: Dispatch<SetStateAction<number>>;
}

export default function AmountInput({
  register,
  watch,
  setValue,
  quote,
  setQuote,
}: AmountInputProps) {
  const tonnes = watch("tonnes");
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  useEffect(() => {
    setValue("tonnes", amount !== null ? amount : 1);
  }, [amount, setValue]);

  const [activeInput, setActiveInput] = useState<"carbon" | "usd">("carbon");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [showFractionalWarning, setShowFractionalWarning] =
    useState<boolean>(false);

  const [quoteStr, setQuoteStr] = useState<string>("");

  const { call: carbonToUsd, cancel: cancelCarbonToUsd } = useMemo(() => {
    return debounce(async (carbonAmount: number) => {
      if (carbonAmount === 0) {
        setQuote(0);
        setHasError(false);
        setStatusMessage(
          "Specify the amount of CARBON you want to sink. 1 CARBON is equivalent to 1 ton CO2 emitted."
        );
        return;
      }

      CarbonService.getCarbonQuote({
        carbonAmount,
      })
        .then((response) => {
          setIsLoading(false);
          setHasError(false);
          const newUsdAmount = Number(response.total_cost);
          if (quote !== newUsdAmount) {
            setQuote(Math.round(newUsdAmount * 100) / 100);
            setQuoteStr(newUsdAmount.toFixed(2));
          }
        })
        .catch((err) => {
          if (err.status === 422) {
            setHasError(true);
            setIsLoading(false);
            setStatusMessage(err.body.detail[0].msg);
          }
        });
    }, 500);
  }, [quote, setQuote]);

  const { call: usdToCarbon, cancel: cancelUsdToCarbon } = useMemo(() => {
    return debounce(async (usdAmount: number) => {
      if (usdAmount === 0) {
        setValue("tonnes", 0);
        // setCarbonAmount(0);
        setHasError(false);
        setStatusMessage(
          "Specify the amount of CARBON you want to sink. 1 CARBON is equivalent to 1 ton CO2 emitted."
        );
        return;
      }

      CarbonService.getUsdQuote({
        usdAmount,
      })
        .then((response) => {
          setIsLoading(false);
          setHasError(false);
          const newCarbonAmount = Number(response.total_carbon);
          if (tonnes !== newCarbonAmount) {
            setValue("tonnes", newCarbonAmount);
          }
        })
        .catch((err) => {
          if (err.status === 422) {
            setHasError(true);
            setIsLoading(false);
            setStatusMessage(err.body.detail[0].msg);
          }
        });
    }, 500);
  }, [setValue, tonnes]);

  useEffect(() => {
    if (activeInput === "usd") {
      setIsLoading(true);
      usdToCarbon(quote);
    }
  }, [quote, quoteStr]);

  useEffect(() => {
    if (activeInput === "carbon") {
      setIsLoading(true);
      carbonToUsd(tonnes);
    }
    setActiveInput("carbon");
  }, [tonnes]);

  useEffect(() => {
    if (!appConfig.demo) {
      setShowFractionalWarning(tonnes % 1 != 0);
    }
  }, [tonnes, setShowFractionalWarning]);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl md:text-2xl text-start font-bold">
        CARBON amount
      </h1>
      <span className="text-xs md:text-sm">
        Use the exchange rate calculator to determine the amount of CARBON you
        want to sink.
      </span>

      <div className="flex justify-between items-center gap-2 h-16 px-2">
        <div className="relative w-[35%]">
          <div className="absolute top-0 right-[10px] text-black h-full flex flex-col justify-center">
            <CARBONCurrencyIcon className="" />
          </div>
          <input
            type="text"
            inputMode="decimal"
            className="px-2 pr-9 py-1 w-full text-black rounded-sm text-right"
            {...register("tonnes", {
              validate: () => {
                return !hasError || "The selected CARBON amount is invalid.";
              },
            })}
          />
        </div>

        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          className="px-4 py-4 text-xl"
        />

        <div className="relative w-[35%]">
          <div className="absolute top-0 left-[10px] text-black h-full flex flex-col justify-center">
            $
          </div>
          <input
            type="text"
            inputMode="decimal"
            className="px-2 pl-7 py-1 w-full text-black rounded-sm"
            value={quoteStr || ""}
            onChange={(e) => {
              setIsLoading(true);
              if (/^\d*\.?\d*$/.test(e.target.value) || e.target.value === "") {
                setQuoteStr(e.target.value);
              }
              setQuote(Number(e.target.value));
              setActiveInput("usd");
            }}
          />
        </div>
      </div>

      <div
        className={`px-4 py-6 min-h-20 mt-2 gap-4 flex flex-col justify-center items-center bg-darker border rounded border-accentSecondary`}
      >
        {isLoading ? (
          <Blocks width={48} height={48} />
        ) : hasError ? (
          <span className={`text-center mx-6 text-red-500 text-sm`}>
            {statusMessage}
          </span>
        ) : (
          <>
            <div className="w-full flex justify-center gap-1 items-center text-base md:text-lg text-center">
              <div className="flex items-center">
                <span>Sinking {tonnes}</span>
                <CARBONCurrencyIcon className="ml-1" />
              </div>
              <span className="mx-[2px]">costs approx.</span>
              <div className="flex items-center">
                <span>$</span>
                <span className="ml-[1px]"> {quote.toFixed(2)}</span>
              </div>
            </div>
            {showFractionalWarning && (
              <span className="md:mx-12 text-sm text-center">
                If you sink a fractional amount of CARBON you cannot receive an
                indvidual certificate without either rounding down or up. Read
                more <span className="underline">here</span>.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
