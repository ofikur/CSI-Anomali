import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSI-TUBE 🎮 Portal Video Blunder & Fail MLBB CSI Anomali (Road to MPL)",
  description:
    "Portal streaming klip Mobile Legends terlucu & ter-anomali! Koleksi retri indomaret, fanny darat, layla tank, lose streak 37x. Just for Fun!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>"
        />
      </head>
      <body className="min-h-screen bg-[#0c1626] text-slate-200">
        {children}
      </body>
    </html>
  );
}
