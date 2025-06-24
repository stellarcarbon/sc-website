"use client";

import { CarbonService } from "@/client";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { HTMLProps, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function AuditTable() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>();
  const [carbonpoolStellar, setCarbonpoolStellar] = useState<number>();
  const [carbonpoolVerra, setCarbonpoolVerra] = useState<number>();
  const [carbonsinkStellar, setCarbonsinkStellar] = useState<number>();
  const [carbonsinkVerra, setCarbonsinkVerra] = useState<number>();

  const [amountPendingPool, setAmountPendingPool] = useState<number>();
  const [amountPendingSink, setAmountPendingSink] = useState<number>();

  useEffect(() => {
    CarbonService.getCarbonStats()
      .then((response) => {
        setIsLoading(false);
        setError(undefined);

        const carbonRetired = parseFloat(response.carbon_retired);
        const carbonStored = parseFloat(response.carbon_stored);
        const carbonSunk = parseFloat(response.carbon_sunk);

        setCarbonpoolStellar(carbonStored - carbonSunk);
        setCarbonpoolVerra(carbonStored - carbonRetired);

        setCarbonsinkStellar(carbonSunk);
        setCarbonsinkVerra(carbonRetired);

        setAmountPendingPool(
          carbonStored - carbonRetired - carbonStored + carbonSunk
        );
        setAmountPendingSink(carbonSunk - carbonRetired);
      })
      .catch((err) => {});
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-full md:w-[1000px] p-4 flex justify-center bg-primary rounded border border-accentSecondary mb-4">
        <Blocks />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full md:max-w-[1000px] p-4">
      <div className="grid grid-cols-[37.5%,37.5%,25%] bg-primary rounded border border-accentSecondary text-xs md:text-xl p-3">
        <div className="col-span-2 grid grid-cols-[40%,10%,40%,10%] grid-rows-2">
          <TableStat
            label={"VCU pool on Verra"}
            unit={"VCU's"}
            amount={carbonpoolVerra}
            tooltip={"This is our current inventory of VCU's at Verra."}
          />
          <div className="flex items-center justify-center font-bold">-</div>
          <TableStat
            label={"CARBON on Stellar"}
            unit={"CARBON"}
            amount={carbonpoolStellar}
            tooltip={
              "The amount CARBON currently for available for sale on the Stellar blockchain."
            }
          />
          <div className="flex items-center justify-center font-bold">=</div>
          <TableStat
            label={"CarbonSINK on Stellar"}
            unit={"CarbonSINK"}
            amount={carbonsinkStellar}
            tooltip={
              "When CARBON is sold, CarbonSINK is created and the CARBON is sunk, indicating this token can no longer be sold."
            }
          />
          <div className="flex items-center justify-center font-bold">-</div>
          <TableStat
            label={"VCU's sunk on Verra"}
            unit={"VCU"}
            amount={carbonsinkVerra}
            tooltip={
              "These VCU's have been 'burned' at the Verra registry, making them no longer tradeable."
            }
          />
          <div className="flex items-center justify-center font-bold">=</div>
        </div>

        <div className="grid grid-rows-2">
          <TableStat
            label="Pending retirement"
            unit="tonnes"
            amount={amountPendingPool}
            tooltip={
              "The pending retirement amount will eventually return to zero as we retire Stellarcarbon transactions on the Verra registry."
            }
          />
          <TableStat
            label="Pending retirement"
            unit="tonnes"
            amount={amountPendingSink}
          />
        </div>
      </div>
      <em className="block text-center text-sm text-tertiary mt-1">
        {`1000 kg = 1 ton = 1 VCU = 1 CARBON = 1`}
        <CARBONCurrencyIcon className="inline ml-1" />
        {` = 1 CarbonSINK`}
      </em>
    </div>
  );
}

interface TableStateProps extends HTMLProps<HTMLDivElement> {
  label: string;
  unit: string;
  amount?: number;
  tooltip?: string;
}

function TableStat({ label, unit, amount, tooltip }: TableStateProps) {
  return (
    <div className="relative flex flex-col items-center py-3">
      <div className="peer">
        <div className="mb-1">{label}</div>
        <div className="flex gap-1 items-center justify-center text-xs md:text-xl">
          <div className="font-bold">{amount?.toFixed(3) ?? "?"}</div>
          {unit === "CARBON" ? (
            <CARBONCurrencyIcon className="inline" />
          ) : (
            <div>{unit}</div>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-full left-1/2  w-[100px] md:w-max -translate-x-1/2 opacity-0 transition-opacity peer-hover:opacity-100 pointer-events-none">
          <div className="bg-gray-800 text-white text-xs rounded py-2 px-3 md:whitespace-nowrap">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
