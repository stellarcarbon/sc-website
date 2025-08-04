import SignIcon from "@/components/icons/SignIcon";
import ModalStep from "@/components/ModalStep";

export default function SignSinking() {
  return (
    <ModalStep title="Sign transaction">
      <span className="text-center">
        {"Sign the transaction using your wallet in the pop-up."}
      </span>
      <div className="flex-1 flex items-center justify-center my-4">
        <SignIcon />
      </div>
    </ModalStep>
  );
}
