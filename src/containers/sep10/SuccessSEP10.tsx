import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingStep from "../rounding/steps/Step";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/context/appContext";
import { useSCAccount } from "@/hooks/useSCAccount";

export default function SuccessSEP10() {
  const { sep10Target } = useAppContext();
  const { isStale } = useSCAccount();

  const router = useRouter();

  const onClick = useCallback(() => {
    let targetHref = "/dashboard";

    if (sep10Target === "register") {
      if (isStale) {
        targetHref = "/connect/update";
      } else {
        targetHref = "/connect/account-registration";
      }
    } else if (sep10Target === "rounding") {
      targetHref = "/dashboard/transactions";
    }

    router.push(targetHref);
  }, [router, sep10Target, isStale]);

  return (
    <RoundingStep title="Success">
      <div className="text-center">
        All set. You proved this wallet belongs to you.
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
