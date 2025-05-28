"use client";

import CurrencySelect from "@/containers/sink/form/CurrencySelect";
import ReasonSelect from "@/containers/sink/form/ReasonSelect";
import { useMemo } from "react";
import AmountInput from "@/containers/sink/form/AmountInput";
import TransactionPreview from "@/containers/sink/form/TransactionPreview";
import appConfig from "@/config";
import { ReasonSelectContextProvider } from "@/containers/sink/form/ReasonSelectContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import { useSinkFormContext } from "@/context/SinkFormContext";

export default function SinkingForm() {
  const { errors } = useSinkFormContext();

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
