"use client";

import React from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  FileWarning,
  TrendingDown,
  Database,
  ShieldAlert,
  Flame,
  Award,
} from "lucide-react";

export default function ClassificationArchive() {
  return (
    <section className="my-12 w-full space-y-8 font-mono">
      {/* Archive Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1a3826] pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-[#ff003c]" />
            <span className="text-xs tracking-widest text-[#ff003c] font-bold uppercase">
              LEAKED OPERATIONAL ARCHIVES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white glow-green mt-1">
            PROJECT PLENGER // MATCH INCIDENTS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Arsip rekaman kekalahan tragis dan posisi klasemen CSI Anomali di liga bawah tanah
          </p>
        </div>

        <div className="bg-[#ff003c]/10 border border-[#ff003c]/40 text-[#ff003c] text-xs px-3 py-1 font-bold">
          STATUS: ZONA DEGRADASI PERMANEN
        </div>
      </div>

      {/* Grid Match Incident Logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Incident 1 */}
        <div className="bg-[#070e13] border border-[#162f21] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2 mb-3">
              <span className="text-[#ff003c] font-bold">[INCIDENT LOG #01]</span>
              <span className="text-zinc-500">VS ONIC KW SUPER</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              SURRENDER INITIATIVE AT 02:45
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Jungler tewas di jungle sendiri akibat diserang monster buff ungu. 4 anggota squad langsung menekan tombol surrender tanpa musyawarah pos ronda.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500">Hasil: 0 - 2</span>
            <span className="text-red-400 font-bold">LOSS RECORDED</span>
          </div>
        </div>

        {/* Incident 2 */}
        <div className="bg-[#070e13] border border-[#162f21] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2 mb-3">
              <span className="text-amber-400 font-bold">[INCIDENT LOG #02]</span>
              <span className="text-zinc-500">VS BOT AI MODE MUDAH</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              DEFEATED BY SUPER MINIONS
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Semua anggota squad sibuk mengejar Franco bot ke base musuh. Minion lawan berhasil menghancurkan base utama tanpa perlawanan berarti.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500">Hasil: 1 - 2</span>
            <span className="text-amber-400 font-bold">COMEBACK KONYOL</span>
          </div>
        </div>

        {/* Incident 3 */}
        <div className="bg-[#070e13] border border-[#162f21] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2 mb-3">
              <span className="text-cyan-400 font-bold">[INCIDENT LOG #03]</span>
              <span className="text-zinc-500">VS BOCIL KARANG TARUNA</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              ALL MEMBERS GROUNDED
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Match dibatalkan di menit ke-4 karena ibu dari sang kapten mendatangi warnet sambil membawa sapu lidi untuk menyuruh mandi maghrib.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
            <span className="text-zinc-500">Hasil: WO (Walk Out)</span>
            <span className="text-cyan-400 font-bold">DOMESTIC INTERVENTION</span>
          </div>
        </div>
      </div>

      {/* Darknet Standings Table */}
      <div className="bg-[#05090c] border border-[#142d1f] p-4 sm:p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-[#142d1f] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              UNDERGROUND MPL (MOBILE LEGENDS PLENGER LEAGUE) STANDINGS
            </h3>
          </div>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">
            SEASON 99 // DATABASE_SYNC_OK
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#081218] text-zinc-400 border-b border-[#142d1f]">
                <th className="p-2.5">RANK</th>
                <th className="p-2.5">SYNDICATE / SQUAD</th>
                <th className="p-2.5 text-center">MATCH</th>
                <th className="p-2.5 text-center">W</th>
                <th className="p-2.5 text-center">L</th>
                <th className="p-2.5 text-center">PTS</th>
                <th className="p-2.5 text-right">TIER STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0f2218] text-zinc-300">
              <tr className="hover:bg-zinc-900/40">
                <td className="p-2.5 font-bold text-amber-400">#01</td>
                <td className="p-2.5 font-bold text-white">Bocil Warnet Netscape</td>
                <td className="p-2.5 text-center">15</td>
                <td className="p-2.5 text-center text-emerald-400">15</td>
                <td className="p-2.5 text-center">0</td>
                <td className="p-2.5 text-center font-bold text-emerald-400">+45</td>
                <td className="p-2.5 text-right text-emerald-400">UPPER BRACKET</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-2.5 font-bold text-amber-400">#02</td>
                <td className="p-2.5 font-bold text-white">Ibu-Ibu Senam Aerobik RT 02</td>
                <td className="p-2.5 text-center">15</td>
                <td className="p-2.5 text-center text-emerald-400">12</td>
                <td className="p-2.5 text-center">3</td>
                <td className="p-2.5 text-center font-bold text-emerald-400">+36</td>
                <td className="p-2.5 text-right text-cyan-400">QUALIFIED</td>
              </tr>
              <tr className="hover:bg-zinc-900/40">
                <td className="p-2.5 font-bold text-zinc-500">#03</td>
                <td className="p-2.5 font-bold text-white">Bot Komputer Mode Mudah (AI)</td>
                <td className="p-2.5 text-center">15</td>
                <td className="p-2.5 text-center text-emerald-400">9</td>
                <td className="p-2.5 text-center">6</td>
                <td className="p-2.5 text-center font-bold text-emerald-400">+27</td>
                <td className="p-2.5 text-right text-zinc-400">MID TABLE</td>
              </tr>
              <tr className="bg-[#ff003c]/10 text-white border-l-2 border-[#ff003c]">
                <td className="p-2.5 font-black text-[#ff003c]">#16</td>
                <td className="p-2.5 font-black text-[#ff003c] flex items-center gap-1.5">
                  <span>🧅 CSI ANOMALI (KITA SENDIRI)</span>
                </td>
                <td className="p-2.5 text-center">15</td>
                <td className="p-2.5 text-center">0</td>
                <td className="p-2.5 text-center text-red-400 font-bold">15</td>
                <td className="p-2.5 text-center font-black text-red-500">-45</td>
                <td className="p-2.5 text-right font-black text-[#ff003c] animate-pulse">
                  DEGRADASI KE PEON III
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
