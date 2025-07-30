import { WalletConnection } from "@/app/types";

export default class WalletConnectionStorageService {
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
    console.log(JSON.stringify(walletConnection));
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(walletConnection)
    );
  }

  public static removeWalletConnection() {
    console.log("remove?");
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
