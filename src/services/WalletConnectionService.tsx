import { WalletConnection } from "@/app/types";

export default class WalletConnectionService {
  private static LOCAL_STORAGE_KEY = "wallet";

  public static loadWalletConnection(): WalletConnection | undefined {
    const storedWalletConnectionJSONString = localStorage.getItem(
      this.LOCAL_STORAGE_KEY
    );

    if (storedWalletConnectionJSONString) {
      const wc: WalletConnection = JSON.parse(storedWalletConnectionJSONString);
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
