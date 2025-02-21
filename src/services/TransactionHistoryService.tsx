import {
  AccountBalance,
  MyTransactionRecord,
  RetirementStatus,
} from "@/app/types";
import { AccountService, SinkService, SinkTxListResponse } from "@/client";
import { AccountResponse, Server } from "@stellar/stellar-sdk/lib/horizon";

export default class TransactionHistoryService {
  private static mapTxsResponse(
    txsResponse: SinkTxListResponse,
    order: "asc" | "desc" = "desc"
  ) {
    let transactions = txsResponse.transactions;
    if (order === "asc") {
      transactions.reverse();
    }
    return txsResponse.transactions.map((transaction) => {
      let retirementStatus = RetirementStatus.RETIRED;
      if (!transaction.retirement_finalized) {
        if (Number(transaction.carbon_amount) % 1 === 0) {
          // if the total amount pending is round, we are only waiting for SC.
          retirementStatus = RetirementStatus.PENDING_STELLARCARBON;
        } else {
          // Otherwise a user action is required.
          retirementStatus = RetirementStatus.PENDING_USER;
        }
      }

      return {
        id: transaction.hash,
        createdAt: transaction.created_at,
        memo: transaction.memo.value,
        assetAmount: Number(transaction.source_asset.amount),
        asset: transaction.source_asset.code,
        sinkAmount: Number(transaction.carbon_amount),
        retirementStatus,
        retirements: transaction.retirements,
        pagingToken: transaction.paging_token,
      } as MyTransactionRecord;
    });
  }

  public static async fetchLedger(
    cursor?: string,
    limit?: number,
    order?: "asc" | "desc"
  ): Promise<MyTransactionRecord[]> {
    const sinkTxsResponse: SinkTxListResponse = await SinkService.getSinkTxList(
      {
        cursor,
        limit,
        order,
      }
    );
    return this.mapTxsResponse(sinkTxsResponse, order);
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
      limit: 3,
    });
    return this.mapTxsResponse(sinkTxsResponse);
  }

  public static async fetchAccountBalance(
    server: Server,
    account: string
  ): Promise<AccountBalance> {
    const response: AccountResponse = await server.loadAccount(account);

    const xlmBalance = response.balances.find(
      (balance) => balance.asset_type === "native"
    )?.balance;

    const usdcBalance = response.balances.find((balance) => {
      if (balance.asset_type === "credit_alphanum4") {
        console.log(balance);
        console.log();
        if (
          balance.asset_code === "USDC" &&
          balance.asset_issuer ===
            "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN" &&
          process.env.NEXT_PUBLIC_PRODUCTION === "production"
        ) {
          return true;
        } else if (balance.asset_code === "USDC") {
          return true;
        }
      }
    })?.balance;

    return {
      xlm: xlmBalance ? Number(xlmBalance) : 0,
      usdc: usdcBalance ? Number(usdcBalance) : 0,
    };
  }
}
