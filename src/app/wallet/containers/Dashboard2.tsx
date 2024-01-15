import CaretUpIcon from "@/app/icons/CaretUpIcon";
import DisconnectWalletButton from "../components/DisconnectWalletButton";
import PersonalDetailsDisplay from "../components/PersonalDetailsDisplay";
import { useState } from "react";
import CaretDownIcon from "@/app/icons/CaretDownIcon";
import EditIcon from "@/app/icons/EditIcon";
import PaymentList from "./PaymentList";
import { useAppContext } from "@/app/context/appContext";
import CheckoutForm from "./CheckoutForm";

export default function Dashboard2() {
  const { walletConnection } = useAppContext();
  const [isCheckoutExpanded, setIsCheckoutExpanded] = useState<boolean>(false);

  return (
    <div className="flex flex-col bg-secondary w-full min-h-[calc(100vh-176px)] md:max-w-[800px] md:p-4 md:rounded-md">
      {/* <h1 className="self-center text-lg font-bold">My Stellarcarbon</h1> */}

      {/* Connection info */}
      <div className="flex flex-col m-2 p-4 bg-tertiary border border-accentSecondary rounded-md">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-bold">Connection info</h1>
          <button className="flex items-center gap-1 text-sm text-accent">
            <span>Edit</span>
            <EditIcon />
          </button>
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
      <div className="flex items-center m-2 min-h-9 border border-tertiary text-accent relative">
        <div
          className="absolute right-0 top-0 py-1 px-2"
          onClick={() => {
            setIsCheckoutExpanded(!isCheckoutExpanded);
          }}
        >
          {isCheckoutExpanded ? <CaretDownIcon /> : <CaretUpIcon />}
        </div>

        {isCheckoutExpanded ? (
          <CheckoutForm />
        ) : (
          <span className="ml-2 ">Click to sink carbon</span>
        )}
      </div>

      <hr className="w-[calc(100%-32px)] m-2 self-center border-accentSecondary" />

      {/* Infinite scroll */}
      <PaymentList />

      <DisconnectWalletButton />
    </div>
  );
}
