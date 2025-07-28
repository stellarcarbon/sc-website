import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type ContactDetailsContext = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  useremail: string;
  setUseremail: Dispatch<SetStateAction<string>>;

  emailError: boolean;
  setEmailError: Dispatch<SetStateAction<boolean>>;
};

const ContactDetailsContext = createContext<ContactDetailsContext | null>(null);

export const useContactDetailsContext = () => {
  const context = useContext(ContactDetailsContext);
  if (context === null) {
    throw Error("No ContactDetailsContext available");
  }
  return context;
};

export const ContactDetailsContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [username, setUsername] = useState<string>("");
  const [useremail, setUseremail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      username,
      setUsername,
      useremail,
      setUseremail,
      emailError,
      setEmailError,
    }),
    [username, setUsername, useremail, setUseremail, emailError, setEmailError]
  );

  return (
    <ContactDetailsContext.Provider value={providerValue}>
      {children}
    </ContactDetailsContext.Provider>
  );
};
