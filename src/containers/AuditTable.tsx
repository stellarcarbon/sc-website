"use client";

import { CarbonService } from "@/client";
import AuditTableStat from "@/components/audit_table/AuditTableStat";
import { useEffect, useState } from "react";
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

        const carbonPending: number = parseFloat(response.carbon_pending);
        const carbonRetired: number = parseFloat(response.carbon_retired);
        const carbonStored: number = parseFloat(response.carbon_stored);
        const carbonSunk: number = parseFloat(response.carbon_sunk);

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

  return (
    <div className="md:max-w-[1080px] grid grid-cols-3 gap-1 w-full border border-tertiary bg-primary">
      {isLoading ? (
        <div className="flex justify-center items-center p-8 col-span-3">
          <Blocks />
        </div>
      ) : !error ? (
        <>
          <div className="grid grid-rows-2 col-span-2 border border-white p-4">
            <div className="flex justify-around items-center p-1">
              <AuditTableStat
                label={"Carbon pool on Verra"}
                number={carbonpoolVerra}
                unit={"VCU's"}
              />
              <div className="text-xl font-bold">-</div>
              <AuditTableStat
                label={"CARBON pool on Stellar"}
                number={carbonpoolStellar}
                unit={"CARBON"}
              />
              <div className="text-xl font-bold">=</div>
            </div>
            <div className="flex justify-around items-center p-1">
              <AuditTableStat
                label={"CarbonSINK on Stellar"}
                number={carbonsinkStellar}
                unit={"CarbonSINK"}
              />
              <div className="text-xl font-bold">-</div>
              <AuditTableStat
                label={"Carbon sunk on Verra"}
                number={carbonsinkVerra}
                unit={"tonnes"}
              />
              <div className="text-xl font-bold">=</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-around border border-white p-2">
            <AuditTableStat
              label={"Amount pending"}
              number={amountPendingPool}
              unit={"tonnes"}
            />
            <AuditTableStat
              label={"Amount pending"}
              number={amountPendingSink}
              unit={"tonnes"}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-8 col-span-3 text-red-500">
          Error loading Stellarcarbon audit stats
        </div>
      )}
    </div>
  );
}
