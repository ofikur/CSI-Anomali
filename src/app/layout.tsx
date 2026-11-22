import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSI ANOMALI // [RESTRICTED .ONION GATEWAY] - Road to MPL",
  description:
    "Classified darknet dossier & surveillance gateway for CSI Anomali Squad MLBB. Road to MPL (Mobile Legends Plenger League). Threat level: Maximum Feeder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark bg-[#030708]">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧅</text></svg>"
        />
      </head>
      <body className="min-h-screen bg-[#030708] text-[#00ff66] antialiased selection:bg-[#ff003c] selection:text-white">
        {/* CRT Scanline Overlay across entire viewport */}
        <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-70" />
        {children}
      </body>
    </html>
  );
}
