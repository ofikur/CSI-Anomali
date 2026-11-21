"use client";

import React, { useState, useEffect } from "react";
import MarqueeBar from "@/components/MarqueeBar";
import Soundboard from "@/components/Soundboard";
import RosterSection from "@/components/RosterSection";
import PencapaianSection from "@/components/PencapaianSection";
import KartuBebanGenerator from "@/components/KartuBebanGenerator";
import PusingMeter from "@/components/PusingMeter";
import TokoMerchandise from "@/components/TokoMerchandise";
import Shoutbox from "@/components/Shoutbox";
import { sounds } from "@/lib/soundEffects";
import {
  Skull,
  Flame,
  AlertTriangle,
  Zap,
  Bomb,
  Sparkles,
  Award,
  HelpCircle,
  Eye,
  Music,
  Tv,
} from "lucide-react";

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(4290);
  const [isMataSakit, setIsMataSakit] = useState(false);
  const [recallEmotes, setRecallEmotes] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showCheatModal, setShowCheatModal] = useState(false);

  useEffect(() => {
    // Generate random visitor counter increment
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerRecallSpam = () => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 80) + 10;
    const y = Math.floor(Math.random() * 70) + 20;

    setRecallEmotes((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRecallEmotes((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  };

  const handleCheatClick = () => {
    sounds.playErrorBonk();
    setShowCheatModal(true);
  };

  return (
    <main
      className={`min-h-screen w-full relative transition-all duration-300 ${
        isMataSakit ? "animate-rainbow-bg filter invert" : "bg-[#FFFF00]"
      }`}
    >
      {/* Floating Recall Emotes yang Muncul saat Tombol Tas-Tas Ditekan */}
      {recallEmotes.map((emote) => (
        <div
          key={emote.id}
          style={{ top: `${emote.y}%`, left: `${emote.x}%` }}
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-tas-tas"
        >
          <div className="bg-[#00FF00] text-black border-4 border-black p-2 font-mono font-black text-sm md:text-xl shadow-[5px_5px_0px_#FF00FF] whitespace-nowrap">
            🌀 TAS! TAS! TAS! [RECALL TAUNTING]
          </div>
        </div>
      ))}

      {/* Top Warning Banner Jadul */}
      <div className="warning-tape text-white font-mono font-black text-xs md:text-sm py-1 px-4 text-center tracking-widest uppercase border-b-4 border-black">
        ⚠️ PERINGATAN: WEBSITE INI MENGANDUNG DOSIS KEBODOHAN TINGGI, RETRI MELAYANG, DAN TAMPILAN NORAK TAHUN 2000-AN! ⚠️
      </div>

      {/* Marquee Ticker Bergerak */}
      <MarqueeBar />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8">
        {/* Top Control Bar: Mode Mata Sakit & Hit Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-black text-white p-3 border-4 border-[#00FF00] shadow-[6px_6px_0px_#FF00FF]">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="text-yellow-400 font-bold">👁️ PENGUNJUNG YANG MENYESAL:</span>
            <span className="bg-[#FF0000] text-[#FFFF00] font-black px-2 py-0.5 border border-yellow-300 tracking-widest text-base">
              {String(visitorCount).padStart(7, "0")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsMataSakit(!isMataSakit)}
              className={`font-black text-xs px-3 py-1.5 border-2 border-white uppercase cursor-pointer flex items-center gap-1 shadow-[3px_3px_0px_#000] active:scale-95 ${
                isMataSakit
                  ? "bg-[#FF0000] text-white animate-pulse"
                  : "bg-[#00FF00] text-black"
              }`}
            >
              <Eye className="w-4 h-4" />
              {isMataSakit ? "MATIKAN MODE MATA SAKIT 😵‍💫" : "MODE MATA SAKIT (INVERT/DISCO) ⚡"}
            </button>

            <button
              onClick={handleCheatClick}
              className="bg-[#FF00FF] hover:bg-pink-600 text-yellow-300 font-black text-xs px-3 py-1.5 border-2 border-yellow-300 uppercase cursor-pointer flex items-center gap-1 animate-jitter shadow-[3px_3px_0px_#000]"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              CHEAT 999.999 DM GRATIS!
            </button>
          </div>
        </div>

        {/* Hero Section yang Benar-Benar Berantakan, Hancur, & Norak */}
        <div className="relative bg-[#FF00FF] border-8 border-dashed border-[#0000FF] p-6 sm:p-10 shadow-[16px_16px_0px_#000000] text-center transform -rotate-1">
          {/* Floating Sticker Norak Sudut-Sudut */}
          <div className="absolute -top-6 -left-4 bg-[#00FF00] text-black font-black text-xs sm:text-sm px-3 py-1 border-4 border-black transform -rotate-12 shadow-lg">
            🔥 RESMI SEJAK 2026 🔥
          </div>
          <div className="absolute -top-5 -right-3 bg-[#FFFF00] text-red-600 font-black text-xs sm:text-sm px-3 py-1 border-4 border-black transform rotate-12 animate-bounce">
            🤡 100% BEBAN SQUAD 🤡
          </div>
          <div className="absolute -bottom-5 -left-3 bg-[#FF0000] text-yellow-300 font-black text-[11px] sm:text-xs px-3 py-1 border-4 border-black transform rotate-6 hidden sm:block">
            ⚡ BEST SQUAD RT 05 ⚡
          </div>

          {/* Logo & Judul Utama Super Norak */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
              <span className="text-6xl sm:text-8xl animate-spin-retro">🤡</span>
              <span className="text-6xl sm:text-8xl animate-bounce">🎮</span>
              <span className="text-6xl sm:text-8xl animate-tas-tas">🔥</span>
            </div>

            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-[#FFFF00] drop-shadow-[5px_5px_0px_#FF0000] text-stroke-black">
              CSI ANOMALI
            </h1>

            <div className="my-3 bg-[#000000] text-[#00FF00] border-4 border-[#FFFF00] p-2 sm:p-3 transform rotate-1 inline-block max-w-3xl shadow-[6px_6px_0px_#00E1FF]">
              <p className="text-xl sm:text-3xl md:text-4xl font-black font-mono tracking-tight text-[#FFFF00]">
                ROAD TO MPL
              </p>
              <p className="text-sm sm:text-xl font-extrabold text-red-500 uppercase tracking-widest mt-1">
                (MOBILE LEGENDS PLENGER LEAGUE)
              </p>
            </div>

            <p className="text-sm sm:text-lg font-black text-white bg-black/80 px-4 py-1.5 mt-3 border-2 border-white max-w-2xl mx-auto italic">
              &quot;Menang adalah kebetulan, kalah adalah tradisi, surrender adalah jalan ninjaku.&quot;
            </p>

            {/* Badges Kebanggaan Konyol */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="bg-[#FFFF00] text-black font-black text-xs sm:text-sm px-3 py-1 border-2 border-black transform -rotate-3">
                📉 WINRATE DI BAWAH 15%
              </span>
              <span className="bg-[#00FF00] text-black font-black text-xs sm:text-sm px-3 py-1 border-2 border-black transform rotate-2">
                🐘 SPESIALIS RETRI KELOMANG
              </span>
              <span className="bg-[#00FFFF] text-black font-black text-xs sm:text-sm px-3 py-1 border-2 border-black transform -rotate-1">
                🏹 LAYLA TANK FULL DEFENSE
              </span>
              <span className="bg-[#FF0000] text-white font-black text-xs sm:text-sm px-3 py-1 border-2 border-black transform rotate-3">
                🌀 SPAM RECALL TAS-TAS-TAS
              </span>
            </div>
          </div>
        </div>

        {/* Soundboard Interaktif Beban */}
        <Soundboard onRecallTrigger={triggerRecallSpam} />

        {/* Indikator Kesehatan Mental & Pusing Meter */}
        <PusingMeter />

        {/* Roster Pemain CSI Anomali */}
        <RosterSection />

        {/* Generator Kartu Tanda Beban (KTB) */}
        <KartuBebanGenerator />

        {/* Prestasi Gemilang & Klasemen Degradasi */}
        <PencapaianSection />

        {/* Official Merchandise Toko Norak */}
        <TokoMerchandise />

        {/* Shoutbox Warnet 2000-an */}
        <Shoutbox />

        {/* Under Construction & Web 1.0 Badges Footer */}
        <div className="bg-[#000000] text-white border-8 border-ridge border-[#FFFF00] p-6 text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono">
            <span className="bg-yellow-400 text-black font-black px-2 py-1 border border-black">
              🚧 UNDER DEGRADASI PERMANEN 🚧
            </span>
            <span className="bg-blue-600 text-white font-bold px-2 py-1 border border-white">
              OPTIMIZED FOR NETSCAPE NAVIGATOR 4.0 & 800x600 RES
            </span>
            <span className="bg-red-600 text-white font-black px-2 py-1 border border-white animate-blink">
              MADE WITH NEXT.JS 16 & PURE CHAOS
            </span>
          </div>

          <div className="text-xs text-zinc-400 font-mono space-y-1">
            <p className="font-bold text-yellow-300">
              © 2026 CSI ANOMALI SQUAD - ROAD TO MPL (MOBILE LEGENDS PLENGER LEAGUE). JUST FOR FUN!
            </p>
            <p>
              Semua karakter, statistik, dan rekor kelomang di website ini adalah parodi murni semata demi menghibur para pejuang bintang yang terpuruk.
            </p>
          </div>

          {/* Tombol Back to Top norak */}
          <button
            onClick={() => {
              sounds.playRecallSpam();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#00FF00] hover:bg-lime-400 text-black font-black text-xs sm:text-sm px-6 py-2 border-4 border-white uppercase cursor-pointer shadow-[4px_4px_0px_#FF0000] inline-block"
          >
            🚀 KEMBALI KE PUNCAK KEBODOHAN (TOP) 🚀
          </button>
        </div>
      </div>

      {/* Modal Cheat Diamond Palsu */}
      {showCheatModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFF00] border-8 border-dashed border-[#FF0000] p-6 max-w-md w-full text-black text-center shadow-[16px_16px_0px_#000000] select-none">
            <span className="text-6xl animate-bounce block mb-2">👮‍♂️🚨</span>
            <h3 className="text-2xl font-black text-red-600 uppercase font-mono">
              HAYOOOO KETAHUAN MAU NGECHEAT YA!
            </h3>
            <p className="text-sm font-bold text-zinc-900 my-3">
              Muka kamu terpantau di radar polisi Moonton! Diamond 999.999 tidak akan membuat Fanny kamu bisa terbang lurus tanpa nabrak tebing!
            </p>
            <div className="bg-white border-2 border-black p-2 font-mono text-xs text-red-700 font-bold mb-4">
              HUKUMAN: Winrate akun Anda dikurangi 20% dan wajib push rank solo bersama 4 bot bocil!
            </div>
            <button
              onClick={() => {
                sounds.playRecallSpam();
                setShowCheatModal(false);
              }}
              className="bg-[#0000FF] hover:bg-blue-800 text-white font-black text-sm px-6 py-2.5 border-4 border-black uppercase cursor-pointer shadow-[4px_4px_0px_#000]"
            >
              Ampun Bang, Saya Mending Latihan Retri 🙏
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
