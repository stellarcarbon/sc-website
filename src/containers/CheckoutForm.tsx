import carbonApi from "@/app/carbonApi";
import {
  BuildSinkCarbonXdrSinkCarbonXdrPostRequest,
  SinkingResponse,
} from "@/carbon_api";
import CurrencySelect from "@/components/checkout/CurrencySelect";
import ReasonSelect from "@/components/checkout/ReasonSelect";
import TonnesRange from "@/components/checkout/TonnesRange";
import { CheckoutFormData } from "@/app/types";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import { useAppContext } from "@/context/appContext";
import {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CheckoutFormProps extends HTMLProps<HTMLFormElement> {
  setShowFormSuccess: Dispatch<SetStateAction<boolean>>;
  setFormStatusMessage: Dispatch<SetStateAction<string>>;
}

export default function CheckoutForm({
  setShowFormSuccess,
  setFormStatusMessage,
}: CheckoutFormProps) {
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } =
    useForm<CheckoutFormData>();

  const [formErr, setFormErr] = useState<string>();
  const [signResponse, setSignResponse] = useState<SinkingResponse>();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const reason = watch("reason");

  useEffect(() => {
    setValue("tonnes", 1);
  }, []);

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
    setShowFormSuccess(true);
    setFormStatusMessage("Creating transaction using StellarCarbon API...");
    carbonApi
      .buildSinkCarbonXdrSinkCarbonXdrPost(payload)
      .then((response) => {
        setSignResponse(response);
        console.log("sink carbon xdr post succesful\n", response.toString());
        setFormStatusMessage("Sign the transaction using your wallet.");
        console.log(walletConnection);
        walletConnection?.kit
          .sign({
            xdr: response.txXdr,
            publicKey: walletConnection.stellarPubKey,
          })
          .then((response) => {
            console.log("Wallet sign succesful", response.toString());
            setFormStatusMessage(
              "Transaction signed. Posting to blockchain and awaiting confirmation. This can take a couple seconds..."
            );
            setTimeout(() => {
              setFormStatusMessage(
                "Success! (did not really post to blockchain though)"
              );
            }, 3000);
          });
      })
      .catch((error) => {
        setFormErr(error.toString());
        console.log("sink carbon xdr post error\n", error);
      });
  };

  return (
    <form className="flex flex-col font-sans bg-primary rounded-md min-w-[80%]">
      <h1 className="pt-4 px-4 font-sans self-center text-2xl">Checkout</h1>
      <TonnesRange register={register} watch={watch} setValue={setValue} />
      <CurrencySelect register={register} />
      <ReasonSelect watch={watch} setValue={setValue} />
      <FormError className="py-0">{formErr}</FormError>
      <Button
        onClick={() => handleSubmit(onSubmit)()}
        className="!py-2 !w-[60%] text-sm mb-8 self-center"
        disabled={false}
      >
        Sign & Submit
      </Button>
    </form>
  );
}
