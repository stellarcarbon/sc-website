import { CarbonService } from "@/client";
import CountUp from "@/components/CountUp";
import Paragraph from "@/components/Paragraph";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import LandingSection from "./LandingSection";
import LandingSectionHeader from "./LandingSectionHeader";

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
      <LandingSectionHeader>Trustworthy</LandingSectionHeader>
      <Paragraph>
        Transparency is essential when it comes to climate action. That’s why we
        only work with projects issuing Verified Carbon Units (VCUs) and use
        blockchain technology to ensure every transaction is transparent and
        traceable.
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
    <div className="md:text-xl flex flex-col justify-center items-center">
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

  return <LandingSection first={first} second={second} />;
}
