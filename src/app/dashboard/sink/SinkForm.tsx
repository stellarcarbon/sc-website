"use client";

import {
  FormStatusMessages,
  SinkCarbonXdrPostRequest,
  SinkingTransaction,
} from "@/app/types";
import { CarbonService } from "@/client";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import FormStatusModal from "@/components/checkout/FormStatusModal";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSCRouter } from "@/app/utils";
import { useAppContext } from "@/context/appContext";

export default function SinkForm() {
  const { walletConnection } = useAppContext();

  const router = useSCRouter();

  const [showFormStatusModal, setShowFormStatusModal] =
    useState<boolean>(false);
  const [submissionStatusMessage, setSubmissionStatusMessage] =
    useState<FormStatusMessages>(FormStatusMessages.creating);
  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();
  const [sinkingTransaction, setSinkingTransaction] =
    useState<SinkingTransaction>({
      transactionPostRequest: undefined,
      transactionPostResponse: undefined,
    });

  const formStatusRef = useRef<boolean | null>(null);

  useEffect(() => {
    formStatusRef.current = showFormStatusModal;
  }, [showFormStatusModal]);

  const closeModal = () => {
    if (submissionStatusMessage === FormStatusMessages.completed) {
      router.push("/dashboard");
    } else {
      setShowFormStatusModal(false);
      setSubmissionErrorMessage(undefined);
      setSubmissionStatusMessage(FormStatusMessages.creating);
    }
  };

  const signTransaction = useCallback(() => {
    if (sinkingTransaction.transactionPostResponse === undefined) {
      setSubmissionErrorMessage("Cannot find signed transaction.");
    }

    setSubmissionStatusMessage(FormStatusMessages.signTransaction);

    if (formStatusRef.current) {
      walletConnection?.kit
        .sign({
          xdr: sinkingTransaction.transactionPostResponse!.tx_xdr,
          publicKey: walletConnection.stellarPubKey,
        })
        .then((response) => {
          console.log("signing ok");
          setSubmissionStatusMessage(FormStatusMessages.awaitBlockchain);

          setTimeout(() => {
            setSubmissionStatusMessage(FormStatusMessages.completed);
          }, 3000);
        })
        .catch((error) => {
          console.log("signing error", error);
          setSubmissionErrorMessage("Transaction signing failed.");
        })
        .finally(() => {
          console.log("signing finally");
        });
    }
  }, [walletConnection, sinkingTransaction]);

  const initSubmitSinkingTransaction = useCallback(
    async (sinkRequest: SinkCarbonXdrPostRequest, quote: number) => {
      if (!walletConnection?.isAnonymous) {
        sinkRequest.email = walletConnection?.personalDetails?.useremail;
      }

      setShowFormStatusModal(true);
      setSubmissionStatusMessage(FormStatusMessages.creating);

      try {
        const response = await CarbonService.buildSinkCarbonXdr(sinkRequest);

        setSinkingTransaction({
          transactionPostRequest: sinkRequest,
          transactionPostResponse: response,
        });

        setSubmissionStatusMessage(FormStatusMessages.confirm);
      } catch (error) {
        setSubmissionErrorMessage(
          `Error building transaction with Stellarcarbon API. ${error}`
        );
      }
    },
    [walletConnection]
  );

  return (
    <>
      <CheckoutForm submitSinkingTransaction={initSubmitSinkingTransaction} />
      {showFormStatusModal && (
        <FormStatusModal
          message={submissionStatusMessage}
          closeModal={closeModal}
          confirmSubmission={signTransaction}
          submissionError={submissionErrorMessage}
          sinkingTransaction={sinkingTransaction}
        />
      )}
    </>
  );
}
