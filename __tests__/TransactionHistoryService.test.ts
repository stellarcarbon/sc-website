import IndexedDBService from "../src/app/wallet/IndexedDBService";
import TransactionHistoryService from "../src/app/wallet/TransactionHistoryService";
import { describe, expect, test, beforeAll } from "@jest/globals";

const DEV_ACCOUNT = "GC53JCXZHW3SVNRE4CT6XFP46WX4ACFQU32P4PR3CU43OB7AKKMFXZ6Y";
describe("TransactionHistoryService", () => {
  let thService: TransactionHistoryService;
  const mockUpdateContext = jest.fn();

  beforeAll(() => {
    thService = new TransactionHistoryService(mockUpdateContext, DEV_ACCOUNT);
  });

  test("Can create a new instance", async () => {
    expect(thService).toBeInstanceOf(TransactionHistoryService);
  });

  test("Can fetch transaction history, convert to MyTransactionRecord array and update app context", async () => {
    // Depends on DEV_ACCOUNT transaction history
    await thService.fetchHistory();
    expect(mockUpdateContext).toHaveBeenCalledTimes(1);
    expect(mockUpdateContext).toHaveBeenCalledWith([
      {
        asset: "AQUA",
        assetAmount: 15.0999867,
        createdAt: "2022-07-08T21:42:09Z",
        id: "63f55c3ff92b239ecdb774c336cb91e896a3e4906a81cbeb23a60f20563c198f",
        memo: "natgas 555 m³",
        sinkAmount: 1,
      },
      {
        asset: "CARBON",
        assetAmount: 2.504,
        createdAt: "2023-05-06T14:35:52Z",
        id: "d58b08d1cbc27fe931752e4cfcbdfdcfc057b0bf1bd312b05a41c298b7c54f7e",
        memo: "✈️ air travel 2013-14",
        sinkAmount: 2.504,
      },
      {
        asset: "CARBON",
        assetAmount: 2.452,
        createdAt: "2023-05-06T15:47:19Z",
        id: "263f997b4a2326df41ec2b346d79cbca4c06d2d72cff381620d39ca3ebe552f4",
        memo: "✈️ air travel 2015-16",
        sinkAmount: 2.452,
      },
      {
        asset: "CARBON",
        assetAmount: 1.016,
        createdAt: "2023-05-06T15:53:07Z",
        id: "6854d5fc7690776dddba92fd0754e9f69ce7f5a3d3180373bc77d359d8e83d9f",
        memo: "✈️ air travel 2017",
        sinkAmount: 1.016,
      },
      {
        asset: "USDC",
        assetAmount: 20.0283496,
        createdAt: "2023-05-07T09:59:18Z",
        id: "063d8428b79a080eee39f5a8a39e4e199d43dbfe529a0b402ede160bb997b816",
        memo: "✈️ air travel 2018",
        sinkAmount: 1.184,
      },
      {
        asset: "USDC",
        assetAmount: 18.2515075,
        createdAt: "2023-05-07T10:01:31Z",
        id: "a36ffd373d153cf2e8fda674f5c9da9115d0322c29e1bad6a6c0b96030c09ed6",
        memo: "✈️ air travel 2019",
        sinkAmount: 1.074,
      },
      {
        asset: "USDC",
        assetAmount: 9.6118369,
        createdAt: "2023-05-07T10:58:23Z",
        id: "48d69bb7691c02df2ed5e79a89b7a89f5ae944409dc0450e59cefd5636d3cfc9",
        memo: "✈️ air travel 2022",
        sinkAmount: 0.563,
      },
      {
        asset: "USDC",
        assetAmount: 3.5512286,
        createdAt: "2023-05-07T11:02:09Z",
        id: "2ec3bb8fa3975ee46aa61ed14912c7c26d68e04fe293d388e3579807ec53282e",
        memo: "🌎✨🌍💕🌏 care",
        sinkAmount: 0.207,
      },
    ]);
  });
});
