import { useAppContext } from "@/context/appContext";
import {
  createRecipient,
  deleteRecipient,
  getRecipient,
  Recipient,
  updateRecipient,
} from "@stellarcarbon/sc-sdk";
import { useCallback } from "react";

export function useSCAccount() {
  const { walletConnection, updateWalletConnection, jwt } = useAppContext();

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

      if (res.response.status === 404) {
        // Account doesn't exist
        return undefined;
      } else if (res.data) {
        const modifiedAt = new Date(res.data.modified_at);
        const now = new Date();
        const thirtyDaysAgo = new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        );

        if (modifiedAt < thirtyDaysAgo) {
          // Stale recipient
        }

        updateWalletConnection(res.data);
        return res.data;
      }
    },
    [walletConnection, updateWalletConnection]
  );

  const createAccount = useCallback(
    async (address: string, email: string, name: string | undefined) => {
      console.log("create", jwt);
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
    async (email: string, name: string | undefined) => {
      console.log("ua");
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
    loadAccount,
  };
}
