import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingStep from "../rounding/steps/Step";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function SuccessSEP10({ targetHref }: { targetHref: string }) {
  const router = useRouter();

  return (
    <RoundingStep title="Success">
      <div className="text-center">
        Authentication challenge completed succesfully.
      </div>
      <div className="my-8 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => router.push(targetHref)}>
          <div>Continue</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
