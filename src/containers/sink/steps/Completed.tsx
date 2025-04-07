import SuccessIcon from "@/components/icons/SuccessIcon";
import SinkingStep from "./Step";
import ModalHeader from "@/components/ModalHeader";

export default function CompletedSinking() {
  return (
    <SinkingStep>
      <ModalHeader>Transaction succesful</ModalHeader>
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
