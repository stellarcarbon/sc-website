import appConfig from "@/config";

export default class XLMConversionService {
  public static async getUSDCPrice() {
    const hash = appConfig.usdcXlmLiquidityPoolId;
    const usdcAssetCode = appConfig.usdcAssetCode;
    if (hash === undefined || usdcAssetCode === undefined) return;

    const xlmAssetCode = "native";

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
