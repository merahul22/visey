import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/components/Provider";
import HelpAndSupport from "@/components/HelpAndSupport";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { accordian, viseydetails } from "@/constants";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const degularDisplay = localFont({
  src: "./fonts/DegularDisplayVF.ttf",
  variable: "--font-degular",
  weight: "100 200 300 400 500 600 700 800 900",
});

const geist = localFont({
  src: "./fonts/GeistVF.ttf",
  variable: "--font-geist",
  weight: "100 200 300 400 500 700 800 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.ttf",
  variable: "--font-geistMono",
  weight: "100 200 300 400 500 700 800 900",
});

const gothic = localFont({
  src: "./fonts/GothicA1VF.ttf",
  variable: "--font-gothic",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title:
    "Visey | Startup Growth Platform for MSMEs – Solutions, Mentorship & More",
  description:
    "Join Visey, India’s leading platform for startups. Access resources, mentorship, and growth tools tailored for Indian startups. Be part of the Startup India ecosystem and succeed with Visey.",
  keywords:
    "Visey, startup resources, SME services, business marketplace, India startups, resource providers, business solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLDvisey=viseydetails
  const jsonLDaccordian=accordian
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="bISGtC6Hz3nFRSokWosu7fIw6szcfcxrnKoj7tYsOMg" />
      <script type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLDvisey)}}
      />
      <script type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLDaccordian)}}
      />
      </head>
      <body
        className={`${inter.variable} ${geist.variable} ${gothic.variable} ${geistMono.variable} ${degularDisplay.variable} antialiased text-base-black`}
      >
        <Provider>{children}</Provider>
        <HelpAndSupport />
        <Toaster />
        <GoogleAnalytics gaId="G-ME7W8R36MY" />
      </body>
    </html>
  );
}
