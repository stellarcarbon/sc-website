import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingStep from "../rounding/steps/Step";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSEP10Context } from "@/context/SEP10Context";

export default function SuccessSEP10() {
  const { targetHref } = useSEP10Context();

  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(targetHref);
  }, [router, targetHref]);

  return (
    <RoundingStep title="Success">
      <div className="text-center">
        Authentication challenge completed succesfully.
      </div>
      <div className="my-8 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={onClick}>
          <div>Continue</div>
        </Button>
      </div>
    </RoundingStep>
  );
}
