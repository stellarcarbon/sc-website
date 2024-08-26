"use client";

import RoundingService from "@/app/services/RoundingService";
import { AuthService } from "@/client";
import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import TextInput from "@/components/TextInput";
import { useAppContext } from "@/context/appContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { SEP10ChallengeResponse } from "@/client/models/SEP10ChallengeResponse";

interface RequestCertificateProps {
  totalCarbonPending: number;
}

enum RequestCertificateStates {
  info = "info",
  anonymous = "anonymous",
  choose = "choose",
}

export default function RequestCertificate({
  totalCarbonPending,
}: RequestCertificateProps) {
  const { updateWalletConnection, walletConnection, setHasPendingRounding } =
    useAppContext();
  const router = useRouter();

  const [step, setStep] = useState<RequestCertificateStates>(
    RequestCertificateStates.info
  );

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
    if (!isValidEmail(formEmail)) {
      setFormError("Invalid email address");
      return;
    }

    updateWalletConnection(false, {
      username: formUsername,
      useremail: formEmail,
    });

    setStep(RequestCertificateStates.choose);
  };

  const remainingFraction = useMemo(() => {
    return Math.ceil(totalCarbonPending) - totalCarbonPending;
  }, [totalCarbonPending]);

  const sinkRemaining = () => {
    router.push(`/dashboard/sink/?amount=${remainingFraction.toFixed(3)}`);
  };

  let body = <></>;
  if (step === RequestCertificateStates.info) {
    body = (
      <div className="p-4 flex flex-col gap-4 items-center">
        <span className="text-center">
          Any pending retirements will automatically retire into the community
          pool after 90 days.
        </span>

        <span className="text-center">
          If you want to create a personal certificate you have to do so before
          this period ends.
        </span>

        <Button
          className="w-[250px]"
          onClick={() => {
            if (walletConnection?.isAnonymous) {
              setStep(RequestCertificateStates.anonymous);
            } else {
              setStep(RequestCertificateStates.choose);
            }
          }}
        >
          Create personal certificate
        </Button>
      </div>
    );
  }

  if (step === RequestCertificateStates.choose) {
    body = (
      <div className="p-4 flex flex-col gap-4 items-center">
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Requesting a certificate</h2>
        </div>
        <span className="text-center">
          To create a certificate we have to submit a whole number of CARBON (
          <CARBONCurrencyIcon className="inline" />) to the Verra registry. We
          recommend you add the remaining fraction to request a certificate for{" "}
          {Math.ceil(totalCarbonPending)}{" "}
          <CARBONCurrencyIcon className="inline" /> by sinking an additional{" "}
          {remainingFraction.toFixed(3)} tonnes.{" "}
          {totalCarbonPending > 1 && (
            <span>
              Alternatively, you can round down and request a certificate for{" "}
              {Math.floor(totalCarbonPending)}{" "}
              <CARBONCurrencyIcon className="inline" />
            </span>
          )}
        </span>

        <span className="text-center">
          Creating a personal certificate at the Verra registry is completely
          optional. All CARBON transactions will eventually be retired using
          community certificates.
        </span>

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={sinkRemaining} className="text-sm md:text-base">
            Sink {remainingFraction.toFixed(3)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </Button>
          <Button
            className="text-sm md:text-base"
            disabled={totalCarbonPending < 1}
            onClick={() => {
              router.push("/sink/rounding");
            }}
          >
            Round down to {Math.floor(totalCarbonPending)}
          </Button>
        </div>
      </div>
    );
  }

  if (step === RequestCertificateStates.anonymous) {
    body = (
      <div className="p-4 flex flex-col gap-4 items-center">
        <h2 className="text-lg md:text-lg font-semibold">
          Request certificate
        </h2>
        <span className="text-center">
          Your wallet connection is anonymous. This means we cannot send you a
          personalized certificate.
        </span>

        <div className="flex-1 flex flex-col justify-center gap-6 items-center">
          <span className="text-center">
            Add your contact information to create a personal certificate.
          </span>
          <div className="flex flex-col gap-3 w-[95%] md:w-[70%]">
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
      </div>
    );
  }

  return (
    <div
      className={`md:w-[80%] self-center relative mb-10 text-sm border border-tertiary rounded bg-secondary`}
    >
      {body}
      {step !== RequestCertificateStates.info && (
        <Button
          className="absolute top-[10px] left-[calc(100%-32px)] w-[24px] !py-1 !px-2 bg-tertiary text-white"
          onClick={() => setStep(RequestCertificateStates.info)}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      )}
    </div>
  );
}
