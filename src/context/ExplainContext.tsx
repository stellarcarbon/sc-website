import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface Tier3NavItem {
  label: string;
  href: string;
}

export interface Tier2NavItem {
  label: string;
  href: string;
  children?: Tier3NavItem[];
}

export enum Tier2NavItems {
  INTRODUCTION = "introduction",
  HOWITWORKS = "howitworks",
  TRUST = "trust",
  GLOSSARY = "glossary",
  BUSINESS = "business",
}

export enum Tier3NavItems {
  SINKINGPROCESS = "process",
  INVENTORY = "inventory",
  RETIREMENT = "retirement",
}

export const mExplainTier3Config: Record<Tier3NavItems, Tier3NavItem> = {
  [Tier3NavItems.SINKINGPROCESS]: {
    label: "Sinking process",
    href: "/explain/how-it-works/sinking-process/",
  },
  [Tier3NavItems.INVENTORY]: {
    label: "Token balance",
    href: "/explain/how-it-works/inventory/",
  },
  [Tier3NavItems.RETIREMENT]: {
    label: "Retirement",
    href: "/explain/how-it-works/retirement/",
  },
};

export const mExplainConfig: Record<Tier2NavItems, Tier2NavItem> = {
  [Tier2NavItems.HOWITWORKS]: {
    label: "How it works",
    href: "/explain/how-it-works/",
    children: [
      mExplainTier3Config[Tier3NavItems.SINKINGPROCESS],
      mExplainTier3Config[Tier3NavItems.INVENTORY],
      mExplainTier3Config[Tier3NavItems.RETIREMENT],
    ],
  },
  [Tier2NavItems.GLOSSARY]: {
    label: "Glossary of key terms",
    href: "/explain/glossary/",
  },
  [Tier2NavItems.INTRODUCTION]: {
    label: "Introduction",
    href: "/explain/",
  },
  [Tier2NavItems.TRUST]: {
    label: "Trust & verification",
    href: "/explain/trust/",
  },
  [Tier2NavItems.BUSINESS]: {
    label: "For business",
    href: "/explain/integration",
  },
};

type ExplainContext = {
  selectedTier2: Tier2NavItem | undefined;
  setSelectedTier2: Dispatch<SetStateAction<Tier2NavItem | undefined>>;

  selectedTier3: Tier3NavItem | undefined;
  setSelectedTier3: Dispatch<SetStateAction<Tier3NavItem | undefined>>;

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
  const [selectedTier2, setSelectedTier2] = useState<Tier2NavItem>();
  const [selectedTier3, setSelectedTier3] = useState<Tier3NavItem>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(true);

  console.log(selectedTier3, isOpen);

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
