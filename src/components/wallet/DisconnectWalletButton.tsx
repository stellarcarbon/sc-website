import { useAppContext } from "@/context/appContext";
import Button from "../Button";

export default function DisconnectWalletButton() {
  const { disconnectWallet } = useAppContext();

  const dc = () => {
    disconnectWallet();
  };
  return (
    <Button onClick={dc}>Disconnect & choose another STELLAR account</Button>
  );
}
