import { RetirementDetail } from "@/client";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { ReactNode } from "react";

interface RetirementDetailCardProps {
  retirement: RetirementDetail;
}

function ItemHeader({ children }: { children: ReactNode }) {
  return <div className="font-semibold">{children}</div>;
}

function ItemValue({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function Item({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

export default function RetirementDetailCard({
  retirement,
}: RetirementDetailCardProps) {
  return (
    <div className="p-4 flex flex-col gap-2 bg-primary text-sm rounded">
      <Item>
        <ItemHeader>Certificate ID</ItemHeader>
        <ItemValue>{retirement.certificate_id}</ItemValue>
      </Item>

      <Item>
        <ItemHeader>Amount</ItemHeader>
        <ItemValue>
          <div className="flex items-center gap-1">
            <span className="">{retirement.vcu_amount}</span>
            <CARBONCurrencyIcon width={14} height={14} />
          </div>
        </ItemValue>
      </Item>

      <Item>
        <ItemHeader>Retirement Date</ItemHeader>
        <ItemValue>{retirement.retirement_date}</ItemValue>
      </Item>

      <Item>
        <ItemHeader>Serial number</ItemHeader>
        <ItemValue>
          <span className="text-xs">{retirement.serial_number}</span>
        </ItemValue>
      </Item>

      <Item>
        <ItemHeader>Instrument Type</ItemHeader>
        <ItemValue>{retirement.instrument.instrument_type}</ItemValue>
      </Item>

      <Item>
        <ItemHeader>Project</ItemHeader>
        <ItemValue>{retirement.vcs_project.name}</ItemValue>
      </Item>

      {/* <ItemHeader>Certificate ID</ItemHeader>
      <div className="col-span-2">{retirement.certificate_id}</div>

      <ItemHeader>Retirement date</ItemHeader>
      <div className="col-span-2">{retirement.retirement_date}</div>

      <ItemHeader>Instrument type</ItemHeader>
      <div className="col-span-2">{retirement.instrument.instrument_type}</div>

      <ItemHeader>Serial number</ItemHeader>
      <div className="col-span-2 text-xs">{retirement.serial_number}</div> */}
    </div>
  );
}
