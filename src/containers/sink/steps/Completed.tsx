import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "./Step";

export default function CompletedSinking() {
  return (
    <SinkingStep>
      <div className="text-3xl text-center">Transaction OK</div>
      <div className="text-center mt-4">
        Your transaction was succesfully committed to the Stellar blockchain.
      </div>

      <div className="text-center mt-4">
        Review the transaction on your dashboard!
      </div>

      <div className="flex-1 flex items-center justify-center my-16">
        <SuccessIcon />
      </div>
    </SinkingStep>
  );
}
