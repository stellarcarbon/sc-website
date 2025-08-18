import { useAppContext } from "@/context/appContext";
import RequestCertificate from "./request-certificate/RequestCertificate";
import PendingRounding from "../PendingRounding";
import { InlineContactInfoContextProvider } from "@/context/InlineContactInfoContext";
import { RequestCertificateContextProvider } from "@/context/RequestCertificateContext";
import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkFormContext } from "@/context/SinkFormContext";
import { useMemo } from "react";

export default function PendingRetirementsInfo() {
  const { hasPendingRounding, totalPending } = useAppContext();
  const { overrideFormValues } = useSinkFormContext();

  const remainingFraction = useMemo(() => {
    return Math.ceil(totalPending) - totalPending;
  }, [totalPending]);

  let body;
  if (totalPending === 0) {
    return null;
  } else if (totalPending < 1) {
    body = (
      <div className="text-center p-4 flex flex-col gap-4">
        <div>Requesting certificates requires at least 1 CARBON pending.</div>
        <Button
          onClick={() =>
            overrideFormValues(undefined, remainingFraction, undefined)
          }
          className="text-sm self-center w-[200px]"
        >
          <div className="flex items-center">
            Add {remainingFraction.toFixed(3)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </div>
        </Button>
      </div>
    );
  } else if (totalPending % 1 === 0) {
    body = (
      <div className="text-center p-4">
        Your pending balance is a round number, so it is automatically
        contributed to a personal certificate. This process should nevers take
        more than a couple days.
      </div>
    );
  } else {
    body = hasPendingRounding ? (
      <PendingRounding />
    ) : (
      <InlineContactInfoContextProvider>
        <RequestCertificateContextProvider>
          <RequestCertificate />
        </RequestCertificateContextProvider>
      </InlineContactInfoContextProvider>
    );
  }

  return (
    <div
      className={`self-center relative md:max-w-[80%] border border-accentSecondary rounded bg-header`}
    >
      {body}
    </div>
  );
}
