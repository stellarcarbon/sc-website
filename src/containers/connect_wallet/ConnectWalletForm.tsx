"use client";

import Button from "@/components/Button";
import SelectWallet from "./SelectWallet";
import ContactDetails from "./ContactDetails";
import AcceptTnC from "./AcceptTnC";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import FormError from "@/components/FormError";
import SectionHeader from "@/components/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletForm() {
  const { submitForm, connectionError } = useConnectWalletContext();

  return (
    <>
      <div className="flex-1 md:flex-none lg:my-8 w-full md:max-w-[780px] bg-darkest md:rounded md:border md:border-tertiary overflow-hidden">
        <SectionHeader>
          <div className="text-center text-2xl w-full">Connect wallet</div>
        </SectionHeader>
        <div className="p-3 py-6 pb-12 md:p-6 flex flex-col gap-9">
          <SelectWallet />
          <ContactDetails />
          <AcceptTnC />

          {connectionError && <FormError>{connectionError}</FormError>}

          <Button className="self-center" onClick={submitForm}>
            <FontAwesomeIcon icon={faLink} />
            <div>Connect wallet</div>
          </Button>
        </div>
      </div>
    </>
  );
}
