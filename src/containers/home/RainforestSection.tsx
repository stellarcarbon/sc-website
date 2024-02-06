import Button from "@/components/Button";
import CTAButton from "@/components/CTAButton";
import BuyStellarCarbonIcon from "@/components/icons/BuyStellarCarbon";
import StellarCarbonIcon from "@/components/icons/StellarCarbonIcon";

export default function RainforestIntro() {
  return (
    <>
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full min-h-[800px] md:min-h-0 md:h-[800px] top-0 left-0 z-0 block absolute" />
      <div className="flex flex-col items-center justify-center gap-[80px] z-10 relative text-center w-[100%] h-[720px]">
        {/* <h1 className="max-w-[80%]">
          <span className="text-6xl font-noto">Sink CARBON</span>
          <br />
          <span className="text-6xl font-noto">with Stellar</span>
        </h1> */}
        {/* <h2 className="my-4 uppercase text-2xl tracking-[.4em] font-bold">
          Under development
        </h2>
        <h2 className="my-4 uppercase text-2xl tracking-[.4em] font-bold">
          Stellar Offsets
        </h2> */}

        <div className="flex flex-col leading-8 text-md p-5 pb-7 md:py-10 w-full relative z-[1000] bg-primary/[.54]">
          <h1 className="text-4xl font-noto my-2 mb-4">Stellarcarbon</h1>
          <span className="md:max-w-[30%] self-center">
            We provide a simple way for{" "}
            <a
              className="underline"
              href="https://stellar.org/"
              target="_blank"
            >
              Stellar
            </a>{" "}
            users to contribute to high-integrity nature based projects, making
            it effortless to compensate for your remaining emissions.
            {/* 
            We provide a simple way to make voluntary, negative emissions
            contributions,
            <br /> via high integrity nature based projects on the blockchain. */}
          </span>
          <CTAButton className="self-center mt-4 md:mt-8" />
          {/* <Button className="my-4 w-[250px] self-center">
            <BuyStellarCarbonIcon />
          </Button> */}
        </div>

        {/* <span className="m-6 leading-8">
          Each CARBON token represents 1 tonne of carbon dioxide-equivalent
          emissions that have
          <br /> been reduced, avoided, or sequestered by a verified carbon
          offset project, and which will not
          <br /> be released into the atmosphere.
        </span> */}
      </div>
    </>
  );
}
