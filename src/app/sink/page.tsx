"use client";

import { useViewportWidth } from "@/app/utils";
import { ApiError, CarbonService, SinkingResponse } from "@/client";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import SignIcon from "@/components/icons/SignIcon";
import SuccessIcon from "@/components/icons/SuccessIcon";
import Modal from "@/components/Modal";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import {
  TransactionBuilder,
  NetworkError,
  BadRequestError,
  NotFoundError,
} from "@stellar/stellar-sdk";
import * as StellarSdk from "@stellar/stellar-sdk";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";

enum SinkStatusMessages {
  creating = "Creating your transaction using Stellarcarbon API...",
  confirm = "Your transaction is ready and approved by Stellarcarbon. Please confirm the transaction by signing it with your wallet.",
  signTransaction = "Sign the transaction using your wallet in the pop-up.",
  awaitBlockchain = "Transaction signed.\n Submitting to the Stellar blockchain....",
  completed = "Success! Check out the link below to view your transaction.",
}

export default function SinkPage() {
  const {
    walletConnection,
    sinkRequest,
    stellarWalletsKit,
    setMyTransactions,
    appConfig,
  } = useAppContext();
  const [message, setMessage] = useState<SinkStatusMessages>(
    SinkStatusMessages.creating
  );
  const [submissionError, setSubmissionError] = useState<string>();
  const [sinkCarbonXdr, setSinkCarbonXdr] = useState<SinkingResponse>();

  const [completedTransactionHash, setCompletedTransactionHash] =
    useState<string>();

  const router = useRouter();

  const isWide = useViewportWidth();
  let status;

  useEffect(() => {
    if (sinkRequest === undefined) {
      router.push("/dashboard/sink");
    }
  }, [sinkRequest, router]);

  useEffect(() => {
    if (sinkRequest !== undefined) {
      // Build the XDR with stellarcarbon API
      CarbonService.buildSinkCarbonXdr(sinkRequest)
        .then((response) => {
          setSinkCarbonXdr(response);
          setMessage(SinkStatusMessages.confirm);
        })
        .catch((err: ApiError) => {
          const errorMessage: string = err.body["detail"][0]["msg"];
          setSubmissionError(errorMessage ?? "Unknown error");
        });
    }
  }, [sinkRequest]);

  const catchHorizonError = useCallback((error: any) => {
    if (error instanceof NetworkError) {
      setSubmissionError(
        "Network error: Check your internet connection or Horizon server status."
      );
    } else if (error instanceof BadRequestError) {
      setSubmissionError(
        "Bad request: There was an issue with the transaction parameters."
      );
    } else if (error instanceof NotFoundError) {
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

  const onSubmitTxSuccess = useCallback(
    (result: StellarSdk.Horizon.HorizonApi.SubmitTransactionResponse) => {
      setCompletedTransactionHash(result.hash);
      setMessage(SinkStatusMessages.completed);
      setTimeout(() => {
        // Refresh personal transactions.
        TransactionHistoryService.fetchAccountHistory(
          walletConnection?.stellarPubKey!
        ).then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
      }, 2000);
    },
    [
      setCompletedTransactionHash,
      setMessage,
      setMyTransactions,
      walletConnection,
    ]
  );

  const submitTxToHorizon = useCallback(
    (signedTxXdr: string) => {
      // try {
      //   const error = {
      //     response: {
      //       data: {
      //         extras: {
      //           result_codes: {
      //             transaction: "tx_failed",
      //             operations: ["op_no_source_account"],
      //           },
      //         },
      //       },
      //     },
      //   };

      //   throw error;
      // } catch (error: any) {
      //   catchHorizonError(error);
      // }
      // return;

      appConfig.server
        .submitTransaction(
          TransactionBuilder.fromXDR(signedTxXdr, appConfig.network)
        )
        .then((result) => {
          onSubmitTxSuccess(result);
        })
        .catch((error: any) => {
          catchHorizonError(error);
        });
    },
    [appConfig, catchHorizonError, onSubmitTxSuccess]
  );

  const confirmSubmission = useCallback(() => {
    // Sign the transaction using the Stellar Wallets Kit & submit it to Horizon.
    if (sinkCarbonXdr === undefined) {
      setSubmissionError("Cannot find signed transaction.");
      return;
    }

    setMessage(SinkStatusMessages.signTransaction);

    stellarWalletsKit
      ?.signTransaction(sinkCarbonXdr.tx_xdr, {
        address: walletConnection?.stellarPubKey,
      })
      .then((r) => {
        setMessage(SinkStatusMessages.awaitBlockchain);

        // TODO: Possibly verify the transaction here, before posting to blockchain?
        // Transaction may be expired or signatures not valid?

        submitTxToHorizon(r.signedTxXdr);
      })
      .catch((err) => {
        setSubmissionError("Transaction signing failed.");
      });
  }, [sinkCarbonXdr, walletConnection, stellarWalletsKit, submitTxToHorizon]);

  if (sinkRequest === undefined) {
    return null;
  }

  if (message === SinkStatusMessages.confirm) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-lg">{message}</span>
        <div className="w-full flex flex-col gap-8 m-6 justify-center items-center bg-secondary border border-tertiary py-6 rounded lg:max-w-[75%]">
          <div className="flex flex-col w-full px-6 items-center gap-2 text-lg">
            <div className="flex justify-between w-full items-center gap-4">
              <span>Sinking</span>
              <div className="flex items-center gap-1">
                <span>{Number(sinkCarbonXdr?.carbon_amount).toFixed(3)}</span>
                <CARBONCurrencyIcon />
              </div>
            </div>
            <div className="flex justify-between w-full items-center gap-4">
              <span>Price in USDC</span>
              <div className="flex gap-[2px]">
                <span>$</span>
                <span>{Number(sinkCarbonXdr?.usdc_amount).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <span>Asset</span> <span>{sinkRequest?.paymentAsset}</span>
            </div>
            <div className="flex justify-between items-center w-full gap-4">
              <span>Memo</span>
              <span>{sinkRequest?.memoValue ?? "-"}</span>
            </div>
          </div>
          <Button
            className="!py-2 w-[200px] font-semibold"
            onClick={confirmSubmission}
          >
            Sign with wallet
          </Button>
        </div>
      </div>
    );
  }

  if (message === SinkStatusMessages.creating) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center text-lg md:text-lg">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </div>
    );
  } else if (message === SinkStatusMessages.signTransaction) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-lg">{message}</span>
        <div className="my-4">
          <SignIcon large={isWide} />
        </div>
      </div>
    );
  } else if (message === SinkStatusMessages.awaitBlockchain) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-lg">{message}</span>
        <div className="my-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#d8def2", "#d8def2"]}
          />
        </div>
      </div>
    );
  } else if (message === SinkStatusMessages.completed) {
    status = (
      <div className="h-[90%] gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center md:text-lg">{message}</span>
        <a
          href={
            appConfig.network === WalletNetwork.PUBLIC
              ? `https://stellar.expert/explorer/public/tx/${completedTransactionHash}`
              : `https://stellar.expert/explorer/testnet/tx/${completedTransactionHash}`
          }
          target="_blank"
          className="text-accentSecondary underline mt-3"
        >
          View this transaction on Stellar.expert
        </a>
        <SuccessIcon />
      </div>
    );
  }

  return (
    <Modal>
      <div className="h-full flex flex-col py-8 px-6 md:px-12 justify-start items-center">
        {/* <span className="text-2xl">Transaction submit</span> */}
        {submissionError ? (
          <div className="flex flex-col justify-center items-center flex-1 gap-8">
            <FormError className="text-center text-base md:text-lg">
              {submissionError}
            </FormError>
            <ErrorIcon />
          </div>
        ) : (
          status
        )}

        {(message === SinkStatusMessages.creating ||
          message === SinkStatusMessages.signTransaction) &&
        !submissionError ? (
          <Button
            className="h-10 !py-2 mt-auto"
            onClick={() => router.push("/dashboard/sink")}
          >
            Cancel Transaction
          </Button>
        ) : (
          <Button
            className="h-10 !py-2 mt-auto"
            onClick={() => {
              if (message === SinkStatusMessages.completed) {
                router.push("/dashboard");
              } else {
                router.push("/dashboard/sink");
              }
            }}
          >
            Go back
          </Button>
        )}
      </div>
    </Modal>
  );
}
