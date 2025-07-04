import { HTMLProps } from "react";
import HamburgerIcon from "./icons/HamburgerIcon";
import { useAppContext } from "@/context/appContext";
import CloseIcon from "./icons/CloseIcon";
import WalletConnectionInfoSmall from "./WalletConnectionInfoSmall";

export default function HamburgerButton() {
  const { closeDrawer, openDrawer, isDrawerOpen, walletConnection } =
    useAppContext();

  if (isDrawerOpen) {
    return (
      <button
        className={`text-accent h-16 w-16 flex items-center justify-center`}
        onClick={closeDrawer}
      >
        <CloseIcon />
      </button>
    );
  }

  return (
    <button
      onClick={openDrawer}
      className={`h-16 w-16 text-accent flex justify-center items-center`}
    >
      {walletConnection ? <WalletConnectionInfoSmall /> : <HamburgerIcon />}
    </button>
  );
}
