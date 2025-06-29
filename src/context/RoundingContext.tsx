import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppContext } from "./appContext";
import RoundingService from "@/services/RoundingService";
import { SEP10ChallengeResponse } from "@/client";
import { RetirementStatus } from "@/app/types";
import { useRouter } from "next/navigation";

export enum RoundDownSteps {
  fetchingChallenge = "Fetching challenge...",
  awaitingAuthentication = "Awaiting authentication",
  signingChallenge = "Signing challenge...",
  requestCertificate = "Request certifcate",
  success = "Success",
  error = "Error",
}

enum RoundDownErrors {
  noPersonalDetails = "No personal details are attached your wallet connection.",
  apiConnectionError = "Something went wrong connecting to the Stellarcarbon API.",
  signingError = "Something went wrong while signing the challenge.",
}

type RoundingContext = {
  step: RoundDownSteps;

  verifyIdentity: () => Promise<void>;

  requestCertificate: () => Promise<void>;

  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const RoundingContext = createContext<RoundingContext | null>(null);

export const useRoundingContext = () => {
  const context = useContext(RoundingContext);
  if (context === null) {
    throw Error("No RoundingContext available");
  }
  return context;
};

export const RoundingContextProvider = ({ children }: PropsWithChildren) => {
  const { walletConnection, stellarWalletsKit, myTransactions, totalPending } =
    useAppContext();

  const [step, setStep] = useState<RoundDownSteps>(
    RoundDownSteps.fetchingChallenge
  );
  const [challenge, setChallenge] = useState<SEP10ChallengeResponse>();
  const [jwt, setJwt] = useState<string>();
  const [error, setError] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    // Redirect if no personal walletConnection is available
    if (walletConnection === undefined) {
      router.push("/");
    }
  }, [walletConnection, router]);

  useEffect(() => {
    if (error !== undefined) {
      setStep(RoundDownSteps.error);
    }
  }, [error]);

  useEffect(() => {
    if (walletConnection) {
      RoundingService.getChallenge(walletConnection).then((challenge) => {
        setChallenge(challenge);
        setStep(RoundDownSteps.awaitingAuthentication);
      });
    }
  }, [walletConnection]);

  const verifyIdentity = useCallback(async () => {
    if (stellarWalletsKit && walletConnection && challenge) {
      setStep(RoundDownSteps.signingChallenge);
      const signedChallenge = await RoundingService.signChallenge(
        stellarWalletsKit,
        walletConnection.stellarPubKey,
        challenge
      );

      const validationResponse = await RoundingService.validateChallenge(
        signedChallenge.signedTxXdr
      );

      const token = validationResponse.token;

      setJwt(token);
      setStep(RoundDownSteps.requestCertificate);
    }
  }, [stellarWalletsKit, walletConnection, challenge]);

  const requestCertificate = useCallback(async () => {
    if (walletConnection && jwt) {
      const certificate = await RoundingService.requestCertificate(
        walletConnection,
        jwt
      );

      RoundingService.setLatestRetirement(walletConnection!.stellarPubKey);

      setStep(RoundDownSteps.success);
    }
  }, [walletConnection, jwt]);

  const providerValue = useMemo(
    () => ({
      step,
      verifyIdentity,
      requestCertificate,

      error,
      setError,
    }),
    [step, verifyIdentity, requestCertificate, error]
  );

  return (
    <RoundingContext.Provider value={providerValue}>
      {children}
    </RoundingContext.Provider>
  );
};
