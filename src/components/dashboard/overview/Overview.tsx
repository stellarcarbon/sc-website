"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import TransactionSummary from "../TransactionSummary";
import OverviewContactInformationForm from "./ContactInformationForm";
import DashboardTitle from "../DashboardTitle";
import WalletDetails from "../WalletDetails";
import ConnectWalletCTA from "@/components/ConnectWalletCTA";
import TruncatedHash from "../TruncatedHash";
import WalletConnectionButtons from "./wcbuttons";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const { walletConnection, disconnectWallet } = useAppContext();

  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <>
      {walletConnection && (
        <div className="mt-6 w-full">
          <div
            className="flex items-center justify-between p-2 mx-4
          bg-secondary border rounded border-accentSecondary"
          >
            <div className="flex items-center gap-2">
              <img className="h-6 w-6" src={walletConnection.walletType.icon} />
              <div>Freighter</div>
            </div>

            <div>
              <TruncatedHash hash={walletConnection.stellarPubKey} uppercase />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full flex-1 gap-10 justify-start">
        <div className="flex flex-col gap-1">
          <div className="p-4">
            <TransactionSummary />
          </div>
        </div>

        {walletConnection && (
          <div className="flex flex-col gap-1 text-sm ">
            <div className="bg-darker h-12 flex items-center justify-between px-4 text-lg border-yz border-accentSecondary">
              <div>Your contact information</div>
              <button
                className="bg-accent rounded text-black text-xs flex items-center gap-1 px-2 p-1"
                onClick={() => setShowContactInformationForm(true)}
              >
                <FontAwesomeIcon icon={faEdit} />
                <div>Edit</div>
              </button>
            </div>

            <div className="p-4">
              {showContactInformationForm ? (
                <OverviewContactInformationForm
                  onClose={() => setShowContactInformationForm(false)}
                />
              ) : walletConnection?.isAnonymous ? (
                <div className="text-center">
                  {
                    "This account is anonymous. No PDF certificates will be emailed."
                  }
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="text-xs">
                    Your contact info will only be used to send you personal
                    certificates.
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-semibold border-b border-accentSecondary">
                      Username
                    </div>
                    <div>{walletConnection?.personalDetails?.username}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-semibold border-b border-accentSecondary">
                      Email
                    </div>
                    <div>{walletConnection?.personalDetails?.useremail}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* {walletConnection && (
          <div className="flex flex-col gap-1 text-sm">
            <div className="bg-darker h-12 flex items-center justify-between px-4 text-lg border-yz border-accentSecondary">
              <div>Wallet</div>

              <button
                className="bg-accent rounded text-black text-xs flex items-center gap-1 px-2 p-1"
                onClick={() => setShowContactInformationForm(true)}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <div>Disconnect</div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <img
                  className="h-6 w-6"
                  src={walletConnection.walletType.icon}
                />
                <div>Freighter</div>
              </div>

              <div>
                <TruncatedHash
                  hash={walletConnection.stellarPubKey}
                  uppercase
                />
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
