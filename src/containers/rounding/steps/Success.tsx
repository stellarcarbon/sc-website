import Button from "@/components/Button";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import ModalStep from "../../../components/ModalStep";
import { useCallback } from "react";

export default function RoundingSuccess() {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/dashboard/transactions");
  }, [router]);

  return (
    <ModalStep title="Success">
      <div className="text-center">
        Your certificate request was received in good order and will be
        processed shortly.
      </div>
      <div className="my-8 flex justify-center">
        <SuccessIcon />
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={onClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <div>Return to dashboard</div>
        </Button>
      </div>
    </ModalStep>
  );
}
