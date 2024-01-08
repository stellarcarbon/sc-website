"use client";

import { WalletType } from "stellar-wallets-kit";
import SelectWalletButton from "../components/SelectWalletButton";
import { useAppContext } from "@/app/context/appContext";
import { useState } from "react";
import Button from "../../components/Button";
import SelectWalletButtonDesktop from "../components/SelectWalletButtonDesktop";
import ContactInfo from "./ContactInfo";
import FormError from "@/app/components/FormError";
import { PersonalDetails } from "@/app/context/types";
import LoadingWallets from "../components/LoadingWallets";

export default function SelectWallet() {
  const { connectWallet, connectionError, supportedWallets } = useAppContext();
  const [selectedWalletType, setSelectedWalletType] =
    useState<WalletType | null>(null);
  const [tncAccepted, setTncAccepted] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [useremail, setUseremail] = useState<string>("");

  const [selectWalletError, setSelectWalletError] = useState<boolean>(false);
  const [tncError, setTncError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const selectWallet = (wType: WalletType) => {
    if (selectedWalletType === wType) {
      setSelectedWalletType(null);
    } else {
      setSelectedWalletType(wType);
    }
  };

  const isValidEmail = (addr: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(addr);
  };

  const submitForm = () => {
    setTncError(!tncAccepted);
    setSelectWalletError(selectedWalletType === null);
    setEmailError(useremail !== "" && !isValidEmail(useremail));

    if (
      selectedWalletType === null ||
      !tncAccepted ||
      (useremail !== "" && !isValidEmail(useremail))
    )
      return;

    const personalDetails: PersonalDetails = {
      username,
      useremail,
    };

    connectWallet(selectedWalletType!, personalDetails);

    // TODO: move this form-reset to after completing the pop-up
    setSelectedWalletType(null);
    setTncAccepted(false);
  };

  return (
    <>
      <div className="flex flex-col items-start bg-secondary text-white md:min-w-[600px] md:max-w-[800px] py-10 md:p-6 rounded-md border-gray shadow-lg">
        {/* <p className="px-8">
          Select a wallet that will be used for signing the Stellarcarbon
          transaction.
        </p> */}
        <h1 className="text-2xl font-bold mx-8 my-1">Select a wallet</h1>
        <p className="text-sm mx-8 my-1 max-w-[80%]">
          To continue you will need a wallet to sign the sinking transaction.
          Connect a wallet to be able to create new transactions and access your
          sinking history.
          <br />
          <br />
          By sinking CARBON tokens you are helping prevent more CO2 emissions
          from occuring :)
        </p>
        {selectedWalletType ? (
          <b className="hidden">{`${selectedWalletType}`}</b>
        ) : (
          <></>
        )}

        {/* Mobile buttons */}
        <div className="mt-4 md:hidden min-w-full">
          {supportedWallets.length === 0 ? (
            <LoadingWallets />
          ) : (
            <div className="flex flex-wrap justify-center gap-6 px-2">
              {supportedWallets.map((supportedWallet) => {
                return (
                  <SelectWalletButton
                    key={`selectWalletButton_${supportedWallet.type}`}
                    wallet={supportedWallet}
                    isSelected={selectedWalletType === supportedWallet.type}
                    onClick={() => selectWallet(supportedWallet.type)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop buttons */}
        <div className="md:block hidden my-4 min-w-full px-8">
          {supportedWallets.length === 0 ? (
            <LoadingWallets />
          ) : (
            <div className="flex flex-wrap gap-1 justify-start">
              {supportedWallets.map((supportedWallet) => {
                return (
                  <SelectWalletButtonDesktop
                    key={`swbd_${supportedWallet.type}`}
                    wallet={supportedWallet}
                    isSelected={selectedWalletType === supportedWallet.type}
                    onClick={() => selectWallet(supportedWallet.type)}
                  >
                    {supportedWallet.name}
                  </SelectWalletButtonDesktop>
                );
              })}
            </div>
          )}

          {selectWalletError && (
            <FormError>{"Select a wallet to continue"}</FormError>
          )}
        </div>

        <h1 className="text-2xl font-bold mx-8 my-1 mt-4">
          Contact details (optional)
        </h1>

        <p className="text-sm mx-8 mb-1 max-w-[80%]">
          Your contact details will be used to send you a confirmation of your
          purchases. This step is optional.
        </p>

        <ContactInfo
          username={username}
          setUsername={setUsername}
          useremail={useremail}
          setUseremail={setUseremail}
          emailError={emailError}
        />

        <div className="h-1 w-full my-6" />

        <h1 className="text-2xl font-bold mx-8 my-1">
          Accept terms & conditions
        </h1>
        <p className="text-sm mx-8 mb-4 max-w-[80%]">
          Read about our terms & conditions and privacy policy <u>here</u>.
        </p>

        <div className="mx-8 ">
          <div
            className={`px-4 gap-2 flex items-center border border-transparent rounded-md shadow-md
        ${tncAccepted ? "bg-accent text-black  !border-black" : "bg-primary "}
        `}
          >
            <input
              className="w-5 h-5"
              type="checkbox"
              checked={tncAccepted}
              onChange={() => setTncAccepted(!tncAccepted)}
              id="checkbox_policy"
            />
            <label
              className="p-2 cursor-pointer text-sm "
              htmlFor="checkbox_policy"
            >
              I have read and agree with the terms & conditions and the privacy
              policy.
            </label>
          </div>
          {tncError && (
            <FormError className="ml-4">
              {"You have to accept the terms and conditions."}
            </FormError>
          )}
        </div>

        <Button className="ml-8 mt-8" onClick={submitForm}>
          Connect wallet
        </Button>

        {connectionError && (
          <FormError id="SelectWalletError" className="ml-8">
            {connectionError}
          </FormError>
        )}
      </div>
    </>
  );
}
