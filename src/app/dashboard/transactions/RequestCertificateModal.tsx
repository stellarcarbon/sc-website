import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { useAppContext } from "@/context/appContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface RequestCertificateModalProps {
  onClose: () => void;
  totalCarbonPending: number;
}

enum RequestCertificateModalStates {
  explain = "explain",
  request_anonymous_ceil = "request_anonymous_ceil",
  request_anonymous_floor = "request_anonymous_floor",
  request_ceil = "request_ceil",
  request_floor = "request_floor",
}

export default function RequestCertificateModal({
  onClose,
  totalCarbonPending,
}: RequestCertificateModalProps) {
  const { walletConnection, updateWalletConnection } = useAppContext();

  const [formUsername, setFormUsername] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>();

  const [modalState, setModalState] = useState<RequestCertificateModalStates>(
    RequestCertificateModalStates.explain
  );

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
    if (!isValidEmail(formEmail)) {
      setFormError("Invalid email address");
      return;
    }

    updateWalletConnection({
      username: formUsername,
      useremail: formEmail,
    });
  };

  const requestCeil = () => {
    if (walletConnection?.isAnonymous) {
      setModalState(RequestCertificateModalStates.request_anonymous_ceil);
    } else {
      setModalState(RequestCertificateModalStates.request_ceil);
    }
  };

  const requestFloor = () => {
    if (walletConnection?.isAnonymous) {
      setModalState(RequestCertificateModalStates.request_anonymous_floor);
    } else {
      setModalState(RequestCertificateModalStates.request_floor);
    }
  };

  let modalContent = <div></div>;

  if (modalState === RequestCertificateModalStates.explain) {
    modalContent = (
      <div className="p-1 flex flex-col gap-4 items-center justify-between h-full">
        <div className="flex w-full justify-center">
          <h2 className="text-xl font-semibold mr-4">
            Requesting a certificate
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-center text-sm md:text-base">
          <span className="">
            To create a certificate we have to submit a whole number of{" "}
            <CARBONCurrencyIcon className="inline" /> to the Verra registry. We
            recommend you add the remaining fraction to request a certificate
            for {Math.ceil(totalCarbonPending)}{" "}
            <CARBONCurrencyIcon className="inline" /> by sinking an additional{" "}
            {(1 - (totalCarbonPending % 1)).toFixed(2)} tonnes.{" "}
            {totalCarbonPending > 1 && (
              <span>
                Alternatively, you can round down and request a certificate for{" "}
                {Math.floor(totalCarbonPending)} tonnes.
              </span>
            )}
          </span>

          <span className="">
            Creating a personal certificate at the Verra registry is completely
            optional. All CARBON transactions will eventually be retired using
            community certificates.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={requestCeil} className="text-sm md:text-base">
            Sink remaining fraction
          </Button>
          <Button
            onClick={requestFloor}
            className="text-sm md:text-base"
            disabled={totalCarbonPending < 1}
          >
            Round down
          </Button>
        </div>
      </div>
    );
  }

  if (
    modalState === RequestCertificateModalStates.request_anonymous_ceil ||
    modalState === RequestCertificateModalStates.request_anonymous_floor
  ) {
    modalContent = (
      <>
        <h2 className="text-xl md:text-3xl">Request certificate</h2>
        <span className="text-center">
          Your wallet connection is anonymous. This means we cannot send you a
          personalized certificate.
        </span>

        <div className="flex-1 flex flex-col justify-center gap-6 items-center mt-10 mb-8">
          <span>
            Please add your contact information so we can create personalized
            certificates for you.
          </span>
          <div className="flex flex-col gap-3 md:w-[70%]">
            <TextInput
              name="username"
              placeholder="Your name"
              value={formUsername}
              onChange={onUsernameChange}
            />
            <TextInput
              name="useremail"
              placeholder="Your email address"
              value={formEmail}
              onChange={onEmailChange}
            />
          </div>
          <Button onClick={submitForm} className="w-[200px]">
            Update contact info
          </Button>
          {formError && <div className="text-red-500">{formError}</div>}
        </div>
      </>
    );
  }

  useEffect(() => {
    document
      .getElementById("request_certificate_modal")
      ?.scroll({ top: 0, behavior: "smooth" });
  }, [modalState]);

  return (
    <Modal>
      <div
        id="request_certificate_modal"
        className="relative flex flex-col gap-4 md:gap-12 py-8 px-6 md:px-12 justify-start items-center bg-primary w-[90%] md:w-[60%] lg:w-[60%] mt-[60px] h-[60%] lg:h-[70%] max-w-[800px] opacity-100 shadow-xl rounded-md overflow-auto"
      >
        {modalContent}
        <Button
          onClick={onClose}
          className="absolute top-0 right-0 mr-4 mt-4 w-8 !px-4 bg-secondary"
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      </div>
    </Modal>
  );
}
