import { Server } from "stellar-sdk/lib/horizon";
import {
  Networks,
  TransactionBuilder,
  OperationType,
} from "stellar-sdk/lib/index";

import {
  CARBON_ACCOUNT,
  CARBON_SINK_ACCOUNT,
  FrontpageTransactionRecord,
  MyTransactionRecord,
} from "../types";
import { PaymentsPageToFrontPageToTransactionsRecordArray } from "../utils";

export default class TransactionHistoryService {
  private static server = new Server("https://horizon.stellar.org");

  public static async fetchAccountHistory(
    account: string
  ): Promise<MyTransactionRecord[]> {
    console.log("Fetching account history.");

    // All payments that CarbonSINK account is involved in.
    const payments = await this.server
      .payments()
      .forAccount(CARBON_SINK_ACCOUNT)
      .limit(200)
      .order("desc")
      .call();

    // Payments in CarbonSINK to user account
    const userPayments = payments.records.filter(
      (record: any) =>
        record.asset_issuer === CARBON_SINK_ACCOUNT && record.to === account
    );

    const mrs: MyTransactionRecord[] = await Promise.all(
      userPayments.map(async (userPayment: any) => {
        const transaction = (await userPayment.transaction()) as any;
        const xdrPayload = TransactionBuilder.fromXDR(
          transaction.envelope_xdr,
          Networks.PUBLIC
        ) as any;
        const operations = xdrPayload._operations;

        let asset = "";
        let assetAmount = 0;

        // De klant koopt CARBON met XLM of USDC of any.
        const typeStrictReceive: OperationType = "pathPaymentStrictReceive";
        let paymentOperation = operations.find(
          (op: any) => op.type === typeStrictReceive
        );

        if (paymentOperation !== undefined) {
          asset = paymentOperation.sendAsset.code;
          // This is a "worst case" amount, an approximation:
          // The exact source amount is in tx.result_xdr which is more challenging to parse.
          assetAmount = paymentOperation.sendMax;
        } else {
          // Als iemand met CARBON direct betaalt.
          paymentOperation = operations.find(
            (op: any) => op.destination === CARBON_ACCOUNT
          );
          asset = paymentOperation.asset.code;
          assetAmount = paymentOperation.amount;
        }

        return {
          id: transaction.hash,
          createdAt: transaction.created_at,
          memo: transaction.memo,
          assetAmount: Number(assetAmount),
          asset,
          sinkAmount: Number(userPayment.amount),
          isPending: false,
        } as MyTransactionRecord;
      })
    );

    return mrs;
  }

  public static async fetchRecentTransactions(): Promise<
    FrontpageTransactionRecord[]
  > {
    const payments = await this.server
      .payments()
      .forAccount(CARBON_SINK_ACCOUNT)
      .limit(4)
      .order("desc")
      .call();

    payments.next();

    return await PaymentsPageToFrontPageToTransactionsRecordArray(payments);
  }
}
