import Button from "@/components/Button";
import ModalStep from "../../../components/ModalStep";
import { useRouter } from "next/navigation";
import { useRoundingContext } from "@/context/RoundingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ErrorRounding() {
  const { error } = useRoundingContext();

  const router = useRouter();

  return (
    <ModalStep title="Something went wrong">
      <div className="flex flex-col items-center">
        <div className="text-center text-lg font-semibold overflow-y-auto max-h-[200px]">
          {error ?? "Please try again."}
        </div>
        <div className="flex-1 flex justify-center items-center my-12">
          <FontAwesomeIcon
            icon={faWarning}
            className="text-[96px] text-red-600"
          />
        </div>
      </div>

      <Button
        onClick={() => router.push("/dashboard/transactions")}
        className="mx-auto text-base font-normal"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <div>Back to dashboard</div>
      </Button>
    </ModalStep>
  );
}
