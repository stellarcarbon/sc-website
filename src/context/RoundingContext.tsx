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
import { requestCertificate } from "@stellarcarbon/sc-sdk";

export enum RoundDownSteps {
  requestCertificate = "Request certifcate",
  success = "Success",
  error = "Error",
}

type RoundingContext = {
  step: RoundDownSteps;

  requestRoundDown: () => Promise<void>;

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
  const { walletConnection } = useAppContext();
  const { jwt } = useAppContext();
  const [step, setStep] = useState<RoundDownSteps>(
    RoundDownSteps.requestCertificate,
  );
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (error !== undefined) {
      setStep(RoundDownSteps.error);
    }
  }, [error]);

  const requestRoundDown = useCallback(async () => {
    if (walletConnection && jwt) {
      try {
        await requestCertificate({
          path: { recipient_address: walletConnection.stellarPubKey },
          fetch: (input: RequestInfo | URL, init?: RequestInit) => {
            const authRequest = new Request(input, init);
            authRequest.headers.set("Authorization", `Bearer ${jwt}`);
            return fetch(authRequest);
          },
        });
      } catch (e) {
        setError("Something went wrong requesting your certificate.");
      }
      // RoundingService.setLatestRetirement(walletConnection!.stellarPubKey);
      setStep(RoundDownSteps.success);
    }
  }, [walletConnection, jwt]);

  const providerValue = useMemo(
    () => ({
      step,
      requestRoundDown,
      error,
      setError,
    }),
    [step, requestRoundDown, error],
  );

  return (
    <RoundingContext.Provider value={providerValue}>
      {children}
    </RoundingContext.Provider>
  );
};
