import { UseFormRegisterReturn } from "react-hook-form";
import { SinkingFormData } from "@/app/types";
import { PaymentAsset } from "@/client";
import { useAppContext } from "@/context/appContext";
import { useMemo } from "react";

interface CurrencySelectProps {
  register: (name: keyof SinkingFormData) => UseFormRegisterReturn;
}

export default function CurrencySelect({ register }: CurrencySelectProps) {
  const { xlmBalance, usdcBalance } = useAppContext();

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
    <div className="flex flex-col gap-1 md:gap-3">
      <span className="text-xl md:text-2xl font-bold">
        Choose preferred asset
      </span>
      <span className="text-xs md:text-sm mb-2">
        {`Choose a preferred payment asset to use or leave it on "No preference". Horizon will create the best offer available.`}
      </span>

      <select
        className="w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
        defaultValue={PaymentAsset.ANY}
        {...register("currency")}
      >
        {options}
      </select>

      <span className="text-xs">
        Note: payment will default to CARBON if a sufficient balance is
        available.
      </span>
    </div>
  );
}
