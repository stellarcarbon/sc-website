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
      className={`shadow-md p-2 border w-16 h-16 ${
        isSelected ? " border-black bg-blue-100" : "bg-white"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
