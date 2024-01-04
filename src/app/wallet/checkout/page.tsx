"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TonnesRange from "./components/TonnesRange";
import Button from "../components/Button";
import CurrencySelect from "./components/CurrencySelect";
import ReasonSelect from "./components/ReasonSelect";
import { CheckoutFormData } from "./types";
import {
  BuildSinkCarbonXdrSinkCarbonXdrPostRequest,
  SinkingResponse,
} from "@/app/carbon_api";
import { useEffect, useState } from "react";
import carbonApi from "@/app/carbonApi";
import { useAppContext } from "@/app/context";
import FormError from "../components/FormError";

export default function Checkout() {
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();
  const { walletConnection } = useAppContext();

  useEffect(() => {
    setValue("tonnes", 60);
  }, []);

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  const [formErr, setFormErr] = useState<string>();
  const [signResponse, setSignResponse] = useState<SinkingResponse>();

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

  // useEffect(() => {
  //   if (signResponse.)
  // }, [signResponse])

  return (
    <main className="flex flex-col items-center p-2 max-w-[1000px] m-auto h-[calc(100vh-80px)]">
      <form className="flex flex-col gap-2 w-full flex-grow justify-around">
        <h1 className="text-xl font-bold text-center mt-4">Checkout</h1>
        <TonnesRange register={register} watch={watch} />
        <CurrencySelect register={register} />
        <ReasonSelect watch={watch} setValue={setValue} />
        <FormError className="min-h-20">{formErr}</FormError>
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mb-16 w-[300px] mx-auto"
          disabled={false}
        >
          Sign & Submit
        </Button>
      </form>
    </main>
  );
}
