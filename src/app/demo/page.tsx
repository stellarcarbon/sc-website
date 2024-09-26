"use client";

import Button from "@/components/Button";
import CO2Calculator from "@/containers/demo/CO2Calculator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DemoPage() {
  const router = useRouter();

  // Skip calculating flight emissions for now.
  useEffect(() => {
    router.push("/demo/sink");
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center p-8 w-full">
      <h1 className="text-2xl font-semibold">
        Calculate your flight emissions
      </h1>
      <span className="flex items-center flex-1 w-full md:max-w-[500px]">
        <CO2Calculator />
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
    </div>
  );
}
