import { MyTransactionRecord } from "./TransactionHistoryService";

export default class IndexedDBService {
  private db: IDBDatabase | null = null;

  private constructor() {}

  public static async create(): Promise<IndexedDBService> {
    const dbInstance = new IndexedDBService();
    await dbInstance.openDb();
    return dbInstance;
  }

  public async saveTransaction(
    transaction: MyTransactionRecord
  ): Promise<void> {
    if (!this.db) {
      throw new Error("Db not initialized.");
    }

    const dbTx = this.db.transaction("transactions", "readwrite");
    const store = dbTx.objectStore("transactions");

    store.put(transaction);

    return new Promise<void>((resolve, reject) => {
      dbTx.oncomplete = () => resolve();
      dbTx.onerror = () => reject(dbTx.error);
    });
  }

  public async saveTransactions(
    transactions: MyTransactionRecord[]
  ): Promise<void> {
    if (!this.db) {
      throw new Error("Db not initialized.");
    }

    const dbTx = this.db.transaction("transactions", "readwrite");
    const store = dbTx.objectStore("transactions");

    transactions.forEach((transaction) => {
      store.put(transaction);
    });

    return new Promise<void>((resolve, reject) => {
      dbTx.oncomplete = () => resolve();
      dbTx.onerror = () => reject(dbTx.error);
    });
  }

  public async loadTransactions(): Promise<MyTransactionRecord[]> {
    if (!this.db) {
      throw new Error("Db not initialized.");
    }

    const dbTx = this.db.transaction("transactions", "readonly");
    const store = dbTx.objectStore("transactions");

    const operation = store.getAll();

    return new Promise((resolve, reject) => {
      operation.onerror = () => reject(operation.error);
      operation.onsuccess = () => resolve(operation.result);
    });
  }

  private async openDb(): Promise<void> {
    // Open or create the IndexedDB
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("scdb", 1);

      request.onerror = (event) => {
        console.error("Database error:", event);
        reject(event);
      };

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.db.createObjectStore("transactions", { keyPath: "id" });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
    });
  }
}
