import Button from "@/components/Button";
import { useAppContext } from "@/context/appContext";
import { useEffect, useState } from "react";

import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import WalletConnectionInfo from "./WalletConnectionInfo";
import TextInput from "@/components/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TransactionSummary from "./TransactionSummary";

export default function Overview() {
  const {
    walletConnection,
    updateWalletConnection,
    disconnectWallet,
    myTransactions,
  } = useAppContext();

  const [formUsername, setFormUsername] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUsername(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormEmail(event.target.value);
  };

  const isValidEmail = (addr: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(addr);
  };

  const submitForm = () => {
    if (formUsername === "" && formEmail === "") {
      updateWalletConnection(true);
      setShowContactInformationForm(false);
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
    setShowContactInformationForm(false);
    setFormError(undefined);
  };

  const [showContactInformationForm, setShowContactInformationForm] =
    useState<boolean>(false);

  useEffect(() => {
    if (showContactInformationForm) {
      setFormEmail(walletConnection?.personalDetails?.useremail ?? "");
      setFormUsername(walletConnection?.personalDetails?.username ?? "");
    }
  }, [
    showContactInformationForm,
    setFormEmail,
    setFormUsername,
    walletConnection,
  ]);

  return (
    <>
      <div className="mt-8">
        <WalletConnectionInfo />
      </div>

      <ParallaxDivider
        image={ParallaxBackgrounds.RAINFOREST}
        smallest
        yOffset={-20}
      />

      <div className="my-4">
        <TransactionSummary />
      </div>

      <ParallaxDivider
        smallest
        image={ParallaxBackgrounds.RAINFOREST}
        yOffset={-250}
      />

      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-between mx-4 md:mx-8">
          <h1 className="text-xl md:text-2xl font-semibold">
            Contact information
          </h1>
          <Button
            className="!text-sm h-7 !px-3"
            onClick={() => setShowContactInformationForm(true)}
          >
            Edit
          </Button>
        </div>
        <div className="mx-4 flex flex-col gap-1 md:mx-8">
          {showContactInformationForm ? (
            <div className="relative p-4 py-8 flex flex-col gap-2 items-center bg-primary rounded border border-accentSecondary">
              <span className="font-semibold">Update contact information</span>
              <span className="text-xs text-center">
                We will not store this information on our servers and only use
                it to send you certificates.
              </span>
              <div className="flex flex-col w-full mb-2">
                <span className="text-xs">Username</span>
                <TextInput
                  name="username"
                  value={formUsername}
                  onChange={onUsernameChange}
                  placeholder="Your username"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <span className="text-xs">Email</span>
                <TextInput
                  name="useremail"
                  value={formEmail}
                  onChange={onEmailChange}
                  placeholder="Your email address"
                />
              </div>
              <Button onClick={submitForm} className="mt-3">
                Update contact info
              </Button>
              <Button
                className="absolute top-[10px] left-[calc(100%-32px)] w-[24px] !py-1 !px-2 bg-tertiary text-white"
                onClick={() => setShowContactInformationForm(false)}
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
              {formError && (
                <div className="text-red-500 mt-2">{formError}</div>
              )}
            </div>
          ) : walletConnection?.isAnonymous ? (
            <div className="flex flex-col gap-2 text-center">
              <span className="text-sm mb-8 mt-4">
                Your session is anonymous. To receive personal certificates add
                your username and email address.
              </span>
              <div className="flex flex-col items-center mx-2">
                <Button onClick={disconnectWallet} className="!text-sm">
                  Disconnect wallet
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 text-base mb-5">
                <div className="flex justify-between items-center border-b border-b-tertiary">
                  <span className="text-white md:text-lg">Username</span>
                  <span className="text-xs md:text-base">
                    {walletConnection?.personalDetails?.username}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-b-tertiary">
                  <span className="text-white md:text-lg">Email</span>
                  <span className="text-xs md:text-base">
                    {walletConnection?.personalDetails?.useremail}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 mx-2">
                <Button onClick={disconnectWallet} className="!text-sm">
                  Disconnect wallet
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <ParallaxDivider
        smallest
        image={ParallaxBackgrounds.RAINFOREST}
        yOffset={-420}
      />
    </>
  );
}
