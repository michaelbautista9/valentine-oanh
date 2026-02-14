import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oanh, Be My Valentine?",
  description: "A cute romantic invite for Oanh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
