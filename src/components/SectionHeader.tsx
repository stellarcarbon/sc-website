import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export default function SectionHeader({
  children,
  icon,
}: {
  icon?: IconProp;
  children: ReactNode;
}) {
  if (icon) {
    return (
      <div className="tracking-wide font-bold h-14 text-2xl flex items-center justify-between gap-2 w-full px-3 md:px-4 backdrop-blur border-b border-neutral-700 text-gray-100">
        <FontAwesomeIcon icon={icon} />
        {children}
      </div>
    );
  }

  return (
    <div className="tracking-wide font-bold h-14 text-2xl flex items-center justify-between w-full px-3 md:px-4 backdrop-blur border-b border-alternateGray text-gray-100">
      {children}
    </div>
  );
}
