"use client";

import { SinkCarbonXdrPostRequest, SinkingFormData } from "@/app/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useAppContext } from "./appContext";
import { PaymentAsset } from "@/client";
import { useRouter } from "next/navigation";

type SinkFormContext = {
  register: UseFormRegister<SinkingFormData>;
  handleSubmit: UseFormHandleSubmit<SinkingFormData, undefined>;
  watch: UseFormWatch<SinkingFormData>;
  setValue: UseFormSetValue<SinkingFormData>;

  onSubmit: SubmitHandler<SinkingFormData>;
  onError: (errors: FieldErrors) => void;

  errors: FieldErrors | undefined;

  quote: number;
  setQuote: Dispatch<SetStateAction<number>>;

  sinkRequest: SinkCarbonXdrPostRequest | undefined;

  overrideFormValues: (
    memo?: string,
    amount?: number,
    currency?: PaymentAsset
  ) => void;
};

const SinkFormContext = createContext<SinkFormContext | null>(null);

export const useSinkFormContext = () => {
  const context = useContext(SinkFormContext);
  if (context === null) {
    throw Error("No SinkFormContext available");
  }
  return context;
};

export const SinkFormContextProvider = ({ children }: PropsWithChildren) => {
  // const { setSinkRequest, setStep } = useSinkingContext();
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue } = useForm<SinkingFormData>({
    defaultValues: {
      memo: "",
      tonnes: 1,
      currency: PaymentAsset.ANY,
    },
  });

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();

  const router = useRouter();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const memo = watch("memo");

  const onError = useCallback((errors: FieldErrors) => {
    setErrors(errors);
  }, []);

  const onSubmit: SubmitHandler<SinkingFormData> = useCallback(
    (_) => {
      // setStep(CheckoutSteps.CREATING);

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
      // TODO: Effect in SinkingContext will pick this up.
    },
    [walletConnection, tonnes, currency, memo, setSinkRequest]
  );

  const overrideFormValues = useCallback(
    (memo?: string, tonnes?: number, currency?: PaymentAsset) => {
      if (memo) setValue("memo", memo);
      if (tonnes) setValue("tonnes", tonnes);
      if (currency) setValue("currency", currency);
      router.push("/dashboard/sink");
    },
    [setValue, router]
  );

  useEffect(() => {
    if (!walletConnection) {
      setValue("memo", "");
      setValue("tonnes", 1);
      setValue("currency", PaymentAsset.ANY);
    }
  }, [walletConnection, setValue]);

  const providerValue = useMemo(
    () => ({
      register,
      handleSubmit,
      watch,
      setValue,
      onSubmit,
      onError,
      quote,
      setQuote,
      errors,
      sinkRequest,
      overrideFormValues,
    }),
    [
      register,
      handleSubmit,
      watch,
      setValue,
      onSubmit,
      onError,
      quote,
      errors,
      sinkRequest,
      overrideFormValues,
    ]
  );

  return (
    <SinkFormContext.Provider value={providerValue}>
      {children}
    </SinkFormContext.Provider>
  );
};
