import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, ReactNode } from "react";

export default function SectionHeader({
  children,
  icon,
}: {
  icon?: IconProp;
  children: ReactNode;
}) {
  if (icon) {
    return (
      <div className="bg-secondary font-bold h-14 text-xl flex items-center gap-2 w-full px-3 md:px-4">
        <FontAwesomeIcon icon={icon} />
        {children}
      </div>
    );
  }

  return (
    <div className="bg-primary font-bold h-14 text-xl flex items-center justify-between w-full px-3 md:px-4">
      {children}
    </div>
  );
}
