import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useRoundingContext } from "@/context/RoundingContext";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalStep from "../../../components/ModalStep";
import { useAppContext } from "@/context/appContext";

export default function RequestRounding() {
  const { totalPending, walletConnection } = useAppContext();
  const { requestRoundDown } = useRoundingContext();

  if (!walletConnection?.recipient) return;

  return (
    <ModalStep title="Confirm certificate creation">
      <div className="text-base text-center">
        Please confirm the creation of a personalized certificate from your
        pending balance.
      </div>

      <div className="flex flex-col items-center gap-4 w-full text-xl my-4 mb-6">
        <div className="flex justify-between w-full">
          <div className="font-bold">Amount</div>
          <div>
            {Math.floor(totalPending)}
            <CARBONCurrencyIcon
              className="inline ml-1"
              height={24}
              width={24}
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="font-bold">E-mail</div>
          <div className="break-words whitespace-normal text-right max-w-[75%] overflow-hidden">
            {walletConnection.recipient.email}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="font-bold">Name</div>
          <div className="break-words whitespace-normal text-right max-w-[75%] overflow-hidden">
            {walletConnection.recipient.name}
          </div>
        </div>
      </div>

      <Button onClick={requestRoundDown} className="text-base font-normal">
        <FontAwesomeIcon icon={faFileLines} />
        <div>Request certificate</div>
      </Button>
    </ModalStep>
  );
}
