import {
  AccountService,
  AuthService,
  RetirementItem,
  SEP10ChallengeResponse,
} from "@/client";
import { DEV_ACCOUNT, WalletConnection } from "@/app/types";
import { mRequestCertificate } from "@/app/utils";

export default class RoundingService {
  private static LOCAL_STORAGE_KEY = "rd";

  public static async setLatestRetirement(pubKey: string) {
    const retirementList = await AccountService.getRetirementsForBeneficiary({
      beneficiaryAddress: DEV_ACCOUNT, // TODO: change from dev account to pubKey
      order: "desc",
    });

    const latestRetirement: RetirementItem | null =
      retirementList.retirements[0] ?? null;

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

    const retirementList = await AccountService.getRetirementsForBeneficiary({
      beneficiaryAddress: pubKey,
      order: "desc",
    });
    const latestRetirement: RetirementItem | null =
      retirementList.retirements[0] ?? null;
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

  public static async getChallenge(walletConnection: WalletConnection) {
    return await AuthService.getSep10Challenge({
      account: walletConnection.stellarPubKey,
    });
  }

  public static async signChallenge(
    walletConnection: WalletConnection,
    challenge: SEP10ChallengeResponse
  ) {
    return await walletConnection.kit.sign({
      xdr: challenge.transaction,
      publicKey: walletConnection.stellarPubKey,
    });
  }

  public static async validateChallenge(signedXDR: string) {
    return await AuthService.validateSep10Challenge({
      transaction: signedXDR,
    });
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
