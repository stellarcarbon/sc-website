import RoundingStep from "../rounding/steps/Step";
import { faFileShield, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";

export default function AwaitingSEP10({
  signChallenge,
}: {
  signChallenge: () => Promise<void>;
}) {
  return (
    <RoundingStep title="Authenticate">
      <div className="flex flex-col justify-start items-center gap-6 text-center">
        <div>
          Complete the SEP10 authentication challenge to verify your identity.
        </div>
        <div>This is done by signing it with your wallet.</div>
        <div className="my-8">
          <FontAwesomeIcon icon={faFileShield} className="text-[72px]" />
        </div>
        <Button onClick={signChallenge} className="text-base font-normal">
          <FontAwesomeIcon icon={faPen} />
          <div>Sign auth challenge</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
