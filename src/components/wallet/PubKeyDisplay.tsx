import { useAppContext } from "@/context/appContext";

export default function PubKeyDisplay() {
  const { walletConnection } = useAppContext();

  return (
    <>
      <span>Connected with Stellar PubKey:</span>
      <span id="stellarPubKey" className="text-2xl break-all mt-4 mb-12">
        {walletConnection!.stellarPubKey}
      </span>
    </>
  );
}
