"use client";

import { CarbonService } from "@/client";
import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

export default function ExplainSection() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carbonStored, setCarbonStored] = useState<number>(0);
  const [carbonSunk, setCarbonSunk] = useState<number>(0);

  useEffect(() => {
    CarbonService.getCarbonStats()
      .then((response) => {
        const cStored = parseFloat(response.carbon_stored);
        const cSunk = parseFloat(response.carbon_sunk);
        setCarbonStored(cStored);
        setCarbonSunk(cSunk);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="flex flex-col md:flex-row py-12 m-auto w-full border-y border-y-tertiary">
      {/* Text */}
      <div className="md:flex-1 flex flex-col justify-center pl-[5%] md:max-w-[40%]">
        <Header>Our mission</Header>

        <Paragraph>
          Stellarcarbons mission is to provide user with a convenient way to use
          XLM or other assets in their Stellar wallet to contribute to a vetted
          biodiversity project. In other words, we provide an easy way for
          Stellar users to support a trustworthy nature project of their
          selection.
          {/* We put a lot of effort into finding trustworthy
            biodiversity projects and making it easy to support them for our
            users. */}
          {/* Stellarcarbon works by
            combining a cooperation with Verra for reliable carbon compensation
            and the blockchain to enable users to easily use their XLM to
            improve biodiversity and reduce CO2 emissions. */}
        </Paragraph>
        <Paragraph>
          <Link className="text-sm underline" href="/explain">
            Read detailed explanation here
          </Link>
        </Paragraph>
      </div>
      {/* Stats */}
      <div className="flex flex-col justify-center items-center mt-8 md:mt-0 md:flex-1">
        {isLoading ? (
          <Blocks />
        ) : (
          <>
            <CountUp
              value={carbonStored * 1000}
              subject={"Carbon stored on the Stellar Network"}
              unit={"Kilograms"}
            />
            <CountUp
              value={carbonSunk * 1000}
              subject={"Carbon sunk by users"}
              unit={"Kilograms"}
            />
          </>
        )}
      </div>
    </div>
  );
}
