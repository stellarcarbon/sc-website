import FormError from "@/components/FormError";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ErrorSinking() {
  const { submissionError } = useSinkingContext();

  return (
    <SinkingStep>
      <FormError className="text-center text-base md:text-lg">
        {submissionError ?? "Unknown error"}
      </FormError>
      <FontAwesomeIcon icon={faWarning} className="text-[48px] text-red-500" />
      {/* <ErrorIcon /> */}
    </SinkingStep>
  );
}
