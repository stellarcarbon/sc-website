import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData } from "@/app/types";
import { PaymentAsset } from "@/client";

interface CurrencySelectProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
}

export default function CurrencySelect({ register }: CurrencySelectProps) {
  return (
    <div className="flex flex-col p-4">
      <span className="font-bold">How would you like to pay?</span>
      <span className="text-xs mb-2 mt-1">Payment asset</span>

      <select
        className="text-black border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
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
