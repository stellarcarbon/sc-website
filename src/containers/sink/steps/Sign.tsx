import { useViewportWidth } from "@/app/utils";
import SignIcon from "@/components/icons/SignIcon";
import { SinkingFinalizationSteps } from "@/context/SinkingContext";
import { SinkStatusDetails } from "../SinkingFinalization";
import SinkingStep from "./Step";

export default function SignSinking() {
  const isWide = useViewportWidth();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {SinkStatusDetails[SinkingFinalizationSteps.SIGN_TRANSACTION].message}
      </span>
      <div className="my-4">
        <SignIcon large={isWide} />
      </div>
    </SinkingStep>
  );
}
