"use client";

import React, { useState } from "react";
import TorHeader from "@/components/TorHeader";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import OperativesDossier from "@/components/OperativesDossier";
import SurveillanceCCTV from "@/components/SurveillanceCCTV";
import DarkMarketBazaar from "@/components/DarkMarketBazaar";
import DarknetKTBGenerator from "@/components/DarknetKTBGenerator";
import ClassificationArchive from "@/components/ClassificationArchive";
import UndergroundShoutbox from "@/components/UndergroundShoutbox";
import { cyberSounds } from "@/lib/soundEffects";
import {
  ShieldAlert,
  Terminal,
  Activity,
  Zap,
  Radio,
  FileWarning,
  Flame,
  Binary,
  Lock,
  Skull,
  Eye,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [showLeakModal, setShowLeakModal] = useState(false);
  const [retriStatus, setRetriStatus] = useState<string | null>(null);

  const handleRetriAction = () => {
    cyberSounds.playRetriGlitch();
    setRetriStatus("RETRI EXECUTED ON KELOMANG! ENEMY SECURED LORD!");
    setTimeout(() => setRetriStatus(null), 3500);
  };

  const handleRecallTas = () => {
    cyberSounds.playDigitalRecall();
  };

  const handleOpenLeak = () => {
    cyberSounds.playGlitchBurst();
    setShowLeakModal(true);
  };

  return (
    <main className="min-h-screen bg-[#030708] text-[#00ff66] cyber-grid relative font-mono selection:bg-[#ff003c] selection:text-white">
      {/* Tor Onion Address & Circuit Header */}
      <TorHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Hero Section: The Anomali Darknet Core */}
        <section className="relative bg-[#050a0e] border border-[#173a25] p-6 sm:p-10 shadow-[0_0_35px_rgba(0,255,102,0.08)] overflow-hidden">
          {/* Subtle Ambient Red Alert Glow in Background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff003c]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142d1f] pb-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
              <span className="text-[#ff003c] font-black tracking-widest uppercase">
                THREAT DESIGNATION: UNCONTAINED FEEDER ENTITY
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
              <span className="bg-[#0b1820] border border-[#173623] px-2 py-0.5 text-zinc-300">
                HOST: 127.0.0.1:PLENGER
              </span>
              <span className="bg-[#0b1820] border border-[#173623] px-2 py-0.5 text-emerald-400">
                STATUS: DEGRADED
              </span>
            </div>
          </div>

          {/* Title & Glitch Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-950/40 border border-[#ff003c]/50 text-[#ff003c] text-xs font-bold">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>PROJECT CODE: OPERATION INFINITE LOSE STREAK</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white glow-green animate-glitch uppercase">
              CSI ANOMALI
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xl sm:text-3xl font-black text-amber-400 font-mono tracking-wider">
                ROAD TO MPL
              </span>
              <span className="text-sm sm:text-base font-bold text-red-500 bg-black/80 px-2 py-0.5 border border-red-900/60 uppercase">
                (MOBILE LEGENDS PLENGER LEAGUE)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed pt-2">
              Dokumentasi intelijen bawah tanah dan dossier rahasia dari squad MLBB paling meresahkan.
              Menang adalah anomali langka, kalah adalah tradisi operasi, dan surrender menit ke-3 adalah doktrin utama kami. Just for fun.
            </p>
          </div>

          {/* Retri Status Alert Notification */}
          {retriStatus && (
            <div className="mt-4 p-3 bg-[#ff003c]/20 border border-[#ff003c] text-[#ff003c] text-xs font-bold animate-pulse">
              [!] {retriStatus}
            </div>
          )}

          {/* Action Control Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-[#142d1f] mt-6">
            <button
              onClick={handleRetriAction}
              className="bg-[#ff003c]/20 hover:bg-[#ff003c]/30 border border-[#ff003c] text-white font-mono text-xs px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,0,60,0.2)]"
            >
              <Zap className="w-4 h-4 text-[#ff003c] animate-bounce" />
              <span>TEST RETRI (MISS GUARANTEED)</span>
            </button>

            <button
              onClick={handleRecallTas}
              className="bg-[#0b1c13] hover:bg-[#122c1f] border border-[#00ff66] text-[#00ff66] font-mono text-xs px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.15)]"
            >
              <Radio className="w-4 h-4 text-[#00ff66] animate-pulse" />
              <span>BROADCAST RECALL (TAS-TAS-TAS)</span>
            </button>

            <button
              onClick={handleOpenLeak}
              className="bg-[#0b1720] hover:bg-[#112433] border border-amber-400/50 text-amber-400 font-mono text-xs px-4 py-2.5 font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileWarning className="w-4 h-4 text-amber-400" />
              <span>LEAK MOONTON MEMO</span>
            </button>
          </div>

          {/* Telemetry Indicator Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#142d1f]/60 text-xs">
            <div className="bg-[#030608] border border-[#112419] p-3">
              <span className="text-[10px] text-zinc-500 uppercase block">MYTHIC STARS:</span>
              <span className="text-xl font-bold text-red-500 font-mono">0 ⭐</span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">Depleted completely</span>
            </div>

            <div className="bg-[#030608] border border-[#112419] p-3">
              <span className="text-[10px] text-zinc-500 uppercase block">STARS LOST:</span>
              <span className="text-xl font-bold text-amber-400 font-mono">-184 ⭐</span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">Historical derank</span>
            </div>

            <div className="bg-[#030608] border border-[#112419] p-3">
              <span className="text-[10px] text-zinc-500 uppercase block">RETRI FAIL RATE:</span>
              <span className="text-xl font-bold text-[#ff003c] font-mono">99.8%</span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">Kelomang priority</span>
            </div>

            <div className="bg-[#030608] border border-[#112419] p-3">
              <span className="text-[10px] text-zinc-500 uppercase block">ROUTER PING:</span>
              <span className="text-xl font-bold text-cyan-400 font-mono">999ms</span>
              <span className="text-[9px] text-zinc-500 block mt-0.5">Tor routed lag</span>
            </div>
          </div>
        </section>

        {/* Interactive Hacker Terminal */}
        <InteractiveTerminal />

        {/* Classified Operatives Dossiers */}
        <OperativesDossier />

        {/* Live Darknet CCTV Surveillance Feed */}
        <SurveillanceCCTV />

        {/* Underground Dark Market (Silk Road MLBB Parody) */}
        <DarkMarketBazaar />

        {/* Darknet Operative Clearance Card Generator (KTB Forge) */}
        <DarknetKTBGenerator />

        {/* Classification Archive: Match Incidents & Standings */}
        <ClassificationArchive />

        {/* Encrypted Onion Wiretap Shoutbox */}
        <UndergroundShoutbox />

        {/* Darknet Footer */}
        <footer className="border-t border-[#142d1f] pt-8 pb-12 font-mono text-xs text-zinc-500 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧅</span>
              <span className="text-zinc-400 font-bold">CSI ANOMALI CLASSIFIED GATEWAY</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-emerald-500">TOR V3 PROTOCOL</span>
              <span>•</span>
              <span className="text-zinc-400">OPENSOURCE ASSETS</span>
              <span>•</span>
              <span className="text-amber-500">JUST FOR FUN</span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-600 leading-relaxed">
            [PENAFIAN PARODI] Seluruh konten di situs ini merupakan karya parodi komedi untuk squad Mobile Legends &quot;CSI Anomali&quot; dalam Road to MPL (Mobile Legends Plenger League).
            Tidak ada koneksi ilegal nyata ke darknet; seluruh data disimulasikan menggunakan client-side Web Audio API dan Next.js Tailwind CSS.
          </p>

          <div className="text-[10px] text-zinc-700 flex justify-between items-center border-t border-zinc-900 pt-3">
            <span>PGP ROOT KEY: 0xDEADBEEF420_CSI_ANOMALI</span>
            <span>BUILD: NEXT.JS 16 // TURBOPACK // DARKWEB THEME</span>
          </div>
        </footer>
      </div>

      {/* Leaked Moonton Memo Modal */}
      {showLeakModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#050a0e] border border-[#ff003c]/60 max-w-lg w-full p-6 text-zinc-300 font-mono shadow-[0_0_40px_rgba(255,0,60,0.3)] relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-[#ff003c]">
                <FileWarning className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold tracking-widest uppercase">
                  CLASSIFIED LEAK // MOONTON SECURITY REPORT
                </h3>
              </div>
              <button
                onClick={() => setShowLeakModal(false)}
                className="text-zinc-500 hover:text-white text-xs cursor-pointer"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
              <div className="bg-black/60 p-3 border border-zinc-800 text-[11px] space-y-1">
                <div>DOKUMEN: #LEAK-2026-PLENGER-09</div>
                <div>TANGGAL: 22 NOVEMBER 2026</div>
                <div>KLASIFIKASI: SANGAT RAHASIA (EYES ONLY)</div>
              </div>

              <p>
                Berdasarkan pantauan satelit AI Moonton, squad <strong>CSI Anomali</strong> telah terdeteksi melakukan sabotase terstruktur terhadap integritas match rank.
              </p>
              <p>
                Pada match ke-38 berturut-turut, Fanny sekutu dilaporkan meluncur dengan 2 kabel, menabrak tembok buff biru, dan langsung surrender saat lord baru saja spawn.
              </p>
              <div className="bg-[#ff003c]/10 border-l-2 border-[#ff003c] p-2 text-[#ff003c] text-[11px]">
                REKOMENDASI DEPARTEMEN: Wajibkan seluruh anggota squad push rank di mode bot mudah hingga tahun 2035.
              </div>
            </div>

            <button
              onClick={() => {
                cyberSounds.playKeyClick();
                setShowLeakModal(false);
              }}
              className="mt-5 w-full bg-[#12222e] hover:bg-[#1a3244] border border-cyan-400 text-cyan-400 py-2 text-xs font-bold transition-colors cursor-pointer"
            >
              TUTUP BERKAS INTELIJEN
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
