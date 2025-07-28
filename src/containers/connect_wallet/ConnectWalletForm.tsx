"use client";

import Button from "@/components/Button";
import SelectWallet from "./SelectWallet";
import AcceptTnC from "./AcceptTnC";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import SectionHeader from "@/components/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ConnectWalletForm() {
  const { submitForm, walletsKitError, noWalletError } =
    useConnectWalletContext();

  return (
    <>
      <div className="flex-1 md:flex-none md:my-8 w-full md:max-w-[780px] bg-darkest md:rounded md:border md:border-tertiary overflow-hidden">
        <SectionHeader>
          <div className="text-center text-2xl w-full">Connect wallet</div>
        </SectionHeader>
        <div className="p-3 py-6 pb-12 md:p-6 flex flex-col gap-9">
          <SelectWallet />
          {/* <ContactDetails /> */}
          <AcceptTnC />

          {walletsKitError && (
            <WalletsKitError message={walletsKitError}></WalletsKitError>
          )}

          {noWalletError && <NoWalletError />}

          <Button className="self-center" onClick={submitForm}>
            <FontAwesomeIcon icon={faLink} />
            <div>Connect wallet</div>
          </Button>
        </div>
      </div>
    </>
  );
}

function WalletsKitError({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-lg p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-1 justify-center">
        <FontAwesomeIcon className="text-red-800" icon={faWarning} />
        <div className="text-red-800 font-semibold text-center">
          Something went wrong
        </div>
      </div>
      <div className="mt-2 text-red-700 text-center text-sm">{message}</div>
    </div>
  );
}

function NoWalletError() {
  return (
    <div className="mx-auto max-w-lg p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-1 justify-center text-red-800">
        That wallet does not exist. Did you fund it yet?
      </div>
    </div>
  );
}

export function ConnectWalletFormError({ message }: { message: string }) {
  return <div className="text-red-500">{message}</div>;
}
