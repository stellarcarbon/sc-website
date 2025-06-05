import Button from "@/components/Button";
import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "@/containers/sink/steps/Step";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <Button onClick={() => router.push("/dashboard/transactions")}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Return to dashboard</div>
        </Button>
      </div>
    </SinkingStep>
  );
}
