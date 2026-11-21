"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/soundEffects";
import { IdCard, CheckCircle, Copy, Sparkles, RefreshCw, AlertCircle } from "lucide-react";

export default function KartuBebanGenerator() {
  const [nickname, setNickname] = useState("PlayerPlenger69");
  const [role, setRole] = useState("Jungler Retri Kelomang");
  const [hero, setHero] = useState("Fanny (Kabel Nyangkut Tembok)");
  const [winrate, setWinrate] = useState("13.4%");
  const [alasan, setAlasan] = useState("Layar HP kena minyak gorengan bakwan");
  const [cardGenerated, setCardGenerated] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playVictoryFals();
    setCardGenerated(true);
  };

  const handleCopy = () => {
    const text = `🪪 KARTU TANDA BEBAN (KTB) CSI ANOMALI 🪪\nNama: ${nickname}\nRole: ${role}\nHero: ${hero}\nWinrate: ${winrate}\nAlasan Kalah: ${alasan}\nStatus: TERVERIFIKASI RESMI MASUK SQUAD ROAD TO MPL (PLENGER LEAGUE)!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sounds.playRecallSpam();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="my-10 w-full bg-[#00FF00] border-8 border-ridge border-[#FF0000] p-4 sm:p-8 shadow-[12px_12px_0px_#000000]">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight bg-[#FFFF00] inline-block px-4 py-2 border-4 border-black rotate-[-1deg] shadow-[5px_5px_0px_#FF00FF]">
          🪪 GENERATOR KARTU TANDA BEBAN (KTB) 🪪
        </h2>
        <p className="text-xs sm:text-sm font-bold text-red-700 mt-2 bg-white inline-block px-2 py-0.5 border-2 border-black">
          Cetak ID Card resmi Squad CSI Anomali secara gratis tanpa dipungut biaya iuran kas!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Input Norak */}
        <form
          onSubmit={handleGenerate}
          className="bg-[#FF00FF] border-6 border-black p-5 text-white space-y-4 shadow-[8px_8px_0px_#0000FF]"
        >
          <div className="bg-black text-[#00FF00] font-mono text-xs p-2 border-2 border-[#FFFF00]">
            ⚡ INPUT IDENTITAS KELAYAKAN MENJADI BEBAN:
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-black text-[#FFFF00] uppercase mb-1">
              Nickname MLBB Kamu:
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="w-full bg-white text-black font-bold p-2 border-4 border-black focus:outline-none focus:bg-yellow-200"
              placeholder="Contoh: LordBocilTidur"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-black text-[#FFFF00] uppercase mb-1">
              Role Favorit Pembawa Sial:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white text-black font-bold p-2 border-4 border-black focus:outline-none focus:bg-yellow-200"
            >
              <option value="Jungler Retri Kelomang">Jungler (Retri Melayang ke Minion)</option>
              <option value="Gold Lane Maju Paling Depan">Gold Lane (Maju Paling Depan Pas War)</option>
              <option value="Roamer Buta Map & Ngumpet">Roamer (Nggak Pernah Beli Item Roam)</option>
              <option value="Mid Lane Tukang Recall">Mid Lane (Spammer Tas-Tas-Tas Depan Tower)</option>
              <option value="EXP Lane Tukang Emosi">EXP Lane (Split Push Pas Base Rata)</option>
              <option value="Cadangan Pencari Alasan">Cadangan (Spam Chat All Surrender)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-black text-[#FFFF00] uppercase mb-1">
              Hero Andalan Paling Meresahkan:
            </label>
            <select
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              className="w-full bg-white text-black font-bold p-2 border-4 border-black focus:outline-none focus:bg-yellow-200"
            >
              <option value="Fanny (Kabel Nyangkut Tembok)">Fanny (Kabel Nyangkut di Tembok)</option>
              <option value="Layla (Build Tank 6 Sepatu)">Layla (Build Full Tank 6 Sepatu)</option>
              <option value="Miya (Spell Inspire + Buta Map)">Miya (Inspire + Mati Menit 1)</option>
              <option value="Nana (Molina Ditaruh di Fountain)">Nana (Molina di Fountain Sendiri)</option>
              <option value="Tigreal (Dorong Musuh ke Temen Low HP)">Tigreal (Dorong Lawan ke Kawan Sekarat)</option>
              <option value="Zilong (Freestyle Mati Kena Turret)">Zilong (Freestyle Mati Kena Tower)</option>
              <option value="Alucard (Solo Lord Pas Darah 10%)">Alucard (Solo Lord Pas Darah Merah)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-[#FFFF00] uppercase mb-1">
                Winrate Miring:
              </label>
              <input
                type="text"
                value={winrate}
                onChange={(e) => setWinrate(e.target.value)}
                className="w-full bg-white text-black font-bold p-2 border-4 border-black focus:outline-none"
                placeholder="12.5%"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#FFFF00] uppercase mb-1">
                Alasan Kalau Kalah:
              </label>
              <select
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                className="w-full bg-white text-black font-bold p-2 border-4 border-black focus:outline-none text-xs"
              >
                <option value="Layar HP kena minyak gorengan">Layar HP licin kena gorengan</option>
                <option value="Emak tiba-tiba nyuruh beli beras">Emak nyuruh beli beras</option>
                <option value="Jaringan Indihome tiba-tiba 999ms">Wifi 999ms merah merona</option>
                <option value="Hp panas kayak setrikaan arang">HP panas kayak wajan</option>
                <option value="Diserang kantuk stadium akhir">Ngantuk berat jam 2 siang</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFFF00] hover:bg-yellow-300 text-black font-black py-3 px-4 text-base uppercase border-4 border-black shadow-[5px_5px_0px_#000] cursor-pointer flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <Sparkles className="w-5 h-5 text-red-600 animate-spin" />
            PERBARUI KARTU TANDA BEBAN SAYA!
          </button>
        </form>

        {/* Hasil Kartu Tanda Beban (KTB) yang Super Norak */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-gradient-to-br from-[#FFFF00] via-[#FF00FF] to-[#00FFFF] border-8 border-black p-5 shadow-[14px_14px_0px_#000000] transform rotate-1 relative select-none">
            {/* Header KTB */}
            <div className="bg-black text-[#00FF00] border-4 border-[#FFFF00] p-2 text-center mb-3">
              <h3 className="text-xl sm:text-2xl font-black tracking-widest uppercase font-mono">
                REPUBLIK CSI ANOMALI
              </h3>
              <p className="text-[10px] text-yellow-300 font-mono tracking-tighter">
                KARTU TANDA BEBAN RESMI SQUAD MLBB (KTB-2026-69)
              </p>
            </div>

            {/* Konten KTB */}
            <div className="flex gap-4 items-center bg-white border-4 border-black p-3 relative overflow-hidden">
              {/* Foto Avatar Meme */}
              <div className="w-24 h-28 bg-[#00FF00] border-4 border-black flex flex-col items-center justify-center shrink-0 shadow-[4px_4px_0px_#000] relative">
                <span className="text-4xl animate-bounce">🤡</span>
                <span className="text-[8px] bg-red-600 text-white font-mono px-1 mt-1 font-bold">
                  PASS FOTO
                </span>
              </div>

              {/* Detail Info */}
              <div className="text-xs font-mono font-bold space-y-1 text-black flex-1 overflow-hidden">
                <div className="truncate">
                  <span className="text-red-600">NICK:</span>{" "}
                  <span className="text-black font-black uppercase text-sm">
                    {nickname || "Player Anonim"}
                  </span>
                </div>
                <div className="truncate">
                  <span className="text-blue-600">ROLE:</span>{" "}
                  <span className="text-zinc-900">{role}</span>
                </div>
                <div className="truncate">
                  <span className="text-purple-600">HERO:</span>{" "}
                  <span className="text-zinc-900">{hero}</span>
                </div>
                <div>
                  <span className="text-green-700">WINRATE:</span>{" "}
                  <span className="bg-red-500 text-yellow-200 px-1 border border-black">
                    {winrate}
                  </span>
                </div>
                <div className="text-[10px] text-zinc-700 italic border-t border-zinc-400 pt-1">
                  Kilah: &quot;{alasan}&quot;
                </div>
              </div>

              {/* Cap Stempel Merah */}
              <div className="absolute right-1 bottom-1 border-4 border-red-600 text-red-600 font-black text-[11px] p-1 transform -rotate-12 pointer-events-none opacity-80 uppercase tracking-tighter">
                TERVERIFIKASI
                <br />
                BEBAN KELAS 1
              </div>
            </div>

            {/* Barcode Palsu */}
            <div className="mt-3 bg-white border-2 border-black p-2 flex flex-col items-center">
              <div className="flex gap-0.5 sm:gap-1 h-6 w-full justify-center items-center overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full ${
                      i % 3 === 0
                        ? "w-1 bg-black"
                        : i % 2 === 0
                        ? "w-2 bg-black"
                        : "w-0.5 bg-black"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono font-black text-black tracking-widest mt-0.5">
                * 0 8 1 2 - B E B A N - C S I - A N O M A L I *
              </span>
            </div>
          </div>

          {/* Tombol Copy Salin Identitas */}
          <button
            onClick={handleCopy}
            className="mt-4 bg-black hover:bg-zinc-800 text-[#00FF00] font-black py-2 px-5 text-sm uppercase border-4 border-[#FFFF00] shadow-[5px_5px_0px_#FF0000] cursor-pointer flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5 text-[#00FF00]" />
                BERHASIL DISALIN KE CLIPBOARD!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                SALIN KARTU TANDA BEBAN (SHARE KE WA/DISCORD)
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
