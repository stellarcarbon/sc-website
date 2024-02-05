import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Link from "next/link";

export default function ExplainSection() {
  return (
    <div className="flex flex-col md:flex-row mb-4 py-12 m-auto w-full">
      {/* Text */}
      <div className="md:flex-1 mt-0 pl-[5%] md:max-w-[40%]">
        <Header>What does Stellarcarbon do?</Header>
        <div className="tracking-wide leading-7">
          <p>
            With Stellcarbon you can convert XLM or any other asset in your
            Stellar wallet to CO2 reductions and biodiversity.
            <br />
            <br /> Stellarcarbon works by combining a cooperation with Verra for
            reliable carbon compensation and the blockchain to enable users to
            easily use their XLM to improve biodiversity and reduce CO2
            emissions.
          </p>
          <Link className="text-sm underline" href="/explain">
            Read detailed explanation here
          </Link>
        </div>
      </div>
      {/* Stats */}
      <div className="flex flex-col justify-center mt-8 md:mt-0 md:flex-1">
        <CountUp
          value={202000}
          subject={"Carbon stored on the Stellar Network"}
          unit={"Kilograms"}
        />
        <CountUp
          value={26000}
          subject={"Carbon sinked by users"}
          unit={"Kilograms"}
        />
      </div>
    </div>
  );
}
