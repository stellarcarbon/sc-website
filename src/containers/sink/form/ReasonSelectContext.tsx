"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type ReasonOption = {
  message: string;
  label: string;
  explanation: string;
};

type ReasonSelectContext = {
  selectedReason: ReasonOption | undefined;
  setSelectedReason: Dispatch<SetStateAction<ReasonOption | undefined>>;
};

const ReasonSelectContext = createContext<ReasonSelectContext | null>(null);

export const useReasonSelectContext = () => {
  const context = useContext(ReasonSelectContext);
  if (context === null) {
    throw Error("No ReasonSelectContext available");
  }
  return context;
};

export const ReasonSelectContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [selectedReason, setSelectedReason] = useState<ReasonOption>();

  const providerValue = useMemo(
    () => ({
      selectedReason,
      setSelectedReason,
    }),
    [selectedReason]
  );

  return (
    <ReasonSelectContext.Provider value={providerValue}>
      {children}
    </ReasonSelectContext.Provider>
  );
};
