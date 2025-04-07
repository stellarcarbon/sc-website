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
      <FormError className="text-center text-base md:text-lg overflow-y-scroll max-h-[300px]">
        {submissionError ?? "Unknown error"}
      </FormError>
      <div className="flex-1 flex justify-center items-center my-4">
        <FontAwesomeIcon
          icon={faWarning}
          className="text-[96px] text-red-500"
        />
      </div>
      {/* <ErrorIcon /> */}
    </SinkingStep>
  );
}
