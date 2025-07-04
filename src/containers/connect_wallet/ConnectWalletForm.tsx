"use client";

import Button from "@/components/Button";
import SelectWallet from "./SelectWallet";
import ContactDetails from "./ContactDetails";
import AcceptTnC from "./AcceptTnC";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import FormError from "@/components/FormError";
import SectionHeader from "@/components/SectionHeader";

export default function ConnectWalletForm() {
  const { submitForm, connectionError } = useConnectWalletContext();

  return (
    <>
      <div className="md:hidden w-full">
        <SectionHeader>
          <div className="text-center text-2xl w-full">Connect wallet</div>
        </SectionHeader>
      </div>
      <div className="flex-1 lg:my-8 w-full md:max-w-[780px] p-3 py-6 pb-12 md:p-6 flex flex-col justify-between gap-9 bg-darker md:rounded md:border md:border-tertiary overflow-hidden">
        <SelectWallet />
        <ContactDetails />
        <AcceptTnC />

        {connectionError && <FormError>{connectionError}</FormError>}

        <Button className="h-10 self-center" onClick={submitForm}>
          Connect wallet
        </Button>
      </div>
    </>
  );
}
