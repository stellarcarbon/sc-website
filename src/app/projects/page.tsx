"use client";

import CountUp from "@/components/CountUp";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import ShipiboImages from "@/components/ShipiboImages";
import Subheader from "@/components/Subheader";
import { useAppContext } from "@/context/appContext";

export default function ProjectsPage() {
  const { isMobileDevice } = useAppContext();

  return (
    <main className="flex flex-col items-center font-noto">
      {/* Current project title with whale */}
      <div className="whale-bg pt-4 md:pt-8 w-full">
        <div className="flex flex-col items-center gap-10 max-w-[80%] md:max-w-[65%] py-8 m-auto">
          <span className="text-5xl md:text-[7vw] text-center leading-[56px] md:leading-[8vw] image1">
            Current Offset Project
          </span>
          <span className="text-2xl uppercase font-sans font-[700] text-center tracking-[8px] leading-[44px]">
            Land in the rainforest
          </span>
        </div>
      </div>

      {/* Custom content container */}
      <div className="flex flex-col md:flex-row grow pt-12 md:pt-20 lg:max-w-[900px] xl:max-w-[1200px] px-4">
        <div className="hidden md:block w-full mb-8 md:flex-1  md:mr-16">
          <ShipiboImages />
        </div>

        <div className="md:flex-1">
          <Header>
            About Shipibo Conibo and Cacataibo Indigenous Communities
          </Header>

          <Paragraph>
            The Ucayali Region is located in the central part of eastern Peru,
            with an approximate area of 105 082.69 km2, is the second region,
            after the Loreto Region, to introduce greater extent. Politically
            bounded on the north by the Loreto Region; on the south by the
            Regions of Junín, Cusco and Madre de Dios; on the west by the
            Huánuco and Pasco regions; on the east by the State of Acre –
            Brazil.
          </Paragraph>
          <Paragraph>
            It is divided into 4 provinces: Padre Abad, Coronel Portillo and
            Atalaya Purus; for a total of 15 districts. It has 432,000
            inhabitants, according to the National Census of 2007. In Ucayali
            live 14 ethnic families with a population of 40 thousand people,
            representing 12 percent of total amazonian indigenous population.
            The project is developed in 07 native communities belonging to
            ethnic Cacataibo and Shibipo Conibo, which grouped occupy an area of
            127,004.0 hectares. The purpose of the project is to conserve the
            forests of these communities from the advance of deforestation and
            degradation.
          </Paragraph>
          <Paragraph>
            <a
              href="https://registry.verra.org/app/projectDetail/VCS/1360"
              target="_blank"
              className="underline text-accentSecondary"
            >
              Read more on Verra
            </a>
          </Paragraph>

          <Subheader>Verification</Subheader>

          <p className="flex flex-col underline text-accentSecondary">
            <a
              href="https://registry.verra.org/mymodule/ProjectDoc/Project_ViewFile.asp?FileID=44972&IDKEY=j98klasmf8jflkasf8098afnasfkj98f0a9sfsakjflsakjf8dk62016388"
              target="_blank"
            >
              Progress Monitoring report
            </a>
            <a
              href="https://info.fsc.org/details.php?id=a0240000005sSO8AAM&type=certificate"
              target="_blank"
            >
              FSC Certificate GFA-FM/COC-001288
            </a>
          </p>

          <div className="md:hidden px-4 my-8 mt-16">
            <ShipiboImages />
          </div>
        </div>
      </div>

      {/* Widgets */}
      <div className="max-w-[80%] my-12 flex flex-col md:flex-row justify-center">
        <CountUp
          value={1270}
          unit={"Km2 Area"}
          subject={"Under better management of natural resources."}
        />
        <CountUp
          value={5.2}
          unit={"Km2 Area"}
          subject={
            "Better biophysical conditions within the lands of indigenous communities."
          }
        />
        <CountUp
          value={350}
          unit={"Families"}
          subject={
            "Indigenous families with improved livelihoods and economic benefits."
          }
        />
        <CountUp
          value={4}
          unit={"Businesses"}
          subject={
            "Sustainable businesses developed by indigenous communities."
          }
        />
      </div>
    </main>
  );
}
