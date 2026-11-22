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
  const [isRestoring, setIsRestoring] = useState(false);
  const [isJittering, setIsJittering] = useState(false);
  const [showTape, setShowTape] = useState(false);

  // Reset tap count jika tidak ditap lagi dalam 2 detik
  useEffect(() => {
    if (tapCount > 0 && !isTorn) {
      const timer = setTimeout(() => {
        setTapCount(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [tapCount, isTorn]);

  // Tangani tap berturut-turut pada card sebagai easter egg
  const handleCardTap = () => {
    if (isTorn) {
      handleFixCard();
      return;
    }

    const nextCount = tapCount + 1;
    setIsJittering(true);
    setTimeout(() => setIsJittering(false), 180);

    if (nextCount >= 3) {
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

  // Pulihkan card kembali utuh dengan animasi halus
  const handleFixCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sounds.playTapeFix();
    setIsRestoring(true);

    setTimeout(() => {
      setIsTorn(false);
      setIsRestoring(false);
      setShowTape(true);
      setTapCount(0);
    }, 400);

    setTimeout(() => {
      setShowTape(false);
    }, 1500);
  };

  // Polygon koordinat sobekan kartun zigzag
  const clipTop =
    "polygon(0% 0%, 100% 0%, 100% 51%, 92% 47%, 84% 54%, 76% 48%, 68% 55%, 59% 47%, 50% 53%, 41% 48%, 32% 55%, 24% 47%, 16% 54%, 8% 48%, 0% 52%)";
  const clipBottom =
    "polygon(0% 52%, 8% 48%, 16% 54%, 24% 47%, 32% 55%, 41% 48%, 50% 53%, 59% 47%, 68% 55%, 76% 48%, 84% 54%, 92% 47%, 100% 51%, 100% 100%, 0% 100%)";

  // Template konten card
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
      {/* Container Card */}
      <div
        onClick={handleCardTap}
        className={`w-full relative cursor-pointer transition-transform duration-200 ${
          isJittering
            ? tapCount === 1
              ? "scale-[0.99] rotate-[-0.8deg]"
              : "scale-[0.98] rotate-[1.2deg]"
            : "hover:scale-[1.01]"
        }`}
      >
        {/* KONDISI 1: Saat utuh (TIDAK ADA garis atau retakan sama sekali) */}
        {!isTorn ? (
          <div className="w-full relative z-10">
            {renderCardContent()}
          </div>
        ) : (
          /* KONDISI 2: Saat sobek */
          <div className="w-full relative">
            {/* Tombol rahasia di antara celah sobekan yang mengarah ke link YouTube */}
            <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
              <a
                href="https://youtu.be/WxC7v3q9AQg?si=c-OjCgUmjWORQM3E"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Buka</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Potongan Sobekan ATAS */}
            <div
              style={{
                clipPath: clipTop,
                transform: isRestoring
                  ? "translate3d(0, 0, 0) rotate(0deg)"
                  : "translate3d(-4px, -28px, 0) rotate(-5deg)",
                transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="relative z-10 drop-shadow-lg"
            >
              {renderCardContent()}
            </div>

            {/* Potongan Sobekan BAWAH */}
            <div
              style={{
                clipPath: clipBottom,
                transform: isRestoring
                  ? "translate3d(0, 0, 0) rotate(0deg)"
                  : "translate3d(4px, 28px, 0) rotate(4deg)",
                transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="absolute inset-0 z-10 drop-shadow-lg"
            >
              {renderCardContent()}
            </div>
          </div>
        )}

        {/* Pita Perekat Transparan Bersih saat Kartu Disatukan Kembali */}
        {showTape && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-75 duration-200">
            <div className="w-24 h-6 bg-white/70 border border-zinc-300/80 rounded-xs shadow-sm transform -rotate-3 backdrop-blur-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
