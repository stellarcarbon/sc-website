"use client";

import SelectWalletButton from "@/components/wallet/SelectWalletButton";
import { useAppContext } from "@/context/appContext";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import SelectWalletButtonDesktop from "@/components/wallet/SelectWalletButtonDesktop";

import FormError from "@/components/FormError";
import { PersonalDetails } from "@/app/types";
import LoadingWallets from "@/components/wallet/LoadingWallets";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import ContactInfoForm from "../ContactInfoForm";

export default function DemoConnectWallet() {
  const { connectWallet, connectionError, supportedWallets, walletConnection } =
    useAppContext();

  const [selectedWallet, setSelectedWallet] = useState<ISupportedWallet>();

  const [tncAccepted, setTncAccepted] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [useremail, setUseremail] = useState<string>("");

  const [selectWalletError, setSelectWalletError] = useState<boolean>(false);
  const [tncError, setTncError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const router = useRouter();

  const selectWallet = (wallet: ISupportedWallet) => {
    if (selectedWallet === wallet) {
      setSelectedWallet(undefined);
    } else {
      setSelectedWallet(wallet);
    }
  };

  const isValidEmail = (addr: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(addr);
  };

  const submitForm = () => {
    setTncError(!tncAccepted);
    setSelectWalletError(selectedWallet === undefined);
    setEmailError(
      (useremail !== "" || username !== "") && !isValidEmail(useremail)
    );

    if (
      selectedWallet === undefined ||
      !tncAccepted ||
      ((useremail !== "" || username !== "") && !isValidEmail(useremail))
    )
      return;

    const personalDetails: PersonalDetails = {
      username,
      useremail,
    };

    connectWallet(selectedWallet, personalDetails).then((didSucceed) => {
      if (didSucceed) {
        router.push("/demo/sink");
      }

      setSelectedWallet(undefined);
      setTncAccepted(false);
    });
  };

  useEffect(() => {
    if (walletConnection) {
      router.push("/demo/sink");
    }
  }, [walletConnection, router]);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-xl md:text-2xl font-bold">Connect your wallet</h1>

          <span className="text-sm mb-1 max-w-[80%] hidden md:block">
            Connect a wallet to be able to create new transactions and access
            your sinking history.
          </span>
          <span className="text-xs max-w-[80%] md:hidden">
            {selectedWallet
              ? `Current selection: ${selectedWallet.name}`
              : `Tap your wallet choice.`}
          </span>
        </div>
        {selectedWallet ? (
          <b className="hidden">{`${selectedWallet.name}`}</b>
        ) : (
          <></>
        )}

        {/* Mobile buttons */}
        <div className="md:hidden">
          {supportedWallets.length === 0 ? (
            <LoadingWallets />
          ) : (
            <div className="flex flex-wrap justify-center gap-6 px-4">
              {supportedWallets.map((supportedWallet, idx) => {
                return (
                  <SelectWalletButton
                    key={`selectWalletButton_${idx}`}
                    wallet={supportedWallet}
                    isSelected={supportedWallet.id === selectedWallet?.id}
                    onClick={() => selectWallet(supportedWallet)}
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
        <div className="md:block hidden min-w-full px-8">
          {supportedWallets.length === 0 ? (
            <LoadingWallets />
          ) : (
            <div className="flex flex-wrap gap-1 justify-start">
              {supportedWallets.map((supportedWallet, idx) => {
                return (
                  <SelectWalletButtonDesktop
                    key={`swbd_${idx}`}
                    wallet={supportedWallet}
                    isSelected={supportedWallet.id === selectedWallet?.id}
                    onClick={() => selectWallet(supportedWallet)}
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
      </div>

      {/* <Divider /> */}

      {/* Contact details */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold ">
          Contact details (optional)
        </h1>

        <span className="text-xs md:text-sm max-w-[80%] mb-4">
          Your contact details will be used to send you a confirmation of your
          purchases. This step is optional.
        </span>

        <ContactInfoForm
          username={username}
          setUsername={setUsername}
          useremail={useremail}
          setUseremail={setUseremail}
          emailError={emailError}
        />
      </div>

      {/* <Divider /> */}

      {/* Privacy policy */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold">Privacy policy</h1>
        <p className="text-xs md:text-sm max-w-[80%]">
          Read about our terms & conditions and privacy policy <u>here</u>.
        </p>

        <div
          className={`!cursor:pointer pl-2 gap-2 flex items-center font-bold border  border-transparent rounded-md 
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
      </div>
      {tncError && (
        <FormError className="ml-4">
          {"You have to accept the terms and conditions."}
        </FormError>
      )}

      <Button className="h-10 self-center" onClick={submitForm}>
        Connect wallet
      </Button>

      {connectionError && (
        <FormError id="SelectWalletError" className="ml-8">
          {connectionError}
        </FormError>
      )}
    </div>
  );
}
