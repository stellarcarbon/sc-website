import { DetailedHTMLProps, ScriptHTMLAttributes } from "react";

type AnalyticsConfig = {
  plausibleDataDomain: string;
  plausibleProps: DetailedHTMLProps<
    ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  >;
};

function buildAnalyticsConfig(): AnalyticsConfig {
  let pubnetDeployment = process.env.NEXT_PUBLIC_PRODUCTION === "pubnet";

  let plausibleDataDomain = pubnetDeployment
    ? "new.stellarcarbon.io"
    : "test.stellarcarbon.io";

  let plausibleProps = {
    src:
      process.env.NODE_ENV === "development"
        ? `https://${plausibleDataDomain}/sessionvar/js/script.js`
        : "/sessionvar/js/script.js",
    ...({
      "data-api":
        process.env.NODE_ENV === "development"
          ? `https://${plausibleDataDomain}/sessionvar/api/event`
          : "/sessionvar/api/event",
    } as any),
  };

  return {
    plausibleDataDomain,
    plausibleProps,
  };
}

const analyticsConfig = buildAnalyticsConfig();
export default analyticsConfig;
