"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TonnesRange from "./components/TonnesRange";
import Button from "../components/Button";
import CurrencySelect from "./components/CurrencySelect";
import ReasonSelect from "./components/ReasonSelect";
import { CheckoutFormData } from "./types";
import { CARBONApi, Configuration } from "@/app/carbon_api";
import { useEffect } from "react";

export default function Checkout() {
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  useEffect(() => {
    console.log("mount Checkout");
    setValue("tonnes", 60);
  }, []);

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log(data);
    const config = new Configuration({
      basePath: "https://api-beta.stellarcarbon.io",
    });
    const api = new CARBONApi(config);
    api.getCarbonQuoteCarbonQuoteGet().then((result) => {
      console.log(result);
    });
  };

  return (
    <main className="flex flex-col items-center p-2 max-w-[1000px] m-auto h-[calc(100vh-80px)]">
      <form className="flex flex-col gap-2 w-full flex-grow justify-around ">
        <h1 className="text-xl font-bold text-center mt-4">Checkout</h1>
        <TonnesRange register={register} watch={watch} />
        <CurrencySelect register={register} />
        <ReasonSelect watch={watch} setValue={setValue} />
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
