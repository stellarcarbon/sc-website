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
      <div className="flex flex-col text-center gap-4 md:gap-4">
        <div className="text-lg">
          Your transaction is signed by Stellarcarbon and ready to go!
        </div>
      </div>

      <div className="flex-1 w-full md:w-[80%] flex justify-center">
        <div className="mt-8 flex flex-col gap-6 rounded-b bg-darkers rounded  border-tertiary">
          <div className="grid grid-cols-4 w-full text-xl mt-3">
            <div className="font-bold">Amount</div>
            <div className="col-span-3 flex items-center justify-end gap-1 text-2xl">
              <div>{Number(sinkResponse?.carbon_amount).toFixed(3)}</div>
              <CARBONCurrencyIcon width={22} height={22} />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-4 w-full text-xl">
              <div className="font-bold">Price</div>
              <div className="col-span-3 flex items-center justify-end gap-1 text-2xl">
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

          <div className="text-xl flex flex-col">
            <div className="font-bold">Sinking reason</div>
            {sinkRequest.memoValue ? (
              <div className="break-all text-2xl text-accentSecondary text-center my-4">
                {sinkRequest.memoValue}
              </div>
            ) : (
              <div className="text-sm">No reason specified</div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="w-full flex flex-col gap-4 justify-center items-center bg-secondary border border-tertiary p-3 rounded lg:max-w-[75%]">
        <div className="flex flex-col w-full items-center gap-4 text-lg">
          <div className="flex justify-between w-full items-center gap-4">
            <span>Sinking</span>
            <div className="flex items-center gap-1">
              <span>{Number(sinkResponse?.carbon_amount).toFixed(3)}</span>
              <CARBONCurrencyIcon />
            </div>
          </div>
          <div className="flex justify-between w-full items-center gap-4">
            <span>Price</span>
            <div className="flex gap-[2px]">
              <span>$</span>
              <span>{Number(sinkResponse?.usdc_amount).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div>Currency used</div>
            <div>{`${sinkResponse?.payment_max_amount} ${sinkResponse?.payment_asset}`}</div>
          </div>

          <div className="flex justify-between items-center w-full gap-4">
            <span>Reason</span>
            <span>{sinkRequest?.memoValue ?? "No reason added"}</span>
          </div>
        </div>
        <Button
          className="!py-2 gap-2 !bg-tertiary border border-accentSecondary w-full !text-white"
          onClick={signTransaction}
        >
          <FontAwesomeIcon icon={faPen} />
          Sign transaction
        </Button>
      </div> */}
    </SinkingStep>
  );
}
