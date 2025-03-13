import appConfig from "@/config";

export default class XLMConversionService {
  public static async getUSDCPrice() {
    const hash =
      "4cd1f6defba237eecbc5fefe259f89ebc4b5edd49116beb5536c4034fc48d63f";

    const xlmAssetCode = "native";
    const usdcAssetCode =
      "USDC:GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";

    const pool = await appConfig.server
      .liquidityPools()
      .liquidityPoolId(hash)
      .call();

    const xlmAmountStr = pool.reserves.find(
      (reserve) => reserve.asset === xlmAssetCode
    )?.amount;
    const usdcAmountStr = pool.reserves.find(
      (reserve) => reserve.asset === usdcAssetCode
    )?.amount;

    if (usdcAmountStr && xlmAmountStr) {
      const usdcAmount = parseFloat(usdcAmountStr);
      const xlmAmount = parseFloat(xlmAmountStr);
      console.log(usdcAmount, xlmAmount);
      const price = usdcAmount / xlmAmount;
      console.log(price);
      return price;
    } else {
      throw Error("Get USDC price response invalid");
    }
  }
}
