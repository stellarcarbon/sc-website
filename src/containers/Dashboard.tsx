import CaretUpIcon from "@/components/icons/CaretUpIcon";
import PersonalDetailsDisplay from "@/components/wallet/PersonalDetailsDisplay";
import { useEffect, useState } from "react";
import CaretDownIcon from "@/components/icons/CaretDownIcon";
import EditIcon from "@/components/icons/EditIcon";
import PaymentList from "./PaymentList";
import { useAppContext } from "@/context/appContext";
import CheckoutForm from "./CheckoutForm";
import Button from "@/components/Button";
import TransactionHistoryService from "@/app/services/TransactionHistoryService";
import { FormStatusMessages } from "@/app/types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import FormStatusModal from "./FormStatusModal";
import { BuildSinkCarbonXdrSinkCarbonXdrPostRequest } from "@/carbon_api";
import carbonApi from "@/app/carbonApi";
import { CarbonService } from "@/client";

export default function Dashboard() {
  const {
    walletConnection,
    myTransactions,
    setMyTransactions,
    disconnectWallet,
  } = useAppContext();
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState<boolean>(false);

  // Form submission modal related
  const [showFormSubmissionModal, setShowFormStatusModal] =
    useState<boolean>(false);
  const [submissionStatusMessage, setSubmissionStatusMessage] =
    useState<FormStatusMessages>(FormStatusMessages.creating);
  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();

  const transactionHistoryService = new TransactionHistoryService();

  useEffect(() => {
    // Load the transactions for this dash on mount if not loaded yet.
    if (myTransactions === null) {
      transactionHistoryService
        .fetchAccountHistory(walletConnection?.stellarPubKey!)
        .then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
    }
  }, []);

  const closeModal = () => {
    setShowFormStatusModal(false);
    setSubmissionErrorMessage(undefined);
    setSubmissionStatusMessage(FormStatusMessages.creating);
  };

  const doCheckoutFlow = (
    payload: BuildSinkCarbonXdrSinkCarbonXdrPostRequest
  ) => {
    if (!walletConnection?.isAnonymous) {
      payload.email = walletConnection?.personalDetails?.useremail;
    }
    setShowFormStatusModal(true);
    setSubmissionStatusMessage(FormStatusMessages.creating);

    carbonApi
      .buildSinkCarbonXdrSinkCarbonXdrPost(payload)
      .then((response) => {
        console.log(response);
        setSubmissionStatusMessage(FormStatusMessages.signTransaction);
        walletConnection?.kit
          .sign({
            xdr: response.txXdr,
            publicKey: walletConnection.stellarPubKey,
          })
          .then((response) => {
            console.log("ok");
          })
          .catch((error) => {
            console.log(error);
            setSubmissionErrorMessage("Something went wrong while signing.");
          });
      })
      .catch((error) => {
        console.log(error);
        setSubmissionErrorMessage(error.detail[0].msg);
      });

    // carbonApi
    //   .buildSinkCarbonXdrSinkCarbonXdrPost(payload)
    //   .then((response) => {
    //     setSignResponse(response);
    //     console.log("sink carbon xdr post succesful\n", response.toString());
    //     setFormStatusMessage(FormStatusMessages.signTransaction);
    //     console.log(walletConnection);
    //     walletConnection?.kit
    //       .sign({
    //         xdr: response.txXdr,
    //         publicKey: walletConnection.stellarPubKey,
    //       })
    //       .then((response) => {
    //         console.log("Wallet sign succesful", response.toString());
    //         setFormStatusMessage(
    //           "Transaction signed. Posting to blockchain and awaiting confirmation. This can take a couple seconds..."
    //         );
    //         setTimeout(() => {
    //           setFormStatusMessage(
    //             "Success! (did not really post to blockchain though)"
    //           );
    //         }, 3000);
    //       });
    //   })
    //   .catch((error) => {
    //     setFormErr(error.toString());
    //     console.log("sink carbon xdr post error\n", error);
    //   });
  };

  return (
    <div className="flex flex-col bg-secondary w-full min-h-[calc(100vh-176px)] md:max-w-[800px] md:p-4 md:rounded-md">
      {/* Connection info */}
      <div className="flex flex-col m-2 p-4 bg-primary border border-accentSecondary rounded-md">
        <div className="flex flex-col justify-between items-start w-full">
          <h1 className="text-lg font-bold">Your wallet is connected.</h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <span className="w-32">Wallet</span>
            <span className="text-xs">{walletConnection?.walletType}</span>
          </div>
          <div className="flex items-top md:items-center">
            <span className="w-32">Stellar PubKey</span>
            <span className="text-xs break-words max-w-[50%] md:max-w-[90%]">
              {walletConnection?.stellarPubKey}
            </span>
          </div>
          <PersonalDetailsDisplay />
        </div>
        <div className="flex gap-2 w-full justify-start mt-4">
          <Button className="!p-2">
            <div className="flex items-center justify-between gap-1 text-xs">
              <span className="pt-[1px]">Edit</span>
              <EditIcon />
            </div>
          </Button>
          <Button onClick={disconnectWallet} className="!p-2">
            <div className="flex items-center justify-between gap-1 text-xs">
              <span className="">Remove</span>
              <DeleteIcon />
            </div>
          </Button>
        </div>
      </div>

      {/* Checkout form */}
      <div
        className={`m-2 relative ${
          isCheckoutExpanded ? "border border-accentSecondary rounded-md" : ""
        }`}
      >
        <Button
          className={`flex items-center bg-accent text-black w-full h-16 ${
            isCheckoutExpanded && "hidden"
          }`}
          onClick={() => {
            setIsCheckoutExpanded(!isCheckoutExpanded);
          }}
        >
          {isCheckoutExpanded ? (
            <></>
          ) : (
            <span className="w-full">Click here to sink carbon</span>
          )}
        </Button>

        <button
          className={`absolute right-0 top-4 py-1 px-2 ${
            isCheckoutExpanded ? "top-1" : ""
          }`}
          onClick={() => {
            setIsCheckoutExpanded(!isCheckoutExpanded);
          }}
        >
          {isCheckoutExpanded ? <CaretDownIcon /> : <CaretUpIcon />}
        </button>

        {isCheckoutExpanded && <CheckoutForm doCheckoutFlow={doCheckoutFlow} />}
      </div>

      {/* Infinite scroll */}
      <PaymentList />

      {showFormSubmissionModal && (
        <FormStatusModal
          message={submissionStatusMessage}
          closeModal={closeModal}
          submissionError={submissionErrorMessage}
        />
      )}
    </div>
  );
}
