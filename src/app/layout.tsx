import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "@/app/providers";
import App from "./App";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}
