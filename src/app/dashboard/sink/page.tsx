"use client";

import { useSwipeable } from "react-swipeable";
import CheckoutForm2 from "./CheckoutForm2";
import { useRouter } from "next/navigation";
import { FormStatusMessages, SinkCarbonXdrPostRequest } from "@/app/types";
import { useAppContext } from "@/context/appContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, CarbonService, SinkingResponse } from "@/client";
import FormStatusModal from "@/containers/FormStatusModal";
import { AxiosError } from "axios";

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

  const postSinkRequest = useCallback(
    (sinkRequest: SinkCarbonXdrPostRequest) => {
      if (!walletConnection?.isAnonymous) {
        sinkRequest.email = walletConnection?.personalDetails?.useremail;
      }

      setShowFormStatusModal(true);

      setSubmissionStatusMessage(FormStatusMessages.creating);

      CarbonService.buildSinkCarbonXdrSinkCarbonXdrPost(sinkRequest)
        .then((response) => {
          signTransaction(response);
        })
        .catch((error) => {
          console.log(error);
          if (error instanceof ApiError) {
            console.log(error.body.detail[0].msg);
            setSubmissionErrorMessage(error.body.detail[0].msg);
          } else if (error instanceof AxiosError) {
            setSubmissionErrorMessage("Connection error, please retry.");
          } else {
            setSubmissionErrorMessage("Unknown error.");
          }
        });
    },
    [signTransaction, walletConnection]
  );

  return (
    <div {...swipeHandlers} className="pb-8 w-full">
      {/* Welkom blok */}
      {/* <div className="flex flex-col justify-center h-16 px-4 w-full"> */}
      {/* <span className="text-xl self-center">Sink CARBON</span> */}
      {/* <span className="text-sm mt-1 text-center">
          Use this form to create a new sinking transaction.
        </span> */}
      {/* </div> */}
      {/* <hr className="border-tertiary" /> */}
      <CheckoutForm2 postSinkRequest={postSinkRequest} />
      {showFormStatusModal && (
        <FormStatusModal
          message={submissionStatusMessage}
          closeModal={closeModal}
          submissionError={submissionErrorMessage}
        />
      )}
    </div>
  );
}
