import {
  AccountBalance,
  MyTransactionRecord,
  RetirementStatus,
} from "@/app/types";
import {
  AccountService,
  SinkService,
  SinkTxItem,
  SinkTxListResponse,
} from "@/client";
import { AccountResponse, Server } from "@stellar/stellar-sdk/lib/horizon";

export default class TransactionHistoryService {
  public static serializeTxResponse(
    txResponse: SinkTxItem
  ): MyTransactionRecord {
    let retirementStatus = RetirementStatus.RETIRED;
    if (!txResponse.retirement_finalized) {
      if (Number(txResponse.carbon_amount) % 1 === 0) {
        // if the total amount pending is round, we are only waiting for SC.
        retirementStatus = RetirementStatus.PENDING_STELLARCARBON;
      } else {
        // Otherwise a user action is required.
        retirementStatus = RetirementStatus.PENDING_USER;
      }
    }

    return {
      id: txResponse.hash,
      createdAt: new Date(txResponse.created_at),
      memo: txResponse.memo.value,
      assetAmount: Number(txResponse.source_asset.amount),
      asset: txResponse.source_asset.code,
      sinkAmount: Number(txResponse.carbon_amount),
      retirementStatus,
      retirements: txResponse.retirements,
      pagingToken: txResponse.paging_token,
      recipient: txResponse.recipient,
      funder: txResponse.funder,
      finalized: txResponse.retirement_finalized,
    } as MyTransactionRecord;
  }

  public static serializeTxsResponse(
    txsResponse: SinkTxListResponse,
    order: "asc" | "desc" = "desc"
  ) {
    let transactions = txsResponse.transactions;
    if (order === "asc") {
      transactions.reverse();
    }
    return txsResponse.transactions.map((transaction) =>
      this.serializeTxResponse(transaction)
    );
  }

  public static async fetchTransaction(
    txHash: string
  ): Promise<MyTransactionRecord> {
    const response = await SinkService.getSinkTxItem({ txHash });
    return this.serializeTxResponse(response);
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
    return this.serializeTxsResponse(sinkTxsResponse, order);
  }

  public static async fetchAccountHistory(
    account: string
  ): Promise<MyTransactionRecord[]> {
    const sinkTxsResponse: SinkTxListResponse =
      await AccountService.getSinkTxsForRecipient({
        recipientAddress: account,
      });
    return this.serializeTxsResponse(sinkTxsResponse);
  }

  public static async fetchRecentTransactions(): Promise<
    MyTransactionRecord[]
  > {
    const sinkTxsResponse = await SinkService.getSinkTxList({
      limit: 4,
    });
    return this.serializeTxsResponse(sinkTxsResponse);
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
      if (process.env.NEXT_PUBLIC_PRODUCTION === "production") {
        if (
          balance.asset_type === "credit_alphanum4" &&
          balance.asset_code === "USDC" &&
          balance.asset_issuer ===
            "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
        ) {
          return true;
        }
      } else {
        if (
          balance.asset_type === "credit_alphanum4" &&
          balance.asset_code === "USDC"
        ) {
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
