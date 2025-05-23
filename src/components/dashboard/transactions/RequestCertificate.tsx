"use client";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import TextInput from "@/components/TextInput";
import { useAppContext } from "@/context/appContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

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
      <>
        <h2 className="text-lg font-semibold">Create a personal certificate</h2>
        <span className="text-center">
          Any pending retirements will automatically retire into the community
          pool after 90 days, which means you can no longer attain a personal
          certificate.
        </span>

        <span className="text-center">
          If you want to request a personal certificate you have to do so before
          this period ends.
        </span>

        <span className="text-center">
          Read more about retirements & certificates{" "}
          <Link href="/explain" className="underline">
            here
          </Link>
          .
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
          Request certificate
        </Button>
      </>
    );
  }

  if (step === RequestCertificateStates.choose) {
    body = (
      <>
        <div className="relative flex w-full justify-center">
          <h2 className="text-xl font-semibold">Requesting a certificate</h2>
        </div>
        <span className="text-center">
          To create a personalized certificate we have to submit a whole number
          of CARBON (
          <CARBONCurrencyIcon className="inline" />) to the Verra registry.
        </span>{" "}
        <span className="self-start">Your options:</span>
        <>
          <ul className="list-disc ml-4">
            {totalCarbonPending < 1 ? (
              <li>Sink an additional {remainingFraction.toFixed(3)} tonnes.</li>
            ) : (
              <>
                <li>
                  Request a certificate for {Math.ceil(totalCarbonPending)}{" "}
                  <CARBONCurrencyIcon className="inline" /> by sinking an
                  additional {remainingFraction.toFixed(3)} tonnes.
                </li>
                <li>
                  {" "}
                  {totalCarbonPending > 1 && (
                    <span>
                      Alternatively, you can round down and request a
                      certificate for {Math.floor(totalCarbonPending)}{" "}
                      <CARBONCurrencyIcon className="inline" />. The remaining{" "}
                      <CARBONCurrencyIcon className="inline" /> will retire into
                      a community certificate.
                    </span>
                  )}
                </li>
              </>
            )}
            <li>
              Do nothing. Your transaction will be retired into a community
              certificate within 90 days of the transaction date.
            </li>
          </ul>
        </>
        <span className="text-center">
          Creating a personal certificate at the Verra registry is completely
          optional. All CARBON transactions will eventually be retired using
          community certificates.
        </span>
        <div className="flex flex-wrap justify-around gap-4 w-full">
          <Button onClick={sinkRemaining} className="text-sm">
            <div className="flex items-center">
              Add {remainingFraction.toFixed(3)}
              <CARBONCurrencyIcon className="inline ml-1" />
            </div>
          </Button>
          <Button
            className="text-sm"
            disabled={totalCarbonPending < 1}
            onClick={() => {
              router.push("/sink/rounding");
            }}
          >
            <div className="flex items-center">
              Round down to {Math.floor(totalCarbonPending).toFixed(3)}
              <CARBONCurrencyIcon className="inline ml-1" />
            </div>
          </Button>
        </div>
      </>
    );
  }

  if (step === RequestCertificateStates.anonymous) {
    body = (
      <>
        <h2 className="text-lg md:text-lg font-semibold">
          Request certificate
        </h2>
        <span className="text-center">
          Your wallet connection is anonymous. This means we cannot send you a
          personalized certificate.
        </span>

        <form className="flex-1 flex flex-col justify-center gap-6 items-center">
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
          <Button type="submit" onClick={submitForm} className="w-[200px]">
            Update contact info
          </Button>
          {formError && <div className="text-red-500">{formError}</div>}
        </form>
      </>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      {body}
      {step !== RequestCertificateStates.info && (
        <IconButton
          className="absolute top-[10px] left-[calc(100%-32px)] w-[24px] h-[24px]"
          onClick={() => setStep(RequestCertificateStates.info)}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      )}
    </div>
  );
}
