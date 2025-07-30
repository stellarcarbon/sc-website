import SignIcon from "@/components/icons/SignIcon";
import RoundingStep from "@/containers/rounding/steps/Step";

export default function SignSinking() {
  return (
    <RoundingStep title="Sign transaction">
      <span className="text-center">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="flex-1 flex items-center justify-center my-4">
        <SignIcon />
      </div>
    </RoundingStep>
  );
}
