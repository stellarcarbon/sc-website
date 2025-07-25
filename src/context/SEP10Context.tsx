"use client";

import { AuthService, SEP10ChallengeResponse } from "@/client";
import { SEP10Steps } from "@/hooks/useSEP10";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppContext } from "./appContext";

type SEP10Context = {
  challenge: SEP10ChallengeResponse | undefined;
  jwt: string | undefined;
  step: SEP10Steps;
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
  const { walletConnection, stellarWalletsKit } = useAppContext();

  const [challenge, setChallenge] = useState<SEP10ChallengeResponse>();
  const [jwt, setJwt] = useState<string>();
  const [step, setStep] = useState<SEP10Steps>(SEP10Steps.fetchingChallenge);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getChallenge = async () => {
      if (walletConnection) {
        try {
          const c = await AuthService.getSep10Challenge({
            account: walletConnection.stellarPubKey,
          });
          setChallenge(c);
          setStep(SEP10Steps.awaitingAuthentication);
        } catch (e) {
          setError("Could not fetch SEP10 challenge.");
        }
      }
    };
    getChallenge();
  }, [walletConnection]);

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
        const response = await AuthService.validateSep10Challenge({
          transaction: signedTxXdr,
        });

        setJwt(response.token);
        setStep(SEP10Steps.success);
      } catch (e) {
        setError("SEP10 challenge not validated.");
      }
    }
  }, [challenge, stellarWalletsKit, walletConnection]);

  const providerValue = useMemo(
    () => ({ challenge, jwt, step, error, signChallenge }),
    [challenge, jwt, step, error, signChallenge]
  );

  return (
    <SEP10Context.Provider value={providerValue}>
      {children}
    </SEP10Context.Provider>
  );
};
