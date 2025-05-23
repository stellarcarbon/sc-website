"use client";

import { SinkCarbonXdrPostRequest, SinkingFormData } from "@/app/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
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
import { CheckoutSteps, useSinkingContext } from "./SinkingContext";
import { useAppContext } from "./appContext";

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
      tonnes: 1,
    },
  });

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();

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
    ]
  );

  return (
    <SinkFormContext.Provider value={providerValue}>
      {children}
    </SinkFormContext.Provider>
  );
};
