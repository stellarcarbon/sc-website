"use client";

import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { SinkingFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { Suspense, useCallback, useMemo, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import AmountInput from "@/components/checkout/AmountInput";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/dashboard/DashboardTitle";
import FormError from "@/components/FormError";

export default function SinkingForm() {
  const { walletConnection, setSinkRequest } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<SinkingFormData>();

  const router = useRouter();

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const reasonErrorLabel: string | undefined = useMemo(() => {
    return Object.entries(errors ?? {})
      .find(([field]) => field === "reason")?.[1]
      ?.message?.toString();
  }, [errors]);

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

  const onSubmit: SubmitHandler<SinkingFormData> = (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => {
    let payload: SinkCarbonXdrPostRequest = {
      funder: walletConnection?.stellarPubKey!,
      carbonAmount: tonnes,
      paymentAsset: currency,
      memoValue: reason,
    };

    initializeSubmitSinkingTransaction(payload, quote);
  };

  const onError = useCallback((errors: FieldErrors) => {
    setErrors(errors);
  }, []);

  return (
    <div className="flex flex-col mt-8 md:mt-12">
      <DashboardTitle>Sink CARBON</DashboardTitle>
      <form className="flex flex-col gap-12 md:gap-20 mt-6">
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
        <div className="mb-2 mx-4 md:mx-8 flex flex-col min-w-[80%]">
          <ReasonSelect register={register} watch={watch} setValue={setValue} />
          {reasonErrorLabel && <FormError>{reasonErrorLabel}</FormError>}
        </div>

        <TransactionPreview
          tonnes={tonnes}
          currency={currency}
          quote={quote}
          handleSubmit={() => handleSubmit(onSubmit, onError)()}
        />
        <ParallaxDivider
          image={ParallaxBackgrounds.RAINFOREST}
          smallest
          yOffset={-380}
          roundedBottom
        />
      </form>
    </div>
  );
}
