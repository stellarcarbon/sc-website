import Header from "@/components/Header";
import AuditTable from "@/containers/AuditTable";

export default function ExplainPage() {
  return (
    <main className="flex flex-col items-center font-noto pb-16 mt-[64px] md:mt-[80px] bg-primary ">
      <div className="bg-rainforest w-full border-b border-b-tertiary">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw]">
            Stellarcarbon
          </span>
          <span className="text-2xl text-center image1">
            Track your carbon sinking
          </span>
          {/* <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            For the curious
          </span> */}
        </div>
      </div>

      <div className="flex flex-col p-4 py-12 md:max-w-[1080px] md:m-auto ">
        <Header>Why use Stellarcarbon?</Header>
        <div>
          <p>
            Why Use Stellarcarbon? Stellarcarbon empowers XLM users to take real
            action on climate. Through our flexible API and easy-to-use webshop,
            Stellar wallet holders can seamlessly contribute to nature projects,
            supporting biodiversity and reducing CO₂ emissions.
          </p>
        </div>
        <Header>Our Partnership with Verra</Header>
        <p>
          Through our collaboration with Verra, each carbon-sinking action is
          transparently recorded on a public blockchain ledger, directly linked
          to your wallet. When you support a nature project, we initiate a token
          burn on Verra’s platform, ensuring that your contribution funds real
          environmental impact. This dual approach provides a secure, verifiable
          record of every action taken to protect our planet.
        </p>
        <Header>Flexible, Precise Carbon Sinking</Header>
        <p>
          With MyCarbon, you’re in control. Our platform enables fractional
          token retirements, allowing you to sink exactly the amount of CO₂ you
          wish to offset. This flexibility means you can tailor your
          contributions to match your exact emissions, creating a personalized,
          impactful way to support nature projects.
        </p>
        <Header>Always Ready for Carbon Sinking</Header>
        <p>
          To make carbon compensation seamless, we maintain a pool of Terra
          tokens, ready for use whenever you want to offset emissions. When you
          initiate a transaction, we immediately retire the appropriate Terra
          tokens, recording every action transparently on the blockchain. This
          ensures that each contribution is traceable and verifiable, giving you
          peace of mind and a clear audit trail for your impact.
        </p>
        {/* <Header>An introduction</Header>
        <div className="tracking-wide leading-7">
          <p>
            Stellarcarbon works by combining a cooperation with Verra for
            reliable carbon compensation and the blockchain to enable users to
            easily use their XLM to improve biodiversity and reduce CO2
            emissions.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            non euismod quam. Nulla facilisi. Donec dignissim elementum dui sed
            dignissim. Cras finibus augue neque, at auctor nisl interdum eget.
            Duis ante velit, fermentum in lorem vel, scelerisque interdum neque.
            Proin dolor ex, scelerisque id felis id, molestie finibus magna.
            Pellentesque ac vulputate massa.
          </p>
        </div>

        <Header>Some calculations</Header>
        <div className="tracking-wide leading-7">
          <p>
            In ut eros pretium velit congue fringilla. Fusce id commodo nibh.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nullam viverra fringilla purus, ac
            pellentesque nulla luctus id. Mauris in nisl sapien. Aliquam felis
            libero, blandit id feugiat et, placerat nec tortor. Aliquam egestas
            nunc et pellentesque auctor. Integer egestas placerat augue id
            finibus. Duis feugiat turpis eget ultrices faucibus. Mauris cursus
            sodales sapien, in viverra nulla. Sed sit amet neque vulputate,
            viverra nunc ut, egestas lacus. Aliquam fermentum, leo quis eleifend
            laoreet, nunc neque tempus dolor, nec lacinia lectus libero in orci.
            Duis eleifend tincidunt porttitor. Mauris enim nibh, ultricies nec
            mi ut, volutpat viverra tellus. Sed ullamcorper finibus tortor, a
            condimentum felis aliquet ut.
          </p>
        </div> */}
      </div>
      <div className="m-auto md:w-[900px]">
        <AuditTable />
      </div>
    </main>
  );
}
