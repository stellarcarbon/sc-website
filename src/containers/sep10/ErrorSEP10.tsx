import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalStep from "../../components/ModalStep";
import { faArrowLeft, faWarning } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSEP10Context } from "@/context/SEP10Context";

export default function ErrorSEP10() {
  const { error } = useSEP10Context();

  const router = useRouter();

  return (
    <ModalStep title="Something went wrong">
      <div className="flex flex-col items-center">
        <div className="text-center text-lg overflow-y-auto max-h-[200px]">
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
