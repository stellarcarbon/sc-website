import { MyTransactionRecord } from "@/app/types";
import IndexedDBService from "../src/app/services/IndexedDBService";
import { describe, expect, test, beforeAll } from "vitest";

const makeTransactionRecord = (id: string): MyTransactionRecord => {
  return {
    id,
    createdAt: "datestring",
    memo: "memo",
    assetAmount: 1,
    asset: "xlm",
    sinkAmount: 1,
  };
};

const testTransactions: MyTransactionRecord[] = [
  makeTransactionRecord("0"),
  makeTransactionRecord("1"),
];

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
    expect(loadedTransactions[0].id).toEqual("0");
    expect(loadedTransactions[1].id).toEqual("1");
  });

  test("Saving more transactions appends them", async () => {
    const additionalTransactions: MyTransactionRecord[] = [
      makeTransactionRecord("2"),
      makeTransactionRecord("3"),
    ];
    await idbService.saveTransactions(additionalTransactions);
    const moreTransactions = await idbService.loadTransactions();

    expect(moreTransactions.length).toEqual(4);
    expect(moreTransactions[0].id).toEqual("0");
    expect(moreTransactions[1].id).toEqual("1");
    expect(moreTransactions[2].id).toEqual("2");
    expect(moreTransactions[3].id).toEqual("3");
  });
});
