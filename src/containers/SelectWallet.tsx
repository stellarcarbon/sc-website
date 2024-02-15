"use client";

import { WalletType } from "stellar-wallets-kit";
import SelectWalletButton from "../components/wallet/SelectWalletButton";
import { useAppContext } from "@/context/appContext";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import SelectWalletButtonDesktop from "../components/wallet/SelectWalletButtonDesktop";
import ContactInfoForm from "./ContactInfoForm";
import FormError from "../components/FormError";
import { PersonalDetails } from "@/app/types";
import LoadingWallets from "../components/wallet/LoadingWallets";
import { useRouter } from "next/navigation";

export default function SelectWallet() {
  const { connectWallet, connectionError, supportedWallets, walletConnection } =
    useAppContext();
  const [selectedWalletType, setSelectedWalletType] =
    useState<WalletType | null>(null);
  const [tncAccepted, setTncAccepted] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [useremail, setUseremail] = useState<string>("");

  const [selectWalletError, setSelectWalletError] = useState<boolean>(false);
  const [tncError, setTncError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const router = useRouter();

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
    setEmailError(
      (useremail !== "" || username !== "") && !isValidEmail(useremail)
    );

    if (
      selectedWalletType === null ||
      !tncAccepted ||
      ((useremail !== "" || username !== "") && !isValidEmail(useremail))
    )
      return;

    const personalDetails: PersonalDetails = {
      username,
      useremail,
    };

    connectWallet(selectedWalletType!, personalDetails).then((didSucceed) => {
      if (didSucceed) {
        router.push("/wallet");
      }

      setSelectedWalletType(null);
      setTncAccepted(false);
    });
  };

  useEffect(() => {
    if (walletConnection) {
      setSelectedWalletType(walletConnection.walletType);
      setTncAccepted(true);
      if (!walletConnection.isAnonymous && walletConnection.personalDetails) {
        setUsername(walletConnection.personalDetails.username);
        setUseremail(walletConnection.personalDetails.useremail);
      }
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-start bg-secondary md:border border-tertiary md:min-w-[600px] md:max-w-[650px] md:p-0 md:rounded-md border-gray shadow-lg">
        <h1 className="text-3xl font-bold mx-6 mt-8 md:mt-6 my-3">
          Select wallet
        </h1>

        <p className="text-sm mx-6 mb-1 max-w-[80%] hidden md:block">
          Connect a wallet to be able to create new transactions and access your
          sinking history.
        </p>
        <p className="text-sm mx-6 mb-1 max-w-[80%] md:hidden">
          {selectedWalletType
            ? `Current selection: ${selectedWalletType}`
            : `Tap your wallet choice.`}
        </p>
        {selectedWalletType ? (
          <b className="hidden">{`${selectedWalletType}`}</b>
        ) : (
          <></>
        )}

        {/* Mobile buttons */}
        <div className="mt-4 md:hidden">
          {supportedWallets.length === 0 ? (
            <LoadingWallets />
          ) : (
            <div className="flex flex-wrap justify-center gap-6 px-4">
              {supportedWallets.map((supportedWallet) => {
                return (
                  <SelectWalletButton
                    key={`selectWalletButton_${supportedWallet.type}`}
                    wallet={supportedWallet}
                    isSelected={selectedWalletType === supportedWallet.type}
                    onClick={() => selectWallet(supportedWallet.type)}
                    disabled={
                      !supportedWallet.isAvailable ||
                      supportedWallet.type === "WALLET_CONNECT"
                    }
                  />
                );
              })}
            </div>
          )}

          {selectWalletError && (
            <FormError className="text-center">
              {"Select a wallet to continue"}
            </FormError>
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

        <h1 className="text-3xl font-bold mx-6 my-3 mt-12">
          Contact details (optional)
        </h1>

        <p className="text-sm mx-6 mb-1 max-w-[80%]">
          Your contact details will be used to send you a confirmation of your
          purchases. This step is optional.
        </p>

        <ContactInfoForm
          username={username}
          setUsername={setUsername}
          useremail={useremail}
          setUseremail={setUseremail}
          emailError={emailError}
        />

        <h1 className="text-3xl font-bold mx-6 my-3 mt-14">Privacy policy</h1>
        <p className="text-sm mx-6 max-w-[80%]">
          Read about our terms & conditions and privacy policy <u>here</u>.
        </p>

        <div
          className={`mx-6 !cursor:pointer pl-2 gap-2 flex items-center font-bold border  border-transparent rounded-md 
        ${tncAccepted ? "bg-primary !border-accentSecondary" : "bg-secondary "}
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

        <Button className="mt-6 mb-9 self-center" onClick={submitForm}>
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
