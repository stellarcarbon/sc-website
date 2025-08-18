import { useAppContext } from "@/context/appContext";
import {
  tier2Config,
  Tier2NavRoutes,
  tier3Config,
  Tier3NavRoutes,
  useExplainContext,
} from "@/context/ExplainContext";
import {
  faChevronDown,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";

export default function ExplainNav() {
  return (
    <nav className="bg-darker w-full h-full md:w-[330px] sticky p-4">
      <ul className="space-y-2">
        <Tier2Item route={Tier2NavRoutes.INTRODUCTION} />
        <Tier2Item route={Tier2NavRoutes.HOWITWORKS} />
        <Tier2Item route={Tier2NavRoutes.TRUST} />
        <Tier2Item route={Tier2NavRoutes.BUSINESS} />
        <Tier2Item route={Tier2NavRoutes.GLOSSARY} />
      </ul>
    </nav>
  );
}

function Tier2Item({ route }: { route: Tier2NavRoutes }) {
  const {
    selectedTier2,
    setSelectedTier3,
    isOpen,
    setIsOpen,
    setMobileNavOpen,
  } = useExplainContext();

  const item = tier2Config[route];

  const router = useRouter();

  const onClick = () => {
    setSelectedTier3(undefined);

    if (item.children && !isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setMobileNavOpen(false);
    }
    router.push(`/explain/${route}`);
  };

  useEffect(() => {
    if (selectedTier2 === item && item.children) {
      setIsOpen(true);
    }
  }, [selectedTier2, item, setIsOpen]);

  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center justify-between w-full text-left py-2 px-3 hover:bg-secondary hover:text-alternateLight rounded-md ${
          selectedTier2 === item ? "text-alternateFull bg-secondary/50" : ""
        }`}
      >
        <span>{item.label}</span>
        {item.children ? (
          isOpen && selectedTier2 === item ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )
        ) : null}
      </button>

      {item.children && isOpen && selectedTier2 === item && (
        <ul className="mt-1 ml-6 space-y-1">
          {item.children?.map((t3item, idx) => {
            return (
              <Tier3Item
                key={`${item.label}_${idx}`}
                route={t3item.key}
              ></Tier3Item>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function Tier3Item({ route }: { route: Tier3NavRoutes }) {
  const { selectedTier2, selectedTier3, setMobileNavOpen } =
    useExplainContext();

  const item = tier3Config[route];

  const router = useRouter();

  const onClick = () => {
    setMobileNavOpen(false);
    router.push(`/explain/${selectedTier2?.key}/${item.key}`);
  };

  const selected = selectedTier3 === item;

  return (
    <li>
      <button
        onClick={onClick}
        className={`py-2 px-3 rounded w-full flex items-center gap-2 hover:text-alternateLight ${
          selected ? "text-alternateFull bg-secondary/50" : ""
        }`}
      >
        {item.label}
      </button>
    </li>
  );
}
