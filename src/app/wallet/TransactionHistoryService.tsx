import { HorizonApi, Server, ServerApi } from "stellar-sdk/lib/horizon";

import { Networks, TransactionBuilder } from "stellar-sdk/lib/index";
import IndexedDBService from "./IndexedDBService";
import { MyTransactionRecord } from "../types";

export default class TransactionHistoryService {
  private userAccount: string;

  constructor(userAccount: string) {
    this.userAccount = userAccount;
  }

  public async fetchHistory(): Promise<MyTransactionRecord[]> {
    const server = new Server("https://horizon.stellar.org");

    // const idbService = await IndexedDBService.create();

    // const transactionStream = server
    //   .transactions()
    //   .forAccount("GC7CDWMCWNCY7JYUW5UBEOLNBSTNDKKZSFTHKGZNPPSOXLFYFX3CSINK")
    //   .stream({
    //     onmessage: async (transactionRecord: any) => {
    //       console.log("message", transactionRecord);
    //       const mr: MyTransactionRecord = {
    //         id: transactionRecord.id,
    //       };
    //       idbService.saveTransaction(mr);
    //       this.updateContextState(mr);
    //     },
    //     onerror: (error) => {
    //       console.error("Error in transaction stream:", error);
    //     },
    //   });

    const CARBON_SINK_ACCOUNT =
      "GC7CDWMCWNCY7JYUW5UBEOLNBSTNDKKZSFTHKGZNPPSOXLFYFX3CSINK";

    const CARBON_ACCOUNT =
      "GCBOATLWKXACOWKRRWORARDI2HFDSYPALMTS23YBZKHOB6XLW6CARBON";

    // All payments to CarbonSINK account
    const payments = await server
      .payments()
      .forAccount(CARBON_SINK_ACCOUNT)
      .limit(200)
      .call();

    // Payments to CarbonSINK account from user
    const userPayments = payments.records.filter(
      (record: any) =>
        record.asset_issuer === CARBON_SINK_ACCOUNT &&
        record.to === this.userAccount
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
        let paymentOperation = operations.find(
          (op: any) => op.type === "pathPaymentStrictReceive"
        );

        if (paymentOperation !== undefined) {
          asset = paymentOperation.sendAsset.code;
          assetAmount = paymentOperation.destAmount;
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
        } as MyTransactionRecord;
      })
    );

    return mrs;
  }
}
