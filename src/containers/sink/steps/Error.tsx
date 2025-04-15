import FormError from "@/components/FormError";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "@/components/ModalHeader";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function ErrorSinking() {
  const { submissionError } = useSinkingContext();

  const router = useRouter();

  return (
    <SinkingStep title="Something went wrong">
      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold overflow-y-auto max-h-[200px] text-center">
          {submissionError ?? "Please try again."}
        </div>
        <div className="flex-1 flex justify-center items-center my-12">
          <FontAwesomeIcon
            icon={faWarning}
            className="text-[96px] text-red-600"
          />
        </div>
      </div>
      <SinkingStepButtons>
        <Button
          onClick={() => router.push("/dashboard/sink")}
          className="mx-auto"
        >
          Go back
        </Button>
      </SinkingStepButtons>
    </SinkingStep>
  );
}
