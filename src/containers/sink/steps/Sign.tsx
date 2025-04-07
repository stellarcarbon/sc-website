import { useViewportWidth } from "@/utils";
import SignIcon from "@/components/icons/SignIcon";
import SinkingStep from "./Step";

export default function SignSinking() {
  const isWide = useViewportWidth();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg mt-4">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="flex-1 flex items-center justify-center my-16">
        <SignIcon large={isWide} />
      </div>
    </SinkingStep>
  );
}
