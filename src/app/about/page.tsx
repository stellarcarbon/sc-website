import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center font-noto pb-16 mt-[64px] md:mt-[80px]">
      <div className="flex flex-col p-4 py-12 md:max-w-[1080px] md:m-auto">
        <Header>About us</Header>
        <Paragraph>
          The vision of our parent company Nature Nexus is to connect people
          with nature and their finance too. Nature Nexus supports projects like
          the Great Forest National Park initiative which has transformed the
          logging of old growth forests into a 1.8 million ha national park,
          protecting carbon and biodiversity. We address nature deficit disorder
          through our Wellbeing Walks division where people get to spend time in
          nature, observing and experiencing nature. When it comes to
          sustainability of products on the supply chain side our
          Blockchainifier service allows us to map entire supply chains and make
          visible all aspects of nature based compliance. On the finance side we
          are working on projects that help people to make environmentally
          friendly purchases and compensate for any activities or purchases that
          may be adversely affecting biodiversity or the climate.
        </Paragraph>
        <Paragraph>
          Despite the Stellar Networks comparable low energy blockchain usage
          (due to the Stellar consensus protocol), as passionate Stellar Network
          advocates believing that Stellar will eventually take over the worlds
          financial network, we are concerned about the climate impacts that the
          future global network energy usage will have.
        </Paragraph>
        <Paragraph>
          We teamed up with Public Node which is a not-for-profit organisation
          that provides validator nodes for the Stellar network and whilst some
          of the servers were already running on green energy there were some
          that were not, so we decided to come up with a Stellar based solution
          that would allow this polluting energy to be compensated for. We
          contend that if we build an API for others building on Stellar to
          easily be able to offer this to their customers that the Stellar
          Network could indeed become a carbon neutral or carbon negative global
          financial platform.
        </Paragraph>
        <Paragraph>
          We applied for a Stellar grant in round 9 and were honoured to be
          chosen as a finalist however, due to some high budget projects we did
          not receive any funding. We continued to make some progress towards
          our goal to develop a way to compensate for carbon emissions on the
          Stellar Network and re applied for a Stellar grant in round 12.
          Stellar Community Fund introduced the boot camp which opened our eyes
          to how to better communicate what we were trying to do at a high level
          rather than using technical detail. Once again we were honoured to be
          a finalist and that the Stellar community voted us in at number 3
          position, so this time we had our modest funding ask of $35,000
          fulfilled to allow us to build a pilot. Incredibly via Public Node we
          may have been the first to retire a verified carbon credit on the
          blockchain! Another great outcome from the SDF process was that we
          attracted Mojoflower who are also developing on Stellar to become our
          second partner organisation to test out our API and provide valuable
          market feedback.
        </Paragraph>
        <Paragraph>
          For the pilot we have chosen the most difficult and contentious area
          in the nature repair market being Carbon offsets. Despite having a
          verified carbon standard and accreditation through VERRA for projects
          that produce carbon offsets, these nature based offsets are now
          considered contentious because, it has proven difficult to show that
          some projects even exist little own make the contribution to drawing
          down carbon out of the atmosphere, which is the basis for the carbon
          credits that people purchase. This challenge provided Stellar Carbon
          the perfect opportunity to introduce the blockchain to be able to
          provide better transparency and visibility of offsets, and give people
          more confidence in the offsets that they purchase.
        </Paragraph>
        <Paragraph>
          Over our journey another shortfall of the offset philosophy that came
          to light is that rather than addressing the root cause of pollution
          and reducing carbon emissions from polluting processes, offsets allow
          polluters to keep polluting as normal and just buy offsets. With the
          advent of Soroban for smart contracts on the Stellar Network, Stellar
          Carbon saw an opportunity to use the blockchain to be able to address
          the loopholes in the current offset philosophy for polluters by using
          Soroban smart contracts to require polluters to take appropriate steps
          to first reduce pollution as much as possible before buying offsets.
          As the nature repair markets evolve we are evolving with them to make
          the outcomes more rigorous, transparent and immutable on the
          blockchain. We are now planning to submit for another round of funding
          to take our pilot to the next level. Once our pilot project has solved
          these inherent loop holes and issues, we will be able to roll out the
          high integrity and high visibility blockchain model to other nature
          based markets.
        </Paragraph>
        <Paragraph>
          Stellar Carbons vision is to provide a way for people to confidently
          invest and support projects that are legitimately and transparently
          helping to repair nature, specifically the climate. We are looking for
          more volunteers to join the team either as pilot partners, social
          media gurus, smart contract experts or website developers so please
          get in touch and get involved in making the future of the worlds
          financial network environmentally responsible.
        </Paragraph>
      </div>
    </main>
  );
}
