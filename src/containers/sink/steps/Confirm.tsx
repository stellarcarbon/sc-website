import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";
import { useMemo } from "react";

export default function ConfirmSinking() {
  const { sinkResponse, sinkRequest, signTransaction } = useSinkingContext();

  const price = useMemo(() => {}, []);

  if (sinkResponse === undefined || sinkRequest === undefined) {
    return null;
  }

  return (
    <SinkingStep>
      <div className="flex flex-col gap-4 md:gap-4">
        <div className="text-lg">
          Your transaction is signed by Stellarcarbon and ready to go!
        </div>
      </div>

      <div className="w-full flex justify-center bg-darker my-12 p-6 rounded border border-tertiary">
        <div className="flex flex-col gap-6 rounded-b bg-darkers rounded  border-tertiary w-full">
          <div className="grid grid-cols-4 w-full">
            <div className="font-bold text-xl md:text-2xl">Amount</div>
            <div className="col-span-3 flex items-center justify-end gap-1 text-2xl md:text-3xl">
              <div>{Number(sinkResponse?.carbon_amount).toFixed(3)}</div>
              <CARBONCurrencyIcon width={22} height={22} />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-4 w-full">
              <div className="font-bold text-xl md:text-2xl">Price</div>
              <div className="col-span-3 flex items-center justify-end gap-1 text-2xl md:text-3xl">
                <div>{Number(sinkResponse?.payment_max_amount).toFixed(2)}</div>
                <div>{sinkResponse?.payment_asset}</div>
              </div>
            </div>

            {sinkResponse?.payment_asset !== "USDC" && (
              <div className="grid grid-cols-4 w-full text-xs">
                <div className="col-span-2">USDC equivalent</div>
                <div className="col-span-2 flex items-center justify-end gap-0">
                  <div>$</div>
                  <div>{Number(sinkResponse?.usdc_amount).toFixed(2)}</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="font-bold text-xl md:text-2xl">Sinking reason</div>
            {sinkRequest.memoValue ? (
              <div className="break-all text-accentSecondary text-center my-4 text-2xl md:text-3xl">
                {sinkRequest.memoValue}
              </div>
            ) : (
              <div className="text-sm">No reason specified</div>
            )}
          </div>
        </div>
      </div>
    </SinkingStep>
  );
}
