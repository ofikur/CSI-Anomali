"use client";

import React from "react";
import { sounds } from "@/lib/soundEffects";
import {
  Flame,
  TrendingDown,
  Award,
  Hash,
  Volume2,
  AlertTriangle,
  Sparkles,
  Skull,
} from "lucide-react";

interface TubeSidebarProps {
  onTagClick: (tag: string) => void;
}

const ROSTER_CREATORS = [
  {
    name: "CSI•LordRetriBocor",
    role: "Jungler Beban",
    hero: "Fanny (WR 11.2%)",
    stat: "1,450 Retri Melayang",
    avatar: "🤡",
  },
  {
    name: "CSI•LaylaGarisKeras",
    role: "Gold Lane Bacot",
    hero: "Layla (WR 23.4%)",
    stat: "6 Sepatu Warrior",
    avatar: "🏹",
  },
  {
    name: "CSI•TigrealAngin",
    role: "Roamer Bahaya",
    hero: "Tigreal (WR 18.9%)",
    stat: "Dorong Musuh ke Teman",
    avatar: "🛡️",
  },
  {
    name: "CSI•NanaSemak",
    role: "Mid Lane Teror",
    hero: "Nana (WR 31.0%)",
    stat: "Spam Tas-Tas 10x/detik",
    avatar: "🐱",
  },
  {
    name: "CSI•ZilongPasrah",
    role: "EXP Lane Pasrah",
    hero: "Zilong (WR 15.6%)",
    stat: "Split Push Pas Base Pecah",
    avatar: "🗡️",
  },
];

const TRENDING_TAGS = [
  "Retri Indomaret",
  "Fanny Darat",
  "Layla Tank 6 Sepatu",
  "Tigreal Dorong Temen",
  "Nana Tas-Tas-Tas",
  "Surrender Menit 3",
  "Ping 999ms",
];

export default function TubeSidebar({ onTagClick }: TubeSidebarProps) {
  return (
    <aside className="space-y-4">
      {/* Box 1: Status Road to MPL */}
      <div className="bg-[#0f1d33] border border-[#1e3456] rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider border-b border-[#182b47] pb-2 mb-2.5">
          <TrendingDown className="w-4 h-4 animate-bounce" />
          Status Road to MPL 2026
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Peringkat MPL:</span>
            <span className="font-bold text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-900/50">
              Posisi 16 (Degradasi)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Lose Streak:</span>
            <span className="font-bold text-yellow-400">37x Beruntun</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Retri Miss Rate:</span>
            <span className="font-bold text-cyan-400">99.8% (Kelomang)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Bintang Menguap:</span>
            <span className="font-mono text-pink-400 font-bold">-184 ⭐</span>
          </div>
        </div>
      </div>

      {/* Box 2: Soundboard Cepat */}
      <div className="bg-[#0f1d33] border border-[#1e3456] rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider border-b border-[#182b47] pb-2 mb-2.5">
          <Volume2 className="w-4 h-4 text-blue-400" />
          Soundboard Cepat Beban
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            onClick={() => sounds.playRecallSpam()}
            className="bg-[#12233c] hover:bg-[#1a3154] text-slate-200 p-2 rounded border border-[#223d66] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>TAS-TAS-TAS!</span>
          </button>
          <button
            onClick={() => sounds.playRetriMiss()}
            className="bg-[#12233c] hover:bg-[#1a3154] text-slate-200 p-2 rounded border border-[#223d66] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <Skull className="w-3.5 h-3.5 text-red-400" />
            <span>RETRI MISS</span>
          </button>
          <button
            onClick={() => sounds.playDangerPing()}
            className="bg-[#12233c] hover:bg-[#1a3154] text-slate-200 p-2 rounded border border-[#223d66] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>DANGER PING</span>
          </button>
          <button
            onClick={() => sounds.playDefeat()}
            className="bg-[#12233c] hover:bg-[#1a3154] text-slate-200 p-2 rounded border border-[#223d66] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>DEFEAT 💀</span>
          </button>
        </div>
      </div>

      {/* Box 3: Top Kreator Blunder */}
      <div className="bg-[#0f1d33] border border-[#1e3456] rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider border-b border-[#182b47] pb-2 mb-2.5">
          <Award className="w-4 h-4 text-yellow-400" />
          Kreator Blunder Terpopuler
        </div>
        <div className="space-y-2.5">
          {ROSTER_CREATORS.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                sounds.playRecallSpam();
                onTagClick(c.name);
              }}
              className="flex items-center gap-2.5 p-1.5 rounded hover:bg-[#152745] cursor-pointer transition-colors"
            >
              <span className="text-xl bg-[#091220] p-1 rounded-full border border-[#1a2f4c]">
                {c.avatar}
              </span>
              <div className="overflow-hidden flex-1 text-xs">
                <div className="font-bold text-slate-200 truncate">{c.name}</div>
                <div className="text-[11px] text-slate-400 truncate">
                  {c.role} • {c.hero}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Box 4: Trending Tags */}
      <div className="bg-[#0f1d33] border border-[#1e3456] rounded p-3.5 shadow-sm">
        <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-wider border-b border-[#182b47] pb-2 mb-2.5">
          <Hash className="w-4 h-4 text-blue-400" />
          Top Tagar Blunder
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TRENDING_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => {
                sounds.playRecallSpam();
                onTagClick(t);
              }}
              className="bg-[#12233c] hover:bg-[#1a3357] text-slate-300 hover:text-blue-400 text-[11px] px-2 py-1 rounded border border-[#203a61] cursor-pointer transition-colors"
            >
              #{t.replace(/\s+/g, "")}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
