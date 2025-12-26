import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farewell Party for Ollie | お別れパーティーへのご招待",
  description: "Join us for a farewell party celebrating Ollie Ehemann before returning to Australia. December 27th, 2025.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0a1128",
  openGraph: {
    title: "Farewell Party for Ollie",
    description: "A winter night celebration for our dear friend",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
