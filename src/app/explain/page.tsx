import Header from "@/components/Header";
import AuditTable from "@/containers/AuditTable";

export default function ExplainPage() {
  return (
    <main className="flex flex-col items-center font-noto pb-16">
      <div className="blockchain-bg w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-12 m-auto">
          <span className="text-5xl md:text-[7vw] font-noto text-center leading-[56px] md:leading-[8vw] image1">
            What is Stellarcarbon?
          </span>
          {/* <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            For the curious
          </span> */}
        </div>
      </div>

      <div className="flex flex-col p-4 py-12 md:max-w-[1080px] md:m-auto">
        <Header>An introduction</Header>
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
        </div>
      </div>
      <div className="m-auto md:w-[900px]">
        <AuditTable />
      </div>
    </main>
  );
}
