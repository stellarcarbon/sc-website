"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";
import TransactionSummary from "../TransactionSummary";
import OverviewContactInformationForm from "./ContactInformationForm";
import TruncatedHash from "../TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import DashboardHeader from "../DashboardHeader";
import SectionHeader from "@/components/SectionHeader";

export default function Overview() {
  const { walletConnection, disconnectWallet } = useAppContext();
  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <div className="">
      {/* <SectionHeader>Your transactions</SectionHeader> */}

      <TransactionSummary />

      {walletConnection && (
        <div className="flex flex-col">
          <SectionHeader>
            <div>Contact information</div>
            <button
              className="font-normal bg-accent rounded text-black text-sm md:text-base flex items-center gap-1 px-2 p-1"
              onClick={() => setShowContactInformationForm(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
              <div>Edit</div>
            </button>
          </SectionHeader>

          <div className="p-3 md:p-6 my-1">
            {showContactInformationForm ? (
              <OverviewContactInformationForm
                onClose={() => setShowContactInformationForm(false)}
              />
            ) : walletConnection?.isAnonymous ? (
              <div className="text-center">
                This account is anonymous. No PDF certificates will be emailed.
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 text-lg">
                  <div className="flex justify-between">
                    <div className="">Username</div>
                    <div className="">
                      {walletConnection.personalDetails!.username}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>Email</div>
                    <div>{walletConnection.personalDetails!.useremail}</div>
                  </div>
                  <div className="text-xs">
                    Your username and email address are only used to send you
                    your personal certificates.
                  </div>
                </div>
                {/* <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold flex justify-between">
                      <div>Username</div>
                      <div className="font-normal">
                        {walletConnection?.personalDetails?.username}
                      </div>
                    </div>
                    <hr className="mt-1 border border-accentSecondary w-[110px]" />
                    <div className="text-xs mt-2">
                      This name is used to personalize your certificates.
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold border-b-2 border-accentSecondary flex justify-between">
                      <div>Email</div>
                      <div className="font-normal">
                        {walletConnection?.personalDetails?.useremail}
                      </div>
                    </div>
                    <div className="text-xs mt-2">
                      Your email address is only used to send certificates.
                    </div>
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      )}

      {walletConnection && (
        <>
          <SectionHeader>
            <div>Connected wallet</div>
            <button
              onClick={disconnectWallet}
              className="font-normal bg-accent rounded text-black text-sm md:text-base flex items-center gap-1 px-2 p-1"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Disconnect
            </button>
          </SectionHeader>

          <div className="flex flex-col w-full justify-start px-3 md:px-6 my-6">
            {/* <DashboardHeader>Connected wallet</DashboardHeader> */}
            <div
              className="flex items-center justify-between p-2
          bg-darker border rounded border-accentSecondary"
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
                <TruncatedHash
                  hash={walletConnection.stellarPubKey}
                  uppercase
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
