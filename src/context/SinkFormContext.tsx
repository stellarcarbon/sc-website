"use client";

import { SinkingFormData } from "@/app/types";
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
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useAppContext } from "./appContext";
import { useRouter } from "next/navigation";
import { BuildSinkCarbonXdrData, PaymentAsset } from "@stellarcarbon/sc-sdk";

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

  formSinkRequest: BuildSinkCarbonXdrData | undefined;

  overrideFormValues: (
    memo?: string,
    amount?: number,
    currency?: PaymentAsset
  ) => void;

  resetSinkForm: UseFormReset<SinkingFormData>;
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
  const { walletConnection } = useAppContext();
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<SinkingFormData>({
      defaultValues: {
        memo: "",
        tonnes: 1,
        currency: "any",
      },
    });

  const [quote, setQuote] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>();

  const [formSinkRequest, setFormSinkRequest] =
    useState<BuildSinkCarbonXdrData>();

  const router = useRouter();

  const tonnes = watch("tonnes");
  const currency = watch("currency");
  const memo = watch("memo");

  const onError = useCallback((errors: FieldErrors) => {
    setErrors(errors);
  }, []);

  const onSubmit: SubmitHandler<SinkingFormData> = useCallback(
    (_) => {
      if (!walletConnection) return;

      let request: BuildSinkCarbonXdrData = {
        query: {
          funder: walletConnection.stellarPubKey,
          carbon_amount: tonnes,
          payment_asset: currency,
          memo_value: memo,
        },
        url: "/carbon/sink-carbon/xdr",
      };

      if (walletConnection.recipient) {
        request.query.email = walletConnection.recipient.email;
      }

      setFormSinkRequest(request);
      // TODO: Effect in SinkingContext will pick this up.
    },
    [walletConnection, tonnes, currency, memo, setFormSinkRequest]
  );

  const overrideFormValues = useCallback(
    (memo?: string, tonnes?: number, currency?: PaymentAsset) => {
      if (memo) setValue("memo", memo);
      if (tonnes) setValue("tonnes", Number(tonnes.toFixed(3)));
      if (currency) setValue("currency", currency);
      router.push("/dashboard/sink");
    },
    [setValue, router]
  );

  useEffect(() => {
    if (!walletConnection) {
      setValue("memo", "");
      setValue("tonnes", 1);
      setValue("currency", "any");
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
      formSinkRequest,
      overrideFormValues,
      resetSinkForm: reset,
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
      formSinkRequest,
      overrideFormValues,
      reset,
    ]
  );

  return (
    <SinkFormContext.Provider value={providerValue}>
      {children}
    </SinkFormContext.Provider>
  );
};
