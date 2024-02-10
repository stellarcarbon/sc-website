import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Link from "next/link";

export default function ExplainSection() {
  return (
    <div className="flex flex-col md:flex-row py-12 m-auto w-full">
      {/* Text */}
      <div className="md:flex-1 flex flex-col justify-center pl-[5%] md:max-w-[40%]">
        <Header>Our mission</Header>
        <div className="tracking-wide leading-7">
          <p>
            Stellarcarbons mission is to provide user with a convenient way to
            use XLM or other assets in their Stellar wallet to contribute to a
            vetted biodiversity project. In other words, we provide an easy way
            for Stellar users to support a trustworthy nature project of their
            selection.
            {/* We put a lot of effort into finding trustworthy
            biodiversity projects and making it easy to support them for our
            users. */}
            {/* Stellarcarbon works by
            combining a cooperation with Verra for reliable carbon compensation
            and the blockchain to enable users to easily use their XLM to
            improve biodiversity and reduce CO2 emissions. */}
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
          subject={"Carbon sunk by users"}
          unit={"Kilograms"}
        />
      </div>
    </div>
  );
}
