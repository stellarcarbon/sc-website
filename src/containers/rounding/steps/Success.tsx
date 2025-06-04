import Button from "@/components/Button";
import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "@/containers/sink/steps/Step";
import { useRouter } from "next/navigation";

export default function RoundingSuccess() {
  const router = useRouter();

  return (
    <SinkingStep title="Success">
      <div className="font-semibold text-lg text-center">
        Your certificate request was received in good order and will be created
        soon.
      </div>
      <div className="my-8 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="h-16 md:my-3 flex items-center justify-center">
        <Button
          className="h-10 !py-2"
          onClick={() => router.push("/dashboard/transactions")}
        >
          Return to dashboard
        </Button>
      </div>
    </SinkingStep>
  );
}
