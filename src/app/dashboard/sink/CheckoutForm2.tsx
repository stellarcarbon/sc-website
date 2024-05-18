import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import { CheckoutFormData, SinkCarbonXdrPostRequest } from "@/app/types";
import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { HTMLProps, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import AmountInput from "@/components/checkout/AmountInput";

interface CheckoutForm2Props extends HTMLProps<HTMLFormElement> {
  postSinkRequest: (payload: SinkCarbonXdrPostRequest) => void;
}

export default function CheckoutForm2({ postSinkRequest }: CheckoutForm2Props) {
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const [quote, setQuote] = useState<number>(0);

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
    postSinkRequest(payload);
  };

  return (
    <form className="flex flex-col gap-4 pt-4 bg-secondary min-w-[80%]">
      <AmountInput
        register={register}
        watch={watch}
        setValue={setValue}
        quote={quote}
        setQuote={setQuote}
      />
      <CurrencySelect register={register} />
      <ReasonSelect watch={watch} setValue={setValue} />
      <div className="m-4 md:w-[80%] md:self-center p-4 flex flex-col items-center justify-center bg-primary border border-accentSecondary rounded">
        <h3 className="text-xl font-bold">Transaction preview</h3>
        <div className="grid grid-cols-2 text-center my-4 md:my-9 w-full md:max-w-[80%]">
          <span className="text-start">Amount to sink</span>
          <div className="flex gap-1 items-center justify-end text-accent">
            <CARBONCurrencyIcon />
            <span className="font-bold text-end ">{tonnes}</span>
          </div>

          <span className="text-start">Currency to use</span>
          <span className="font-bold text-end text-accent">{currency}</span>

          <hr className="col-span-2 my-2 w-[100%]" />

          <span className="text-start">Price in $</span>
          <span className="font-bold text-end text-accent">{`$ ${
            Number.isNaN(Number(quote)) ? "" : Number(quote).toFixed(2)
          }`}</span>
        </div>
        <span className="text-xs mb-4 mx-4 text-center">
          Make sure the transaction above is correct before finalizing the
          transaction.
        </span>
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="!py-2 !w-[60%] max-w-[200px] text-md self-center"
          disabled={false}
        >
          Sign & Submit
        </Button>
      </div>
    </form>
  );
}
