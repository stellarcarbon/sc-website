import CaretUpIcon from "@/components/icons/CaretUpIcon";
import DisconnectWalletButton from "@/components/wallet/DisconnectWalletButton";
import PersonalDetailsDisplay from "@/components/wallet/PersonalDetailsDisplay";
import { useEffect, useState } from "react";
import CaretDownIcon from "@/components/icons/CaretDownIcon";
import EditIcon from "@/components/icons/EditIcon";
import PaymentList from "./PaymentList";
import { useAppContext } from "@/context/appContext";
import CheckoutForm from "./CheckoutForm";
import Button from "@/components/Button";
import TransactionHistoryService from "@/app/wallet/TransactionHistoryService";
import { DEV_ACCOUNT } from "@/app/types";
import DeleteIcon from "@/components/icons/DeleteIcon";

export default function Dashboard() {
  const {
    walletConnection,
    myTransactions,
    setMyTransactions,
    disconnectWallet,
  } = useAppContext();
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState<boolean>(false);
  const [showFormSuccess, setShowFormSuccess] = useState<boolean>(false);
  const [formStatusMessage, setFormStatusMessage] = useState<string>("");

  const transactionHistoryService = new TransactionHistoryService();

  useEffect(() => {
    // Load the transactions for this dash on mount if not loaded yet.
    if (myTransactions === null) {
      transactionHistoryService
        .fetchAccountHistory(DEV_ACCOUNT)
        .then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
    }
  }, []);

  return (
    <div className="flex flex-col bg-secondary w-full min-h-[calc(100vh-176px)] md:max-w-[800px] md:p-4 md:rounded-md">
      {/* <h1 className="self-center text-lg font-bold">My Stellarcarbon</h1> */}

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
              {/* <span>Edit</span> */}
              <span className="pt-[1px]">Edit</span>
              <EditIcon />
            </div>
          </Button>
          <Button onClick={disconnectWallet} className="!p-2">
            <div className="flex items-center justify-between gap-1 text-xs">
              {/* <span>Edit</span> */}
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

        {isCheckoutExpanded && (
          <CheckoutForm
            setShowFormSuccess={setShowFormSuccess}
            setFormStatusMessage={setFormStatusMessage}
          />
        )}
      </div>

      {/* <hr className="w-[calc(100%-32px)] m-2 self-center border-accentSecondary" /> */}

      {/* Infinite scroll */}
      <PaymentList />

      {showFormSuccess && (
        <>
          <div className="absolute top-0 left-0 w-screen h-screen bg-gray-600 opacity-80"></div>
          <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center ">
            <div className="flex flex-col p-4 justify-between bg-tertiary w-[80%] h-[60%] opacity-100 shadow-xl rounded-md">
              <span className="text-2xl self-center">Transaction status</span>
              <span className="p-0 self-center text-center">
                {formStatusMessage}
              </span>
              <Button onClick={() => setShowFormSuccess(false)}>
                Return to dashboard
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
