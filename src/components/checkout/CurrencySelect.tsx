import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData } from "@/app/types";
import { PaymentAsset } from "@/client";

interface CurrencySelectProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
}

export default function CurrencySelect({ register }: CurrencySelectProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-3">
      <span className="text-xl md:text-2xl font-bold">
        Choose preferred asset
      </span>
      <span className="text-xs md:text-sm mb-2">
        {`Choose a preferred payment asset to use or select "any".`}
      </span>

      <select
        className="w-full text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
        defaultValue={PaymentAsset.ANY}
        {...register("currency")}
      >
        {Object.values(PaymentAsset).map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>

      <span className="text-xs mt-2">
        Note: payment will default to CARBON if a sufficient balance is
        available.
      </span>
    </div>
  );
}
