"use client";
import Button from "@/app/components/Button";
import PersonalDetailsDisplay from "../components/PersonalDetailsDisplay";
import PubKeyDisplay from "../components/PubKeyDisplay";
import DisconnectWalletButton from "../components/DisconnectWalletButton";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 md:flex-none items-start bg-secondary text-white md:min-w-[600px] md:max-w-[800px] py-10 p-6 md:rounded-md border-gray shadow-lg">
      <p>Wallet setup succesful!</p>
      <PubKeyDisplay />
      <PersonalDetailsDisplay />
      <Button
        className="mb-8"
        onClick={() => {
          router.push("/checkout");
        }}
      >
        Continue to checkout
      </Button>
      <DisconnectWalletButton />
    </div>
  );
}
