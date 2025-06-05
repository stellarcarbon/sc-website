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
import { Transaction, TransactionBuilder } from "@stellar/stellar-sdk";
import { useRouter } from "next/navigation";
import appConfig from "@/config";
import XLMConversionService from "@/services/XLMConversionService";
import { useSinkFormContext } from "./SinkFormContext";

export enum CheckoutSteps {
  CREATING = "creating",
  CONFIRM = "confirm",
  AWAIT_SIGNING = "awaitSigning",
  AWAIT_BLOCKCHAIN = "awaitBlockchain",
  COMPLETED = "success",
  ERROR = "error",
  EXPIRED = "expired",
}

type SinkingContext = {
  sinkRequest: SinkCarbonXdrPostRequest | undefined;
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
  const { sinkRequest: formSinkRequest } = useSinkFormContext();

  const [sinkResponse, setSinkResponse] = useState<SinkingResponse>();
  const [submissionError, setSubmissionError] = useState<string>();
  const [step, setStep] = useState<CheckoutSteps>(CheckoutSteps.CREATING);

  const [USDCPerXLM, setUSDCPerXLM] = useState<number>();

  const router = useRouter();

  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();

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

  const isExpired = (xdr: string): boolean => {
    const transaction = TransactionBuilder.fromXDR(
      xdr,
      appConfig.network
    ) as Transaction;

    if (transaction.timeBounds) {
      const maxTimeSec = parseInt(transaction.timeBounds.maxTime, 10);
      const currentTimeSec = Math.floor(Date.now() / 1000);

      if (maxTimeSec - currentTimeSec < 60) {
        return true;
      }
    }

    return false;
  };

  const signTransaction = useCallback(async () => {
    // Sign the transaction using the Stellar Wallets Kit & submit it to Horizon.
    if (sinkResponse === undefined) {
      setSubmissionError("Could find transaction to sign.");
      return;
    }

    // Expiry check before signing
    if (isExpired(sinkResponse.tx_xdr)) {
      setStep(CheckoutSteps.EXPIRED);
      return;
    }

    setStep(CheckoutSteps.AWAIT_SIGNING);

    try {
      const signedTxResult = await stellarWalletsKit!.signTransaction(
        sinkResponse.tx_xdr,
        {
          address: walletConnection!.stellarPubKey,
        }
      );

      // Expiry check after signing
      if (isExpired(signedTxResult.signedTxXdr)) {
        setStep(CheckoutSteps.EXPIRED);
        return;
      }

      setStep(CheckoutSteps.AWAIT_BLOCKCHAIN);
      submitToHorizon(signedTxResult.signedTxXdr);
    } catch (error) {
      setSubmissionError("Transaction signing failed.");
    }
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
    if (formSinkRequest) {
      setSubmissionError(undefined);
      setSinkRequest(formSinkRequest);
      confirmSinkRequest(formSinkRequest);
      router.push("/sink");
    }
  }, [
    formSinkRequest,
    router,
    confirmSinkRequest,
    setSinkRequest,
    sinkRequest,
  ]);

  const providerValue = useMemo(() => {
    return {
      sinkResponse,
      step,
      setStep,
      submissionError,
      setSubmissionError,
      signTransaction,
      USDCPerXLM,
      sinkRequest,
    };
  }, [
    sinkResponse,
    step,
    submissionError,
    signTransaction,
    USDCPerXLM,
    sinkRequest,
  ]);

  return (
    <SinkingContext.Provider value={providerValue}>
      {children}
    </SinkingContext.Provider>
  );
};
