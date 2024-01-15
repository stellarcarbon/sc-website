import carbonApi from "@/app/carbonApi";
import {
  BuildSinkCarbonXdrSinkCarbonXdrPostRequest,
  SinkingResponse,
} from "@/app/carbon_api";
import CurrencySelect from "@/app/checkout/components/CurrencySelect";
import ReasonSelect from "@/app/checkout/components/ReasonSelect";
import TonnesRange from "@/app/checkout/components/TonnesRange";
import { CheckoutFormData } from "@/app/checkout/types";
import Button from "@/app/components/Button";
import FormError from "@/app/components/FormError";
import { useAppContext } from "@/app/context/appContext";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CheckoutForm() {
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const [formErr, setFormErr] = useState<string>();
  const [signResponse, setSignResponse] = useState<SinkingResponse>();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    let payload: BuildSinkCarbonXdrSinkCarbonXdrPostRequest = {
      funder: walletConnection?.stellarPubKey!,
      carbonAmount: tonnes,
      paymentAsset: currency,
      memoValue: reason,
    };
    if (!walletConnection?.isAnonymous) {
      payload.email = walletConnection?.personalDetails?.useremail;
    }
    carbonApi
      .buildSinkCarbonXdrSinkCarbonXdrPost(payload)
      .then((response) => {
        setSignResponse(response);
        console.log("sink carbon xdr post succesful\n", response.toString());
      })
      .catch((error) => {
        setFormErr(error.toString());
        console.log("sink carbon xdr post error\n", error);
      });
  };

  return (
    <form className="flex flex-col min-w-[80%]">
      <TonnesRange register={register} watch={watch} />
      <CurrencySelect register={register} />
      <ReasonSelect watch={watch} setValue={setValue} />
      <FormError className="py-0">{formErr}</FormError>
      <Button
        onClick={() => handleSubmit(onSubmit)()}
        className="!py-2 !w-[60%] text-sm mb-4 self-center"
        disabled={false}
      >
        Sign & Submit
      </Button>
    </form>
  );
}
