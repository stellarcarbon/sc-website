import { HTMLProps } from "react";
import { ReasonOptions } from "../types";
import EnvironmentIcon from "../../icons/EnvironmentIcon";
import HouseholdIcon from "../../icons/HouseholdIcon";
import RoadTravelIcon from "../../icons/RoadTravelIcon";
import AirTravelIcon from "../../icons/AirTravelIcon";

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
      className={`text-black shadow-md p-2 border w-16 h-16 ${
        isSelected
          ? " border-accentSecondary !text-accent bg-primary"
          : "bg-white"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
