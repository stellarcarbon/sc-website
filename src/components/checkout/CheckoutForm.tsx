"use client";

import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { CheckoutFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { HTMLProps, Suspense, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import AmountInput from "@/components/checkout/AmountInput";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import ParallaxDivider, { ParallaxBackgrounds } from "../ParallaxDivider";

interface CheckoutFormProps extends HTMLProps<HTMLFormElement> {
  submitSinkingTransaction: (
    payload: SinkCarbonXdrPostRequest,
    quote: number
  ) => void;
}

export default function CheckoutForm({
  submitSinkingTransaction,
}: CheckoutFormProps) {
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const [quote, setQuote] = useState<number>(0);

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    let payload: SinkCarbonXdrPostRequest = {
      funder: walletConnection?.stellarPubKey!,
      carbonAmount: tonnes,
      paymentAsset: currency,
      memoValue: reason,
    };

    submitSinkingTransaction(payload, quote);
  };

  return (
    <form className="">
      <div className="flex flex-col gap-12 mx-5 md:mx-8 mt-10 bg-secondary min-w-[80%]">
        <Suspense>
          <AmountInput
            register={register}
            watch={watch}
            setValue={setValue}
            quote={quote}
            setQuote={setQuote}
          />
        </Suspense>
        <CurrencySelect register={register} />
        <ReasonSelect watch={watch} setValue={setValue} />
      </div>
      <ParallaxDivider image={ParallaxBackgrounds.FOREST} smaller />
      <div className="flex flex-col gap-12 mx-5 md:mx-8 mt-10 bg-secondary min-w-[80%]">
        <TransactionPreview
          tonnes={tonnes}
          currency={currency}
          quote={quote}
          onClick={() => handleSubmit(onSubmit)()}
        />
      </div>
    </form>
  );
}
