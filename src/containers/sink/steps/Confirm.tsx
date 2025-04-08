import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkingContext } from "@/context/SinkingContext";
import SinkingStep from "./Step";
import ModalHeader from "@/components/ModalHeader";
import SinkingStepButtons from "./Buttons";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPen } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ConfirmSinking() {
  const { sinkResponse, sinkRequest, signTransaction } = useSinkingContext();

  const router = useRouter();

  if (sinkResponse === undefined || sinkRequest === undefined) {
    return null;
  }

  return (
    <SinkingStep>
      <ModalHeader>Transaction confirmation</ModalHeader>

      <div className="text-center">
        Your transaction is signed by Stellarcarbon and ready to go!
      </div>

      <div className="w-full flex flex-col justify-center gap-10 bg-darker my-6 mb-8 md:my-12 p-4 rounded border border-tertiary">
        <div className="grid grid-cols-5 w-full">
          <ConfirmKey>Amount</ConfirmKey>
          <ConfirmValue>
            <div>{Number(sinkResponse?.carbon_amount).toFixed(3)}</div>
            <CARBONCurrencyIcon width={22} height={22} />
          </ConfirmValue>

          <div className="mt-10 col-span-5"></div>

          <ConfirmKey>Price</ConfirmKey>
          <ConfirmValue>
            <div>{Number(sinkResponse?.payment_max_amount).toFixed(2)}</div>
            <div>{sinkResponse?.payment_asset}</div>
          </ConfirmValue>

          {sinkResponse?.payment_asset !== "USDC" && (
            <>
              <div className="col-span-2 text-xs">USDC equivalent</div>
              <div className="col-span-3 flex items-center justify-end text-xs">
                <div>$</div>
                <div>{Number(sinkResponse?.usdc_amount).toFixed(2)}</div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-xl md:text-2xl">Reason</div>
          {sinkRequest.memoValue ? (
            <div className="break-all text-accentSecondary text-center mt-3 text-2xl md:text-3xl">
              {sinkRequest.memoValue}
            </div>
          ) : (
            <div className="text-sm">No reason specified</div>
          )}
        </div>
      </div>

      <SinkingStepButtons>
        <Button onClick={signTransaction}>
          <FontAwesomeIcon icon={faPen} />
          <div>Sign transaction</div>
        </Button>
        <Button
          onClick={() => router.push("/dashboard/sink")}
          className="!bg-red-500"
        >
          <FontAwesomeIcon icon={faCancel} />
          <div>Cancel</div>
        </Button>
      </SinkingStepButtons>
    </SinkingStep>
  );
}

function ConfirmKey({ children }: PropsWithChildren) {
  return (
    <div className="col-span-2 text-xl md:text-2xl font-bold inline-flex items-center">
      {children}
    </div>
  );
}

function ConfirmValue({ children }: PropsWithChildren) {
  return (
    <div className="col-span-3 inline-flex justify-end gap-1 text-2xl md:text-3xl items-center">
      {children}
    </div>
  );
}
