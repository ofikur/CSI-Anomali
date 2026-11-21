import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🔥 CSI ANOMALI 🔥 - Road to MPL (Mobile Legends Plenger League) 🤡🎮",
  description:
    "Official Website Squad MLBB Ter-Anomali Sedunia! Lose streak 38x, Retri Indomaret, Fanny Nabrak Tembok, Full Komedi Just for Fun!",
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
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤡</text></svg>"
        />
      </head>
      <body className="min-h-screen bg-[#FFFF00] text-black selection:bg-[#FF00FF] selection:text-[#00FF00]">
        {children}
      </body>
    </html>
  );
}
