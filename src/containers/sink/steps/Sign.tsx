import SignIcon from "@/components/icons/SignIcon";
import SinkingStep from "./Step";
import SinkingStepButtons from "./Buttons";

export default function SignSinking() {
  return (
    <SinkingStep title="Sign transaction">
      <span className="text-center text-lg font-semibold mt-6">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="flex-1 flex items-center justify-center my-20">
        <SignIcon />
      </div>
      <SinkingStepButtons></SinkingStepButtons>
    </SinkingStep>
  );
}
