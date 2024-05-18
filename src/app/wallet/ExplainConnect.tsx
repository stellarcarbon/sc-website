import Button from "@/components/Button";

export default function ExplainConnect({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col  px-6 md:pb-10 bg-secondary md:border border-tertiary min-h-[calc(100vh-176px)] md:min-h-0 md:min-w-[600px] md:max-w-[650px] md:rounded-md border-gray shadow-lg">
      {/* <div className="flex flex-col px-6"> */}
      {/* <h1 className="text-3xl font-bold">Sinking carbon</h1> */}
      <p className="pt-16 md:pt-10">
        To be able to sink CARBON you need a wallet. Stellarcarbon supports the
        following wallets that are well-known in the Stellar ecosystem.
      </p>
      <ul className="pb-6">
        <li>- ALBEDO</li>
        <li>- XBULL</li>
        <li>- FREIGHTER</li>
        <li>- Rabet</li>
      </ul>

      <p>We are planning to support WalletConnect in the near future.</p>
      {/* <p className="pb-12 px-6">
    You will need a wallet with funds to sign a carbon sinking
    transaction. */}
      {/* After connecting your wallet with
    us, you will also be able to access your personal sinking history. */}
      {/* <br />
    <br />
    {`By sinking CARBON tokens you are helping prevent more CO2
      emissions from occuring :)`} */}
      {/* </p> */}
      <Button className="self-center" onClick={onClick}>
        Continue
      </Button>
      {/* </div> */}
    </div>
  );
}
