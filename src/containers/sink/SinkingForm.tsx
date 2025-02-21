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
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import FormError from "../../components/FormError";
import { CheckoutSteps, useSinkingContext } from "@/context/SinkingContext";
import { useSearchParams } from "next/navigation";

export default function SinkingForm() {
  const { setSinkRequest, setStep } = useSinkingContext();
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<SinkingFormData>();

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  const searchParams = useSearchParams();
  console.log(searchParams);

  const reasonErrorLabel: string | undefined = useMemo(() => {
    return Object.entries(errors ?? {})
      .find(([field]) => field === "reason")?.[1]
      ?.message?.toString();
  }, [errors]);

  const onError = useCallback((errors: FieldErrors) => {
    setErrors(errors);
  }, []);

  const onSubmit: SubmitHandler<SinkingFormData> = useCallback(
    (_) => {
      setStep(CheckoutSteps.CREATING);

      let request: SinkCarbonXdrPostRequest = {
        funder: walletConnection?.stellarPubKey!,
        carbonAmount: tonnes,
        paymentAsset: currency,
        memoValue: reason,
      };

      if (!walletConnection?.isAnonymous) {
        request.email = walletConnection?.personalDetails?.useremail;
      }

      setSinkRequest(request);
    },
    [walletConnection, tonnes, currency, reason, setSinkRequest, setStep]
  );

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
