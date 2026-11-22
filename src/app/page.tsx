"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";

export default function Home() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [activePart, setActivePart] = useState<"csi" | "anomali">("csi");
  const [boxStyle, setBoxStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const csiRef = useRef<HTMLSpanElement>(null);
  const anomaliRef = useRef<HTMLSpanElement>(null);

  // Link invite Discord resmi CSI Anomali
  const discordInviteUrl = "https://discord.gg/abqKgDxBY";

  // Animasi otomatis berpindah kiri (csi) dan kanan (anomali) terus gantian
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePart((prev) => (prev === "csi" ? "anomali" : "csi"));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Update posisi dan ukuran kotak yang menyorot kata tanpa mengubah jarak teks
  const updateBoxPosition = (part: "csi" | "anomali") => {
    const target = part === "csi" ? csiRef.current : anomaliRef.current;
    if (target) {
      const padX = 6;
      const padY = 4;
      setBoxStyle({
        left: target.offsetLeft - padX,
        width: target.offsetWidth + padX * 2,
        top: target.offsetTop - padY,
        height: target.offsetHeight + padY * 2,
      });
    }
  };

  useEffect(() => {
    updateBoxPosition(activePart);
    const timer = setTimeout(() => updateBoxPosition(activePart), 50);
    return () => clearTimeout(timer);
  }, [activePart]);

  useEffect(() => {
    const handleResize = () => updateBoxPosition(activePart);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activePart]);

  // Tangani tombol ESC untuk menutup video easter egg
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
        {/* Title H1 Tanpa Border & Teks Rapet Kayak Biasanya */}
        <h1 className="select-none flex items-center justify-center py-2">
          <div
            ref={containerRef}
            className="relative inline-flex items-center text-4xl sm:text-5xl font-black tracking-tight"
          >
            {/* Kotak animasi yang berpindah kiri-kanan & berganti warna */}
            <div
              style={{
                transform: `translateX(${boxStyle.left}px)`,
                width: `${boxStyle.width}px`,
                height: `${boxStyle.height}px`,
                top: `${boxStyle.top}px`,
              }}
              className={`absolute left-0 rounded-xl transition-all duration-500 ease-in-out pointer-events-none shadow-sm ${
                activePart === "csi" ? "bg-zinc-900" : "bg-[#5865F2]"
              } ${boxStyle.width === 0 ? "opacity-0" : "opacity-100"}`}
            />

            {/* Bagian #csi (rapat tanpa padding pembatas) */}
            <span
              ref={csiRef}
              onClick={() => setActivePart("csi")}
              className={`relative z-10 transition-colors duration-500 cursor-pointer select-none ${
                activePart === "csi" ? "text-white" : "text-zinc-900 hover:text-black"
              }`}
            >
              <span className={activePart === "csi" ? "text-indigo-400" : "text-zinc-400"}>
                #
              </span>
              csi
            </span>

            {/* Bagian anomali (rapat berdampingan langsung dengan csi) */}
            <span
              ref={anomaliRef}
              onClick={() => setActivePart("anomali")}
              className={`relative z-10 transition-colors duration-500 cursor-pointer select-none ${
                activePart === "anomali" ? "text-white" : "text-zinc-900 hover:text-black"
              }`}
            >
              anomali
            </span>
          </div>
        </h1>

        {/* Discord Card - Styled like an authentic Discord Server Widget */}
        <div className="relative overflow-hidden w-full bg-[#2B2D31] rounded-2xl border border-zinc-800/80 p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left">
          {/* Background Image CSI dengan Opacity Pas */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
            style={{ backgroundImage: "url('/csi-bg.png')" }}
          />
          {/* Overlay Gradient Halus agar Konten Tetap Kontras & Rapi */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B2D31]/95 via-[#2B2D31]/80 to-[#2B2D31]/75 pointer-events-none" />

          {/* Konten Card */}
          <div className="relative z-10">
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
                <h2 className="text-base font-semibold text-white truncate">
                  CSI Anomali
                </h2>
                <div className="flex items-center space-x-1.5 text-xs text-zinc-300 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_#10b981]"></span>
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
        </div>

        {/* Footer Note, Part of Code Squads Informatics & Tombol Easter Egg Simple */}
        <div className="flex flex-col items-center space-y-3 pt-1">
          <p className="text-xs text-zinc-400">
            Mobile Legends Squad Community
          </p>

          {/* Part of Code Squads Informatics */}
          <Link
            href="https://codesquad.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <span>Part of</span>
            <span className="font-semibold text-zinc-700 group-hover:text-zinc-900 underline decoration-zinc-300 underline-offset-4 group-hover:decoration-zinc-800 transition-colors">
              Code Squads Informatics
            </span>
            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Tombol Easter Egg Simple */}
          <button
            onClick={() => setShowEasterEgg(true)}
            className="inline-flex items-center text-xs text-zinc-400 hover:text-zinc-600 bg-white hover:bg-zinc-100 border border-zinc-200/80 rounded-full px-3 py-1 transition-all shadow-xs cursor-pointer"
          >
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
