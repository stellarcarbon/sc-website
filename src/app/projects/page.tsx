export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-176px)] bg-secondary">
      {/* Current project title with whale */}
      <div className="whale-bg pt-4 h-[320px]">
        <div className="flex flex-col items-center gap-10 max-w-[80%] py-8 m-auto">
          <span className="text-5xl font-noto text-center leading-[56px]">
            Current Offset Project
          </span>
          <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            Land in the rainforest
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col  grow pt-12 max-w-[80%] m-auto">
        {/* Images */}
        <div className="w-full mb-8">
          <div className="m-auto max-w-[80%] mb-[30px] image0">
            <img src="/forest_from_above_carbonbank_1280x719.jpg" />
          </div>
          <div className="max-w-[70%] text-right mr-0 ml-auto mt-[-30%] image1">
            <img src="/VCS-1360-Comite-de-Vigilancia-y-Control-Comunal-cuidando-las-tierras-indigenas.jpg" />
          </div>
        </div>
        {/* Text */}
        <div className="font-noto">
          <h2 className="text-2xl">
            About Shipibo Conibo and Cacataibo Indigenous Communities
          </h2>
          <hr className="my-8 w-[100px] border-2 border-accentSecondary" />
          <div className="tracking-wide leading-7">
            <p>
              The Ucayali Region is located in the central part of eastern Peru,
              with an approximate area of 105 082.69 km2, is the second region,
              after the Loreto Region, to introduce greater extent. Politically
              bounded on the north by the Loreto Region; on the south by the
              Regions of Junín, Cusco and Madre de Dios; on the west by the
              Huánuco and Pasco regions; on the east by the State of Acre –
              Brazil.
            </p>
            <p>
              It is divided into 4 provinces: Padre Abad, Coronel Portillo and
              Atalaya Purus; for a total of 15 districts. It has 432,000
              inhabitants, according to the National Census of 2007. In Ucayali
              live 14 ethnic families with a population of 40 thousand people,
              representing 12 percent of total amazonian indigenous population.
              The project is developed in 07 native communities belonging to
              ethnic Cacataibo and Shibipo Conibo, which grouped occupy an area
              of 127,004.0 hectares. The purpose of the project is to conserve
              the forests of these communities from the advance of deforestation
              and degradation.
            </p>
            <p>
              <a href="verra" className="underline text-accentSecondary">
                Read more on Verra
              </a>
            </p>
            <p>
              <strong>Verification</strong>
            </p>
            <p className="underline text-accentSecondary">
              <a href="">Progress Monitoring report</a>
              <a href="">FSC Certificate GFA-FM/COC-001288</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
