"use client";

import React from "react";

export default function MarqueeBar() {
  return (
    <div className="w-full flex flex-col font-bold border-y-4 border-black text-sm md:text-base select-none">
      {/* Marquee Baris 1: Kuning Merah */}
      <div className="bg-[#FF0000] text-[#FFFF00] py-1.5 px-4 overflow-hidden whitespace-nowrap border-b-2 border-black">
        <div className="inline-block animate-[marquee-scroll_20s_linear_infinite] uppercase tracking-wider font-extrabold">
          🚨 BREAKING NEWS: CSI ANOMALI RESMI DEGRADASI DARI RANK MYTHIC KE MASTER V!! 🚨
          KAPTEN SQUAD TERTANGKAP KAMERA RETRI KELOMANG SAAT LORD DI-CONTEST 5 LAWAN!! 🚨
          FANNY TERBANG 1 KABEL LANGSUNG NYANGKUT DI TOWER MUSUH!! 🚨
          OPEN RECRUITMENT SQUAD: KHUSUS YANG LOSE STREAK MINIMAL 10 KALI BERTURUT-TURUT!! 🚨
        </div>
      </div>

      {/* Marquee Baris 2: Hijau Neon & Magenta (Reverse) */}
      <div className="bg-[#00FF00] text-[#FF00FF] py-1 px-4 overflow-hidden whitespace-nowrap border-b-2 border-black">
        <div className="inline-block animate-[marquee-reverse_22s_linear_infinite] uppercase font-black text-xs md:text-sm">
          🔥 ROAD TO MPL (MOBILE LEGENDS PLENGER LEAGUE) 2026 🔥 SPONSOR UTAMA: KOPI SACHET INDOMARET & GORENGAN MAK EROT 🔥
          LAYLA TANK FULL DEFENSE TERBUKTI MAMPU MEMBUAT MENTAL TEMEN SATU TIM RUNTUH 🔥
          JANGAN LUPA KLIK TOMBOL TAS-TAS-TAS UNTUK MENAIKKAN TEKANAN DARAH!! 🔥
        </div>
      </div>
    </div>
  );
}
