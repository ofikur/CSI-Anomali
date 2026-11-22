import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "#csianomali",
  description: "CSI Anomali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-black flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
