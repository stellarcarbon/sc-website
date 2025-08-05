import { useSinkingContext } from "@/context/SinkingContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWarning } from "@fortawesome/free-solid-svg-icons";

import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ModalStep from "@/components/ModalStep";

export default function ErrorSinking() {
  const { submissionError } = useSinkingContext();

  const router = useRouter();

  return (
    <ModalStep title="Something went wrong">
      <div className="flex flex-col items-center">
        <div className="overflow-y-auto max-h-[200px] text-center">
          {submissionError ?? "Please try again."}
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-[64px] text-red-600"
        />
      </div>
      <SinkingStepButtons>
        <Button
          onClick={() => router.push("/dashboard/sink")}
          className="mx-auto"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Go back</div>
        </Button>
      </SinkingStepButtons>
    </ModalStep>
  );
}
