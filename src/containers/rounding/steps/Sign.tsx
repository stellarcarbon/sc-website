import { Blocks } from "react-loader-spinner";
import RoundingStep from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignIcon from "@/components/icons/SignIcon";
import { useViewportWidth } from "@/utils";

export default function SignRounding() {
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
