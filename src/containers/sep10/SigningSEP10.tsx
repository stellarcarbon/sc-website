import { useViewportWidth } from "@/utils";
import RoundingStep from "../rounding/steps/Step";
import SignIcon from "@/components/icons/SignIcon";

export default function SigningSEP10() {
  const isWide = useViewportWidth();
  return (
    <RoundingStep title="Signing">
      <div className="text-lg">Signing challenge...</div>
      <div className="my-4 flex justify-center">
        <SignIcon large={isWide} />
      </div>
    </RoundingStep>
  );
}
