"use client";

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
import { useSEP10JWT } from "@/hooks/useSEP10JWT";
import { SEP10Steps } from "@/containers/sep10/SEP10Flow";
import {
  getSep10Challenge,
  Sep10ChallengeResponse,
  validateSep10Challenge,
} from "@stellarcarbon/sc-sdk";

export type SEP10Target = "dashboard" | "register" | "update" | "rounding";

type SEP10Context = {
  challenge: Sep10ChallengeResponse | undefined;
  jwt: string | undefined;
  expired: boolean;
  step: SEP10Steps;
  setStep: Dispatch<SetStateAction<SEP10Steps>>;
  error: string | undefined;
  signChallenge: () => Promise<void>;
};

const SEP10Context = createContext<SEP10Context | null>(null);

export const useSEP10Context = () => {
  const context = useContext(SEP10Context);
  if (context === null) {
    throw Error("No SEP10Context available");
  }
  return context;
};

export const SEP10ContextProvider = ({ children }: PropsWithChildren) => {
  const { jwt, setJwt, walletConnection, stellarWalletsKit } = useAppContext();

  const [challenge, setChallenge] = useState<Sep10ChallengeResponse>();
  const [step, setStep] = useState<SEP10Steps>(SEP10Steps.fetchingChallenge);
  const [error, setError] = useState<string>();
  const { updateJwt, expired } = useSEP10JWT(jwt, setJwt);

  useEffect(() => {
    const getChallenge = async () => {
      if (walletConnection && step === SEP10Steps.fetchingChallenge) {
        const c = await getSep10Challenge({
          query: {
            account: walletConnection.stellarPubKey,
          },
        });

        if (c.error) {
          setError("Could not fetch SEP10 challenge.");
        } else {
          setChallenge(c.data);
          setStep(SEP10Steps.awaitingAuthentication);
        }
      }
    };
    getChallenge();
  }, [walletConnection, step]);

  const signChallenge = useCallback(async () => {
    if (challenge && stellarWalletsKit && walletConnection) {
      setStep(SEP10Steps.signingChallenge);

      let signedTxXdr;
      try {
        const signed = await stellarWalletsKit.signTransaction(
          challenge?.transaction,
          {
            address: walletConnection.stellarPubKey,
          }
        );
        signedTxXdr = signed.signedTxXdr;
      } catch (e) {
        setError("Signing was canceled or failed.");
        return;
      }

      try {
        const response = await validateSep10Challenge({
          query: {
            transaction: signedTxXdr,
          },
        });

        if (response.data === undefined) {
          setError("SEP10 challenge not validated.");
          return;
        }

        const jwtToken = response.data.token;
        updateJwt(jwtToken);

        setStep(SEP10Steps.success);
      } catch (e) {
        setError("SEP10 challenge not validated.");
      }
    }
  }, [challenge, stellarWalletsKit, walletConnection, updateJwt]);

  const providerValue = useMemo(
    () => ({
      challenge,
      jwt,
      expired,
      step,
      setStep,
      error,
      signChallenge,
    }),
    [challenge, jwt, expired, step, error, signChallenge]
  );

  return (
    <SEP10Context.Provider value={providerValue}>
      {children}
    </SEP10Context.Provider>
  );
};
