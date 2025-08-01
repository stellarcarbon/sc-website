import { ConnectWalletFormError } from "./connect_wallet/ConnectWalletForm";
import { useContactDetailsContext } from "@/context/ContactDetailsContext";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { useCallback, useEffect } from "react";
import { useAppContext } from "@/context/appContext";
import { validateEmail } from "@/utils";
import { useRouter } from "next/navigation";
import { useSCAccount } from "@/hooks/useSCAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faFloppyDisk,
  faForwardFast,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useInlineContactInfoContext } from "@/context/InlineContactInfoContext";
import MessageBox from "@/components/MessageBox";

export default function ContactDetailsForm() {
  const { updateWalletConnection, walletConnection } = useAppContext();
  const {
    username,
    setUsername,
    useremail,
    setUseremail,
    emailError,
    setEmailError,
    mode,
  } = useContactDetailsContext();
  const { setShowForm, setShowDeleteAccountDialog } =
    useInlineContactInfoContext();

  const { createAccount, updateAccount } = useSCAccount();

  const router = useRouter();

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const useremailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emailError && validateEmail(event.target.value)) {
      setEmailError(false);
    }

    setUseremail(event.target.value);
    if (event.target.value === "") {
      setUsername("");
    }
  };

  const validateForm = useCallback(() => {
    let emailErr: boolean = false;
    console.log(useremail);

    if (useremail === "") {
      emailErr = true;
    } else {
      emailErr = !validateEmail(useremail);
    }

    if (emailErr) {
      setEmailError(emailErr);
      return false;
    }

    return true;
  }, [useremail, setEmailError]);

  const onSubmitRegistration = useCallback(() => {
    setEmailError(false);

    if (!validateForm() || !walletConnection) return;

    if (mode === "create") {
      createAccount(walletConnection.stellarPubKey, useremail, username);
    } else if (mode === "update") {
      updateAccount(useremail, username);
    }

    router.push("/dashboard");
  }, [
    walletConnection,
    useremail,
    username,
    createAccount,
    updateAccount,
    setEmailError,
    validateForm,
    mode,
    router,
  ]);

  const onSubmitInline = useCallback(() => {
    setEmailError(false);

    if (!validateForm() || !walletConnection) return;

    setShowForm(false);

    if (walletConnection.recipient) {
      updateAccount(useremail, username);
    } else {
      createAccount(walletConnection.stellarPubKey, useremail, username);
    }
  }, [
    walletConnection,
    useremail,
    username,
    createAccount,
    updateAccount,
    setEmailError,
    validateForm,
    setShowForm,
  ]);

  const onSkip = useCallback(() => {
    setEmailError(false);

    updateWalletConnection();
    router.push("/dashboard");
  }, [setEmailError, updateWalletConnection, router]);

  useEffect(() => {
    if (mode !== "create" && walletConnection?.recipient) {
      setUseremail(walletConnection.recipient.email);
      setUsername(walletConnection.recipient?.name ?? "");
    }
  }, [mode, walletConnection, setUseremail, setUsername]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 my-2 md:my-3 mb-6 md:mb-6">
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm" htmlFor="useremail">
            E-mail
          </label>
          <TextInput
            name="useremail"
            placeholder="Your email address"
            value={useremail}
            onChange={useremailOnChange}
          />
          {emailError && (
            <ConnectWalletFormError message={"Invalid email address"} />
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm" htmlFor="username">
            Name
          </label>
          <TextInput
            disabled={useremail === ""}
            name="username"
            placeholder="Your name"
            value={username}
            onChange={usernameOnChange}
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        {mode === "create" && (
          <>
            <SaveButton onClick={onSubmitRegistration} />
            <SkipButton disabled={useremail !== ""} onClick={onSkip} />
          </>
        )}

        {mode === "update" && (
          <>
            <UpdateButton onClick={onSubmitRegistration} />
            {walletConnection?.recipient && (
              <DeleteButton onClick={() => setShowDeleteAccountDialog(true)} />
            )}
          </>
        )}

        {mode === "overview" && (
          <>
            {walletConnection?.recipient ? (
              <UpdateButton onClick={onSubmitInline} />
            ) : (
              <SaveButton onClick={onSubmitInline} />
            )}

            {walletConnection?.recipient && (
              <DeleteButton onClick={() => setShowDeleteAccountDialog(true)} />
            )}
          </>
        )}

        {mode === "rounddown" && <SaveButton onClick={onSubmitInline} />}
      </div>
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="h-8 text-sm">
      <FontAwesomeIcon icon={faFloppyDisk} />
      Save contact details
    </Button>
  );
}

function SkipButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <Button disabled={disabled} onClick={onClick} className="h-8 text-sm">
      <FontAwesomeIcon icon={faForwardFast} /> Skip registration
    </Button>
  );
}

function UpdateButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="h-8 text-sm">
      <FontAwesomeIcon icon={faCheckCircle} /> Update registration
    </Button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="!bg-red-500 hover:!bg-red-600 text-sm text-white h-8 border-0"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTrash} /> Delete
    </Button>
  );
}
