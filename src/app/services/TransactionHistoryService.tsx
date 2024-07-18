import { MyTransactionRecord, RetirementStatus } from "../types";
import { AccountService, SinkService, SinkTxListResponse } from "@/client";

export default class TransactionHistoryService {
  private static mapTxsResponse(txsResponse: SinkTxListResponse) {
    return txsResponse.transactions.map((transaction) => {
      let retirementStatus = RetirementStatus.RETIRED;
      if (!transaction.retirement_finalized) {
        retirementStatus = RetirementStatus.PENDING_CERTIFICATE;
      }

      return {
        id: transaction.hash,
        createdAt: transaction.created_at,
        memo: transaction.memo.value,
        assetAmount: Number(transaction.source_asset.amount),
        asset: transaction.source_asset.code,
        sinkAmount: Number(transaction.carbon_amount),
        retirementStatus,
      } as MyTransactionRecord;
    });
  }

  public static async fetchAccountHistory(
    account: string
  ): Promise<MyTransactionRecord[]> {
    const sinkTxsResponse: SinkTxListResponse =
      await AccountService.getSinkTxsForRecipient({
        recipientAddress: account,
      });

    return this.mapTxsResponse(sinkTxsResponse);
  }

  public static async fetchRecentTransactions(): Promise<
    MyTransactionRecord[]
  > {
    const sinkTxsResponse = await SinkService.getSinkTxList({
      limit: 4,
    });
    return this.mapTxsResponse(sinkTxsResponse);
  }
}
