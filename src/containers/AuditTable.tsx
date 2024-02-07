"use client";

import AuditTableStat from "@/components/audit_table/AuditTableStat";
import { useEffect, useState } from "react";

export default function AuditTable() {
  // TODO: implement connection to carbon_api
  const [carbonpoolVerra, setCarbonpoolVerra] = useState<number>();
  const [carbonpoolStellar, setCarbonpoolStellar] = useState<number>();
  const [carbonsinkVerra, setCarbonsinkVerra] = useState<number>();
  const [carbonsinkStellar, setCarbonsinkStellar] = useState<number>();

  useEffect(() => {}, []);

  return (
    <div className="md:max-w-[1080px] grid grid-cols-3 gap-1 w-full border border-tertiary bg-primary ">
      <div className="grid grid-rows-2 col-span-2 border border-white">
        <div className="flex justify-around items-start p-1">
          <AuditTableStat
            label={"Carbon pool on Verra"}
            number={179000}
            unit={"kg"}
          />
          <div className="pt-[37px] text-xl font-bold">-</div>
          <AuditTableStat
            label={"CARBON pool on Stellar"}
            number={175702}
            unit={"kg"}
          />
          <div className="pt-[37px] text-xl font-bold">=</div>
        </div>
        <div className="flex justify-around items-start p-1">
          <AuditTableStat
            label={"CarbonSINK on Stellar"}
            number={26298}
            unit={"kg"}
          />
          <div className="pt-[37px] text-xl font-bold">-</div>
          <AuditTableStat
            label={"Carbon sunk on Verra"}
            number={23000}
            unit={"kg"}
          />
          <div className="pt-[37px] text-xl font-bold">=</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-around border border-white">
        <AuditTableStat label={"Amount pending"} number={3298} unit={"kg"} />
        <AuditTableStat label={"Amount pending"} number={3298} unit={"kg"} />
      </div>
    </div>
  );
}
