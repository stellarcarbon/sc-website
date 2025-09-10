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

import PlausibleProvider from "next-plausible";
import analyticsConfig from "@/analyticsConfig";

config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "Stellarcarbon",
  description: "Protect the rainforest with Stellarcarbon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(analyticsConfig.plausibleDataDomain);
  console.log(analyticsConfig.plausibleProps);

  return (
    <html lang="en">
      <head></head>
      <AppContextProvider>
        <SinkFormContextProvider>
          <body className={`${inter.className}`}>
            <PlausibleProvider
              domain={analyticsConfig.plausibleDataDomain}
              scriptProps={analyticsConfig.plausibleProps}
              enabled
              trackLocalhost
            />
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
