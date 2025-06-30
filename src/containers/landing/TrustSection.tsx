import { CarbonService } from "@/client";
import CountUp from "@/components/CountUp";
import Paragraph from "@/components/Paragraph";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import LandingSection from "./LandingSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faHandshake } from "@fortawesome/free-solid-svg-icons";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import SCLink from "@/components/SCLink";

export default function WhySection() {
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

  const first = (
    <div>
      <div className="px-4 text-4xl font-bold leading-tight tracking-light mb-2">
        Trust & Verification
      </div>
      <Paragraph>
        Transparency is essential when it comes to online eco contributions.
        That’s why we only work with projects issuing Verified Carbon Units
        (VCUs) and use blockchain technology to ensure every transaction is
        transparent and traceable.
      </Paragraph>
      <Paragraph>
        VCUs are issued through the Verra Registry, the world’s leading standard
        for certifying voluntary carbon offset projects. Each VCU represents one
        metric ton of CO₂ reduced or removed from the atmosphere. By supporting
        only Verra-verified projects, we ensure your contribution goes to
        initiatives with proven environmental benefits.
      </Paragraph>
    </div>
  );

  const second = (
    <div className="md:text-xl flex flex-col justify-center items-center gap-4">
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
  );

  const third = (
    <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4 mt-12 md:mt-20 text-base">
      <div className="bg-primary border border-accentSecondary rounded flex flex-col items-start p-4">
        <FontAwesomeIcon icon={faFileContract} className="text-xl mb-2" />
        <h2 className="font-bold text-xl mb-2">Verra Registry Integration</h2>
        <div>
          All transactions are reflected on the{" "}
          <SCLink href="https://registry.verra.org/" target="_blank">
            Verra Registry
          </SCLink>
          , providing an solid layer of auditing and accountability.
        </div>
      </div>
      <div className="bg-primary border border-accentSecondary rounded flex flex-col items-start p-4">
        <CARBONCurrencyIcon className="mb-3" height={21} width={21} />
        <h2 className="font-bold text-xl mb-2">1 CARBON = 1 VCU</h2>
        <div>
          Each CARBON token represents one Verified Carbon Unit (VCU), ensuring
          a direct and measurable contribution to carbon reduction.
        </div>
      </div>
      <div className="bg-primary border border-accentSecondary rounded flex flex-col items-start p-4">
        <FontAwesomeIcon icon={faHandshake} className="text-xl mb-2" />
        <h2 className="font-bold text-xl mb-2">Viewable transaction records</h2>
        <div>
          {`Access a comprehensive history of your contributions, including dates,
          amounts and memo's, all verifiable on the Stellar blockchain.`}
        </div>
      </div>
    </div>
  );

  return (
    <LandingSection
      // header={"Trust & Verification"}
      first={first}
      second={second}
      third={third}
      className="border-t-0 !bg-darker"
    />
  );
}
