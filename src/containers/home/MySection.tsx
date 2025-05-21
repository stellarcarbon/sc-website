import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import {
  faBusinessTime,
  faContactCard,
  faFileContract,
  faLightbulb,
  faMoneyBill,
  faMoneyBills,
  faMoneyCheckDollar,
  faReceipt,
  faStamp,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MySection() {
  return (
    <div className="bg-primary flex flex-col md:flex-row py-12 m-auto w-full px-3 md:px-0 shadow-xl z-[10] border-y border-tertiary">
      <div className="md:flex-1 pl-[5%] ">
        <div className="tracking-wide leading-7 text-3xl mb-4">
          <div>Why use Stellarcarbon</div>
          <hr className="mt-4 w-[100px] border-2 border-accentSecondary" />
        </div>
        <Paragraph>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faTree} />
              </div>
              <div>Join our effort to preserve rainforests</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faMoneyCheckDollar} />
              </div>
              <div>Know exactly where your money is going</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div>Supereasy, using this website</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faFileContract} />
              </div>
              <div>Smart contract and HTTP integration options</div>
            </div>
          </div>
        </Paragraph>
      </div>
      <div className="flex flex-col pr-[5%] md:w-[40%]">
        <div className="tracking-wide leading-7 text-3xl mb-4">
          <div>Creating trust</div>
          <hr className="mt-4 w-[100px] border-2 border-accentSecondary" />
        </div>
        <Paragraph>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faFileContract} />
              </div>
              {/* <div>
                All contributions are public & verifiable on the Stellar
                blockchain
              </div> */}
              <div>Full transparancy using blockchain</div>
            </div>
            <div className="flex items-center">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon icon={faReceipt} />
              </div>
              <div>Only Verified Carbon Units (VCU's)</div>
            </div>
          </div>
        </Paragraph>
      </div>
    </div>
  );
}
