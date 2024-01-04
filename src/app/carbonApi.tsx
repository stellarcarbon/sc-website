import { CARBONApi, Configuration } from "./carbon_api";

const config = new Configuration({
  basePath: "https://api-beta.stellarcarbon.io",
});

const carbonApi = new CARBONApi(config);

export default carbonApi;
