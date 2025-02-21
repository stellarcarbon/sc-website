import FormError from "@/components/FormError";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";

export default function ErrorSinking() {
  const { submissionError } = useSinkingContext();

  return (
    <SinkingStep>
      <FormError className="text-center text-base md:text-lg">
        {submissionError ?? "Unknown error"}
      </FormError>
      <ErrorIcon />
    </SinkingStep>
  );
}
