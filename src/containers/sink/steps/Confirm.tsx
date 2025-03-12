import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSign } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmSinking() {
  const { sinkCarbonXdr, sinkRequest, signTransaction } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg mb-2">
        {
          "Your transaction is ready and approved by Stellarcarbon. Please confirm the transaction by signing it with your wallet."
        }
      </span>
      <div className="w-full flex flex-col gap-4 justify-center items-center bg-secondary border border-tertiary p-3 rounded lg:max-w-[75%]">
        <div className="flex flex-col w-full items-center gap-3 text-base">
          <div className="flex justify-between w-full items-center gap-4">
            <span>Sinking</span>
            <div className="flex items-center gap-1">
              <span>{Number(sinkCarbonXdr?.carbon_amount).toFixed(3)}</span>
              <CARBONCurrencyIcon />
            </div>
          </div>
          <div className="flex justify-between w-full items-center gap-4">
            <span>Price</span>
            <div className="flex gap-[2px]">
              <span>$</span>
              <span>{Number(sinkCarbonXdr?.usdc_amount).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-4">
            <span>Asset</span> <span>{sinkRequest?.paymentAsset}</span>
          </div>
          <div className="flex justify-between items-center w-full gap-4">
            <span>Memo</span>
            <span>{sinkRequest?.memoValue ?? "-"}</span>
          </div>
        </div>
        <Button
          className="!py-2 gap-2 !bg-tertiary border border-accentSecondary w-full !text-white"
          onClick={signTransaction}
        >
          <FontAwesomeIcon icon={faPen} />
          Sign transaction
        </Button>
      </div>
    </SinkingStep>
  );
}
