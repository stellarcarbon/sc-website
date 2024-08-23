"use client";

import Button from "@/components/Button";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import Modal from "@/components/Modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SEP10ChallengeResponse } from "@/client/models/SEP10ChallengeResponse";
import {
  AccountService,
  AuthService,
  RequestCertificateResponse,
} from "@/client";
import { useAppContext } from "@/context/appContext";
import { Blocks } from "react-loader-spinner";
import { RetirementStatus } from "@/app/types";
import { useSCRouter } from "@/app/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFileShield,
  faShield,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import RoundingService from "@/app/services/RoundingService";
import ParallaxDivider, {
  ParallaxBackgrounds,
} from "@/components/ParallaxDivider";
import { OpenAPI } from "@/client";

enum RoundDownSteps {
  fetchingChallenge = "Fetching challenge...",
  awaitingAuthentication = "Awaiting authentication",
  signingChallenge = "Signing challenge...",
  requestCertificate = "Request certifcate",
  success = "Success",
}

export default function RoundDownPage() {
  const {
    walletConnection,
    myTransactions,
    setMyTransactions,
    setHasPendingRounding,
  } = useAppContext();

  const router = useSCRouter();

  const [challenge, setChallenge] = useState<SEP10ChallengeResponse>();
  const [jwt, setJWT] = useState<string>();
  const [requestCertificateResponse, setRequestCertificateResponse] =
    useState<RequestCertificateResponse>();

  const [step, setStep] = useState<RoundDownSteps>(
    RoundDownSteps.fetchingChallenge
  );

  useEffect(() => {
    const now = new Date();
    const d1 = now.addDays(-8);
    const d2 = now.addDays(-2);

    setMyTransactions([
      {
        id: "A1",
        createdAt: d1.toString(),
        memo: "Tx 1",
        assetAmount: 26.48,
        asset: "USDC",
        sinkAmount: 1.5,
        retirementStatus: RetirementStatus.PENDING_USER,
        retirements: [],
      },
      {
        id: "A2",
        createdAt: now.toString(),
        memo: "Tx 2",
        assetAmount: 58.46,
        asset: "USDC",
        sinkAmount: 3.3,
        retirementStatus: RetirementStatus.PENDING_USER,
        retirements: [],
      },
    ]);
  }, []);

  useEffect(() => {
    // Auth challenge on opening
    if (walletConnection !== null) {
      AuthService.getSep10Challenge({
        account: walletConnection!.stellarPubKey,
      }).then((response) => {
        setStep(RoundDownSteps.awaitingAuthentication);
        setChallenge(response);
      });
    }
  }, [walletConnection]);

  const signAndValidateChallenge = useCallback(() => {
    setStep(RoundDownSteps.signingChallenge);
    if (walletConnection && challenge) {
      walletConnection.kit
        .sign({
          xdr: challenge.transaction,
          publicKey: walletConnection.stellarPubKey,
        })
        .then((r) => {
          console.log("signing done", r);

          AuthService.validateSep10Challenge({
            transaction: r.signedXDR,
          }).then((response) => {
            const token = response.token;
            console.log("Got token:", token);
            setJWT(token);
            setStep(RoundDownSteps.requestCertificate);
          });
        });
    }
  }, [walletConnection, challenge]);

  const requestCertificate = useCallback(() => {
    if (walletConnection && walletConnection.personalDetails) {
      OpenAPI.HEADERS = {
        Authorization: `Bearer ${jwt}`,
      };
      console.log(jwt);
      AccountService.requestCertificate({
        recipientAddress: walletConnection.stellarPubKey,
        email: walletConnection.personalDetails?.useremail,
      }).then((response) => {
        setRequestCertificateResponse(response);
        setStep(RoundDownSteps.success);
        RoundingService.setLatestRetirement(walletConnection?.stellarPubKey!);
      });
    }
  }, []);

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

  console.log(step);

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
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col p-6 py-8 md:p-12 justify-start items-center gap-6 text-center bg-primary">
            <FontAwesomeIcon icon={faFileShield} className="text-[48px] pt-2" />
            <div>
              To proceed, verify your identity by signing an authentication
              challenge from the Stellarcarbon API.
            </div>
            <Button
              className="!py-2 w-[200px] font-bold !bg-accentSecondary !text-white hover:!bg-tertiary"
              onClick={signAndValidateChallenge}
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
        <div className="flex flex-col p-6 py-8 md:p-12 justify-start items-center gap-6 text-center bg-secondary">
          <FontAwesomeIcon icon={faUserShield} className="text-[48px]" />
          <span className="">Auth challenge signed and valid.</span>

          <span className="">
            Commit the request for a certificate of{" "}
            {Math.floor(totalCarbonPending)}
            <CARBONCurrencyIcon className="inline ml-1" />
          </span>
          <Button
            className="mt-auto !py-2 w-[200px] font-bold !bg-accentSecondary !text-white hover:!bg-tertiary"
            onClick={requestCertificate}
          >
            Request certificate
          </Button>
        </div>
      </div>
    );
  }
  if (step === RoundDownSteps.success) {
    body = (
      <div className="flex-1 flex flex-col justify-center items-center gap-12 text-center">
        <span className="text-xl md:text-2xl">Success</span>
        <span>
          Your certificate request was received in good order and will be
          created soon.
        </span>
        <div className="flex flex-col bg-secondary border border-tertiary rounded-md">
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
        </div>
        <SuccessIcon />
      </div>
    );
  }

  return (
    <Modal>
      <div className="h-full flex flex-col justify-start">
        <ParallaxDivider image={ParallaxBackgrounds.FOREST} mini />
        <div className="flex-1 flex flex-col pb-8 justify-start items-center ">
          {body}
          {/* <ParallaxDivider image={ParallaxBackgrounds.FOREST} smallest /> */}
          <Button
            className="h-10 !py-2 mt-auto"
            onClick={() => router.push("/dashboard/transactions")}
          >
            Return to dashboard
          </Button>
        </div>
        <ParallaxDivider image={ParallaxBackgrounds.FOREST} mini />
      </div>
    </Modal>
  );
}
