import { UseFormRegisterReturn } from "react-hook-form";
import { SinkingFormData } from "@/app/types";
import { PaymentAsset } from "@/client";
import { useAppContext } from "@/context/appContext";
import { useEffect, useMemo } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { useSearchParams } from "next/navigation";

interface CurrencySelectProps {
  register: (name: keyof SinkingFormData) => UseFormRegisterReturn;
  setValue: (name: keyof SinkingFormData, value: any) => void;
}

export default function CurrencySelect({
  register,
  setValue,
}: CurrencySelectProps) {
  const { xlmBalance, usdcBalance } = useAppContext();
  const searchParams = useSearchParams();
  const currency = searchParams.get("asset");

  useEffect(() => {
    if (currency?.toLowerCase() === PaymentAsset.ANY.toLowerCase())
      setValue("currency", PaymentAsset.ANY);
    if (currency?.toLowerCase() === PaymentAsset.USDC.toLowerCase())
      setValue("currency", PaymentAsset.USDC);
    if (currency?.toLowerCase() === PaymentAsset.XLM.toLowerCase())
      setValue("currency", PaymentAsset.XLM);
  }, [currency, setValue]);

  const options = useMemo(() => {
    const paymentAssets = [
      PaymentAsset.ANY,
      PaymentAsset.XLM,
      PaymentAsset.USDC,
    ];
    return paymentAssets.map((option) => {
      let optionLabel = option.toString();
      if (optionLabel === "any") optionLabel = "No preference";
      else if (optionLabel === "XLM") {
        optionLabel = `XLM - Your balance: ${xlmBalance?.toFixed(2)}`;
      } else if (optionLabel === "USDC") {
        optionLabel = `USDC - Your balance: ${usdcBalance?.toFixed(2)}`;
      }
      return (
        <option key={option} value={option}>
          {optionLabel}
        </option>
      );
    });
  }, [xlmBalance, usdcBalance]);

  return (
    <div className="p-3 py-6 md:p-6">
      <DashboardHeader>Choose preferred asset</DashboardHeader>

      <div className="flex flex-col gap-3">
        <span className="">
          {`Choose a preferred payment asset to use or leave it on "No preference". Horizon will create the best offer available.`}
        </span>
        <div>
          <select
            className="w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
            defaultValue={PaymentAsset.ANY}
            {...register("currency")}
          >
            {options}
          </select>

          <span className="text-[10px] mx-1">
            Note: payment will default to CARBON if a sufficient balance is
            available.
          </span>
        </div>
      </div>
    </div>
  );
}
