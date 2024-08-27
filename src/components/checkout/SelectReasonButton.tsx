import { HTMLProps } from "react";
import { ReasonOptions } from "@/app/types";
import EnvironmentIcon from "@/components/icons/EnvironmentIcon";
import HouseholdIcon from "@/components/icons/HouseholdIcon";
import RoadTravelIcon from "@/components/icons/RoadTravelIcon";
import AirTravelIcon from "@/components/icons/AirTravelIcon";

interface SelectReasonButtonProps extends HTMLProps<HTMLButtonElement> {
  isSelected: boolean;
  reason: ReasonOptions;
}

export default function SelectReasonButton({
  onClick,
  disabled = false,
  isSelected,
  reason,
}: SelectReasonButtonProps) {
  let icon = <></>;

  if (reason === ReasonOptions.ENVIRONMENT) {
    icon = <EnvironmentIcon />;
  } else if (reason === ReasonOptions.HOUSEHOLD) {
    icon = <HouseholdIcon />;
  } else if (reason === ReasonOptions.AIRTRAVEL) {
    icon = <AirTravelIcon />;
  } else if (reason === ReasonOptions.ROADTRAVEL) {
    icon = <RoadTravelIcon />;
  }

  return (
    <button
      type="button"
      className={`text-black shadow-md p-2 border w-16 h-16 rounded ${
        isSelected ? " border-accent !text-accent bg-tertiary" : "bg-white"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
