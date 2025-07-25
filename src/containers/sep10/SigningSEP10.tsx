import { useViewportWidth } from "@/utils";
import RoundingStep from "../rounding/steps/Step";
import SignIcon from "@/components/icons/SignIcon";

export default function SigningSEP10() {
  const isWide = useViewportWidth();
  return (
    <RoundingStep title="Signing">
      <div>Signing challenge...</div>
      <div className="flex-1 flex items-center justify-center my-16">
        <SignIcon large={isWide} />
      </div>
    </RoundingStep>
  );
}
