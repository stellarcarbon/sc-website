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
        <script
          defer
          data-domain="test.stellarcarbon.io"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <AppContextProvider>
        <body className={`${inter.className}`}>
          {/* <PostHogProvider> */}
          <App>{children}</App>
          {/* </PostHogProvider> */}
        </body>
      </AppContextProvider>
    </html>
  );
}
