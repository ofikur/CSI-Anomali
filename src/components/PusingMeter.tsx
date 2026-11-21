"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/soundEffects";
import { Activity, WifiOff, Smartphone, HeartPulse, Skull, AlertCircle } from "lucide-react";

export default function PusingMeter() {
  const [bantingHp, setBantingHp] = useState(19);
  const [tekananDarah, setTekananDarah] = useState(980);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleBantingHp = () => {
    sounds.playErrorBonk();
    setBantingHp((prev) => prev + 1);
    setTekananDarah((prev) => prev + 25);
  };

  const handleBahayaClick = () => {
    sounds.playErrorBonk();
    setShowErrorModal(true);
  };

  return (
    <section className="my-10 w-full bg-[#0000FF] border-8 border-dotted border-[#FFFF00] p-4 sm:p-6 text-white shadow-[12px_12px_0px_#FF0000]">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-white pb-3 mb-6 gap-3">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#FFFF00] tracking-tight uppercase drop-shadow-[2px_2px_0px_#000000] flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-red-500 animate-ping" />
            INDIKATOR KESEHATAN MENTAL SQUAD
          </h2>
          <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-1">
            Status real-time kondisi kejiwaan pemain CSI Anomali saat push rank malam hari
          </p>
        </div>

        {/* Tombol Bahaya Jangan Diklik */}
        <button
          onClick={handleBahayaClick}
          className="bg-[#FF0000] hover:bg-red-700 text-[#FFFF00] font-black text-xs sm:text-sm px-4 py-2 border-4 border-yellow-300 animate-jitter shadow-[4px_4px_0px_#000] cursor-pointer"
        >
          ⛔ JANGAN DIKLIK (BAHAYA!)
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#FFFF00] text-black border-4 border-black p-3 text-center transform -rotate-1">
          <Activity className="w-7 h-7 text-red-600 mx-auto animate-pulse" />
          <span className="text-xs uppercase font-extrabold block mt-1">Tekanan Darah:</span>
          <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
            {tekananDarah}/500
          </span>
          <span className="text-[10px] bg-red-600 text-white block px-1 mt-1 font-bold">
            KRITIS TAHAP 4
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#00FF00] text-black border-4 border-black p-3 text-center transform rotate-2">
          <WifiOff className="w-7 h-7 text-black mx-auto animate-bounce" />
          <span className="text-xs uppercase font-extrabold block mt-1">Ping Jaringan:</span>
          <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
            999ms
          </span>
          <span className="text-[10px] bg-black text-yellow-300 block px-1 mt-1 font-bold">
            KONEKSI WARNET LELET
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#FF00FF] text-white border-4 border-black p-3 text-center transform -rotate-2">
          <Smartphone className="w-7 h-7 text-yellow-300 mx-auto animate-spin-retro" />
          <span className="text-xs uppercase font-extrabold block mt-1">HP Terbanting:</span>
          <span className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">
            {bantingHp} Unit
          </span>
          <button
            onClick={handleBantingHp}
            className="text-[10px] bg-black hover:bg-zinc-800 text-[#00FF00] block w-full px-1 mt-1 font-bold border border-white cursor-pointer"
          >
            +1 BANTING LAGI!
          </button>
        </div>

        {/* Metric 4 */}
        <div className="bg-white text-black border-4 border-black p-3 text-center transform rotate-1">
          <Skull className="w-7 h-7 text-purple-700 mx-auto animate-bounce" />
          <span className="text-xs uppercase font-extrabold block mt-1">Bintang Menguap:</span>
          <span className="text-2xl sm:text-3xl font-black text-purple-700 font-mono">
            -184 ⭐
          </span>
          <span className="text-[10px] bg-yellow-300 text-black block px-1 mt-1 font-bold border border-black">
            OTW RANK WARRIOR
          </span>
        </div>
      </div>

      {/* Modal Error Windows 98 / XP Kocak */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#C0C0C0] border-4 border-t-white border-l-white border-r-[#808080] border-b-[#808080] w-full max-w-md p-1 shadow-2xl text-black select-none">
            {/* Header Windows */}
            <div className="bg-[#000080] text-white font-bold text-sm px-2 py-1 flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono">
                <AlertCircle className="w-4 h-4 text-yellow-300" />
                FATAL_ERROR_SQUAD_IQ_TOO_LOW.EXE
              </span>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-[#C0C0C0] text-black font-black px-1.5 border border-t-white border-l-white border-r-black border-b-black text-xs cursor-pointer hover:bg-red-600 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Isi Pesan Error */}
            <div className="p-4 flex gap-3 items-start">
              <span className="text-4xl">🛑</span>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="font-extrabold text-red-600">
                  PERINGATAN SISTEM: KEBODOHAN TINGKAT TINGGI TERDETEKSI!
                </p>
                <p>
                  Sudah dibilang <strong>&quot;JANGAN DIKLIK&quot;</strong>, masih saja diklik!
                  Sama persis seperti saat disuruh mundur pas war tapi malah maju ke turret lawan!
                </p>
                <div className="bg-white p-2 border border-black font-mono text-[11px] text-zinc-800">
                  ErrorCode: 0xDEAD_JUNGLER_NO_RETRI
                  <br />
                  Saran: Tutup game sekarang dan bantuin emak cuci piring.
                </div>
              </div>
            </div>

            {/* Tombol Dialog Windows */}
            <div className="p-2 bg-[#C0C0C0] border-t border-white flex justify-end gap-2">
              <button
                onClick={() => {
                  sounds.playRetriMiss();
                  setShowErrorModal(false);
                }}
                className="px-4 py-1 bg-[#C0C0C0] text-black font-bold text-xs border-2 border-t-white border-l-white border-r-black border-b-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white cursor-pointer"
              >
                Saya Mengaku Salah
              </button>
              <button
                onClick={() => {
                  sounds.playRecallSpam();
                  setShowErrorModal(false);
                }}
                className="px-4 py-1 bg-[#000080] text-white font-bold text-xs border-2 border-t-white border-l-white border-r-black border-b-black cursor-pointer"
              >
                Lanjut Main (Beban Lagi)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
