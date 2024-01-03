import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData, CurrencyOptions } from "../page";

interface CurrencySelectProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
}

export default function CurrencySelect({ register }: CurrencySelectProps) {
  return (
    <div className="flex flex-col p-4">
      <span className="font-bold">How would you like to pay?</span>
      <span className="text-xs mb-2">Payment asset</span>

      <select
        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-black"
        {...register("currency")}
      >
        <option value="">Select an option</option>
        {Object.values(CurrencyOptions).map((option) => {
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
