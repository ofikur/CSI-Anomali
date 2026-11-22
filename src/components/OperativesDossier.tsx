"use client";

import React from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  Skull,
  ShieldAlert,
  Zap,
  Radio,
  FileText,
  AlertOctagon,
  Eye,
  Crosshair,
  Cpu,
} from "lucide-react";

interface Operative {
  code: string;
  codename: string;
  role: string;
  hero: string;
  integrity: string;
  threatLevel: string;
  threatColor: string;
  bounty: string;
  incidentLog: string;
  interceptedComms: string;
  avatarIcon: string;
  soundType: "retri" | "sonar" | "tas" | "glitch" | "alarm";
  stats: {
    retriMiss: number; // percentage
    feedRate: number;
    toxicity: number;
    delusion: number;
  };
}

const OPERATIVES: Operative[] = [
  {
    code: "SUBJECT-01",
    codename: "CSI•LordRetriBocor",
    role: "JUNGLER // WEAPONIZED RETRI BREACHER",
    hero: "Fanny (1,450 Match) / Ling Darat Protocol",
    integrity: "11.2% Winrate (Severe Anomaly)",
    threatLevel: "CLASS 5: CRITICAL ALLY HAZARD",
    threatColor: "text-[#ff003c] border-[#ff003c]/40 bg-[#ff003c]/10",
    bounty: "500 XMR / 1 Porsi Bakwan Mak Erot",
    incidentLog: "Executed retribution on neutral jungle kelomang with 0.001s delay during Lord contest.",
    interceptedComms: '"Tenang late game kita comeback... (menit 7 base sudah rata kena minion super)."',
    avatarIcon: "⚡",
    soundType: "retri",
    stats: { retriMiss: 99, feedRate: 85, toxicity: 70, delusion: 95 },
  },
  {
    code: "SUBJECT-02",
    codename: "CSI•LaylaGarisKeras",
    role: "GOLD LANE // SENSORY AUDIO DISRUPTOR",
    hero: "Layla / Miya (Spell Inspire Prototype)",
    integrity: "23.4% Winrate (0/18/0 KDA Recorded)",
    threatLevel: "CLASS 4: HIGH CASUALTY RISK",
    threatColor: "text-amber-400 border-amber-400/40 bg-amber-400/10",
    bounty: "250 XMR / 1 Sachet Kopi Torabika",
    incidentLog: "Frontline positioning in teamfight without vision; ulted blind bushes; blamed tank within 4 seconds of match start.",
    interceptedComms: '"TANK TURA TIK! NGAPAIN GUE JAGA JARAK KALO BISA MATI DEKETAN?!"',
    avatarIcon: "🏹",
    soundType: "alarm",
    stats: { retriMiss: 10, feedRate: 98, toxicity: 95, delusion: 90 },
  },
  {
    code: "SUBJECT-03",
    codename: "CSI•TigrealAngin",
    role: "ROAMER // INVERSE DISPLACEMENT AGENT",
    hero: "Tigreal / Franco (Hook Angin)",
    integrity: "18.9% Winrate (Roam Boots at Min 14)",
    threatLevel: "CLASS 5: TRAITOROUS PHYSICS",
    threatColor: "text-[#ff003c] border-[#ff003c]/40 bg-[#ff003c]/10",
    bounty: "300 XMR / 1 Bungkus Rokok Filter",
    incidentLog: "Flickered into empty river bush; pushed fed enemy assassin directly into low-health allied mid laner.",
    interceptedComms: '"Gue udah bantuin dorong musuhnya mendekat, kok lu malah mati konyol sih?"',
    avatarIcon: "🛡️",
    soundType: "glitch",
    stats: { retriMiss: 20, feedRate: 88, toxicity: 65, delusion: 85 },
  },
  {
    code: "SUBJECT-04",
    codename: "CSI•NanaSemak",
    role: "MID LANE // PSYCHOLOGICAL WARFARE UNIT",
    hero: "Nana / Eudora Camping Syndicate",
    integrity: "31.0% Winrate (Fountain Camper)",
    threatLevel: "CLASS 4: COGNITIVE MEMETIC TERROR",
    threatColor: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
    bounty: "400 XMR / Surat Peringatan Moonton",
    incidentLog: "Deployed 20+ Molina totems in own base; flooded network with high-frequency tas-tas-tas recall taunting packets.",
    interceptedComms: '"Yang penting KDA gue gak minus 0, base ancur bukan urusan gue dek!"',
    avatarIcon: "🌀",
    soundType: "tas",
    stats: { retriMiss: 0, feedRate: 40, toxicity: 99, delusion: 80 },
  },
  {
    code: "SUBJECT-05",
    codename: "CSI•ZilongPasrah",
    role: "EXP LANE // ROGUE SPLIT-PUSH SYNDICATE",
    hero: "Zilong / Chou (Taunting Freestyle Fatal)",
    integrity: "15.6% Winrate (Zero Map Vision)",
    threatLevel: "CLASS 3: TACTICAL DELUSION",
    threatColor: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
    bounty: "150 XMR / Kuota Indosat 2GB",
    incidentLog: "Attacked outer enemy turret while Lord destroyed tier 3 inhibitor; spammed '1 vs 1 dek' in all chat.",
    interceptedComms: '"Heroes never fade! Tapi bintang gue fade away ke rank Warrior!"',
    avatarIcon: "🗡️",
    soundType: "sonar",
    stats: { retriMiss: 5, feedRate: 92, toxicity: 85, delusion: 99 },
  },
  {
    code: "SUBJECT-00",
    codename: "CSI•CadanganMental",
    role: "HANDLER // NETWORK DECAY SPECIALIST",
    hero: "Balmond Roam / AFK Overseer",
    integrity: "9.8% Winrate (Disconnected Min 3)",
    threatLevel: "CLASS 2: HIGH PACKET LOSS",
    threatColor: "text-zinc-400 border-zinc-700 bg-zinc-900/40",
    bounty: "50 XMR / Penggantian Biaya Kas Warnet",
    incidentLog: "Indihome fiber snapped by maternal domestic orders; auto-queued ranked while running torrents.",
    interceptedComms: '"Koneksi gue tiba-tiba 999ms gara-gara emak nonton tutorial sayur lodeh!"',
    avatarIcon: "📡",
    soundType: "glitch",
    stats: { retriMiss: 0, feedRate: 60, toxicity: 90, delusion: 75 },
  },
];

export default function OperativesDossier() {
  const handleInterceptAudio = (soundType: Operative["soundType"]) => {
    if (soundType === "retri") cyberSounds.playRetriGlitch();
    else if (soundType === "tas") cyberSounds.playDigitalRecall();
    else if (soundType === "alarm") cyberSounds.playBreachAlarm();
    else if (soundType === "sonar") cyberSounds.playSonarPing();
    else cyberSounds.playGlitchBurst();
  };

  return (
    <section className="my-12 w-full">
      {/* Dossier Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#1a3826] pb-4 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#ff003c] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#ff003c] font-black uppercase">
              TOP SECRET // LEVEL 4 CLEARANCE ONLY
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-black text-white tracking-tight glow-green mt-1">
            CLASSIFIED OPERATIVE DOSSIERS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            Intercepted surveillance intelligence on CSI Anomali squad members (Road to MPL)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#071016] border border-[#142d1f] px-3 py-1.5">
          <Crosshair className="w-4 h-4 text-emerald-400 animate-spin-retro" />
          <span>SURVEILLANCE STATUS: ACTIVE TAP</span>
        </div>
      </div>

      {/* Grid of Classified Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPERATIVES.map((op, idx) => (
          <div
            key={idx}
            onClick={() => handleInterceptAudio(op.soundType)}
            className="bg-[#070d12] border border-[#152e20] hover:border-[#00ff66]/60 p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] flex flex-col justify-between relative group cursor-pointer"
          >
            {/* Top Classified Corner Stamp */}
            <div className="flex items-center justify-between border-b border-[#142d1f] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl bg-[#0b171f] p-1.5 border border-[#1b3b29]">
                  {op.avatarIcon}
                </span>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block">
                    {op.code} // CLASSIFIED
                  </span>
                  <h3 className="text-base sm:text-lg font-mono font-bold text-white group-hover:text-[#00ff66] transition-colors">
                    {op.codename}
                  </h3>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${op.threatColor}`}>
                {op.bounty}
              </span>
            </div>

            {/* Role & Hero Info */}
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#0b161f] border border-[#142c1e] p-2 text-[11px]">
                <span className="text-zinc-500 block uppercase">Assigned Role:</span>
                <span className="text-emerald-400 font-bold">{op.role}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#12241a]">
                <span className="text-zinc-400">Weapon / Hero:</span>
                <span className="text-zinc-200 font-bold text-right">{op.hero}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#12241a]">
                <span className="text-zinc-400">System Integrity:</span>
                <span className="text-[#ff003c] font-bold">{op.integrity}</span>
              </div>

              {/* Threat Matrix Bar */}
              <div className="pt-2">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                  Threat Matrix Metrics:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Feed Rate</span>
                      <span className="text-amber-400">{op.stats.feedRate}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 mt-0.5">
                      <div
                        className="bg-amber-400 h-full"
                        style={{ width: `${op.stats.feedRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Delusion</span>
                      <span className="text-[#ff003c]">{op.stats.delusion}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 mt-0.5">
                      <div
                        className="bg-[#ff003c] h-full"
                        style={{ width: `${op.stats.delusion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Incident Log */}
              <div className="bg-[#05090c] border-l-2 border-[#ff003c] p-2 mt-3 text-[11px] text-zinc-300">
                <span className="text-[#ff003c] font-bold block text-[10px] uppercase">
                  LEAKED INCIDENT RECORD:
                </span>
                <p className="mt-0.5 text-zinc-400 italic leading-snug">{op.incidentLog}</p>
              </div>
            </div>

            {/* Intercepted Voice Transcript */}
            <div className="mt-4 pt-3 border-t border-[#142d1f] flex items-start gap-2">
              <Radio className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[10px] font-mono text-emerald-300/80 italic">
                {op.interceptedComms}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
