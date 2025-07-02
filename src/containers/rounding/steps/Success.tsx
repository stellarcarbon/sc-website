import Button from "@/components/Button";
import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "@/containers/sink/steps/Step";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import RoundingStep from "./Step";

export default function RoundingSuccess() {
  const router = useRouter();

  return (
    <RoundingStep title="Success">
      <div className="text-center">
        Your certificate request was received in good order and will be created
        soon.
      </div>
      <div className="my-8 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => router.push("/dashboard/transactions")}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Return to dashboard</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
