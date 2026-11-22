"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { sounds } from "@/lib/soundEffects";

interface TornDiscordCardProps {
  discordInviteUrl: string;
}

export default function TornDiscordCard({ discordInviteUrl }: TornDiscordCardProps) {
  const [tapCount, setTapCount] = useState(0);
  const [isTorn, setIsTorn] = useState(false);
  const [isJittering, setIsJittering] = useState(false);
  const [showPlester, setShowPlester] = useState(false);

  // Reset tap count jika tidak ditap lagi dalam 2 detik
  useEffect(() => {
    if (tapCount > 0 && !isTorn) {
      const timer = setTimeout(() => {
        setTapCount(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [tapCount, isTorn]);

  // Tangani tap berturut-turut pada card
  const handleCardTap = () => {
    if (isTorn) {
      handleFixCard();
      return;
    }

    const nextCount = tapCount + 1;
    setIsJittering(true);
    setTimeout(() => setIsJittering(false), 220);

    if (nextCount >= 3) {
      // Tap ke-3: SOBEK KARTUN!
      sounds.playPaperRip();
      setIsTorn(true);
      setTapCount(0);
    } else if (nextCount === 1) {
      sounds.playTapPoke(420);
      setTapCount(1);
    } else if (nextCount === 2) {
      sounds.playTapPoke(620);
      setTapCount(2);
    }
  };

  // Tempel plester kartun & pulihkan card
  const handleFixCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sounds.playTapeFix();
    setShowPlester(true);
    setIsTorn(false);
    setTapCount(0);

    setTimeout(() => {
      setShowPlester(false);
    }, 2200);
  };

  // Polygon koordinat sobekan kartun zigzag
  const clipTop =
    "polygon(0% 0%, 100% 0%, 100% 51%, 92% 47%, 84% 54%, 76% 48%, 68% 55%, 59% 47%, 50% 53%, 41% 48%, 32% 55%, 24% 47%, 16% 54%, 8% 48%, 0% 52%)";
  const clipBottom =
    "polygon(0% 52%, 8% 48%, 16% 54%, 24% 47%, 32% 55%, 41% 48%, 50% 53%, 59% 47%, 68% 55%, 76% 48%, 84% 54%, 92% 47%, 100% 51%, 100% 100%, 0% 100%)";

  // Template konten isi card agar identik di kedua layer sobekan
  const renderCardContent = () => (
    <div className="w-full relative rounded-2xl bg-white/70 border border-zinc-200/90 p-6 shadow-sm overflow-hidden select-none">
      {/* Background Image: Rata kiri, full card */}
      <img
        src="/csi-bg.png"
        alt="CSI Background"
        className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none opacity-90"
      />

      {/* Base gradient putih ke kanan */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white/90 pointer-events-none" />

      {/* Frosted Glass Layer dengan progressive backdrop blur ke arah kanan card */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-white/10 via-white/40 to-white/80 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 30%, black 75%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 30%, black 75%)",
        }}
      />

      {/* Konten Card (relative z-10) */}
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
            <h2 className="text-base font-semibold text-zinc-900 truncate">
              CSI Anomali
            </h2>
            <div className="flex items-center space-x-1.5 text-xs text-zinc-500 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
              <span>Komunitas Resmi</span>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <Link
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-sm py-2.5 px-4 transition-colors duration-150 shadow-sm cursor-pointer"
        >
          <span>Join Discord</span>
          <ExternalLink className="w-4 h-4 opacity-90" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full relative select-none">
      {/* Container Utuh Card dengan Animasi Sobek */}
      <div
        onClick={handleCardTap}
        className={`w-full relative cursor-pointer transition-transform duration-300 ${
          isJittering
            ? tapCount === 1
              ? "scale-[0.98] rotate-[-1.5deg]"
              : "scale-[0.96] rotate-[2.5deg]"
            : "hover:scale-[1.01]"
        }`}
      >
        {/* Layer Belakang (Terungkap Saat Card Sobek) */}
        {isTorn && (
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-4 bg-amber-50/90 border-2 border-dashed border-amber-300 rounded-2xl shadow-inner animate-in fade-in zoom-in-95 duration-300 text-center">
            <span className="text-2xl animate-bounce">🩹</span>
            <p className="text-xs font-black text-amber-900 uppercase tracking-tight mt-1">
              WADUH KEBABLASAN SOBEK!
            </p>
            <p className="text-[11px] text-amber-700 font-medium mb-3">
              Kebanyakan ditap-tap sampai robek jadi dua!
            </p>
            <button
              onClick={handleFixCard}
              className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black text-xs shadow-md border border-amber-500/50 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <span>🩹</span>
              <span>Tempel Plester (Perbaiki)</span>
            </button>
          </div>
        )}

        {/* Potongan Sobekan ATAS */}
        <div
          style={{
            clipPath: clipTop,
            transform: isTorn
              ? "translate3d(-4px, -32px, 0) rotate(-6deg)"
              : "translate3d(0, 0, 0) rotate(0deg)",
            transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className={`relative z-10 ${isTorn ? "drop-shadow-xl" : ""}`}
        >
          {renderCardContent()}
        </div>

        {/* Potongan Sobekan BAWAH */}
        <div
          style={{
            clipPath: clipBottom,
            transform: isTorn
              ? "translate3d(5px, 32px, 0) rotate(5deg)"
              : "translate3d(0, 0, 0) rotate(0deg)",
            transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className={`absolute inset-0 z-10 ${isTorn ? "drop-shadow-xl" : ""}`}
        >
          {renderCardContent()}
        </div>

        {/* Retakan visual saat tap ke-2 sebelum robek */}
        {tapCount === 2 && !isTorn && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-8 text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-pulse"
              viewBox="0 0 380 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            >
              <path d="M 0 20 L 40 16 L 80 24 L 120 17 L 160 25 L 200 16 L 240 24 L 280 18 L 320 23 L 360 17 L 380 21" />
            </svg>
          </div>
        )}

        {/* Plester Kartun yang Menempel saat Kartu Diperbaiki */}
        {showPlester && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-in zoom-in-75 duration-300">
            <div className="bg-amber-200/90 border-2 border-dashed border-amber-500 text-amber-900 font-black text-[11px] px-6 py-2 rounded-md shadow-lg transform -rotate-6 flex items-center gap-1.5 backdrop-blur-xs">
              <span>🩹</span>
              <span>TEREKAT KEMBALI!</span>
            </div>
          </div>
        )}
      </div>

      {/* Indikator Tap Halus di Bawah Card */}
      {!isTorn && (
        <div className="text-center mt-2 h-4">
          {tapCount > 0 && (
            <span className="text-[10px] font-mono text-zinc-400 animate-pulse">
              {tapCount === 1 ? "👆 Tap lagi untuk merobek (1/3)" : "⚡ Sedikit lagi! (2/3)"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
