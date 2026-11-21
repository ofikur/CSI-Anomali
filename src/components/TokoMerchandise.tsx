"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/soundEffects";
import { ShoppingBag, Flame, Star, Tag, Check } from "lucide-react";

interface Product {
  id: number;
  name: string;
  originalPrice: string;
  discountPrice: string;
  rating: string;
  desc: string;
  emoji: string;
  badge: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Kaos Distro 'Jangan Ajak Mabar Nanti Turun Rank'",
    originalPrice: "Rp 999.000",
    discountPrice: "Rp 1.500",
    rating: "⭐ 0.5/5.0",
    desc: "Bahan karung goni premium, menyerap keringat dingin saat 1 vs 5 di Lord.",
    emoji: "👕",
    badge: "TERLARIS DI POS RONDA",
  },
  {
    id: 2,
    name: "Minyak Angin Cap Kapten Pusing (Extra Panas)",
    originalPrice: "Rp 50.000",
    discountPrice: "Rp 3.000",
    rating: "⭐ 5.0/5.0",
    desc: "Dioleskan langsung ke jidat saat jungler mengunci Fanny padahal WR 11%.",
    emoji: "🧴",
    badge: "RESEP DUKUN MLBB",
  },
  {
    id: 3,
    name: "Casing HP Baja Ringan Anti Banting",
    originalPrice: "Rp 250.000",
    discountPrice: "Rp 15.000",
    rating: "⭐ 4.8/5.0",
    desc: "Tahan benturan tembok hingga 50x lemparan saat lose streak beruntun.",
    emoji: "🛡️",
    badge: "WAJIB PUNYA",
  },
  {
    id: 4,
    name: "Buku: 1001 Alasan Saat Kena First Blood",
    originalPrice: "Rp 100.000",
    discountPrice: "Rp 500",
    rating: "⭐ 1.2/5.0",
    desc: "Kumpulan kilah ampuh: 'Layar kena minyak gorengan', 'Lagi kedip', 'Lag 120ms'.",
    emoji: "📖",
    badge: "BEST SELLER WARNET",
  },
];

export default function TokoMerchandise() {
  const [boughtItem, setBoughtItem] = useState<string | null>(null);

  const handleBuy = (name: string) => {
    sounds.playRetriMiss();
    setBoughtItem(name);
    setTimeout(() => setBoughtItem(null), 3000);
  };

  return (
    <section className="my-10 w-full bg-[#FF6600] border-8 border-solid border-black p-4 sm:p-6 shadow-[10px_10px_0px_#00FF00]">
      {/* Header Toko */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-black pb-3 mb-6 gap-2">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#FFFF00] uppercase tracking-tight drop-shadow-[2px_2px_0px_#000000] flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-black animate-bounce" />
            OFFICIAL MERCHANDISE CSI ANOMALI
          </h2>
          <p className="text-xs sm:text-sm font-bold text-white bg-black inline-block px-2 py-0.5 mt-1 border border-yellow-300">
            🔥 Dapatkan perlengkapan anti-stress sebelum mabar dengan squad beban!
          </p>
        </div>
        <div className="bg-[#FFFF00] text-red-600 font-black text-xs px-3 py-1 border-2 border-black animate-pulse">
          ⚡ DISKON CUCI GUDANG 99.9% ⚡
        </div>
      </div>

      {boughtItem && (
        <div className="mb-4 bg-[#00FF00] text-black border-4 border-black p-3 font-black text-center text-xs sm:text-sm animate-bounce shadow-[4px_4px_0px_#000]">
          🛒 SELAMAT! Anda telah memesan: &quot;{boughtItem}&quot;! Barang akan dikirim oleh kurir kelomang dalam waktu 35 tahun kerja!
        </div>
      )}

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000000] flex flex-col justify-between transform hover:scale-102 transition-transform relative select-none"
          >
            <div className="absolute top-2 right-2 bg-red-600 text-yellow-300 font-mono font-black text-[9px] px-1.5 py-0.5 border border-black transform rotate-3">
              {p.badge}
            </div>

            <div>
              <div className="text-6xl text-center my-3 bg-yellow-100 border-2 border-dashed border-black p-3">
                {p.emoji}
              </div>
              <h3 className="font-black text-sm uppercase text-black leading-snug">
                {p.name}
              </h3>
              <p className="text-xs text-zinc-700 font-medium my-2 italic">
                {p.desc}
              </p>
            </div>

            <div className="border-t-2 border-zinc-300 pt-2 mt-2">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400 line-through font-mono">
                  {p.originalPrice}
                </span>
                <span className="text-red-600 font-black text-sm bg-yellow-200 px-1 border border-red-500">
                  {p.discountPrice}
                </span>
              </div>
              <button
                onClick={() => handleBuy(p.name)}
                className="w-full bg-[#00FF00] hover:bg-[#00DD00] text-black font-black text-xs py-2 uppercase border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer flex items-center justify-center gap-1 active:translate-x-0.5 active:translate-y-0.5"
              >
                <Tag className="w-4 h-4 text-red-600" />
                BELI SEKARANG (COD)
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
