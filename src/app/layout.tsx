import "./globals.css";
import "@fontsource/roboto";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Sjokktilstand",
  description: "Oppdatert oversikt over Dagbladets sjokktilstand",
  twitter: {
    card: "summary_large_image",
    creator: "@toresbe",
    title: "Sjokktilstand",
    description: "Oppdatert oversikt over Dagbladets sjokktilstand",
    images: ["https://sjokktilstand.gunkies.org/sjokk.png"],
  },
  openGraph: {
    images: "https://sjokktilstand.gunkies.org/sjokk.png",
    title: "Sjokktilstand",
    description: "Oppdatert oversikt over Dagbladets sjokktilstand",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
