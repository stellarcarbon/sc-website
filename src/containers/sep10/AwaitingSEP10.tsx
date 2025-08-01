import RoundingStep from "../rounding/steps/Step";
import { faFileShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";

export default function AwaitingSEP10({
  signChallenge,
}: {
  signChallenge: () => Promise<void>;
}) {
  return (
    <RoundingStep title="Verify your wallet">
      <div className="flex flex-col justify-start items-center gap-6 text-center">
        <div className="flex flex-col gap-4">
          <div>
            To continue, please sign a message to prove ownership of your
            wallet.
          </div>
          <div>
            This is not a payment or transaction, but a secure way to verify
            your identity.
          </div>
        </div>
        <Button onClick={signChallenge} className="text-base font-normal my-2">
          <FontAwesomeIcon icon={faFileShield} />
          <div>Sign message</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
