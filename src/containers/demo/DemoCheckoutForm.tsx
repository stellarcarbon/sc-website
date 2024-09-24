"use client";

import { CheckoutFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import AmountInput from "@/components/checkout/AmountInput";
import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import DashboardTitle from "@/components/dashboard/DashboardTitle";
import WalletConnectionInfo from "@/components/dashboard/WalletConnectionInfo";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DemoWalletConnectionInfo from "./DemoWalletConnectionInfo";

export default function DemoCheckoutForm() {
  const { walletConnection, setSinkRequest } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const router = useRouter();

  const [quote, setQuote] = useState<number>(0);

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  const initializeSubmitSinkingTransaction = useCallback(
    async (sinkRequest: SinkCarbonXdrPostRequest, quote: number) => {
      if (!walletConnection?.isAnonymous) {
        sinkRequest.email = walletConnection?.personalDetails?.useremail;
      }

      setSinkRequest(sinkRequest);
      router.push("/demo/sink/checkout");
    },
    [walletConnection, setSinkRequest, router]
  );

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    let payload: SinkCarbonXdrPostRequest = {
      funder: walletConnection?.stellarPubKey!,
      carbonAmount: tonnes,
      paymentAsset: currency,
      memoValue: reason,
    };

    initializeSubmitSinkingTransaction(payload, quote);
  };

  return (
    <div className="flex flex-col">
      <DashboardTitle>Sink CARBON</DashboardTitle>
      <form className="flex flex-col gap-12 md:gap-20">
        <div className="mx-4 md:mx-8 flex flex-col gap-12 min-w-[80%]">
          <Suspense>
            <AmountInput
              register={register}
              watch={watch}
              setValue={setValue}
              quote={quote}
              setQuote={setQuote}
            />
          </Suspense>
        </div>

        <div className="mb-2 mx-4 md:mx-8 flex flex-col gap-8 min-w-[80%]">
          <CurrencySelect register={register} />
        </div>

        <div className="mb-2 mx-4 md:mx-8 flex flex-col gap-8 min-w-[80%]">
          <ReasonSelect watch={watch} setValue={setValue} />
        </div>

        <div className="flex flex-col items-center gap-4 mx-5 md:mx-8 bg-secondary min-w-[80%]">
          <TransactionPreview
            tonnes={tonnes}
            currency={currency}
            quote={quote}
            handleSubmit={() => handleSubmit(onSubmit)()}
          />
        </div>
      </form>
    </div>
  );
}
