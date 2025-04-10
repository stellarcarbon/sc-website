import { useViewportWidth } from "@/utils";
import SignIcon from "@/components/icons/SignIcon";
import SinkingStep from "./Step";
import ModalHeader from "@/components/ModalHeader";
import SinkingStepButtons from "./Buttons";

export default function SignSinking() {
  const isWide = useViewportWidth();

  return (
    <SinkingStep title="Sign transaction">
      <span className="text-center text-lg font-semibold mt-4">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="flex-1 flex items-center justify-center my-16">
        <SignIcon large={isWide} />
      </div>
      <SinkingStepButtons></SinkingStepButtons>
    </SinkingStep>
  );
}
