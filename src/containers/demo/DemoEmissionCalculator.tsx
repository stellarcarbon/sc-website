import Button from "@/components/Button";
import DemoWalletConnectionInfo from "./DemoWalletConnectionInfo";
import { useRouter } from "next/navigation";

export default function DemoEmissionCalculator() {
  const router = useRouter();

  return (
    <>
      <h1 className="text-2xl font-semibold">
        Calculate your flight emissions
      </h1>
      <span className="flex items-center h-[600px]">
        --hier komt de co2 calculator--
      </span>
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => router.push("/demo/sink")}>
          Compensate my emission
        </Button>
        <span>- or -</span>
        <Button onClick={() => router.push("/demo/sink")}>
          Continue without estimating emissions
        </Button>
      </div>
    </>
  );
}
