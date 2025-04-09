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
    <SinkingStep>
      <ModalHeader>Error</ModalHeader>
      <div className="flex flex-col items-center">
        <FormError className="text-center text-base md:text-lg max-h-[300px] text-red-500">
          {submissionError ?? "Unknown error"}
        </FormError>
        <div className="flex-1 flex justify-center items-center my-12">
          <FontAwesomeIcon
            icon={faWarning}
            className="text-[96px] text-red-500"
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
