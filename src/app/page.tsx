export default function Home() {
  return (
    // <main className="flex flex-col min-h-screen items-center justify-start ">
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-rainforest bg-cover bg-top bg-fixed bg-no-repeat w-full min-h-[1200px] top-0 left-0 z-0 block absolute" />
      <div className="z-10 relative mt-[10vh] text-white text-center max-w-[75%] min-h-[1200px]">
        <h1>
          <span className="text-7xl font-noto">Sinking CARBON</span>
          <br />
          <span className="text-7xl font-noto">with Stellar</span>
        </h1>
        <h2 className="mt-[5vh] uppercase text-2xl tracking-[.4em] font-bold">
          Under development
        </h2>
        <h2 className="mt-[5vh] uppercase text-2xl tracking-[.4em] font-bold">
          Stellar Offsets
        </h2>
        <p className="m-6 leading-8">
          We provide a simple way to make voluntary, negative emissions
          contributions,
          <br /> via high integrity nature based projects on the blockchain.
        </p>
        <p className="m-6 leading-8">
          Each CARBON token represents 1 tonne of carbon dioxide-equivalent
          emissions that have
          <br /> been reduced, avoided, or sequestered by a verified carbon
          offset project, and which will not
          <br /> be released into the atmosphere.
        </p>
      </div>
      <div className="h-[800px] pt-80"> Other stuff</div>
    </div>

    // </main>
  );
}
