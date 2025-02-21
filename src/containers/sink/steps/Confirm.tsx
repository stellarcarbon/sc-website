import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";

export default function ConfirmSinking() {
  const { sinkCarbonXdr, sinkRequest, signTransaction } = useSinkingContext();

  return (
    <SinkingStep>
      <span className="text-center md:text-lg">
        {
          "Your transaction is ready and approved by Stellarcarbon. Please confirm the transaction by signing it with your wallet."
        }
      </span>
      <div className="w-full flex flex-col gap-8 m-6 justify-center items-center bg-secondary border border-tertiary py-6 rounded lg:max-w-[75%]">
        <div className="flex flex-col w-full px-6 items-center gap-2 text-lg">
          <div className="flex justify-between w-full items-center gap-4">
            <span>Sinking</span>
            <div className="flex items-center gap-1">
              <span>{Number(sinkCarbonXdr?.carbon_amount).toFixed(3)}</span>
              <CARBONCurrencyIcon />
            </div>
          </div>
          <div className="flex justify-between w-full items-center gap-4">
            <span>Price in USDC</span>
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
          className="!py-2 w-[200px] font-semibold"
          onClick={signTransaction}
        >
          Sign with wallet
        </Button>
      </div>
    </SinkingStep>
  );
}
