"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, X, Sparkles } from "lucide-react";

export default function Home() {
  // URL invite Discord resmi CSI Anomali
  const discordInviteUrl = "https://discord.gg/abqKgDxBY";

  // State untuk modal easter egg
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // YouTube Video ID untuk Rickroll / meme: DDwMEp-ItOQ
  // autoplay=1 & loop=1 & playlist=DDwMEp-ItOQ agar berputar berulang otomatis
  const videoId = "DDwMEp-ItOQ";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&playsinline=1`;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
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
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
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

        {/* Easter Egg Button - Clean & Subtle */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setShowEasterEgg(true)}
            aria-label="Tombol Rahasia Easter Egg"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-500 hover:text-zinc-800 bg-zinc-200/60 hover:bg-zinc-200 transition-all duration-150 cursor-pointer border border-zinc-300/50 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Jangan Diklik 👀</span>
          </button>

          {/* Subtle Footer Note */}
          <p className="text-xs text-zinc-400">
            Mobile Legends Squad Community
          </p>
        </div>
      </div>

      {/* Easter Egg Modal Video Popup */}
      {showEasterEgg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowEasterEgg(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-white">
              <div className="flex items-center gap-2">
                <span className="text-base">🎉</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200">
                  You Got Rickrolled! (CSI Anomali Edition)
                </span>
              </div>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Tutup video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={embedUrl}
                title="CSI Anomali Easter Egg"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Note */}
            <div className="px-4 py-2.5 bg-zinc-950 text-center text-xs text-zinc-400 border-t border-zinc-800/80">
              🔄 Video diputar berulang secara otomatis. Klik tombol silang (✕) untuk menutup.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
