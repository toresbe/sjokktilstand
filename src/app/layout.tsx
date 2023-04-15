import "./globals.css";
import "@fontsource/roboto";

export const metadata = {
  title: "Sjokktilstand",
  description: "Oppdatert oversikt over Dagbladets sjokktilstand",
  twitter: {
    creator: "@toresbe",
    images: ["https://sjokktilstand.gunkies.org/sjokk.png"],
  },
  openGraph: {
    images: "https://sjokktilstand.gunkies.org/sjokk.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
