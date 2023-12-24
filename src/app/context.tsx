"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";

type AppContext = {
  walletId?: string;
  setWalletId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const AppContext = createContext<AppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw Error("No AppContext available");
  }
  return context;
};

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [walletId, setWalletId] = useState<string | undefined>();

  const providerValue = useMemo(() => {
    return {
      walletId,
      setWalletId,
    };
  }, [walletId]);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
