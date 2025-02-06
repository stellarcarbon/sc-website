import { useAppContext } from "@/context/appContext";
import RequestCertificate from "./RequestCertificate";
import PendingRounding from "../PendingRounding";

interface PendingRetirementsInfoProps {
  totalCarbonPending: number;
}

export default function PendingRetirementsInfo({
  totalCarbonPending,
}: PendingRetirementsInfoProps) {
  const { hasPendingRounding } = useAppContext();

  let body;
  if (totalCarbonPending === 0) {
    return null;
  } else if (totalCarbonPending % 1 === 0) {
    body = (
      <div className="text-center p-2">
        Your pending balance is a round number, so we can automatically
        contribute these CARBON to a personal certificate. This is a manual
        process and shoud not take more than a couple days. Check here for
        updates.
      </div>
    );
  } else {
    body = hasPendingRounding ? (
      <PendingRounding />
    ) : (
      <RequestCertificate totalCarbonPending={totalCarbonPending} />
    );
  }

  return (
    <div
      className={`md:w-[60%] self-center relative text-sm border border-tertiary rounded bg-darker`}
    >
      {body}
    </div>
  );
}
