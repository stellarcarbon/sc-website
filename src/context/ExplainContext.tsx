import { usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export enum Tier2NavRoutes {
  INTRODUCTION = "introduction",
  HOWITWORKS = "how-it-works",
  TRUST = "trust",
  GLOSSARY = "glossary",
  BUSINESS = "integration",
}

export enum Tier3NavRoutes {
  SINKINGPROCESS = "sinking-process",
  INVENTORY = "inventory",
  RETIREMENT = "retirement",
}

export interface Tier3Item {
  key: Tier3NavRoutes;
  label: string;
}

export interface Tier2Item {
  key: Tier2NavRoutes;
  label: string;
  children?: Tier3Item[];
}

export const tier3Config: Record<Tier3NavRoutes, Tier3Item> = {
  [Tier3NavRoutes.SINKINGPROCESS]: {
    key: Tier3NavRoutes.SINKINGPROCESS,
    label: "Sinking process",
  },
  [Tier3NavRoutes.RETIREMENT]: {
    key: Tier3NavRoutes.RETIREMENT,
    label: "Retirement",
  },
  [Tier3NavRoutes.INVENTORY]: {
    key: Tier3NavRoutes.INVENTORY,
    label: "Token balance",
  },
};

export const tier2Config: Record<Tier2NavRoutes, Tier2Item> = {
  [Tier2NavRoutes.INTRODUCTION]: {
    key: Tier2NavRoutes.INTRODUCTION,
    label: "Introduction",
  },
  [Tier2NavRoutes.GLOSSARY]: {
    key: Tier2NavRoutes.GLOSSARY,
    label: "Glossary of key terms",
  },
  [Tier2NavRoutes.TRUST]: {
    key: Tier2NavRoutes.TRUST,
    label: "Trust & verification",
  },
  [Tier2NavRoutes.BUSINESS]: {
    key: Tier2NavRoutes.BUSINESS,
    label: "For business",
  },
  [Tier2NavRoutes.HOWITWORKS]: {
    key: Tier2NavRoutes.HOWITWORKS,
    label: "How it works",
    children: [
      tier3Config[Tier3NavRoutes.SINKINGPROCESS],
      tier3Config[Tier3NavRoutes.INVENTORY],
      tier3Config[Tier3NavRoutes.RETIREMENT],
    ],
  },
};

type ExplainContext = {
  selectedTier2: Tier2Item | undefined;
  setSelectedTier2: Dispatch<SetStateAction<Tier2Item | undefined>>;

  selectedTier3: Tier3Item | undefined;
  setSelectedTier3: Dispatch<SetStateAction<Tier3Item | undefined>>;

  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  mobileNavOpen: boolean;
  setMobileNavOpen: Dispatch<SetStateAction<boolean>>;
};

const ExplainContext = createContext<ExplainContext | null>(null);

export const useExplainContext = () => {
  const context = useContext(ExplainContext);
  if (context === null) {
    throw Error("No ExplainContext available");
  }
  return context;
};

export const ExplainContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedTier2, setSelectedTier2] = useState<Tier2Item>();
  const [selectedTier3, setSelectedTier3] = useState<Tier3Item>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.replace(/^\/+|\/+$/g, "").split("/"); // ["explain","how-it-works","sinking"]

    const tier2Key = segments[1] || null;
    const tier3Key = segments[2] || null;

    if (tier3Key) {
      setIsOpen(true);
    }

    setSelectedTier2(
      tier2Key ? tier2Config[tier2Key as Tier2NavRoutes] : undefined
    );
    setSelectedTier3(
      tier3Key ? tier3Config[tier3Key as Tier3NavRoutes] : undefined
    );
  }, [pathname]);

  console.log(selectedTier2);

  const providerValue = useMemo(
    () => ({
      selectedTier2,
      setSelectedTier2,
      selectedTier3,
      setSelectedTier3,
      isOpen,
      setIsOpen,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [selectedTier2, selectedTier3, isOpen, mobileNavOpen, setMobileNavOpen]
  );

  return (
    <ExplainContext.Provider value={providerValue}>
      {children}
    </ExplainContext.Provider>
  );
};
