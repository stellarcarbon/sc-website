import type { Metadata } from "next";
import "../styles/globals.css";
import App from "./App";
import { inter } from "./fonts";
import { AppContextProvider } from "@/context/appContext";

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
      <body className={`${inter.className}`}>
        <AppContextProvider>
          <App>{children}</App>
        </AppContextProvider>
      </body>
    </html>
  );
}
