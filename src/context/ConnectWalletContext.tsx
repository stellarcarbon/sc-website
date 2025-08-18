import { useSCRouter, validateEmail } from "@/utils";
import { useAppContext } from "@/context/appContext";
import { walletConnectDialog } from "@/context/walletFunctions";
import TransactionHistoryService from "@/services/TransactionHistoryService";
import WalletConnectionStorageService from "@/services/WalletConnectionService";
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import appConfig from "@/config";

type ConnectWalletContext = {
  username: string | undefined;
  setUsername: Dispatch<SetStateAction<string | undefined>>;

  useremail: string | undefined;
  setUseremail: Dispatch<SetStateAction<string | undefined>>;

  selectedWallet: ISupportedWallet | undefined;
  setSelectedWallet: Dispatch<SetStateAction<ISupportedWallet | undefined>>;

  tncAccepted: boolean;
  setTncAccepted: Dispatch<SetStateAction<boolean>>;

  submitForm: () => void;

  walletSelectError: boolean;
  setWalletSelectError: Dispatch<SetStateAction<boolean>>;
  tncError: boolean;
  setTncError: Dispatch<SetStateAction<boolean>>;
  emailError: boolean;
  setEmailError: Dispatch<SetStateAction<boolean>>;

  walletsKitError: string | undefined;
  noWalletError: boolean;
};

const ConnectWalletContext = createContext<ConnectWalletContext | null>(null);

export const useConnectWalletContext = () => {
  const context = useContext(ConnectWalletContext);
  if (context === null) {
    throw Error("No ConnectWalletContext available");
  }
  return context;
};

export const ConnectWalletContextProvider = ({
  children,
}: PropsWithChildren) => {
  const { setWalletConnection, setSep10Target, stellarWalletsKit } =
    useAppContext();

  const [selectedWallet, setSelectedWallet] = useState<ISupportedWallet>();
  const [username, setUsername] = useState<string>();
  const [useremail, setUseremail] = useState<string>();
  const [tncAccepted, setTncAccepted] = useState<boolean>(false);
  const [walletSelectError, setWalletSelectError] = useState<boolean>(false);
  const [tncError, setTncError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [walletsKitError, setWalletsKitError] = useState<string>();
  const [noWalletError, setNoWalletError] = useState<boolean>(false);

  const router = useSCRouter();

  const connectWallet = useCallback(
    async (wallet: ISupportedWallet): Promise<boolean> => {
      // Build the walletConnection object using wallets-kit
      let newConn;
      try {
        newConn = await walletConnectDialog(wallet, appConfig.network);

        // Some wallets sometimes return empty pubkey on success
        if (newConn.stellarPubKey === "") {
          throw Error();
        }

        // Verify if wallet exists
        // If it doesnt exist throw "special error message"
        // "Account ABCD...WXYZ does not exist in {network_name}"
        // (if testnet make a funding request to friendbot for that pubkey)
        try {
          await TransactionHistoryService.fetchAccountBalance(
            appConfig.server,
            newConn.stellarPubKey
          );
        } catch (error: any) {
          setNoWalletError(true);
          return false;
        }

        // TODO: move this to later in the flow?
        WalletConnectionStorageService.setWalletConnection(newConn);
        setWalletConnection(newConn);

        return true;
      } catch (error: any) {
        setWalletsKitError(error.toString());
        return false;
      }
    },
    [setWalletConnection]
  );

  const validateForm = useCallback(() => {
    const tncErr = !tncAccepted;
    const walletSelectErr = selectedWallet === undefined;
    let emailErr = false;
    if (useremail || username) {
      if (useremail === undefined) {
        emailErr = useremail === undefined;
      } else {
        emailErr = !validateEmail(useremail);
      }
    }

    setTncError(tncErr);
    setWalletSelectError(walletSelectErr);
    setEmailError(emailErr);

    if (tncErr || walletSelectErr || emailErr) {
      return false;
    }
    return true;
  }, [selectedWallet, tncAccepted, username, useremail]);

  const submitForm = useCallback(() => {
    // Reset errors
    setWalletSelectError(false);
    setEmailError(false);
    setTncError(false);

    setNoWalletError(false);
    setWalletsKitError(undefined);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Connect
    connectWallet(selectedWallet!).then((didSucceed) => {
      if (!didSucceed) {
        // setSelectedWallet(undefined);
      } else {
        if (appConfig.demo) {
          router.push("/emissions");
        } else {
          setSep10Target("register");
          router.push("/sep10");
        }
      }
    });
  }, [
    selectedWallet,
    setWalletSelectError,
    setEmailError,
    connectWallet,
    router,
    setWalletsKitError,
    validateForm,
    setSep10Target,
  ]);

  const providerValue = useMemo(
    () => ({
      username,
      setUsername,
      useremail,
      setUseremail,
      selectedWallet,
      setSelectedWallet,
      tncAccepted,
      setTncAccepted,
      submitForm,
      walletSelectError,
      setWalletSelectError,
      tncError,
      setTncError,
      emailError,
      setEmailError,
      walletsKitError,
      noWalletError,
    }),
    [
      username,
      useremail,
      selectedWallet,
      tncAccepted,
      walletSelectError,
      tncError,
      emailError,
      walletsKitError,
      noWalletError,
      submitForm,
    ]
  );

  return (
    <ConnectWalletContext.Provider value={providerValue}>
      {children}
    </ConnectWalletContext.Provider>
  );
};
