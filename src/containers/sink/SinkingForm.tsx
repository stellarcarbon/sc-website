"use client";

import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { useMemo } from "react";
import AmountInput from "@/components/checkout/AmountInput";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import appConfig from "@/config";
import { ReasonSelectContextProvider } from "@/components/checkout/ReasonSelectContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function SinkingForm() {
  const { errors, setValue } = useSinkFormContext();

  // const searchParams = useSearchParams();
  // const reason = searchParams.get("reason");
  // const amount = searchParams.get("amount");
  // const currency = searchParams.get("asset");

  // useEffect(() => {
  //   // searchparam stuff
  //   if (reason !== null) setValue("memo", reason);

  //   const num = Number(amount);
  //   if (!Number.isNaN(num) && Number.isFinite(num) && num > 0) {
  //     setValue("tonnes", num);
  //   }

  //   if (currency?.toLowerCase() === PaymentAsset.ANY.toLowerCase())
  //     setValue("currency", PaymentAsset.ANY);
  //   if (currency?.toLowerCase() === PaymentAsset.USDC.toLowerCase())
  //     setValue("currency", PaymentAsset.USDC);
  //   if (currency?.toLowerCase() === PaymentAsset.XLM.toLowerCase())
  //     setValue("currency", PaymentAsset.XLM);
  // }, [reason, amount, currency, setValue]);

  const reasonErrorLabel: string | undefined = useMemo(() => {
    return Object.entries(errors ?? {})
      .find(([field]) => field === "memo")?.[1]
      ?.message?.toString();
  }, [errors]);

  return (
    <div className="flex flex-col">
      {appConfig.demo && (
        <div className="self-center text-2xl md:text-2xl font-semibold mb-6">
          Sink CARBON
        </div>
      )}
      <form className="flex flex-col mb-12">
        <div className="mx-3 md:mx-8 my-4">
          <div className="text-center text-lg font-semibold">
            Support the Stellarcarbon initiative by sinking CARBON!
          </div>
          <div className="my-8 text-base">
            Use this form to specify how much{" "}
            <CARBONCurrencyIcon className="inline" /> to sink. You transaction
            will be stored on the Stellar network.
          </div>
        </div>

        <ReasonSelectContextProvider>
          <ReasonSelect error={reasonErrorLabel} />
        </ReasonSelectContextProvider>

        <AmountInput />

        <CurrencySelect />

        <div className="mt-8 mx-3 flex flex-col items-center">
          <TransactionPreview />
        </div>
      </form>
    </div>
  );
}
