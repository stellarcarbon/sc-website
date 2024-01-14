import { UseFormRegisterReturn } from "react-hook-form";
import AirTravelIcon from "../../icons/AirTravelIcon";
import EnvironmentIcon from "../../icons/EnvironmentIcon";
import HouseholdIcon from "../../icons/HouseholdIcon";
import RoadTravelIcon from "../../icons/RoadTravelIcon";
import { CheckoutFormData, ReasonOptions } from "../types";
import SelectReasonButton from "./SelectReasonButton";

interface ReasonSelectProps {
  setValue: (name: keyof CheckoutFormData, value: any) => void;
  watch: (name: string) => string;
}

export default function ReasonSelect({ setValue, watch }: ReasonSelectProps) {
  const reason = watch("reason");

  const selectReason = (selectedReason: ReasonOptions) => {
    if (selectedReason === reason) {
      setValue("reason", null);
    } else {
      setValue("reason", selectedReason);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <span className="font-bold mb-0">Tell us why (optional)</span>
      <span className="text-xs mt-1">Select a reason</span>
      <div className="flex gap-2 my-2">
        {Object.values(ReasonOptions).map((option) => {
          return (
            <SelectReasonButton
              key={`${option}_button`}
              isSelected={reason === option}
              onClick={() => selectReason(option)}
              reason={option}
            />
          );
        })}
      </div>
      <span className="text-xs">or write your own message</span>
      <textarea value={reason} className="my-2 text-black p-1" />
    </div>
  );
}
