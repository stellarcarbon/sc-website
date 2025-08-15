import { useAppContext } from "@/context/appContext";
import { useMemo } from "react";
import SectionHeader from "../../../components/SectionHeader";
import { useSinkFormContext } from "@/context/SinkFormContext";
import { faDollar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { PaymentAssetSchema } from "@stellarcarbon/sc-sdk";

export default function CurrencySelect() {
  const { register } = useSinkFormContext();
  const { xlmBalance, usdcBalance } = useAppContext();

  const options = useMemo(() => {
    const paymentAssets = PaymentAssetSchema.enum;
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
      <SectionHeader icon={faDollar}>Choose preferred asset</SectionHeader>
      <div className="mx-3 py-4 md:mx-4">
        {/* <DashboardHeader>Choose preferred asset</DashboardHeader> */}

        <div className="flex flex-col gap-6">
          <span className="">
            {`Choose a preferred payment asset to use or leave it on "No preference". Horizon will create the best offer available.`}
          </span>
          <div>
            <select
              className="w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
              defaultValue={"any"}
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
