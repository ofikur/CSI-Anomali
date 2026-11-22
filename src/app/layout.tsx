import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "#csianomali | Discord",
  description: "Komunitas Resmi Discord CSI Anomali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
