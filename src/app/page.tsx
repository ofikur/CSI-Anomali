"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";

export default function Home() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Link invite Discord resmi CSI Anomali
  const discordInviteUrl = "https://discord.gg/abqKgDxBY";

  // Tangani tombol ESC untuk menutup video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowEasterEgg(false);
      }
    };

    if (showEasterEgg) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEasterEgg]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* Title H1 */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900">
          #csianomali
        </h1>

        {/* Discord Card - Clean & Simple */}
        <div className="w-full bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-4 mb-5">
            {/* Discord Icon */}
            <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg
                className="w-7 h-7"
                viewBox="0 0 127.14 96.36"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </div>

            {/* Server Info */}
            <div className="text-left overflow-hidden">
              <h2 className="text-base font-semibold text-zinc-900 truncate">
                CSI Anomali
              </h2>
              <div className="flex items-center space-x-1.5 text-xs text-zinc-500 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Komunitas Resmi</span>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <Link
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-sm py-2.5 px-4 transition-colors duration-150 shadow-sm"
          >
            <span>Join Discord</span>
            <ExternalLink className="w-4 h-4 opacity-90" />
          </Link>
        </div>

        {/* Footer Note & Tombol Easter Egg Simple */}
        <div className="flex flex-col items-center space-y-3">
          <p className="text-xs text-zinc-400">
            Mobile Legends Squad Community
          </p>

          {/* Tombol Easter Egg Simple */}
          <button
            onClick={() => setShowEasterEgg(true)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 bg-white hover:bg-zinc-100 border border-zinc-200/80 rounded-full px-3 py-1 transition-all shadow-xs cursor-pointer"
          >
            <span>✨</span>
            <span>Jangan diklik</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Video Rick Roll / Easter Egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Tombol Tutup Bersih */}
          <button
            onClick={() => setShowEasterEgg(false)}
            aria-label="Tutup video"
            className="absolute top-5 right-5 z-50 text-white/70 hover:text-white bg-black/60 hover:bg-black/90 backdrop-blur-md p-2.5 rounded-full transition-all cursor-pointer border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Iframe Full Layar Bersih & Loop Berulang */}
          <div className="w-full h-full">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/DDwMEp-ItOQ?autoplay=1&loop=1&playlist=DDwMEp-ItOQ&rel=0"
              title="CSI Anomali Easter Egg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
