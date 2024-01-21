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
      <div className="flex flex-col m-2 p-4 bg-tertiary border border-accentSecondary rounded-md">
        <div className="flex flex-col justify-between items-center w-full">
          <h1 className="text-lg font-bold">Your wallet is connected</h1>
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
              <span className="pt-[1px]">Edit wallet</span>
              <EditIcon />
            </div>
          </Button>
          <Button onClick={disconnectWallet} className="!p-2">
            <div className="flex items-center justify-between gap-1 text-xs">
              {/* <span>Edit</span> */}
              <span className="">Remove wallet</span>
              <DeleteIcon />
            </div>
          </Button>
        </div>
      </div>

      {/* Checkout form */}
      <div className=" m-2 border border-tertiary  relative">
        <button
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
        </button>

        <button
          className="absolute right-0 top-4 py-1 px-2"
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
    </div>
  );
}
