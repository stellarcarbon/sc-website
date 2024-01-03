import Link from "next/link";
import TopBarLink from "./TopBarLink";

export default function TopBar() {
  return (
    <header className="flex w-full justify-between items-center bg-white h-20 z-10 relative">
      <img className="h-10 ml-[5vw]" src="/stellarcarbon-heading.png" />
      <div className="mr-[5vw] flex gap-4">
        <TopBarLink href="/">Home</TopBarLink>
        <TopBarLink href="/wallet">Wallet</TopBarLink>
      </div>
    </header>
  );
}
