import { useAppContext } from "@/app/context/appContext";
import Button from "../../components/Button";

export default function DisconnectWalletButton() {
  const { disconnectWallet } = useAppContext();
  return (
    <Button onClick={disconnectWallet}>
      Disconnect & choose another STELLAR account
    </Button>
  );
}
