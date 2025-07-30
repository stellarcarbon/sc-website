import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSinkingContext } from "@/context/SinkingContext";
import RoundingStep from "@/containers/rounding/steps/Step";

export default function ExpiredSinking() {
  const { sinkRequest } = useSinkingContext();
  const router = useRouter();

  const returnToForm = useCallback(() => {
    const params = new URLSearchParams();

    if (sinkRequest?.query.carbon_amount !== undefined) {
      params.set("amount", sinkRequest.query.carbon_amount.toString());
    }

    if (sinkRequest?.query.memo_value) {
      params.set("reason", sinkRequest.query.memo_value);
    }

    if (sinkRequest?.query.payment_asset) {
      params.set("asset", sinkRequest.query.payment_asset);
    }

    router.push(`/dashboard/sink/?${params}`);
  }, [router, sinkRequest]);

  return (
    <RoundingStep title="Expired">
      <div className="flex flex-col items-center">
        <div className="text-center">
          Your transaction expired. Please retry creating it. The transaction is
          only valid for 2 minutes.
        </div>
      </div>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="text-[64px] my-4 text-yellow-500"
      />
      <SinkingStepButtons>
        <Button onClick={returnToForm} className="mx-auto">
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Go back</div>
        </Button>
      </SinkingStepButtons>
    </RoundingStep>
  );
}
