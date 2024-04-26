import AccountIcon from "@/components/icons/AccountIcon";
import CARBONCurrencyIcon from "@/components/icons/CARBONCurrencyIcon";
import HistoryIcon from "@/components/icons/HistoryIcon";
import { faReceipt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardSink() {
  return (
    <div>
      <div className="flex">
        <FontAwesomeIcon icon={faUser} />

        <FontAwesomeIcon icon={faReceipt} />
        <CARBONCurrencyIcon width={17} height={17} />
      </div>
    </div>
  );
}
