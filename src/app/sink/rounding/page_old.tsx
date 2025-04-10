"use client";

import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Modal from "@/components/Modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SEP10ChallengeResponse } from "@/client/models/SEP10ChallengeResponse";
import { RequestCertificateResponse } from "@/client";
import { useAppContext } from "@/context/appContext";
import { Blocks } from "react-loader-spinner";
import { RetirementStatus } from "@/app/types";
import { useSCRouter } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileShield,
  faUserShield,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingService from "@/services/RoundingService";
import ModalHeader from "@/components/ModalHeader";

enum RoundDownSteps {
  fetchingChallenge = "Fetching challenge...",
  awaitingAuthentication = "Awaiting authentication",
  signingChallenge = "Signing challenge...",
  requestCertificate = "Request certifcate",
  success = "Success",
}

enum RoundDownErrors {
  noPersonalDetails = "No personal details are attached your wallet connection.",
  apiConnectionError = "Something went wrong connecting to the Stellarcarbon API.",
  signingError = "Something went wrong while signing the challenge.",
}

export default function RoundDownPage() {
  const { walletConnection, myTransactions, stellarWalletsKit } =
    useAppContext();

  const router = useSCRouter();

  const [challenge, setChallenge] = useState<SEP10ChallengeResponse>();
  const [jwt, setJWT] = useState<string>();

  const [error, setError] = useState<RoundDownErrors>();

  const [step, setStep] = useState<RoundDownSteps>(
    RoundDownSteps.fetchingChallenge
  );

  useEffect(() => {
    // Redirect if no personal walletConnection is available
    if (walletConnection === undefined) {
      router.push("/");
    }
  }, [walletConnection, router]);

  useEffect(() => {
    // Auth challenge on opening
    if (walletConnection !== null) {
      if (walletConnection?.personalDetails === undefined) {
        setError(RoundDownErrors.noPersonalDetails);
        return;
      }

      RoundingService.getChallenge(walletConnection!)
        .then((challenge) => {
          setChallenge(challenge);
          setStep(RoundDownSteps.awaitingAuthentication);
        })
        .catch((e) => {
          setError(RoundDownErrors.apiConnectionError);
        });
    }
  }, [walletConnection]);

  const verifyIdentity = useCallback(async () => {
    try {
      const signedChallenge = await RoundingService.signChallenge(
        stellarWalletsKit!,
        walletConnection!.stellarPubKey,
        challenge!
      );
      try {
        const response = await RoundingService.validateChallenge(
          signedChallenge.signedTxXdr
        );
        const token = response.token;
        setJWT(token);
        setStep(RoundDownSteps.requestCertificate);
      } catch (e) {
        setError(RoundDownErrors.apiConnectionError);
      }
    } catch (e) {
      setError(RoundDownErrors.signingError);
      return;
    }
  }, [walletConnection, challenge]);

  const requestCertificate = useCallback(
    (token: string) => {
      RoundingService.requestCertificate(walletConnection!, token)
        .then((certificate) => {
          setStep(RoundDownSteps.success);

          // Set local storage latest retirement.
          RoundingService.setLatestRetirement(walletConnection!.stellarPubKey);
        })
        .catch((e) => {
          setError(RoundDownErrors.apiConnectionError);
        });
    },
    [walletConnection]
  );

  const totalCarbonPending = useMemo(() => {
    const filteredTransactions = myTransactions?.filter(
      (tx) =>
        tx.retirementStatus === RetirementStatus.PENDING_USER ||
        tx.retirementStatus === RetirementStatus.PENDING_STELLARCARBON
    );
    return (
      filteredTransactions?.reduce((sum, tx) => sum + tx.sinkAmount, 0) ?? 0
    );
  }, [myTransactions]);

  let body;
  if (step === RoundDownSteps.fetchingChallenge) {
    body = (
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-center text-lg md:text-2xl">
          Requesting round down...
        </span>
        <div className="my-4">
          <Blocks
            height="120"
            width="120"
            color="#ff0000"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
      </div>
    );
  }
  if (step === RoundDownSteps.awaitingAuthentication) {
    body = (
      <>
        <div className="flex flex-col justify-center my-6">
          <ModalHeader>Authenticate</ModalHeader>
          <div className="flex flex-col justify-start items-center gap-6 text-center bg-primary">
            <FontAwesomeIcon icon={faFileShield} className="text-[48px]" />
            <div>
              To proceed, verify your identity by signing an authentication
              challenge from the Stellarcarbon API.
            </div>
            <Button
              className="!py-2 w-[200px] font-bold !bg-accentSecondary !text-white hover:!bg-tertiary"
              onClick={verifyIdentity}
            >
              Sign auth challenge
            </Button>
          </div>
        </div>
      </>
    );
  }
  if (step === RoundDownSteps.signingChallenge) {
    body = (
      <div className="h-full gap-8 md:gap-12 flex flex-col justify-center items-center">
        <span className="text-center text-lg md:text-2xl">
          Signing challenge...
        </span>
        <div className="my-4">
          <Blocks
            height="120"
            width="120"
            color="#ff0000"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
      </div>
    );
  }
  if (step === RoundDownSteps.requestCertificate) {
    body = (
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col p-6 py-8 md:p-12 justify-start items-center gap-6 text-center">
          <ModalHeader>Authenticated</ModalHeader>

          <FontAwesomeIcon icon={faUserShield} className="text-[48px]" />
          <span>Auth challenge signed and valid.</span>

          <span>Commit the request for a certificate of </span>
          <span className="text-2xl flex items-center gap-1">
            {Math.floor(totalCarbonPending)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </span>
          <Button
            className="mt-auto !py-2 w-[200px] font-bold !bg-accentSecondary !text-white hover:!bg-tertiary"
            onClick={() => requestCertificate(jwt!)}
          >
            Request certificate
          </Button>
        </div>
      </div>
    );
  }
  if (step === RoundDownSteps.success) {
    body = (
      <div className="flex-1 flex flex-col items-center gap-4 text-center my-6">
        <ModalHeader>Success</ModalHeader>
        <span>
          Your certificate request was received in good order and will be
          created soon.
        </span>
        {/* <div className="flex flex-col bg-secondary border border-tertiary rounded-md">
          <div className="flex justify-between w-full items-center">
            <span>Account</span>
            <span>{requestCertificateResponse?.account}</span>
          </div>
          <div className="flex justify-between w-full items-center">
            <span>Certificate amount</span>
            <span>{requestCertificateResponse?.certificate_amount}</span>
          </div>
          <div className="flex justify-between w-full items-center">
            <span>Pending balance left</span>
            <span>
              {requestCertificateResponse?.pending_balance_after_retirement}
            </span>
          </div>
        </div> */}
        <div className="my-8">
          <SuccessIcon />
        </div>
      </div>
    );
  }

  return (
    <Modal>
      {error ? (
        <div className="flex-1 flex flex-col items-center pt-4">
          <span className="text-2xl">Error</span>
          <div className="text-center flex flex-col justify-center flex-1 gap-8 text-red-500">
            <FontAwesomeIcon icon={faWarning} className="text-[48px]" />
            {error}
          </div>
        </div>
      ) : (
        body
      )}
      {/* <ParallaxDivider image={ParallaxBackgrounds.FOREST} smallest /> */}

      <div className="h-16 md:my-3 flex items-center justify-center">
        <Button
          className="h-10 !py-2"
          onClick={() => router.push("/dashboard/transactions")}
        >
          Return to dashboard
        </Button>
      </div>
    </Modal>
  );
}
