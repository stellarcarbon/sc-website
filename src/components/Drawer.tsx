"use client";

import { useAppContext } from "@/context/appContext";
import CloseIcon from "./icons/CloseIcon";
import Button from "./Button";
import DrawerLink from "./DrawerLink";
import TopBarLink from "./TopBarLink";
import { useRouter, usePathname } from "next/navigation";

export default function Drawer() {
  const { closeDrawer } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col min-w-screen min-h-screen
    ${
      pathname.includes("/wallet") || pathname.includes("/checkout")
        ? "!bg-primary border-secondary"
        : "bg-white border-gray-50"
    }
    `}
    >
      <div
        className={`flex justify-between items-center px-[5vw] h-20 border-b shadow-[0px_15px_12px_-20px_rgba(0,0,0,0.5)]
        ${
          pathname.includes("/wallet") || pathname.includes("/checkout")
            ? "border-secondary"
            : "border-gray-200"
        }
        `}
      >
        <img className="h-10" src="/stellarcarbon-heading.png" />
        <button
          className={`${
            pathname.includes("/wallet") ? "text-accent" : "text-black"
          }`}
          onClick={closeDrawer}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={`flex flex-col mt-4 `}>
        <DrawerLink href="/">Home</DrawerLink>
        <DrawerLink href="/explain">What is Stellarcarbon?</DrawerLink>
        <DrawerLink href="/projects">Current projects</DrawerLink>
        <DrawerLink href="/about">About us</DrawerLink>
      </div>
      <hr
        className={`w-full my-4 mb-8         ${
          pathname.includes("/wallet") || pathname.includes("/checkout")
            ? "border-secondary"
            : "border-gray-200"
        }`}
      />
      <Button
        className="w-[50%] self-center"
        onClick={async () => {
          await router.push("/wallet");
          if (pathname === "/wallet") {
            // In case already on that path, have to close ourselves.
            closeDrawer();
          }
        }}
      >
        Action
      </Button>
    </div>
  );
}
