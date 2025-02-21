import { useViewportWidth } from "@/app/utils";
import SignIcon from "@/components/icons/SignIcon";
import SinkingStep from "./Step";

export default function SignSinking() {
  const isWide = useViewportWidth();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="my-4">
        <SignIcon large={isWide} />
      </div>
    </SinkingStep>
  );
}
