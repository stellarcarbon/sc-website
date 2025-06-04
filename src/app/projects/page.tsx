"use client";

import Banner from "@/components/Banner";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import ShipiboImages from "@/components/ShipiboImages";
import Subheader from "@/components/Subheader";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col items-center font-noto bg-darkest">
      <Banner
        title="Current Projects"
        subtitle="Land in the rainforest"
        background="forest-bg"
      />

      {/* Custom content container */}
      <div className="flex flex-col md:flex-row grow md:pt-20 lg:max-w-[900px] xl:max-w-[1200px]">
        <div className="hidden w-full mb-8 md:flex-1  md:mr-16 xl:flex items-center">
          <ShipiboImages />
        </div>

        <div className="md:flex-1 md:mt-[-32px] flex flex-col gap-1">
          <Header>Our offset project</Header>

          <Paragraph>
            We currently support only one project, which is a rainforest
            conservation project. Contributing to Stellarcarbon means you will
            be investing in the positive outcomes of the project.
          </Paragraph>

          <Subheader>Ucayali region</Subheader>
          <Paragraph>
            {`This project, located in Peru's Ucayali region, focuses on forest
            conservation within the territories of the Shipibo-Conibo and
            Cacataibo Indigenous communities. The project aims to reduce
            deforestation and forest degradation while supporting sustainable
            forest management practices. The Ucayali region, home to a rich
            diversity of Indigenous cultures and ecosystems, faces increasing
            pressure from deforestation driven by agricultural expansion and
            other land-use changes.`}
          </Paragraph>
          <Subheader>Verified Carbon Standard</Subheader>
          <Paragraph>
            {`Through this initiative, the participating communities are working
            to protect their forests, preserve biodiversity, and generate
            verified carbon credits under the Verified Carbon Standard (VCS) and
            Climate, Community & Biodiversity (CCB) standards, contributing to
            climate change mitigation, the safeguarding of the area’s rich
            biodiversity, and the protection of Indigenous livelihoods.`}
          </Paragraph>
        </div>
      </div>
      <div className="lg:max-w-[900px] xl:max-w-[1200px]">
        <div>
          <div className="xl:hidden px-4 my-8 mt-16 w-full flex justify-center">
            <div className="max-w-[600px]">
              <ShipiboImages />
            </div>
          </div>
          <Header>About the project area</Header>

          <Paragraph>
            {`The Ucayali Region is located in the central part of eastern Peru,
            with an approximate area of 105 082.69 km2, is the second region,
            after the Loreto Region, to introduce greater extent. Politically
            bounded on the north by the Loreto Region; on the south by the
            Regions of Junín, Cusco and Madre de Dios; on the west by the
            Huánuco and Pasco regions; on the east by the State of Acre –
            Brazil.`}
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
            <Link
              href="https://registry.verra.org/app/projectDetail/VCS/1360"
              target="_blank"
              className="underline text-accentSecondary"
            >
              Read more on Verra
            </Link>
          </Paragraph>

          <Header>Verification links</Header>

          {/* <p className="flex flex-col underline text-accentSecondary"> */}
          <Paragraph>
            <div className="flex flex-col gap-4 mt-2">
              <Link
                className="underline text-accentSecondary"
                href="https://registry.verra.org/mymodule/ProjectDoc/Project_ViewFile.asp?FileID=123849&IDKEY=s903q4jsafkasjfu90amnmasdfkaidflnmdf9348r09dmfasdfk170787771"
                target="_blank"
              >
                Progress Monitoring report
              </Link>
              <Link
                className="underline text-accentSecondary"
                href="https://search.fsc.org/en/certificate/a0240000005sSO8AAM/"
                target="_blank"
              >
                FSC Certificate
              </Link>
            </div>
          </Paragraph>
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
      <Footer />
    </main>
  );
}
