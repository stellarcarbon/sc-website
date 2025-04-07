"use client";

import { useAppContext } from "@/context/appContext";
import { useState } from "react";
import TransactionSummary from "../TransactionSummary";
import OverviewContactInformationForm from "./ContactInformationForm";
import TruncatedHash from "../TruncatedHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DashboardHeader from "../DashboardHeader";
import SectionHeader from "@/components/SectionHeader";

export default function Overview() {
  const { walletConnection } = useAppContext();
  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  return (
    <div className="">
      {walletConnection && (
        <div className="flex flex-col w-full justify-start px-3 md:px-6 mb-8">
          <DashboardHeader>Connected wallet</DashboardHeader>
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
              <TruncatedHash hash={walletConnection.stellarPubKey} uppercase />
            </div>
          </div>
        </div>
      )}

      <SectionHeader>Your transactions</SectionHeader>

      <TransactionSummary />

      {walletConnection && (
        <div className="flex flex-col gap-1">
          <SectionHeader>
            <div>Contact information</div>
            <button
              className="bg-accent rounded text-black text-sm md:text-base flex items-center gap-1 px-2 p-1"
              onClick={() => setShowContactInformationForm(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
              <div>Edit</div>
            </button>
          </SectionHeader>

          <div className="p-3 md:p-6 mb-6">
            {showContactInformationForm ? (
              <OverviewContactInformationForm
                onClose={() => setShowContactInformationForm(false)}
              />
            ) : walletConnection?.isAnonymous ? (
              <div className="text-center text-sm">
                This account is anonymous. No PDF certificates will be emailed.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="text-sm">
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
    </div>
  );
}
