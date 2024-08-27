import { useSCRouter } from "@/app/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DrawerLinkProps {
  children: ReactNode;
  href: string;
}

export default function DrawerLink({ children, href }: DrawerLinkProps) {
  const pathname = usePathname();
  const router = useSCRouter();

  const isCurrentRoute = () => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`p-4 font-bold 
    ${isCurrentRoute() ? "text-yellow-400" : "text-accent"}
    `}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
    </div>
  );
}
