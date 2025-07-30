import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingStep from "../rounding/steps/Step";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSEP10Context } from "@/context/SEP10Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

export default function SuccessSEP10() {
  const { targetHref } = useSEP10Context();

  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(targetHref);
  }, [router, targetHref]);

  return (
    <RoundingStep title="Success">
      <div className="text-center">
        All set. We know this wallet belongs to you.
      </div>
      <div className="my-1 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="my-2 flex items-center justify-center">
        <Button onClick={onClick}>
          <FontAwesomeIcon icon={faForward} />
          <div>Continue</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
