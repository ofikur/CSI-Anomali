"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/soundEffects";
import { Volume2, VolumeX, AlertTriangle, Flame, ShieldAlert, Sparkles, Skull } from "lucide-react";

interface SoundboardProps {
  onRecallTrigger?: () => void;
  onPanicTrigger?: () => void;
}

export default function Soundboard({ onRecallTrigger, onPanicTrigger }: SoundboardProps) {
  const [bgmActive, setBgmActive] = useState(false);
  const [lastAction, setLastAction] = useState<string>("SIAP BIKIN EMOSI");
  const [recallCount, setRecallCount] = useState(0);

  const handleRecall = () => {
    sounds.playRecallSpam();
    setRecallCount((prev) => prev + 1);
    setLastAction("TAS TAS TAS! (SPAM RECALL TAUNTING)");
    if (onRecallTrigger) onRecallTrigger();
  };

  const handleRetri = () => {
    sounds.playRetriMiss();
    setLastAction("RETRI INDOMARET! KELOMANG DIAMANKAN!");
  };

  const handleDanger = () => {
    sounds.playDangerPing();
    setLastAction("PING! RETREAT WOY KENA GANK!!");
  };

  const handleDefeat = () => {
    sounds.playDefeat();
    setLastAction("DEFEAT! -1 BINTANG TERCINTA!");
  };

  const handleVictory = () => {
    sounds.playVictoryFals();
    setLastAction("VICTORY! (CUMA MIMPI / LAWAN BOT)");
  };

  const handleError = () => {
    sounds.playErrorBonk();
    setLastAction("FATAL ERROR: OTAK JUNGLER TIDAK MERESPON!");
    if (onPanicTrigger) onPanicTrigger();
  };

  const handleToggleBgm = () => {
    const isPlaying = sounds.toggleBgm((playing) => {
      setBgmActive(playing);
    });
    setBgmActive(isPlaying);
    setLastAction(isPlaying ? "LAGU 8-BIT KOPLO BERDENDANG 🎶" : "BGM DIMATIKAN (KESEPIAN)");
  };

  return (
    <div className="w-full bg-[#00FFFF] border-8 border-dashed border-[#FF00FF] p-4 md:p-6 my-6 rotate-[-1deg] shadow-[12px_12px_0px_#0000FF]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black pb-3 mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FF0000] drop-shadow-[2px_2px_0px_#FFFF00] flex items-center gap-2">
            <Volume2 className="w-8 h-8 text-[#0000FF] animate-bounce" />
            SOUNDBOARD RESMI BEBAN SQUAD (WEB AUDIO)
          </h2>
          <p className="text-xs md:text-sm font-bold text-[#000080] bg-[#FFFF00] inline-block px-2 py-0.5 border-2 border-black mt-1">
            ⚠️ Klik tombol di bawah ini untuk mensimulasikan kepedihan saat mabar dengan CSI Anomali!
          </p>
        </div>

        {/* BGM Toggle Button */}
        <button
          onClick={handleToggleBgm}
          className={`flex items-center gap-2 px-4 py-2 font-black text-sm md:text-base border-4 border-black uppercase cursor-pointer transition-transform active:scale-95 ${
            bgmActive
              ? "bg-[#00FF00] text-black animate-pulse shadow-[4px_4px_0px_#000]"
              : "bg-[#FF0000] text-white shadow-[4px_4px_0px_#000]"
          }`}
        >
          {bgmActive ? (
            <>
              <Volume2 className="w-5 h-5 animate-spin" />
              BGM KOPLO: ON 🎵
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5" />
              PUTAR BGM 8-BIT KOPLO 📻
            </>
          )}
        </button>
      </div>

      {/* Grid Tombol Sound Effect */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {/* 1. Recall Tas Tas Tas */}
        <button
          onClick={handleRecall}
          className="bg-[#FFFF00] hover:bg-[#FFD700] text-black border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#FF0000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <Sparkles className="w-6 h-6 text-[#FF00FF] animate-spin-retro" />
          <span>TAS-TAS-TAS!</span>
          <span className="text-[10px] bg-[#00FF00] px-1 border border-black font-mono">
            {recallCount}x Recall
          </span>
        </button>

        {/* 2. Retri Indomaret */}
        <button
          onClick={handleRetri}
          className="bg-[#FF9900] hover:bg-[#FF7700] text-black border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <Skull className="w-6 h-6 text-black animate-bounce" />
          <span>RETRI MISS</span>
          <span className="text-[10px] bg-white text-red-600 px-1 border border-black font-mono">
            Wah Wah Wah~
          </span>
        </button>

        {/* 3. Ping Bahaya */}
        <button
          onClick={handleDanger}
          className="bg-[#FF0000] hover:bg-[#CC0000] text-[#FFFF00] border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#FFFF00] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <AlertTriangle className="w-6 h-6 text-[#FFFF00] animate-ping" />
          <span>PING DANGER!</span>
          <span className="text-[10px] bg-black text-white px-1 border border-yellow-300 font-mono">
            WOY KENA GANK!
          </span>
        </button>

        {/* 4. Defeat Massal */}
        <button
          onClick={handleDefeat}
          className="bg-[#660099] hover:bg-[#550088] text-[#00FFFF] border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#FF00FF] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <Flame className="w-6 h-6 text-[#FF00FF]" />
          <span>DEFEAT 💀</span>
          <span className="text-[10px] bg-[#FF00FF] text-black px-1 border border-black font-mono">
            -1 Bintang
          </span>
        </button>

        {/* 5. Victory Halusinasi */}
        <button
          onClick={handleVictory}
          className="bg-[#00FF00] hover:bg-[#00CC00] text-black border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#0000FF] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <span className="text-xl">🏆</span>
          <span>VICTORY FALS</span>
          <span className="text-[10px] bg-[#FFFF00] px-1 border border-black font-mono">
            Lawan AI Easy
          </span>
        </button>

        {/* 6. Panic Error Bonk */}
        <button
          onClick={handleError}
          className="bg-[#FFFFFF] hover:bg-zinc-200 text-[#FF0000] border-4 border-black p-3 font-black text-xs md:text-sm flex flex-col items-center justify-center gap-1 shadow-[5px_5px_0px_#000000] active:translate-x-1 active:translate-y-1 cursor-pointer transition-all hover:scale-105"
        >
          <ShieldAlert className="w-6 h-6 text-[#FF0000] animate-pulse" />
          <span>PANIK BUYBACK!</span>
          <span className="text-[10px] bg-red-600 text-white px-1 font-mono">
            Gold Habis!
          </span>
        </button>
      </div>

      {/* Status Bar Terakhir */}
      <div className="mt-3 bg-black text-[#00FF00] font-mono text-xs md:text-sm p-2 border-2 border-[#FFFF00] flex items-center justify-between">
        <span className="truncate">
          STATUS SUARA TERAKHIR: <span className="text-[#FFFF00] font-bold">{lastAction}</span>
        </span>
        <span className="animate-blink font-black text-[#FF0000] hidden sm:inline">
          [● LIVE AUDIO ACTIVE]
        </span>
      </div>
    </div>
  );
}
