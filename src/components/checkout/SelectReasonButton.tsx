import { HTMLProps } from "react";
import EnvironmentIcon from "@/components/icons/EnvironmentIcon";
import HouseholdIcon from "@/components/icons/HouseholdIcon";
import RoadTravelIcon from "@/components/icons/RoadTravelIcon";
import AirTravelIcon from "@/components/icons/AirTravelIcon";
import { ReasonOption, ReasonOptions } from "./ReasonSelect";

interface SelectReasonButtonProps extends HTMLProps<HTMLButtonElement> {
  isSelected: boolean;
  reason: ReasonOption;
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
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer  rounded shadow border border-accentSecondary
        ${isSelected ? "bg-secondary" : "bg-darker"}
        p-2 w-[80px] md:w-[125px]
        flex flex-col items-center gap-2`}
    >
      <div
        className={`text-black shadow-md p-2 border w-16 h-16 rounded ${
          isSelected ? " border-accent !text-black bg-white" : "bg-accent"
        }`}
      >
        {icon}
      </div>
      <div className="text-[10px]">{reason.label}</div>
    </button>
  );
}
