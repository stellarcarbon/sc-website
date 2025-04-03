"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";
import TransactionSummary from "../TransactionSummary";
import OverviewContactInformationForm from "./ContactInformationForm";
import TruncatedHash from "../TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const { walletConnection } = useAppContext();
  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <div className="md:pb-6 md:py-4">
      {walletConnection && (
        <div className="mt-6 w-full">
          <div className="mx-3 mb-3 text-xl md:text-2xl font-bold flex gap-4 justify-between items-center border-b border-tertiary">
            <span className="text-2xl">Wallet</span>
          </div>
          <div
            className="flex items-center justify-between p-2 mx-3
          bg-secondary border rounded border-accentSecondary"
          >
            <div className="flex items-center gap-2">
              <div className="p-1">
                <img
                  className="h-6 w-6"
                  src={walletConnection?.walletType.icon}
                />
              </div>
              <div>{walletConnection?.walletType.name}</div>
            </div>

            <div>
              <TruncatedHash hash={walletConnection.stellarPubKey} uppercase />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full flex-1 justify-start">
        <div className="p-3 md:my-10">
          <TransactionSummary />
        </div>

        {walletConnection && (
          <div className="flex flex-col gap-1 text-sm ">
            <div className="bg-darker h-12 flex items-center justify-between px-4 text-2xl border-yz border-accentSecondary">
              <div>Contact information</div>
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
                <div className="text-center text-base">
                  This account is anonymous. No PDF certificates will be
                  emailed.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="text-xs">
                    Your contact info will only be used to send you personal
                    certificates.
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold border-b border-accentSecondary flex justify-between">
                      <div>Username</div>
                      <div className="text-accent font-normal">
                        {walletConnection?.personalDetails?.username}
                      </div>
                    </div>
                    <div className="text-xs mt-2">
                      This name will used on your personal certificates.
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold border-b border-accentSecondary flex justify-between">
                      <div>Email</div>
                      <div className="text-accent font-normal">
                        {walletConnection?.personalDetails?.useremail}
                      </div>
                    </div>
                    <div className="text-xs mt-2">
                      Your email address is only used to send certificates.
                    </div>
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
    </div>
  );
}
