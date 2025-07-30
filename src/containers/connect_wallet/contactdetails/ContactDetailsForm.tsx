import { ConnectWalletFormError } from "../ConnectWalletForm";
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
import { useOverviewContactInfoContext } from "@/context/OverviewContactInfoContext";

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
    useOverviewContactInfoContext();

  const { createAccount, updateAccount, deleteAccount } = useSCAccount();

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

  const validateForm = useCallback(
    (allowDelete?: boolean) => {
      let emailErr: boolean = false;

      if (useremail === "") {
        if (allowDelete) {
          // deleteAccount();
        } else {
          emailErr = true;
        }
      } else {
        emailErr = !validateEmail(useremail);
      }

      if (emailErr) {
        setEmailError(emailErr);
        return false;
      }

      return true;
    },
    [useremail, setEmailError]
  );

  const onSubmit = useCallback(() => {
    setEmailError(false);

    if (mode === "create") {
      if (!validateForm()) return;
      createAccount(walletConnection!.stellarPubKey, useremail, username);
    } else if (mode === "update") {
      if (!validateForm(true)) return;
      setShowForm(false);
      if (walletConnection!.recipient) {
        updateAccount(useremail, username);
      } else {
        createAccount(walletConnection!.stellarPubKey, useremail, username);
      }
    }

    router.push("/dashboard");
  }, [
    walletConnection,
    username,
    useremail,
    validateForm,
    setEmailError,
    router,
    createAccount,
    updateAccount,
    mode,
    setShowForm,
  ]);

  const onSkip = useCallback(() => {
    setEmailError(false);

    updateWalletConnection();
    router.push("/dashboard");
  }, [setEmailError, updateWalletConnection, router]);

  useEffect(() => {
    if (mode === "update" && walletConnection?.recipient) {
      setUseremail(walletConnection.recipient.email);
      setUsername(walletConnection.recipient?.name ?? "");
    }
  }, [mode, walletConnection, setUseremail, setUsername]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 my-2">
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

      {mode === "create" && (
        <div className="mt-3 mb-4 flex justify-between md:justify-start gap-2">
          <Button onClick={onSubmit}>
            <FontAwesomeIcon icon={faFloppyDisk} />
            Save contact details
          </Button>
          <Button disabled={useremail !== ""} onClick={onSkip}>
            <FontAwesomeIcon icon={faForwardFast} /> Skip registration
          </Button>
        </div>
      )}

      {mode === "update" && (
        <div className="mt-5 mb-12 flex justify-between">
          <Button onClick={onSubmit} className="h-8 text-sm">
            <FontAwesomeIcon icon={faCheckCircle} /> Update registration
          </Button>
          {walletConnection?.recipient && (
            <Button
              className="!bg-red-500 hover:!bg-red-600 text-sm text-white h-8 border-0"
              onClick={() => setShowDeleteAccountDialog(true)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
