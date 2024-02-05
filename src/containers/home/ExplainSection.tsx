import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Link from "next/link";

export default function ExplainSection() {
  return (
    <div className="flex flex-col md:flex-row py-12 m-auto max-w-[80%]">
      {/* Stats */}
      <div className="flex flex-col md:flex-1">
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
      {/* Text */}
      <div className="font-noto md:flex-1 mt-8">
        <Header>How does Stellarcarbon work?</Header>
        <div className="tracking-wide leading-7">
          <p>
            Stellarcarbon works by combining a cooperation with Verra for
            reliable carbon compensation and the blockchain to enable users to
            easily use their XLM to improve biodiversity and reduce CO2
            emissions.
          </p>
          <Link className="text-sm underline" href="/explain">
            Read detailed explanation here
          </Link>
        </div>
      </div>
    </div>
  );
}
