import Button from "@/components/Button";
import SinkingStep from "@/containers/sink/steps/Step";
import { useRoundingContext } from "@/context/RoundingContext";
import { faFileShield, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundingStep from "./Step";

export default function AwaitRounding() {
  const { verifyIdentity } = useRoundingContext();

  return (
    <RoundingStep title="Authenticate">
      <div className="flex flex-col justify-start items-center gap-6 text-center">
        <div>
          To continue rouding down your pending balance, we need to verify your
          identity.
        </div>
        <div>
          This is done by signing an authentication challenge with your wallet.
        </div>
        <div className="my-8">
          <FontAwesomeIcon icon={faFileShield} className="text-[72px]" />
        </div>
        <Button onClick={verifyIdentity} className="text-base font-normal">
          <FontAwesomeIcon icon={faPen} />
          <div>Sign auth challenge</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
