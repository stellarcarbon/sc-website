import { SinkCarbonXdrPostRequest } from "@/app/types";
import { ApiError, CarbonService, SinkingResponse } from "@/client";
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
import * as StellarSdk from "@stellar/stellar-sdk";
import TransactionHistoryService from "@/services/TransactionHistoryService";

export enum SinkingFinalizationSteps {
  CREATING = "creating",
  CONFIRM = "confirm",
  SIGN_TRANSACTION = "signTransaction",
  AWAIT_BLOCKCHAIN = "awaitBlockchain",
  COMPLETED = "success",
  ERROR = "error",
}

type SinkingContext = {
  sinkRequest: SinkCarbonXdrPostRequest | undefined;
  setSinkRequest: Dispatch<
    SetStateAction<SinkCarbonXdrPostRequest | undefined>
  >;

  sinkCarbonXdr: SinkingResponse | undefined;
  setSinkCarbonXdr: Dispatch<SetStateAction<SinkingResponse | undefined>>;

  step: SinkingFinalizationSteps;
  setStep: Dispatch<SetStateAction<SinkingFinalizationSteps>>;

  completedTransactionHash: string | undefined;
  setCompletedTransactionHash: Dispatch<SetStateAction<string | undefined>>;

  submissionError: string | undefined;
  setSubmissionError: Dispatch<SetStateAction<string | undefined>>;

  signTransaction: () => void;
  confirmSinkRequest: (request: SinkCarbonXdrPostRequest) => void;
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
  const { stellarWalletsKit, walletConnection, appConfig, setMyTransactions } =
    useAppContext();

  const [sinkRequest, setSinkRequest] = useState<SinkCarbonXdrPostRequest>();
  const [sinkCarbonXdr, setSinkCarbonXdr] = useState<SinkingResponse>();
  const [submissionError, setSubmissionError] = useState<string>();
  const [completedTransactionHash, setCompletedTransactionHash] =
    useState<string>();

  const [step, setStep] = useState<SinkingFinalizationSteps>(
    SinkingFinalizationSteps.CREATING
  );

  useEffect(() => {
    if (submissionError) {
      setStep(SinkingFinalizationSteps.ERROR);
    }
  }, [submissionError]);

  const catchHorizonError = useCallback((error: any) => {
    if (error instanceof StellarSdk.NetworkError) {
      setSubmissionError(
        "Network error: Check your internet connection or Horizon server status."
      );
    } else if (error instanceof StellarSdk.BadRequestError) {
      setSubmissionError(
        "Bad request: There was an issue with the transaction parameters."
      );
    } else if (error instanceof StellarSdk.NotFoundError) {
      setSubmissionError(
        "Not found: The source or destination account does not exist."
      );
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
        setSubmissionError("An unknown error occurred.");
      }
    } else {
      setSubmissionError("An unknown error occurred.");
    }
  }, []);

  const submitToHorizon = useCallback(
    async (signedTxXdr: string) => {
      // After both parties signed, commit the transaction to Horizon.
      try {
        const result = await appConfig.server.submitTransaction(
          TransactionBuilder.fromXDR(signedTxXdr, appConfig.network)
        );

        setCompletedTransactionHash(result.hash);
        setStep(SinkingFinalizationSteps.COMPLETED);

        setTimeout(() => {
          // Refresh personal transactions.
          TransactionHistoryService.fetchAccountHistory(
            walletConnection?.stellarPubKey!
          ).then((transactionRecords): void => {
            setMyTransactions(transactionRecords);
          });
        }, 8000);
      } catch (error) {
        catchHorizonError(error);
      }
    },
    [
      appConfig,
      catchHorizonError,
      setCompletedTransactionHash,
      setStep,
      setMyTransactions,
      walletConnection,
    ]
  );

  const signTransaction = useCallback(async () => {
    // Sign the transaction using the Stellar Wallets Kit & submit it to Horizon.
    if (sinkCarbonXdr === undefined) {
      setSubmissionError("Cannot find signed transaction.");
      return;
    } else {
      setStep(SinkingFinalizationSteps.SIGN_TRANSACTION);
    }

    try {
      const res = await stellarWalletsKit!.signTransaction(
        sinkCarbonXdr.tx_xdr,
        {
          address: walletConnection!.stellarPubKey,
        }
      );

      setStep(SinkingFinalizationSteps.AWAIT_BLOCKCHAIN);
      submitToHorizon(res.signedTxXdr);
    } catch (error) {
      setSubmissionError("Transaction signing failed.");
    }

    // TODO: Possibly verify the transaction here, before posting to blockchain?
    // Transaction may be expired or signatures not valid?
  }, [sinkCarbonXdr, walletConnection, stellarWalletsKit, submitToHorizon]);

  const confirmSinkRequest = useCallback(
    async (request: SinkCarbonXdrPostRequest) => {
      setSinkRequest(sinkRequest);

      // Build the XDR with stellarcarbon API
      if (request) {
        try {
          const response = await CarbonService.buildSinkCarbonXdr(request);
          setSinkCarbonXdr(response);
          setStep(SinkingFinalizationSteps.CONFIRM);
          console.log("ok");
        } catch (err: unknown) {
          console.log("err");
          let message = "Unknown error occurred.";
          if (err instanceof ApiError) {
            message = err.body["detail"][0]["msg"];
          }
          setSubmissionError(message);
        }
      }
    },
    [sinkRequest]
  );

  const providerValue = useMemo(() => {
    return {
      sinkRequest,
      setSinkRequest,
      sinkCarbonXdr,
      setSinkCarbonXdr,
      step,
      setStep,
      completedTransactionHash,
      setCompletedTransactionHash,
      submissionError,
      setSubmissionError,
      confirmSinkRequest,
      signTransaction,
    };
  }, [
    sinkRequest,
    sinkCarbonXdr,
    step,
    completedTransactionHash,
    submissionError,
    confirmSinkRequest,
    signTransaction,
  ]);

  return (
    <SinkingContext.Provider value={providerValue}>
      {children}
    </SinkingContext.Provider>
  );
};
