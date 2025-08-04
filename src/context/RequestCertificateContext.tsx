import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export enum RequestCertificateSteps {
  info = "info",
  choose = "choose",
}

type RequestCertificateContext = {
  step: RequestCertificateSteps;
  setStep: Dispatch<SetStateAction<RequestCertificateSteps>>;
};

const RequestCertificateContext =
  createContext<RequestCertificateContext | null>(null);

export const useRequestCertificateContext = () => {
  const context = useContext(RequestCertificateContext);
  if (context === null) {
    throw Error("No RequestCertificateContext available");
  }
  return context;
};

export const RequestCertificateContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [step, setStep] = useState<RequestCertificateSteps>(
    RequestCertificateSteps.info
  );

  const providerValue = useMemo(() => ({ step, setStep }), [step]);

  return (
    <RequestCertificateContext.Provider value={providerValue}>
      {children}
    </RequestCertificateContext.Provider>
  );
};
