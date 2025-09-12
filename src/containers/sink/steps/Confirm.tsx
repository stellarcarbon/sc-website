import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ModalStep from "@/components/ModalStep";

export default function ConfirmSinking() {
  const { sinkResponse, sinkRequest, signTransaction } = useSinkingContext();

  const router = useRouter();

  if (sinkResponse === undefined || sinkRequest === undefined) {
    return null;
  }

  return (
    <ModalStep title="Confirm transaction">
      <div className="text-center">
        Your transaction is signed by Stellarcarbon and ready to go!
      </div>

      <div className="flex w-full">
        <div className="flex flex-col justify-center gap-8 bg-primary mx-4 md:mx-8 my-4 p-4 rounded border border-tertiary w-full">
          <div className="grid grid-cols-5 w-full">
            <ConfirmKey>Amount</ConfirmKey>
            <ConfirmValue>
              <div>{Number(sinkResponse?.carbon_amount).toFixed(3)}</div>
              <CARBONCurrencyIcon width={22} height={22} />
            </ConfirmValue>
          </div>
          <div className="grid grid-cols-5 w-full">
            <ConfirmKey>Price</ConfirmKey>
            <ConfirmValue>
              <div>{Number(sinkResponse?.payment_max_amount).toFixed(2)}</div>
              <div>{sinkResponse?.payment_asset}</div>
            </ConfirmValue>

            {sinkResponse?.payment_asset !== "USDC" && (
              <>
                <div className="col-span-2 text-xs md:text-sm">
                  USDC equivalent
                </div>
                <div className="col-span-3 flex items-center justify-end text-xs md:text-sm">
                  <div>$</div>
                  <div>{Number(sinkResponse?.usdc_amount).toFixed(2)}</div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between items-center">
            <ConfirmKey>Reason</ConfirmKey>
            {sinkRequest.query.memo_value ? (
              <div className="break-all text-accentSecondary text-center text-xl">
                {sinkRequest.query.memo_value}
              </div>
            ) : (
              <div className="text-sm md:text-base text-tertiary">
                No reason specified
              </div>
            )}
          </div>
        </div>
      </div>

      <span className="text-[12px] text-center mx-4">
        By signing this purchase agreement you waive your right of withdrawal.
        The CarbonSINK is immediately and fully delivered to your Stellar account.
      </span>

      <SinkingStepButtons>
        <div className="flex justify-between mx-4 md:mx-8 w-full">
          <Button onClick={() => router.push("/dashboard/sink")}>
            <FontAwesomeIcon icon={faXmark} className="text-lg" />
            <div>Cancel</div>
          </Button>
          <Button onClick={signTransaction}>
            <FontAwesomeIcon icon={faPen} />
            <div>Sign transaction</div>
          </Button>
        </div>
      </SinkingStepButtons>
    </ModalStep>
  );
}

function ConfirmKey({ children }: PropsWithChildren) {
  return (
    <div className="col-span-2 text-xl font-bold inline-flex items-center">
      {children}
    </div>
  );
}

function ConfirmValue({ children }: PropsWithChildren) {
  return (
    <div className="col-span-3 inline-flex justify-end gap-1 text-xl items-center">
      {children}
    </div>
  );
}
