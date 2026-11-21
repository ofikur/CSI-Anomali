"use client";

import React from "react";
import { Trophy, TrendingDown, Award, AlertTriangle, ShieldCheck, Flame } from "lucide-react";

export default function PencapaianSection() {
  return (
    <section className="my-10 w-full space-y-8">
      {/* Banner Prestasi */}
      <div className="bg-[#FFFF00] border-8 border-black p-4 text-center transform rotate-1 shadow-[10px_10px_0px_#FF00FF]">
        <h2 className="text-3xl sm:text-5xl font-black text-[#FF0000] uppercase tracking-tight drop-shadow-[3px_3px_0px_#00FF00]">
          🏆 PRESTASI GEMILANG CSI ANOMALI 🏆
        </h2>
        <p className="text-sm sm:text-base font-extrabold bg-[#0000FF] text-white inline-block px-3 py-1 mt-1 border-2 border-black">
          Gelar dan Penghargaan Bergengsi Sepanjang Masa (100% Asli Tanpa Rekayasa)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Prestasi 1: Lose Streak Rekor */}
        <div className="bg-[#FF0055] text-white border-6 border-black p-5 transform -rotate-2 shadow-[8px_8px_0px_#000000]">
          <div className="flex items-center gap-2 border-b-4 border-yellow-300 pb-2 mb-3">
            <TrendingDown className="w-8 h-8 text-yellow-300 animate-bounce" />
            <h3 className="text-xl font-black uppercase">REKOR LOSE STREAK</h3>
          </div>
          <div className="bg-black/60 p-3 border-2 border-white text-center mb-3">
            <span className="text-5xl font-black text-yellow-300 font-mono">37x</span>
            <p className="text-xs uppercase tracking-widest text-red-300 font-bold mt-1">
              Kekalahan Beruntun Tanpa Putus
            </p>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            Mencetak rekor dunia dalam sejarah Mobile Legends: Dari Rank Mythical Glory anjlok bebas terjun payung ke Master IV dalam waktu 48 jam nonstop!
          </p>
          <div className="mt-3 bg-yellow-300 text-black font-black text-xs p-1 text-center border border-black">
            🎖️ SERTIFIKAT GUINNESS DITOLAK
          </div>
        </div>

        {/* Prestasi 2: Retri Meleset */}
        <div className="bg-[#00E1FF] text-black border-6 border-black p-5 transform rotate-2 shadow-[8px_8px_0px_#FF0000]">
          <div className="flex items-center gap-2 border-b-4 border-black pb-2 mb-3">
            <AlertTriangle className="w-8 h-8 text-red-600 animate-spin-retro" />
            <h3 className="text-xl font-black uppercase">RETRI INDOMARET AWARD</h3>
          </div>
          <div className="bg-yellow-300 p-3 border-2 border-black text-center mb-3">
            <span className="text-4xl font-black text-red-600 font-mono">99.8%</span>
            <p className="text-xs uppercase tracking-wider text-black font-extrabold mt-1">
              Persentase Retri Meleset
            </p>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            Telah mengamankan total 4.290 kelomang, 1.200 minion, dan 0 Lord selama turnamen berlangsung. Lord selalu berhasil disedot lawan dengan senyuman.
          </p>
          <div className="mt-3 bg-red-600 text-white font-black text-xs p-1 text-center border border-black">
            👑 RAJA KELOMANG SEJATI
          </div>
        </div>

        {/* Prestasi 3: Juara 1 Turnamen Pos Ronda */}
        <div className="bg-[#00FF66] text-black border-6 border-black p-5 transform -rotate-1 shadow-[8px_8px_0px_#0000FF]">
          <div className="flex items-center gap-2 border-b-4 border-black pb-2 mb-3">
            <Trophy className="w-8 h-8 text-[#FF00FF] animate-bounce" />
            <h3 className="text-xl font-black uppercase">JUARA 1 GORENGAN CUP</h3>
          </div>
          <div className="bg-purple-900 text-yellow-300 p-3 border-2 border-black text-center mb-3">
            <span className="text-3xl font-black">1 KANTONG</span>
            <p className="text-xs uppercase tracking-wider text-purple-200 font-bold mt-1">
              Bakwan & Tahu Isi Hangat
            </p>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            Memenangkan turnamen antar pos kamling RT 04 karena tim lawan tidak datang (ketiduran sehabis ronda malam). CSI Anomali menang walkover (WO) bersejarah!
          </p>
          <div className="mt-3 bg-purple-700 text-yellow-300 font-black text-xs p-1 text-center border border-black">
            ⭐ KEMENANGAN SATU-SATUNYA
          </div>
        </div>
      </div>

      {/* Tabel Klasemen "Road to MPL" */}
      <div className="bg-black text-[#00FF00] border-8 border-dashed border-[#FFFF00] p-4 sm:p-6 shadow-[12px_12px_0px_#FF0000]">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-[#00FF00] pb-3 mb-4 gap-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#FFFF00] font-mono flex items-center gap-2">
              <Flame className="w-7 h-7 text-red-500 animate-pulse" />
              KLASEMEN RESMI MPL (MOBILE LEGENDS PLENGER LEAGUE)
            </h3>
            <span className="text-xs text-red-400 font-mono">
              [Peringkat diperbarui secara otomatis setiap kali tim panik surrender]
            </span>
          </div>
          <span className="bg-red-600 text-white font-black text-xs px-3 py-1 border-2 border-white animate-blink">
            STATUS: ZONA DEGRADASI KE RANK WARRIOR
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#FFFF00] text-black border-2 border-black">
                <th className="p-2 border border-black">POS</th>
                <th className="p-2 border border-black">NAMA SQUAD</th>
                <th className="p-2 border border-black text-center">MATCH</th>
                <th className="p-2 border border-black text-center">MENANG</th>
                <th className="p-2 border border-black text-center">KALAH</th>
                <th className="p-2 border border-black text-center">RETRI MISS</th>
                <th className="p-2 border border-black text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-700">
              <tr className="bg-zinc-900 text-white hover:bg-zinc-800">
                <td className="p-2 font-bold text-yellow-400">1</td>
                <td className="p-2 font-bold">Bocil Warnet Netscape</td>
                <td className="p-2 text-center">15</td>
                <td className="p-2 text-center text-green-400">15</td>
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center text-green-400 font-bold">Lolos Upper Bracket</td>
              </tr>
              <tr className="bg-zinc-900 text-white hover:bg-zinc-800">
                <td className="p-2 font-bold text-yellow-400">2</td>
                <td className="p-2 font-bold">Ibu-Ibu PKK Senam Aerobik</td>
                <td className="p-2 text-center">15</td>
                <td className="p-2 text-center text-green-400">12</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-center">2</td>
                <td className="p-2 text-center text-blue-400">Upper Bracket</td>
              </tr>
              <tr className="bg-zinc-900 text-white hover:bg-zinc-800">
                <td className="p-2 font-bold text-yellow-400">3</td>
                <td className="p-2 font-bold">Komputer Bot Mode Mudah (AI)</td>
                <td className="p-2 text-center">15</td>
                <td className="p-2 text-center text-green-400">10</td>
                <td className="p-2 text-center">5</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center text-cyan-400">Playoffs</td>
              </tr>
              <tr className="bg-[#FF0000] text-yellow-300 font-black text-sm animate-pulse border-4 border-yellow-300">
                <td className="p-2 text-center">16</td>
                <td className="p-2 flex items-center gap-1">
                  <span>🤡 CSI ANOMALI (KITA SENDIRI)</span>
                </td>
                <td className="p-2 text-center">15</td>
                <td className="p-2 text-center text-white">0</td>
                <td className="p-2 text-center text-white">15</td>
                <td className="p-2 text-center">9,482</td>
                <td className="p-2 text-center bg-black text-red-500">
                  DEGRADASI KE RANK PEON
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
