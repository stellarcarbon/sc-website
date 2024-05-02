import { StellarWalletsKit, WalletNetwork } from "stellar-wallets-kit";
import { WalletConnection } from "../types";

export default class LocalStorageService {
  public static LOCAL_STORAGE_KEY = "wallet";

  public static loadWalletConnection(): WalletConnection | undefined {
    const storedWalletConnectionJSONString = localStorage.getItem(
      this.LOCAL_STORAGE_KEY
    );

    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
      wc.kit = new StellarWalletsKit({
        selectedWallet: wc.walletType,
        network: WalletNetwork.PUBLIC,
      });
      return wc;
    }
    return undefined;
  }

  public static setWalletConnection(walletConnection: WalletConnection): void {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(walletConnection)
    );
  }

  public static removeWalletConnection() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
