"use client";

import React from "react";
import { sounds } from "@/lib/soundEffects";
import { Skull, Zap, EyeOff, ShieldAlert, Award, AlertOctagon } from "lucide-react";

interface Member {
  name: string;
  role: string;
  hero: string;
  wr: string;
  kda: string;
  specialty: string;
  quote: string;
  badge: string;
  borderStyle: string;
  bgColor: string;
  textColor: string;
  rotateClass: string;
  avatarEmoji: string;
  soundType: "recall" | "retri" | "danger" | "defeat" | "error";
}

const MEMBERS: Member[] = [
  {
    name: "CSI•LordRetriBocor",
    role: "KAPTEN & JUNGLER BEBAN",
    hero: "Fanny (1,450 Match) / Ling Darat",
    wr: "11.2% (Menang kalau musuh AFK 3)",
    kda: "0 / 14 / 2",
    specialty: "Retri Kelomang saat Lord di-contest 5 musuh, kabel nyangkut di base.",
    quote: '"Kabel gue gak licin gara-gara jari gue abis makan tahu isi gorengan warnet!"',
    badge: "BRONZE 3.0 PERMANEN",
    borderStyle: "border-8 border-dashed border-[#FF00FF]",
    bgColor: "bg-[#00FF00]",
    textColor: "text-black",
    rotateClass: "rotate-[-2deg]",
    avatarEmoji: "🤡",
    soundType: "retri",
  },
  {
    name: "CSI•LaylaGarisKeras",
    role: "GOLD LANE (PALING BANYAK BACOT)",
    hero: "Layla / Miya (Spell Inspire Wajib)",
    wr: "23.4% (Pernah Savage di Mode Practice)",
    kda: "1 / 18 / 0 (1 kill itu nyampah ulti)",
    specialty: "Maju paling depan pas war, mati menit 01:05, spam chat 'TANK TURA TIK'.",
    quote: '"Ngapain gue jaga jarak? Kan jarak memisahkan cinta kita!"',
    badge: "MEDALI COKELAT BUSUK",
    borderStyle: "border-8 border-ridge border-[#0000FF]",
    bgColor: "bg-[#FF00FF]",
    textColor: "text-[#FFFF00]",
    rotateClass: "rotate-[3deg]",
    avatarEmoji: "🏹",
    soundType: "danger",
  },
  {
    name: "CSI•TigrealAngin",
    role: "ROAMER / TUKANG DORONG LAWAN",
    hero: "Tigreal / Franco (Hook Angin)",
    wr: "18.9% (Beli sepatu roamer menit 14)",
    kda: "0 / 21 / 4",
    specialty: "Dorong musuh yang lagi ulti ke arah rekan setim yang darah sekarat.",
    quote: '"Gue udah bantuin dorong musuhnya mendekat, kok lu malah mati sih goblok?!"',
    badge: "BEBAN NASIONAL",
    borderStyle: "border-8 border-dotted border-[#FF0000]",
    bgColor: "bg-[#00FFFF]",
    textColor: "text-black",
    rotateClass: "rotate-[-1deg]",
    avatarEmoji: "🛡️",
    soundType: "error",
  },
  {
    name: "CSI•NanaSemak",
    role: "MID LANE (TEROR REKAN SENDIRI)",
    hero: "Nana / Eudora Camping 15 Menit",
    wr: "31.0% (KDA selalu aman karena lari)",
    kda: "2 / 0 / 1 (AFK di fountain abis pasif)",
    specialty: "Spam recall tas-tas-tas depan tower musuh lalu kena hook Franco.",
    quote: '"Yang penting KDA gue gak minus, tower hancur bukan urusan gue dek!"',
    badge: "RECALL TAS-TAS MASTER",
    borderStyle: "border-8 border-double border-[#00FF00]",
    bgColor: "bg-[#FFFF00]",
    textColor: "text-[#FF0000]",
    rotateClass: "rotate-[2deg]",
    avatarEmoji: "🐱",
    soundType: "recall",
  },
  {
    name: "CSI•ZilongPasrah",
    role: "EXP LANE / DUEL BUY 1 DAPAT 0",
    hero: "Zilong / Chou (Freestyle Mati Konyol)",
    wr: "15.6% (Split push pas base rata)",
    kda: "3 / 17 / 1",
    specialty: "Spam emote 'Heroes Never Fade' sebelum ditampol 4 orang di semak.",
    quote: '"1 vs 1 Dek di Lord kalau punya nyali! Jangan keroyokan kayak tawuran!"',
    badge: "SPESIALIS TURRET (TAPI GAGAL)",
    borderStyle: "border-8 border-solid border-[#FFFF00]",
    bgColor: "bg-[#FF3300]",
    textColor: "text-white",
    rotateClass: "rotate-[-3deg]",
    avatarEmoji: "🗡️",
    soundType: "defeat",
  },
  {
    name: "CSI•CadanganMental",
    role: "MENTAL COACH & IURAN WARNET",
    hero: "Balmond Roam / Alucard Solo Lord",
    wr: "9.8% (Pernah menang karena musuh DC)",
    kda: "0 / 9 / 0 (Disconnect Menit 3)",
    specialty: "Ngetik 'ALL REPORT JUNGLER' di chat all, kuota habis di menit ke-5.",
    quote: '"Koneksi Indihome gue tiba-tiba 999ms gara-gara emak nyalain YouTube Smart TV!"',
    badge: "SPONSOR KUOTA HABIS",
    borderStyle: "border-8 border-dashed border-[#000000]",
    bgColor: "bg-[#FF66CC]",
    textColor: "text-black",
    rotateClass: "rotate-[1deg]",
    avatarEmoji: "📱",
    soundType: "error",
  },
];

export default function RosterSection() {
  const handleCardClick = (soundType: Member["soundType"]) => {
    if (soundType === "recall") sounds.playRecallSpam();
    else if (soundType === "retri") sounds.playRetriMiss();
    else if (soundType === "danger") sounds.playDangerPing();
    else if (soundType === "defeat") sounds.playDefeat();
    else sounds.playErrorBonk();
  };

  return (
    <section className="my-10 w-full">
      {/* Header Roster yang norak dan gonjreng */}
      <div className="bg-[#FF0000] border-8 border-black p-4 text-center transform -rotate-1 shadow-[10px_10px_0px_#00FF00] mb-8">
        <h2 className="text-3xl sm:text-5xl font-black text-[#FFFF00] tracking-tighter uppercase drop-shadow-[4px_4px_0px_#000000]">
          👥 ROSTER SQUAD CSI ANOMALI 👥
        </h2>
        <p className="text-base sm:text-xl font-extrabold text-white bg-black inline-block px-4 py-1 mt-2 border-2 border-yellow-300">
          🔥 KUMPULAN BEBAN BERBAKAT MENUJU MPL (MOBILE LEGENDS PLENGER LEAGUE) 🔥
        </p>
        <div className="text-xs sm:text-sm font-bold text-yellow-200 mt-2 animate-pulse">
          👉 Klik kartu pemain untuk mendengar suara penderitaan mereka!
        </div>
      </div>

      {/* Grid Kartu Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEMBERS.map((m, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(m.soundType)}
            className={`${m.bgColor} ${m.textColor} ${m.borderStyle} ${m.rotateClass} p-5 shadow-[10px_10px_0px_#000000] transition-all hover:scale-105 hover:rotate-0 hover:z-20 cursor-pointer flex flex-col justify-between relative select-none`}
          >
            {/* Badge Sudut Konyol */}
            <div className="absolute -top-4 -right-3 bg-red-600 text-yellow-300 border-2 border-black font-black text-[11px] px-2 py-0.5 transform rotate-6 shadow-md uppercase">
              {m.badge}
            </div>

            <div>
              {/* Avatar & Header Card */}
              <div className="flex items-center gap-3 border-b-4 border-black pb-3 mb-3">
                <span className="text-5xl bg-white border-4 border-black p-2 rounded-full shadow-[3px_3px_0px_#000] animate-bounce">
                  {m.avatarEmoji}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase font-mono">
                    {m.name}
                  </h3>
                  <span className="bg-black text-[#00FF00] font-black text-xs px-2 py-0.5 inline-block border border-white mt-1">
                    {m.role}
                  </span>
                </div>
              </div>

              {/* Data Statistik Aneh */}
              <div className="space-y-2 text-xs sm:text-sm font-bold bg-white/80 text-black p-3 border-2 border-black shadow-inner">
                <div className="flex justify-between border-b border-zinc-400 pb-1">
                  <span className="text-red-700">⚔️ Hero Andalan:</span>
                  <span className="font-extrabold text-right">{m.hero}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-400 pb-1">
                  <span className="text-blue-700">📉 Winrate Miring:</span>
                  <span className="font-extrabold text-red-600 bg-yellow-200 px-1 border border-red-500">
                    {m.wr}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-400 pb-1">
                  <span className="text-purple-700">💀 Rata-rata KDA:</span>
                  <span className="font-mono font-black text-black">{m.kda}</span>
                </div>
                <div className="pt-1">
                  <span className="text-black font-black block">🤡 Keahlian Khusus:</span>
                  <p className="text-xs italic text-zinc-900 mt-0.5">{m.specialty}</p>
                </div>
              </div>
            </div>

            {/* Kutipan Bijak Penuh Penyesalan */}
            <div className="mt-4 pt-3 border-t-4 border-black bg-black text-[#FFFF00] p-2 text-xs font-mono">
              <span className="text-red-400 font-bold block">💬 KATA-KATA HARI INI:</span>
              <p className="italic">{m.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
