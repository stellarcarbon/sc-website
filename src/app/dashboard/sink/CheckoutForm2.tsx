import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import TonnesRange from "@/components/checkout/TonnesRange";
import { CheckoutFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { HTMLProps, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";

interface CheckoutForm2Props extends HTMLProps<HTMLFormElement> {
  doCheckoutFlow: (payload: SinkCarbonXdrPostRequest) => void;
}

export default function CheckoutForm2({ doCheckoutFlow }: CheckoutForm2Props) {
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const [quote, setQuote] = useState<string | undefined>(undefined);

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  useEffect(() => {
    setValue("tonnes", 1);
  }, [setValue]);

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    let payload: SinkCarbonXdrPostRequest = {
      funder: walletConnection?.stellarPubKey!,
      carbonAmount: tonnes,
      paymentAsset: currency,
      memoValue: reason,
    };
    doCheckoutFlow(payload);
  };

  return (
    <form className="m-2 flex flex-col  bg-primary rounded-md min-w-[80%]">
      <TonnesRange
        register={register}
        watch={watch}
        setValue={setValue}
        quote={quote}
        setQuote={setQuote}
      />
      <CurrencySelect register={register} />
      <ReasonSelect watch={watch} setValue={setValue} />
      <div className="m-4 p-4 flex flex-col items-center justify-center bg-secondary border border-accentSecondary rounded">
        <h3 className="text-xl font-bold">Transaction preview</h3>
        <div className="grid grid-cols-2 text-center my-4 md:my-9 w-full md:max-w-[60%]">
          <span className="text-start">Amount to sink</span>
          <div className="flex gap-1 items-center justify-end">
            <CARBONCurrencyIcon />
            <span className="font-bold text-end">{tonnes}</span>
          </div>

          <span className="text-start">Currency used</span>
          <span className="font-bold text-end">{currency}</span>

          <hr className="col-span-2 my-2 w-[100%]" />

          <span className="text-start ">Price</span>
          <span className="font-bold text-end">{`$${
            Number.isNaN(Number(quote)) ? "" : Number(quote).toFixed(2)
          }`}</span>

          {/* {reason && (
            <>
              <span className="flex items-center text-start mt-4">Reason</span>
              <span className="text-start mt-4 h-18 text-sm font-bold line-clamp-3 break-words inline-block">
                {reason ? reason : "Not specified"}
              </span>
            </>
          )} */}
        </div>
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="!py-2 !w-[60%] max-w-[200px] text-md font-bold self-center"
          disabled={false}
        >
          Sign & Submit
        </Button>
      </div>
    </form>
  );
}
