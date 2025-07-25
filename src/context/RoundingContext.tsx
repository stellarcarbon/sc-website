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
import { useSEP10Context } from "./SEP10Context";

export enum RoundDownSteps {
  requestCertificate = "Request certifcate",
  success = "Success",
  error = "Error",
}

type RoundingContext = {
  step: RoundDownSteps;

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
  const { walletConnection } = useAppContext();
  const { jwt } = useSEP10Context();
  const [step, setStep] = useState<RoundDownSteps>(
    RoundDownSteps.requestCertificate
  );
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (error !== undefined) {
      setStep(RoundDownSteps.error);
    }
  }, [error]);

  const requestCertificate = useCallback(async () => {
    if (walletConnection && jwt) {
      try {
        await RoundingService.requestCertificate(walletConnection, jwt);
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
      requestCertificate,
      error,
      setError,
    }),
    [step, requestCertificate, error]
  );

  return (
    <RoundingContext.Provider value={providerValue}>
      {children}
    </RoundingContext.Provider>
  );
};
