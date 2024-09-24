import type { Metadata } from "next";
import "../styles/globals.css";
import App from "./App";
import { inter } from "./fonts";
import { AppContextProvider } from "@/context/appContext";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import appConfig from "@/config";
import DemoApp from "./DemoApp";
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "sc-website",
  description: "sc-website staging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={`${inter.className}`}>
          {appConfig.demo ? (
            <DemoApp>{children}</DemoApp>
          ) : (
            <App>{children}</App>
          )}
        </body>
      </AppContextProvider>
    </html>
  );
}
