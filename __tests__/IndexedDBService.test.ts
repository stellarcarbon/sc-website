import { MyTransactionRecord } from "@/app/wallet/TransactionHistoryService";
import IndexedDBService from "../src/app/wallet/IndexedDBService";
import { describe, expect, test, beforeAll } from "@jest/globals";

const testTransactions: MyTransactionRecord[] = [{ id: "000" }, { id: "111" }];

describe("IndexedDBService", () => {
  let idbService: IndexedDBService;
  beforeAll(async () => {
    idbService = await IndexedDBService.create();
  });

  test("Can create a new instance", async () => {
    expect(idbService).toBeInstanceOf(IndexedDBService);
  });

  test("Can save a single transaction", async () => {
    await idbService.saveTransaction(testTransactions[0]);
  });

  test("Can save a list of transactions", async () => {
    await idbService.saveTransactions(testTransactions);
  });

  test("Can load a list of transactions", async () => {
    // Store some transactions first
    await idbService.saveTransactions(testTransactions);

    // Try loading them
    const loadedTransactions = await idbService.loadTransactions();

    expect(loadedTransactions.length).toEqual(2);
    expect(loadedTransactions[0].id).toEqual("000");
    expect(loadedTransactions[1].id).toEqual("111");
  });

  test("Saving more transactions appends them", async () => {
    const additionalTransactions: MyTransactionRecord[] = [
      { id: "222" },
      { id: "333" },
    ];
    await idbService.saveTransactions(additionalTransactions);
    const moreTransactions = await idbService.loadTransactions();

    expect(moreTransactions.length).toEqual(4);
    expect(moreTransactions[0].id).toEqual("000");
    expect(moreTransactions[1].id).toEqual("111");
    expect(moreTransactions[2].id).toEqual("222");
    expect(moreTransactions[3].id).toEqual("333");
  });
});
