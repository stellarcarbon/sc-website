import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useRoundingContext } from "@/context/RoundingContext";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundingStep from "./Step";
import { useAppContext } from "@/context/appContext";

export default function RequestRounding() {
  const { totalPending } = useAppContext();
  const { requestCertificate } = useRoundingContext();

  return (
    <RoundingStep title="Challenge verified">
      <div className="">Auth challenge signed and valid.</div>

      <div className="text-base font-bold text-center">
        Please confirm the creation of your personalized certificate.
      </div>

      <div className="mt-2 mb-6 flex justify-center items-center gap-8">
        <div className="font-bold text-2xl">Sink amount</div>
        {/* <div className="text-center">Confirm the request</div> */}
        <div className="text-3xl flex items-center gap-1 justify-center">
          {Math.floor(totalPending)}
          <CARBONCurrencyIcon className="inline ml-1" height={24} width={24} />
        </div>
      </div>
      <Button onClick={requestCertificate} className="text-base font-normal">
        <FontAwesomeIcon icon={faFileLines} />
        <div>Request certificate</div>
      </Button>
    </RoundingStep>
  );
}
