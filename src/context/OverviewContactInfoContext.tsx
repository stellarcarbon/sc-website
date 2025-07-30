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

  showDeleteAccountDialog: boolean;
  setShowDeleteAccountDialog: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: OverviewContactInfoContext = {
  showForm: false,
  setShowForm: () => {},
  showDeleteAccountDialog: false,
  setShowDeleteAccountDialog: () => {},
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
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] =
    useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      showForm,
      setShowForm,
      showDeleteAccountDialog,
      setShowDeleteAccountDialog,
    }),
    [showForm, setShowForm, showDeleteAccountDialog, setShowDeleteAccountDialog]
  );

  return (
    <OverviewContactInfoContext.Provider value={providerValue}>
      {children}
    </OverviewContactInfoContext.Provider>
  );
};
