"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm from "./CheckoutForm";
import { useRouter } from "next/navigation";
import { FormStatusMessages, SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { SinkingResponse } from "@/client";
import FormStatusModal from "@/containers/FormStatusModal";

export interface SinkingTransaction {
  transactionPostRequest: SinkCarbonXdrPostRequest;
  estimatedPriceInDollars: number;
}

export default function DashboardSink() {
  const { walletConnection } = useAppContext();

  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => router.push("/dashboard/transactions"),
    onSwipedRight: () => router.push("/dashboard"),
    delta: 100,
  });

  const [showFormStatusModal, setShowFormStatusModal] =
    useState<boolean>(false);
  const [submissionStatusMessage, setSubmissionStatusMessage] =
    useState<FormStatusMessages>(FormStatusMessages.creating);
  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();
  const [sinkingTransaction, setSinkingTransaction] =
    useState<SinkingTransaction>();

  const formStatusRef = useRef<boolean | null>(null);

  useEffect(() => {
    formStatusRef.current = showFormStatusModal;
  }, [showFormStatusModal]);

  const closeModal = () => {
    setShowFormStatusModal(false);
    setSubmissionErrorMessage(undefined);
    setSubmissionStatusMessage(FormStatusMessages.creating);
  };

  const signTransaction = useCallback(
    (sinkingResponse: SinkingResponse) => {
      setSubmissionStatusMessage(FormStatusMessages.signTransaction);

      if (formStatusRef.current) {
        walletConnection?.kit
          .sign({
            xdr: sinkingResponse.tx_xdr,
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
    },
    [walletConnection]
  );

  const initSubmitSinkingTransaction = useCallback(
    (sinkRequest: SinkCarbonXdrPostRequest, quote: number) => {
      if (!walletConnection?.isAnonymous) {
        sinkRequest.email = walletConnection?.personalDetails?.useremail;
      }

      setShowFormStatusModal(true);

      setSubmissionStatusMessage(FormStatusMessages.confirm);

      setSinkingTransaction({
        transactionPostRequest: sinkRequest,
        estimatedPriceInDollars: quote,
      });

      // CarbonService.buildSinkCarbonXdrSinkCarbonXdrPost(sinkRequest)
      //   .then((response) => {
      //     signTransaction(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     if (error instanceof ApiError) {
      //       console.log(error.body.detail[0].msg);
      //       setSubmissionErrorMessage(error.body.detail[0].msg);
      //     } else if (error instanceof AxiosError) {
      //       setSubmissionErrorMessage("Connection error, please retry.");
      //     } else {
      //       setSubmissionErrorMessage("Unknown error.");
      //     }
      //   });
    },
    [signTransaction, walletConnection]
  );

  return (
    <div {...swipeHandlers} className="pb-8 w-full">
      <CheckoutForm submitSinkingTransaction={initSubmitSinkingTransaction} />
      {showFormStatusModal && (
        <FormStatusModal
          message={submissionStatusMessage}
          closeModal={closeModal}
          submissionError={submissionErrorMessage}
          sinkingTransaction={sinkingTransaction}
        />
      )}
    </div>
  );
}
