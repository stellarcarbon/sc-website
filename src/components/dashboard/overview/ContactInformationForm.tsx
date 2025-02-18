"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { useAppContext } from "@/context/appContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";

interface OverviewContactInformationForm {
  onClose: () => void;
}

export default function OverviewContactInformationForm({
  onClose,
}: OverviewContactInformationForm) {
  const { updateWalletConnection, walletConnection } = useAppContext();

  const [formUsername, setFormUsername] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>();

  useEffect(() => {
    if (walletConnection?.personalDetails !== undefined) {
      setFormUsername(walletConnection.personalDetails.username);
      setFormEmail(walletConnection.personalDetails.useremail);
    }
  }, [walletConnection]);

  const onUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormUsername(event.target.value);
    },
    [setFormUsername]
  );

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormEmail(event.target.value);
    },
    [setFormEmail]
  );

  const isValidEmail = useCallback((addr: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(addr);
  }, []);

  const submitForm = useCallback(() => {
    if (formUsername === "" && formEmail === "") {
      updateWalletConnection(true);
      onClose();
      setFormError(undefined);
      return;
    }

    if (!isValidEmail(formEmail)) {
      setFormError("Invalid email address");
      return;
    }

    updateWalletConnection(false, {
      username: formUsername,
      useremail: formEmail,
    });
    onClose();
    setFormError(undefined);
  }, [formEmail, formUsername, isValidEmail, onClose, updateWalletConnection]);

  return (
    <div className="w-full relative mx-4 md:mx-8 px-4 md:px-8 py-8 flex flex-col gap-2 items-center bg-darker rounded border border-accentSecondary self-center ">
      <span className="md:text-xl font-semibold">
        Update contact information
      </span>
      <span className="text-xs md:text-sm text-center">
        We do not use this information for any purpose than sending you
        personalized certificates.
      </span>
      <div className="flex flex-col w-full mb-2">
        <span className="text-xs">Name</span>
        <TextInput
          name="username"
          value={formUsername}
          onChange={onUsernameChange}
          placeholder="Your username"
        />
      </div>
      <div className="flex flex-col w-full mb-2">
        <span className="text-xs">E-mail</span>
        <TextInput
          name="useremail"
          value={formEmail}
          onChange={onEmailChange}
          placeholder="Your email address"
        />
      </div>
      <Button onClick={submitForm} className="mt-3 !text-sm">
        Update contact info
      </Button>
      <Button
        className="absolute top-[10px] left-[calc(100%-32px)] w-[24px] !py-1 !px-2 bg-secondary text-white"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </Button>
      {formError && <div className="text-red-500 mt-2">{formError}</div>}
    </div>
  );
}
