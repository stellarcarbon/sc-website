import { WalletConnection } from "@/app/types";
import { mRequestCertificate } from "@/utils";
import {
  getRetirementsForBeneficiary,
  RetirementItem,
} from "@stellarcarbon/sc-sdk";

export default class RoundingService {
  private static LOCAL_STORAGE_KEY = "rd";

  public static async setLatestRetirement(pubKey: string) {
    const response = await getRetirementsForBeneficiary({
      path: {
        beneficiary_address: pubKey,
      },
      query: {
        order: "desc",
      },
    });

    const latestRetirement: RetirementItem | null =
      response.data?.retirements[0] ?? null;

    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify({
        latestRetirementDate: latestRetirement?.retirement_date,
      })
    );
  }

  public static async hasPendingRounding(pubKey: string): Promise<boolean> {
    const localPending = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localPending === null) {
      // Nothing in local storage, so its false.
      return false;
    }

    const response = await getRetirementsForBeneficiary({
      path: {
        beneficiary_address: pubKey,
      },
      query: {
        order: "desc",
      },
    });

    const latestRetirement: RetirementItem | null =
      response.data?.retirements[0] ?? null;

    if (latestRetirement === null) {
      // No previous retirements found, but we know one is pending from local storage.
      return true;
    }

    const latestRetirementDate = Date.parse(latestRetirement.retirement_date);
    const storedRetirementDate = Date.parse(
      JSON.parse(localPending).latestRetirementDate
    );

    if (latestRetirementDate > storedRetirementDate) {
      // There has been a retirement since our request round-down, meaning the rounding request finished.
      localStorage.removeItem(this.LOCAL_STORAGE_KEY);
      return false;
    }

    return true;
  }

  public static async requestCertificate(
    walletConnection: WalletConnection,
    token: string
  ) {
    return await mRequestCertificate({
      recipientAddress: walletConnection.stellarPubKey,
      email: walletConnection.personalDetails!.useremail,
      jwt: token,
    });
  }
}
