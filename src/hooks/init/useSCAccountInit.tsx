import { WalletConnection } from "@/app/types";
import { getRecipient, Recipient } from "@stellarcarbon/sc-sdk";
import { useCallback, useEffect } from "react";

type Props = {
  jwt: string | undefined;
  walletConnection: WalletConnection | undefined | null;
  updateWalletConnection: (recipient?: Recipient) => void;
};

export function useSCAccountInit({
  jwt,
  walletConnection,
  updateWalletConnection,
}: Props) {
  const loadAccount = useCallback(
    async (token: string): Promise<Recipient | undefined> => {
      if (!walletConnection) return;

      const res = await getRecipient({
        path: { recipient_address: walletConnection.stellarPubKey },
        fetch: (request: Request) => {
          const authRequest = new Request(request, {
            headers: {
              ...Object.fromEntries(request.headers.entries()),
              Authorization: `Bearer ${token}`,
            },
          });
          return fetch(authRequest);
        },
      });

      if (res.response.status === 404 && walletConnection.recipient) {
        // Account doesn't exist
        updateWalletConnection();
      } else if (res.data) {
        updateWalletConnection(res.data);
        return res.data;
      }
    },
    [walletConnection, updateWalletConnection]
  );

  useEffect(() => {
    if (!jwt) return;

    loadAccount(jwt);
  }, [jwt]);
}
