export interface MyTransactionRecord {
  id: string;
  createdAt: string;
  memo: string;
  amount: number;
  asset: string;
  // Add other relevant transaction properties here
}

import { Server, ServerApi } from "stellar-sdk/lib/horizon";
import IndexedDBService from "./IndexedDBService";

export default class TransactionHistoryService {
  constructor(
    private updateContextState: (transaction: MyTransactionRecord[]) => void
  ) {}

  public async fetchHistory(): Promise<void> {
    const server = new Server("https://horizon.stellar.org");

    const idbService = await IndexedDBService.create();

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

    const transactions = await server
      .transactions()
      .forAccount("GC7CDWMCWNCY7JYUW5UBEOLNBSTNDKKZSFTHKGZNPPSOXLFYFX3CSINK") // CarbonSINK account
      .limit(200)
      .call();

    const filteredRecords = transactions.records.filter((record: any) => {
      return (
        record.source_account ===
        "GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y" // Some account that actually has transactions
      );
    });

    // async
    const mrs: MyTransactionRecord[] = await Promise.all(
      filteredRecords.map(async (record: any) => {
        const ops = await record.operations();

        const realOp: any = ops.records.find(
          (op: any) => op.type === "path_payment_strict_receive"
        );

        const mr = {
          id: record.id,
          createdAt: record.created_at,
          memo: record.memo,
          amount: realOp?.amount ?? 0,
          asset: realOp?.asset_code ?? "",
        };
        idbService.saveTransaction(mr);
        return mr;
      })
    );

    // Map to MyTransactionRecord and store in IndexedDB
    // const mrs: MyTransactionRecord[] = filteredRecords.map((record: any) => {
    //   console.log(record);
    //   const mr = {
    //     id: record.id,
    //     createdAt: record.created_at,
    //     memo: record.memo,
    //     amount: record.amount,
    //     asset: "xlm",
    //   };
    //   idbService.saveTransaction(mr);
    //   return mr;
    // });

    this.updateContextState(mrs);
  }
}
