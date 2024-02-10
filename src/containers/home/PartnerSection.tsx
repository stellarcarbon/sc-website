import Header from "@/components/Header";
import PartnerLogo, { Partners } from "@/components/PartnerLogo";
import Link from "next/link";

export default function PartnerSection() {
  return (
    <div className="bg-secondary py-12 w-full">
      <div className="flex flex-col gap-8 md:gap-0 md:flex-row h-full w-full">
        {/* Text */}
        <div className="m-auto pl-[5%] md:w-[40%]">
          <Header>For business</Header>
          <div className="tracking-wide leading-7">
            <p>
              We also provide API integration for Stellar entities that want to
              make it easy for their users to contribute to biodiversity or
              compensate emissions.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              non euismod quam. Nulla facilisi. Donec dignissim elementum dui
              sed dignissim.
            </p>
            <Link href="/transactions" className="underline text-sm">
              Read more about integrating with our API here
            </Link>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-8 md:mt-0 md:flex-1 md:max-w-[60%] md:min-h-[300px] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-noto text-center">
            Stellar Entities Storing CARBON
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-around w-full">
            {Object.values(Partners).map((partner) => {
              return <PartnerLogo partner={partner} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
