"use client";

import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { SinkingFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { Suspense, useCallback, useMemo, useState } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import AmountInput from "@/components/checkout/AmountInput";
import TransactionPreview from "@/components/checkout/TransactionPreview";
import FormError from "../../components/FormError";
import { CheckoutSteps, useSinkingContext } from "@/context/SinkingContext";

import appConfig from "@/config";
import { ReasonSelectContextProvider } from "@/components/checkout/ReasonSelectContext";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

export default function SinkingForm() {
  const { setSinkRequest, setStep } = useSinkingContext();
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<SinkingFormData>();

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const memo = watch("memo");

  const reasonErrorLabel: string | undefined = useMemo(() => {
    return Object.entries(errors ?? {})
      .find(([field]) => field === "memo")?.[1]
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
        memoValue: memo,
      };

      if (!walletConnection?.isAnonymous) {
        request.email = walletConnection?.personalDetails?.useremail;
      }

      setSinkRequest(request);
    },
    [walletConnection, tonnes, currency, memo, setSinkRequest, setStep]
  );

  return (
    <div className="flex flex-col">
      {appConfig.demo && (
        <div className="self-center text-2xl md:text-2xl font-semibold mb-6">
          Sink CARBON
        </div>
      )}
      <form className="flex flex-col mb-12">
        {walletConnection && (
          <div className="mx-3 md:mx-8 my-4">
            <div className="text-center text-lg font-semibold">
              Support the Stellarcarbon initiative by sinking CARBON!
            </div>
            <div className="my-8 text-base">
              {" "}
              Use this form to specify how much{" "}
              <CARBONCurrencyIcon className="inline" /> to sink. Sinking 1{" "}
              <CARBONCurrencyIcon className="inline" /> guarantees 1 Verified
              Carbon Unit (VCU) will be retired.
            </div>
          </div>
        )}

        <ReasonSelectContextProvider>
          <Suspense>
            <ReasonSelect
              register={register}
              watch={watch}
              setValue={setValue}
              error={reasonErrorLabel}
            />
          </Suspense>
        </ReasonSelectContextProvider>

        <Suspense>
          <AmountInput
            register={register}
            watch={watch}
            setValue={setValue}
            quote={quote}
            setQuote={setQuote}
          />
        </Suspense>

        <Suspense>
          <CurrencySelect register={register} setValue={setValue} />
        </Suspense>

        <div className="mt-8 mx-3 flex flex-col items-center">
          <Suspense>
            <TransactionPreview
              tonnes={tonnes}
              currency={currency}
              quote={quote}
              memo={memo}
              handleSubmit={() => handleSubmit(onSubmit, onError)()}
            />
          </Suspense>
        </div>
      </form>
    </div>
  );
}
