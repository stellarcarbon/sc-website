import { SinkCarbonXdrPostRequest } from "@/app/types";
import {
  ApiError,
  CarbonService,
  PaymentAsset,
  SinkingResponse,
} from "@/client";
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
import { useAppContext } from "./appContext";
import { TransactionBuilder } from "@stellar/stellar-sdk";
import { useRouter } from "next/navigation";
import appConfig from "@/config";
import XLMConversionService from "@/services/XLMConversionService";

export enum CheckoutSteps {
  CREATING = "creating",
  CONFIRM = "confirm",
  AWAIT_SIGNING = "awaitSigning",
  AWAIT_BLOCKCHAIN = "awaitBlockchain",
  COMPLETED = "success",
  ERROR = "error",
}

type SinkingContext = {
  sinkRequest: SinkCarbonXdrPostRequest | undefined;
  setSinkRequest: Dispatch<
    SetStateAction<SinkCarbonXdrPostRequest | undefined>
  >;

  sinkResponse: SinkingResponse | undefined;

  step: CheckoutSteps;
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;

  submissionError: string | undefined;
  setSubmissionError: Dispatch<SetStateAction<string | undefined>>;

  signTransaction: () => void;

  USDCPerXLM: number | undefined;
};

const SinkingContext = createContext<SinkingContext | null>(null);

export const useSinkingContext = () => {
  const context = useContext(SinkingContext);
  if (context === null) {
    throw Error("No SinkingContext available");
  }
  return context;
};

export const SinkingContextProvider = ({ children }: PropsWithChildren) => {
  const { stellarWalletsKit, walletConnection } = useAppContext();

  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();
  const [sinkResponse, setSinkResponse] = useState<SinkingResponse>();
  const [submissionError, setSubmissionError] = useState<string>();
  const [step, setStep] = useState<CheckoutSteps>(CheckoutSteps.CREATING);

  const [USDCPerXLM, setUSDCPerXLM] = useState<number>();

  const router = useRouter();

  useEffect(() => {
    if (submissionError) {
      setStep(CheckoutSteps.ERROR);
    }
  }, [submissionError]);

  useEffect(() => {
    async function getPrice() {
      const usdcPerXLM = await XLMConversionService.getUSDCPrice();
      setUSDCPerXLM(usdcPerXLM);
    }
    getPrice();
  }, []);

  const displayHorizonError = useCallback((error: any) => {
    if (error.message) {
      setSubmissionError(error.message);
    } else if (error.response && error.response.data) {
      // Handle any other transaction failure errors
      let otherError = [];
      const resultCodes = error.response.data.extras.result_codes;
      if (resultCodes) {
        if (resultCodes.transaction) {
          otherError.push(`Transaction error code: ${resultCodes.transaction}`);
        }
        if (resultCodes.operations) {
          resultCodes.operations.forEach((op: string, index: number) => {
            otherError.push(`Operation ${index + 1} error code: ${op}`);
          });
        }
        setSubmissionError(otherError.join("\n"));
      } else {
        setSubmissionError("An unknown transaction failure occurred.");
      }
    } else {
      setSubmissionError("An unknown error occurred.");
    }
  }, []);

  const submitToHorizon = useCallback(
    async (signedTxXdr: string) => {
      // After both parties signed, commit the transaction to Horizon.
      try {
        const server = appConfig.server;
        const result = await server.submitTransaction(
          TransactionBuilder.fromXDR(signedTxXdr, appConfig.network)
        );
        setStep(CheckoutSteps.COMPLETED);
      } catch (error) {
        displayHorizonError(error);
      }
    },
    [displayHorizonError, setStep]
  );

  const signTransaction = useCallback(async () => {
    // Sign the transaction using the Stellar Wallets Kit & submit it to Horizon.
    if (sinkResponse === undefined) {
      setSubmissionError("Could find transaction to sign.");
      return;
    } else {
      setStep(CheckoutSteps.AWAIT_SIGNING);
    }

    try {
      const res = await stellarWalletsKit!.signTransaction(
        sinkResponse.tx_xdr,
        {
          address: walletConnection!.stellarPubKey,
        }
      );

      setStep(CheckoutSteps.AWAIT_BLOCKCHAIN);
      submitToHorizon(res.signedTxXdr);
    } catch (error) {
      setSubmissionError("Transaction signing failed.");
    }

    // TODO: Possibly verify the transaction here, before posting to blockchain?
    // Transaction may be expired or signatures not valid?
  }, [sinkResponse, walletConnection, stellarWalletsKit, submitToHorizon]);

  const confirmSinkRequest = useCallback(
    async (request: SinkCarbonXdrPostRequest) => {
      // Build the XDR with stellarcarbon API
      try {
        const response = await CarbonService.buildSinkCarbonXdr(request);
        setSinkResponse(response);
        setStep(CheckoutSteps.CONFIRM);
      } catch (err: unknown) {
        let message = "Unknown error occurred.";
        if (err instanceof ApiError) {
          message = err.body["detail"][0]["msg"];
        }
        setSubmissionError(message);
      }
    },
    []
  );

  useEffect(() => {
    // When the user completes the sink-form a sinkRequest is defined.
    if (sinkRequest) {
      setSubmissionError(undefined);
      confirmSinkRequest(sinkRequest);
      router.push("/sink");
    }
  }, [sinkRequest, router, confirmSinkRequest]);

  const providerValue = useMemo(() => {
    return {
      sinkRequest,
      setSinkRequest,
      sinkResponse,
      step,
      setStep,
      submissionError,
      setSubmissionError,
      signTransaction,
      USDCPerXLM,
    };
  }, [
    sinkRequest,
    sinkResponse,
    step,
    submissionError,
    signTransaction,
    USDCPerXLM,
  ]);

  return (
    <SinkingContext.Provider value={providerValue}>
      {children}
    </SinkingContext.Provider>
  );
};
