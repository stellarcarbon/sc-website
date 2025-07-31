import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type InlineContactInfoContext = {
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;

  showDeleteAccountDialog: boolean;
  setShowDeleteAccountDialog: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: InlineContactInfoContext = {
  showForm: false,
  setShowForm: () => {},
  showDeleteAccountDialog: false,
  setShowDeleteAccountDialog: () => {},
};

const InlineContactInfoContext =
  createContext<InlineContactInfoContext>(defaultContext);

export const useInlineContactInfoContext = () => {
  return useContext(InlineContactInfoContext);
};

export const InlineContactInfoContextProvider = ({
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
    <InlineContactInfoContext.Provider value={providerValue}>
      {children}
    </InlineContactInfoContext.Provider>
  );
};
