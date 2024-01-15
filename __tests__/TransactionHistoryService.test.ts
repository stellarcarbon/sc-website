import IndexedDBService from "../src/app/wallet/IndexedDBService";
import TransactionHistoryService from "../src/app/wallet/TransactionHistoryService";
import { describe, expect, test, beforeAll } from "@jest/globals";

describe("TransactionHistoryService", () => {
  let thService: TransactionHistoryService;
  beforeAll(() => {
    thService = new TransactionHistoryService(() => {});
  });

  test("Can create a new instance", async () => {
    expect(thService).toBeInstanceOf(TransactionHistoryService);
  });

  test("Can fetch transaction history from stellar horizon and store in IndexedDB", async () => {
    // TODO: somehow remove dependency on IDBService for this test...
    await thService.fetchHistory();

    const idbService = await IndexedDBService.create();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transactions = await idbService.loadTransactions();

    expect(transactions.length).toBeGreaterThan(0);
  });
});
