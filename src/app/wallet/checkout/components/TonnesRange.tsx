import { UseFormRegisterReturn } from "react-hook-form";
import { CheckoutFormData } from "../page";

interface TonnesRangeProps {
  register: (name: keyof CheckoutFormData) => UseFormRegisterReturn;
  watch: (name: string) => number;
}

export default function TonnesRange({ register, watch }: TonnesRangeProps) {
  const tonnes = watch("tonnes");

  return (
    <div className="flex flex-col p-4">
      <span className="font-bold">How much would you like to offset?</span>
      <span className="text-xs mb-2">
        Amount CARBON (in tonnes CO2-equivalent: tCO₂-e)
      </span>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <span>0</span>
          <input
            className="w-48 range-lg"
            type="range"
            min="0"
            max="120"
            step="1"
            placeholder="slider"
            {...register("tonnes")}
          />
          <span>120</span>
        </div>
        <div className="border border-black p-2 font-bold rounded-sm bg-gray-400">
          {tonnes}
        </div>
      </div>
      <div>
        <span>That is $10</span>
      </div>
    </div>
  );
}
