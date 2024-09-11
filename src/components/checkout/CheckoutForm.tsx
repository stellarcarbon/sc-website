"use client";

import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { CheckoutFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { HTMLProps, Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AmountInput from "@/components/checkout/AmountInput";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import Divider from "../Divider";

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
    <form className="flex flex-col mt-8 gap-8">
      <div className="mx-4 md:mx-8">
        <span className="text-sm">
          Use this form to create a new CARBON sink transaction.
        </span>
      </div>
      <Divider />
      <div className="mx-4 md:mx-8 flex flex-col gap-12 bg-secondary min-w-[80%]">
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
      {/* <ParallaxDivider image={ParallaxBackgrounds.RAINFOREST} smallest /> */}
      <Divider />
      <div className="mb-2 mx-4 md:mx-8 flex flex-col gap-8 bg-secondary min-w-[80%]">
        <CurrencySelect register={register} />
      </div>
      <Divider />
      <div className="mb-2 mx-4 md:mx-8 flex flex-col gap-8 bg-secondary min-w-[80%]">
        <ReasonSelect watch={watch} setValue={setValue} />
      </div>

      <Divider />
      <div className="flex flex-col items-center gap-4 mx-5 md:mx-8 bg-secondary min-w-[80%]">
        <TransactionPreview
          tonnes={tonnes}
          currency={currency}
          quote={quote}
          handleSubmit={() => handleSubmit(onSubmit)()}
        />
      </div>
      <ParallaxDivider
        image={ParallaxBackgrounds.RAINFOREST}
        smallest
        yOffset={-380}
        roundedBottom
      />
    </form>
  );
}
