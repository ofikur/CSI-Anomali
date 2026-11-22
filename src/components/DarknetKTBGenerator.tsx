"use client";

import React, { useState } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  ShieldAlert,
  Key,
  Copy,
  CheckCircle,
  Binary,
  Cpu,
  Fingerprint,
} from "lucide-react";

export default function DarknetKTBGenerator() {
  const [codename, setCodename] = useState("CYBER_BEBAN_09");
  const [role, setRole] = useState("Jungler // Retri Melayang");
  const [hero, setHero] = useState("Fanny (Kabel Tembok Collision)");
  const [winrate, setWinrate] = useState("12.4%");
  const [alasan, setAlasan] = useState("Koneksi Indihome melonjak 999ms");
  const [copied, setCopied] = useState(false);

  const pgpSignature = `-----BEGIN CSI ANOMALI OPERATIVE CLEARANCE-----
Version: Anomali-PGP v4.2 [Tor v3 Onion Router]
Codename: ${codename}
Designation: ${role}
Primary Asset: ${hero}
Winrate Integrity: ${winrate}
System Note: "${alasan}"
Clearance Tier: LEVEL 4 // CERTIFIED THREAT TO ALLIES
Fingerprint: 4F2A 999B 0420 BEBA N000 69DEAD
-----END CSI ANOMALI OPERATIVE CLEARANCE-----`;

  const handleCopy = () => {
    cyberSounds.playDigitalRecall();
    navigator.clipboard.writeText(pgpSignature);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    cyberSounds.playSonarPing();
  };

  return (
    <section className="my-12 w-full bg-[#04080b] border border-[#173824] p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#142d1f] pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
              IDENTITY FORGERY PROTOCOL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-black text-white glow-green mt-1">
            DARKNET OPERATIVE CLEARANCE FORGE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            Buat identitas agen rahasia CSI Anomali dan enkripsi kartu tanda beban Anda dengan PGP signature
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-black/60 border border-zinc-800 px-3 py-1.5">
          <Binary className="w-4 h-4 text-cyan-400" />
          <span>ALGORITHM: RSA-4096-PLENGER</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Input Hacker */}
        <form onSubmit={handleUpdate} className="bg-[#070e13] border border-[#142b1d] p-5 font-mono text-xs space-y-4">
          <div className="text-zinc-400 font-bold border-b border-[#13291c] pb-2 text-[11px] uppercase flex items-center justify-between">
            <span>[OPERATIVE METRICS INPUT]</span>
            <span className="text-emerald-400">STATUS: READY</span>
          </div>

          <div>
            <label className="block text-zinc-400 uppercase mb-1">
              Operative Codename / Nick MLBB:
            </label>
            <input
              type="text"
              value={codename}
              onChange={(e) => setCodename(e.target.value)}
              className="w-full bg-[#020507] border border-[#173623] text-emerald-400 p-2.5 focus:outline-none focus:border-emerald-400 font-bold"
              placeholder="e.g. CYBER_FEATHER_01"
            />
          </div>

          <div>
            <label className="block text-zinc-400 uppercase mb-1">
              Role Spesialisasi Kegagalan:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#020507] border border-[#173623] text-zinc-200 p-2.5 focus:outline-none focus:border-emerald-400"
            >
              <option value="Jungler // Retri Melayang">Jungler (Spesialis Retri Kelomang Saat Lord)</option>
              <option value="Gold Lane // Audio Terrorist">Gold Lane (Maju Depan + Bacot Tank Tura Tik)</option>
              <option value="Roamer // Physics Inverter">Roamer (Dorong Musuh ke Arah Teman Low HP)</option>
              <option value="Mid Lane // Recall Packet Flooder">Mid Lane (Spammer Tas-Tas Depan Tower Musuh)</option>
              <option value="EXP Lane // Blind Split Runner">EXP Lane (Split Push Pas Base Rata)</option>
              <option value="Handler // Packet Loss Victim">Cadangan (AFK Menit 3 Disuruh Beli Beras)</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 uppercase mb-1">
              Primary Weapon / Hero:
            </label>
            <select
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              className="w-full bg-[#020507] border border-[#173623] text-zinc-200 p-2.5 focus:outline-none focus:border-emerald-400"
            >
              <option value="Fanny (Kabel Tembok Collision)">Fanny (Kabel Slip Kena Gorengan)</option>
              <option value="Layla (6 Boots Tank Prototype)">Layla (Build Full Tank 6 Sepatu)</option>
              <option value="Miya (Inspire Suicide Protocol)">Miya (Spell Inspire + Buta Map Total)</option>
              <option value="Nana (Fountain Molina Defense)">Nana (Molina di Fountain Sendiri)</option>
              <option value="Tigreal (Inverse Ally Delivery)">Tigreal (Dorong Lawan Dekat Core)</option>
              <option value="Zilong (1 vs 1 Lord Delusion)">Zilong (Spam '1 vs 1 Dek' Lalu Tewas)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">Winrate Miring:</label>
              <input
                type="text"
                value={winrate}
                onChange={(e) => setWinrate(e.target.value)}
                className="w-full bg-[#020507] border border-[#173623] text-red-400 p-2 focus:outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase mb-1">Alasan Defeat:</label>
              <select
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                className="w-full bg-[#020507] border border-[#173623] text-zinc-300 p-2 focus:outline-none text-[11px]"
              >
                <option value="Koneksi Indihome melonjak 999ms">Indihome loncat 999ms</option>
                <option value="Layar HP licin kena minyak gorengan">Layar kena gorengan bakwan</option>
                <option value="Emak tiba-tiba nyuruh beli beras">Emak nyuruh beli beras</option>
                <option value="Suhu HP mencapai titik lebur">HP panas kayak setrikaan</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f2d1e] hover:bg-[#153f29] border border-[#00ff66] text-[#00ff66] py-2.5 font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            <span>RE-ENCRYPT OPERATIVE BADGE</span>
          </button>
        </form>

        {/* Holographic Cyber Clearance Card Output */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full bg-[#020507] border-2 border-[#193d28] p-5 shadow-[0_0_30px_rgba(0,255,102,0.1)] relative font-mono text-zinc-300">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-[#142d1f] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧅</span>
                <div>
                  <div className="text-[10px] text-zinc-500">CSI ANOMALI // DARKNET DIVISION</div>
                  <div className="text-sm font-bold text-white tracking-wider">OPERATIVE IDENTIFICATION CARD</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] bg-[#ff003c]/20 border border-[#ff003c]/50 text-[#ff003c] font-black px-1.5 py-0.5">
                  CLEARANCE L-4
                </span>
              </div>
            </div>

            {/* Photo & Specs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-[#060c10] border border-[#112419] p-3 mb-4">
              <div className="w-24 h-28 bg-[#020507] border border-emerald-500/40 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                <span className="text-4xl">🥷</span>
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
                <span className="text-[9px] text-emerald-400 mt-1 font-bold">VERIFIED</span>
              </div>

              <div className="space-y-1.5 text-xs flex-1 w-full overflow-hidden">
                <div>
                  <span className="text-zinc-500 text-[10px] block">CODENAME:</span>
                  <span className="font-bold text-white uppercase text-sm tracking-wide">{codename}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">ROLE:</span>
                  <span className="text-emerald-400 font-bold">{role}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-zinc-800">
                  <span className="text-zinc-400">Weapon: {hero}</span>
                  <span className="text-red-400 font-black">{winrate}</span>
                </div>
              </div>
            </div>

            {/* Simulated PGP ASCII Armor Box */}
            <div className="bg-[#020507] border border-zinc-800 p-2.5 text-[9px] text-emerald-400/90 font-mono overflow-x-auto leading-relaxed select-all">
              <div className="text-zinc-600">-----BEGIN PGP SIGNED MESSAGE-----</div>
              <div>Hash: SHA512_ANOMALI</div>
              <div className="text-zinc-400 py-1">
                FPRINT: 0xDEAD_420_B3B4N_PL3NG3R_R04D_T0_MPL
              </div>
              <div className="text-zinc-600">-----END PGP SIGNED MESSAGE-----</div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="mt-4 w-full bg-[#0a1820] hover:bg-[#122836] border border-[#1a3826] text-emerald-400 py-2.5 px-4 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>COPIED TO CLIPBOARD (READY TO LEAK)!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY PGP OPERATIVE SIGNATURE BLOCK</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
