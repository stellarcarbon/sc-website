"use client";

import { debounce, useSCRouter } from "@/utils";
import {
  faArrowRightArrowLeft,
  faCalculator,
  faStopwatch,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Blocks } from "react-loader-spinner";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import appConfig from "@/config";
import { useSinkingContext } from "@/context/SinkingContext";
import Button from "../../../components/Button";
import SectionHeader from "../../../components/SectionHeader";
import { useSinkFormContext } from "@/context/SinkFormContext";
import Link from "next/link";
import { getCarbonQuote, getUsdQuote } from "@stellarcarbon/sc-sdk";

export default function AmountInput() {
  const { register, watch, setValue, quote, setQuote } = useSinkFormContext();
  const tonnes = watch("tonnes");

  const [activeInput, setActiveInput] = useState<"carbon" | "usd">("carbon");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [showFractionalWarning, setShowFractionalWarning] =
    useState<boolean>(false);

  const [quoteStr, setQuoteStr] = useState<string>("");
  const { USDCPerXLM } = useSinkingContext();
  const [priceInXLM, setPriceInXLM] = useState<string>();

  const router = useSCRouter();

  useEffect(() => {
    if (USDCPerXLM) {
      const price = quote / USDCPerXLM;
      setPriceInXLM(price.toFixed(2));
    }
  }, [quote, USDCPerXLM]);

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

      getCarbonQuote({
        query: {
          carbon_amount: carbonAmount,
        },
      })
        .then((response) => {
          setIsLoading(false);
          setHasError(false);

          if (response.data === undefined) {
            setHasError(true);
            setStatusMessage("Could not get CARBON quote.");
            return;
          }

          const newUsdAmount = Number(response.data.total_cost);
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

      getUsdQuote({
        query: {
          usd_amount: usdAmount,
        },
      })
        .then((response) => {
          setIsLoading(false);
          setHasError(false);

          if (response.data === undefined) {
            setHasError(true);
            setStatusMessage("Could not get USDC quote");
            return;
          }

          const newCarbonAmount = Number(response.data.total_carbon);
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
    <>
      <SectionHeader>Set the sink amount</SectionHeader>
      <div className="mx-3 py-4 md:mx-4 mb-8">
        <div className="flex flex-col">
          <div></div>
          <div className="">
            Set the sink amount of your contribution. Sinking 1{" "}
            <CARBONCurrencyIcon className="inline" /> would let you claim the
            environmental benefit of reducing 1 tonne of CO2.
          </div>
          <div className="flex flex-col gap-4 my-8 mb-12">
            <div className="flex justify-between items-center gap-2 mb-3 md:mb-6">
              <div className="w-[35%] flex flex-col items-start">
                <div className="text-xs mb-1">Sink amount</div>
                <div className="relative">
                  <div className="absolute top-0 right-[10px] text-black h-full flex flex-col justify-center">
                    <CARBONCurrencyIcon className="" />
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="px-2 pr-9 py-1 w-full text-black rounded-sm text-right"
                    {...register("tonnes", {
                      validate: () => {
                        return (
                          !hasError || "The selected CARBON amount is invalid."
                        );
                      },
                    })}
                  />
                </div>
              </div>
              <div className="self-end">
                <FontAwesomeIcon
                  icon={faArrowRightArrowLeft}
                  className="text-xl"
                />
              </div>
              <div className="w-[35%] flex flex-col">
                <div className="text-xs mb-1">Price in $</div>
                <div className="relative">
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
                      if (
                        /^\d*\.?\d*$/.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setQuoteStr(e.target.value);
                      }
                      setQuote(Number(e.target.value));
                      setActiveInput("usd");
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={`self-center w-full md:w-[80%] px-4 py-6 min-h-20 gap-4 flex flex-col justify-center items-center bg-primary border rounded border-accentSecondary`}
            >
              {isLoading ? (
                <Blocks width={48} height={48} />
              ) : hasError ? (
                <span className={`text-center mx-6 text-red-500`}>
                  {statusMessage}
                </span>
              ) : (
                <>
                  <div className="flex justify-center gap-1 items-center md:text-lg text-center">
                    <div className="flex items-center">
                      <span>Sinking {tonnes}</span>
                      <CARBONCurrencyIcon className="ml-1" />
                    </div>
                    <span className="mx-[2px]">costs approx.</span>

                    <div className="flex items-center">
                      <span>$</span>
                      <span className="ml-[1px]"> {quote.toFixed(2)}</span>
                    </div>
                    {/* <div className="text-xs md:text-base flex items-center gap-1">
                ({priceInXLM} <XLMIcon />)
              </div> */}
                  </div>
                  {showFractionalWarning && (
                    <span className="md:mx-12 text-xs md:text-sm text-center">
                      If you sink a fractional amount of CARBON you cannot
                      receive an indvidual certificate without either rounding
                      down or up. Read more{" "}
                      <Link href="/explain" className="underline">
                        here
                      </Link>
                      .
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="text-2xl font-bold tracking-wider">
            Estimate emissions
          </div>
          <div className="flex flex-col gap-6 mt-4 mb-2">
            <div>
              Optionally try out our emissions estimator to help you decide on
              the right amount.
            </div>

            <Button
              onClick={() => router.push("/estimator/flight")}
              className="mx-auto"
            >
              <FontAwesomeIcon icon={faCalculator} />
              Try the emissions estimator
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
