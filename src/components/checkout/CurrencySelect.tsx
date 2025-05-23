import { PaymentAsset } from "@/client";
import { useAppContext } from "@/context/appContext";
import { useMemo } from "react";
import SectionHeader from "../SectionHeader";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function CurrencySelect() {
  const { register } = useSinkFormContext();
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
    <>
      <SectionHeader>Choose preferred asset</SectionHeader>
      <div className="p-3 py-6 md:p-6">
        {/* <DashboardHeader>Choose preferred asset</DashboardHeader> */}

        <div className="flex flex-col gap-6">
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
    </>
  );
}
