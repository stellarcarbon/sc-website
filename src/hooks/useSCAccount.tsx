import { useAppContext } from "@/context/appContext";
import {
  createRecipient,
  deleteRecipient,
  updateRecipient,
} from "@stellarcarbon/sc-sdk";
import { useCallback, useEffect, useState } from "react";

export function useSCAccount() {
  const { walletConnection, updateWalletConnection, jwt } = useAppContext();

  const [isStale, setIsStale] = useState<boolean>(false);

  useEffect(() => {
    if (walletConnection?.recipient) {
      const modifiedAt = new Date(walletConnection.recipient.modified_at);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      if (modifiedAt < thirtyDaysAgo) {
        setIsStale(true);
      }
    }
  }, [walletConnection]);

  const createAccount = useCallback(
    async (address: string, email: string, name: string | undefined) => {
      const res = await createRecipient({
        body: {
          address,
          email,
          name,
        },
        fetch: (request: Request) => {
          const authRequest = new Request(request, {
            headers: {
              ...Object.fromEntries(request.headers.entries()),
              Authorization: `Bearer ${jwt}`,
            },
          });
          return fetch(authRequest);
        },
      });

      if (res.response.status === 201 && res.data) {
        updateWalletConnection(res.data.recipient);
      }
    },
    [jwt, updateWalletConnection]
  );

  const updateAccount = useCallback(
    async (email: string, name?: string) => {
      if (!walletConnection) return;

      const res = await updateRecipient({
        body: { email, name },
        path: { recipient_address: walletConnection.stellarPubKey },
        fetch: (request: Request) => {
          const authRequest = new Request(request, {
            headers: {
              ...Object.fromEntries(request.headers.entries()),
              Authorization: `Bearer ${jwt}`,
            },
          });
          return fetch(authRequest);
        },
      });

      if (res.response.status === 200 && res.data) {
        updateWalletConnection(res.data);
      }
    },
    [jwt, walletConnection, updateWalletConnection]
  );

  const deleteAccount = useCallback(async () => {
    if (!walletConnection) return;

    const res = await deleteRecipient({
      path: { recipient_address: walletConnection.stellarPubKey },
      fetch: (request: Request) => {
        const authRequest = new Request(request, {
          headers: {
            ...Object.fromEntries(request.headers.entries()),
            Authorization: `Bearer ${jwt}`,
          },
        });
        return fetch(authRequest);
      },
    });

    if (res.response.status === 204) {
      updateWalletConnection();
    }
  }, [jwt, walletConnection, updateWalletConnection]);

  return {
    createAccount,
    updateAccount,
    deleteAccount,
    isStale,
  };
}
