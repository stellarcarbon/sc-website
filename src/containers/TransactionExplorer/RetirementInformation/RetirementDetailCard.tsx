import { RetirementDetail } from "@/client";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { formatDate } from "@/utils";
import { ReactNode, useCallback, useMemo, useState } from "react";
import TruncatedHash from "../../../components/dashboard/TruncatedHash";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface RetirementDetailCardProps {
  retirement: RetirementDetail;
  amountFilled: number;
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

function CertficateKey({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-2 text-start inline-flex items-center text-base">
      {children}
    </div>
  );
}
function CertficateValue({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-3 text-end inline-flex gap-1 justify-end items-center text-base">
      {children}
    </div>
  );
}

export default function RetirementDetailCard({
  retirement,
  amountFilled,
}: RetirementDetailCardProps) {
  const [copiedSerialNumber, setCopiedSerialNumber] = useState(false);

  const retirementDate = useMemo(() => {
    const d = new Date(retirement.retirement_date);
    return formatDate(d);
  }, [retirement]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setCopiedSerialNumber(false);
      }, 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const copySerialNumber = () => {
    setCopiedSerialNumber(true);
    handleCopy(retirement.serial_number);
  };

  return (
    <div className="bg-secondary border border-tertiary rounded grid grid-cols-5 gap-2 md:gap-3 p-3 md:p-4">
      <CertficateKey>Certificate ID</CertficateKey>
      <CertficateValue>
        <Link
          href={retirement.registry_url}
          target="_blank"
          className="underline"
        >
          {retirement.certificate_id}
        </Link>
      </CertficateValue>

      <CertficateKey>Serial Number</CertficateKey>
      <CertficateValue>
        {copiedSerialNumber ? (
          <div className="text-xs">Copied!</div>
        ) : (
          <div className="cursor-pointer" onClick={copySerialNumber}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        )}

        <TruncatedHash hash={retirement.serial_number} chars={7} />
      </CertficateValue>

      <CertficateKey>VCU Amount</CertficateKey>
      <CertficateValue>
        <span>{retirement.vcu_amount}</span>
        <CARBONCurrencyIcon width={14} height={14} />
      </CertficateValue>

      <CertficateKey>Contributed by this transaction</CertficateKey>
      <CertficateValue>
        <div className="flex items-center">
          <span className="mr-1">{amountFilled}</span>
          <CARBONCurrencyIcon width={14} height={14} />
        </div>
      </CertficateValue>

      <CertficateKey>Retirement Date</CertficateKey>
      <CertficateValue>{retirementDate}</CertficateValue>

      <CertficateKey>Instrument Type</CertficateKey>
      <CertficateValue>{retirement.instrument.instrument_type}</CertficateValue>

      <CertficateKey>Project</CertficateKey>
      <CertficateValue>
        <Link
          href={retirement.vcs_project.registry_url}
          className="text-accent underline text-sm"
          target="_blank"
        >
          {retirement.vcs_project.name}
        </Link>
      </CertficateValue>
    </div>
  );

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
