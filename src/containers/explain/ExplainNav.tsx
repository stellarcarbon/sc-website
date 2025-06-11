import {
  mExplainConfig,
  Tier2NavItem,
  Tier2NavItems,
  Tier3NavItem,
  useExplainContext,
} from "@/context/ExplainContext";
import {
  faChevronDown,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function ExplainNav() {
  return (
    <nav className="bg-primary w-[330px] sticky p-4">
      <ul className="space-y-2">
        <Tier2Item item={mExplainConfig[Tier2NavItems.INTRODUCTION]} />
        <Tier2Item item={mExplainConfig[Tier2NavItems.HOWITWORKS]} />
        <Tier2Item item={mExplainConfig[Tier2NavItems.TRUST]} />
        <Tier2Item item={mExplainConfig[Tier2NavItems.BUSINESS]} />
        <Tier2Item item={mExplainConfig[Tier2NavItems.FAQ]} />
      </ul>
    </nav>
  );
}

function Tier2Item({ item }: { item: Tier2NavItem }) {
  const { selectedTier2, setSelectedTier3, isOpen, setIsOpen } =
    useExplainContext();
  const { children, href, label } = item;

  const router = useRouter();

  const onClick = () => {
    setSelectedTier3(undefined);
    if (item.children && !isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    router.push(href);
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
        className={`flex items-center justify-between w-full text-left py-2 px-3 hover:bg-secondary hover:text-yellow-200 rounded-md ${
          selectedTier2 === item ? "text-yellow-400 bg-secondary/50" : ""
        }`}
      >
        <span>{label}</span>
        {children ? (
          isOpen && selectedTier2 === item ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )
        ) : null}
      </button>

      {children && isOpen && selectedTier2 === item && (
        <ul className="mt-1 ml-6 space-y-1">
          {children?.map((t3item, idx) => {
            return (
              <Tier3Item key={`${label}_${idx}`} item={t3item}></Tier3Item>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function Tier3Item({ item }: { item: Tier3NavItem }) {
  const { selectedTier3 } = useExplainContext();

  const router = useRouter();

  const onClick = () => {
    router.push(item.href);
  };

  const selected = selectedTier3 === item;

  return (
    <li>
      <button
        onClick={onClick}
        className={`py-2 px-3 rounded w-full flex items-center gap-2 hover:text-yellow-200 ${
          selected ? "text-yellow-400 bg-secondary/50" : ""
        }`}
      >
        {/* {selected && <FontAwesomeIcon icon={faCircle} height={6} width={6} />} */}
        {item.label}
      </button>
    </li>
  );
}
