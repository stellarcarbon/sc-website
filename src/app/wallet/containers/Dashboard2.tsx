import CaretUpIcon from "@/app/icons/CaretUpIcon";
import DisconnectWalletButton from "../components/DisconnectWalletButton";
import PersonalDetailsDisplay from "../components/PersonalDetailsDisplay";
import { useState } from "react";
import CaretDownIcon from "@/app/icons/CaretDownIcon";
import EditIcon from "@/app/icons/EditIcon";
import PaymentList from "./PaymentList";
import { useAppContext } from "@/app/context/appContext";

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
        <div className="flex justify-between">
          <span>Wallet</span>
          <span>{walletConnection?.walletType}</span>
        </div>
        <div className="flex justify-between">
          <span>Stellar PubKey</span>
          <span className="text-xs break-words max-w-[50%]">
            {walletConnection?.stellarPubKey}
          </span>
        </div>
        <PersonalDetailsDisplay />
      </div>

      {/* Checkout form */}
      <div
        className="flex justify-between items-center px-4 py-2 m-2 text-accent border border-tertiary"
        onClick={() => {
          setIsCheckoutExpanded(!isCheckoutExpanded);
        }}
      >
        <span>Click to sink carbon</span>
        {isCheckoutExpanded ? <CaretDownIcon /> : <CaretUpIcon />}
      </div>

      <hr className="w-[calc(100%-32px)] m-2 self-center border-accentSecondary" />

      {/* Infinite scroll */}
      <PaymentList />

      <DisconnectWalletButton />
    </div>
  );
}
