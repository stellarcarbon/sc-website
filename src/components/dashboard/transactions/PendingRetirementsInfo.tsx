import { useAppContext } from "@/context/appContext";
import RequestCertificate from "./request-certificate/RequestCertificate";
import PendingRounding from "../PendingRounding";
import { InlineContactInfoContextProvider } from "@/context/InlineContactInfoContext";
import { RequestCertificateContextProvider } from "@/context/RequestCertificateContext";

export default function PendingRetirementsInfo() {
  const { hasPendingRounding, totalPending } = useAppContext();

  let body;
  if (totalPending === 0) {
    return null;
  } else if (totalPending % 1 === 0) {
    body = (
      <div className="text-center p-2">
        Your pending balance is a round number, so we can automatically
        contribute these CARBON to a personal certificate. This is a manual
        process and should not take more than a couple days. Check here for
        updates.
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
      className={`self-center relative text-sm md:text-base border border-tertiary rounded bg-secondary`}
    >
      {body}
    </div>
  );
}
