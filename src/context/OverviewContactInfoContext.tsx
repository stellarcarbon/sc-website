import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type OverviewContactInfoContext = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: OverviewContactInfoContext = {
  showForm: false,
  setShowForm: () => {}, // no-op
};

const OverviewContactInfoContext =
  createContext<OverviewContactInfoContext>(defaultContext);

export const useOverviewContactInfoContext = () => {
  return useContext(OverviewContactInfoContext);
};

export const OverviewContactInfoContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const providerValue = useMemo(() => ({ showForm, setShowForm }), [showForm]);

  return (
    <OverviewContactInfoContext.Provider value={providerValue}>
      {children}
    </OverviewContactInfoContext.Provider>
  );
};
