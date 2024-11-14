import { HTMLProps } from "react";
import CARBONCurrencyIcon from "../icons/CARBONCurrencyIcon";

interface AuditTableStatProps extends HTMLProps<HTMLDivElement> {
  label: string;
  number?: number;
  unit: string;
}

export default function AuditTableStat({
  label,
  number,
  unit,
}: AuditTableStatProps) {
  return (
    <div className="flex flex-col justify-center items-center max-w-[40%]">
      <div className="flex items-center text-[10px] md:text-sm text-center h-[35px] font-semibold">
        {label}
      </div>
      <div className="flex items-center gap-[2px] text-base mx-1 h-[35px]">
        <div>{number?.toFixed(3) ?? "?"}</div>
        {unit === "CARBON" ? (
          <CARBONCurrencyIcon className="inline ml-1" />
        ) : (
          <div className="text-base ml-1">{unit}</div>
        )}
      </div>
    </div>
  );
}
