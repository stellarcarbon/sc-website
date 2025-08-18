import type { Metadata } from "next";
import "../globals.css";
import App from "./App";
import { inter } from "./fonts";
import { AppContextProvider } from "@/context/appContext";
import { PostHogProvider } from "@/components/PostHogProvider";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import { SinkFormContextProvider } from "@/context/SinkFormContext";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import appConfig from "@/config";
import PlausibleProvider from "next-plausible";

config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "Stellarcarbon",
  description: "Stellarcarbon staging website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain={appConfig.plausibleDataDomain}
          customDomain="https://test.stellarcarbon.io"
          scriptProps={{
            src: "/sessionvar/js/script.js",
            ...({ "data-api": "/sessionvar/api/event" } as any),
          }}
        />
      </head>
      <AppContextProvider>
        <SinkFormContextProvider>
          <body className={`${inter.className}`}>
            <PostHogProvider>
              <AnalyticsConsent />

              <App>{children}</App>
            </PostHogProvider>
          </body>
        </SinkFormContextProvider>
      </AppContextProvider>
    </html>
  );
}
