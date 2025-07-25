import { WalletConnection } from "@/app/types";
import { AuthService, SEP10ChallengeResponse } from "@/client";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useCallback, useEffect, useMemo, useState } from "react";

export enum SEP10Steps {
  fetchingChallenge = "Fetching challenge...",
  awaitingAuthentication = "Awaiting authentication...",
  signingChallenge = "Signing challenge...",
  success = "Success",
}

export default function useSEP10(
  swk: StellarWalletsKit | null,
  walletConnection: WalletConnection | null | undefined
) {
  const [challenge, setChallenge] = useState<SEP10ChallengeResponse>();
  const [jwt, setJwt] = useState<string>();

  const [step, setStep] = useState<SEP10Steps>(SEP10Steps.fetchingChallenge);

  const [error, setError] = useState<string>();

  useEffect(() => {
    const getChallenge = async () => {
      if (walletConnection) {
        const c = await AuthService.getSep10Challenge({
          account: walletConnection.stellarPubKey,
        });
        setChallenge(c);
        setStep(SEP10Steps.awaitingAuthentication);
      }
    };
    getChallenge();
  }, [walletConnection]);

  const signChallenge = useCallback(async () => {
    if (challenge && swk && walletConnection) {
      setStep(SEP10Steps.signingChallenge);
      const signed = await swk.signTransaction(challenge?.transaction, {
        address: walletConnection.stellarPubKey,
      });

      const response = await AuthService.validateSep10Challenge({
        transaction: signed.signedTxXdr,
      });

      setJwt(response.token);
      setStep(SEP10Steps.success);
    }
  }, [challenge, swk, walletConnection]);

  return {
    challenge,
    jwt,
    step,
    signChallenge,
  };
}
