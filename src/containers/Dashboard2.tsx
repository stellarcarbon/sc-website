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

export default function Dashboard2() {
  const { walletConnection, myTransactions, setMyTransactions } =
    useAppContext();
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState<boolean>(false);

  const transactionHistoryService = new TransactionHistoryService(DEV_ACCOUNT);

  useEffect(() => {
    // Load the transactions for this dash on mount if not loaded yet.
    if (myTransactions === null) {
      transactionHistoryService
        .fetchHistory()
        .then((transactionRecords): void => {
          setMyTransactions(transactionRecords);
        });
    }
  }, []);

  return (
    <div className="flex flex-col bg-secondary w-full min-h-[calc(100vh-176px)] md:max-w-[800px] md:p-4 md:rounded-md">
      {/* <h1 className="self-center text-lg font-bold">My Stellarcarbon</h1> */}

      {/* Connection info */}
      <div className="flex flex-col m-2 p-4 bg-tertiary border border-accentSecondary rounded-md text-accent">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-bold text-white">Connection info</h1>
          <Button className="!p-2">
            <div className="flex items-center justify-between">
              {/* <span>Edit</span> */}
              <EditIcon />
            </div>
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span>Wallet</span>
          <span className="text-xs">{walletConnection?.walletType}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Stellar PubKey</span>
          <span className="text-xs break-words max-w-[50%]">
            {walletConnection?.stellarPubKey}
          </span>
        </div>
        <PersonalDetailsDisplay />
      </div>

      {/* Checkout form */}
      <div className=" m-2 border border-tertiary text-accent relative">
        <button
          className={`flex items-center w-full min-h-9 ${
            isCheckoutExpanded && "hidden"
          }`}
          onClick={() => {
            setIsCheckoutExpanded(!isCheckoutExpanded);
          }}
        >
          {isCheckoutExpanded ? (
            <></>
          ) : (
            <span className="w-full">Click to sink carbon</span>
          )}
        </button>

        <button
          className="absolute right-0 top-0 py-1 px-2"
          onClick={() => {
            setIsCheckoutExpanded(!isCheckoutExpanded);
          }}
        >
          {isCheckoutExpanded ? <CaretDownIcon /> : <CaretUpIcon />}
        </button>

        {isCheckoutExpanded && <CheckoutForm />}
      </div>

      <hr className="w-[calc(100%-32px)] m-2 self-center border-accentSecondary" />

      {/* Infinite scroll */}
      <PaymentList />

      <DisconnectWalletButton />
    </div>
  );
}