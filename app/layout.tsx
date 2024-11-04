import type { Metadata } from "next";
import "./globals.css";
import BreakpointIndicator from "@/components/breakpoint-indicator";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Visey",
  description:
    "promote your startup and small business and grow more with visey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter antialiased text-base-black`}>
        <BreakpointIndicator />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
