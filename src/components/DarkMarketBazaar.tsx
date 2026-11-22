"use client";

import React, { useState } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  ShoppingBag,
  Coins,
  Lock,
  CheckCircle,
  AlertTriangle,
  Key,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface BlackMarketItem {
  id: string;
  title: string;
  type: string;
  priceCrypto: string;
  priceFiatApprox: string;
  rating: string;
  vendor: string;
  desc: string;
  icon: string;
}

const ITEMS: BlackMarketItem[] = [
  {
    id: "BM-001",
    title: "Bintang Mythic Curian (Untracked)",
    type: "ILLICIT ASSET",
    priceCrypto: "0.00042 BTC",
    priceFiatApprox: "≈ Rp 450.000",
    rating: "★★☆☆☆ (High Risk of Ban)",
    vendor: "AnonimBegalJam3Pagi",
    desc: "Bintang hasil gendong publik saat musuh 3 orang disconnect serentak. Dijual cepat sebelum di-rollback sistem.",
    icon: "⭐",
  },
  {
    id: "BM-002",
    title: "Script Fanny Anti Tembok (5 Detik Garansi)",
    type: "0-DAY EXPLOIT",
    priceCrypto: "0.00085 XMR",
    priceFiatApprox: "≈ Rp 220.000",
    rating: "★★★☆☆ (Experimental)",
    vendor: "KabelPutusSquad",
    desc: "Menghapus hitbox tebing selama 5 detik pertama agar kabel tidak meleset ke rumput kelomang.",
    icon: "⚡",
  },
  {
    id: "BM-003",
    title: "Armor HP Militer Anti-Banting Pos Ronda",
    type: "HARDWARE DEFENSE",
    priceCrypto: "0.00150 BTC",
    priceFiatApprox: "≈ Rp 1.500.000",
    rating: "★★★★★ (Battle Proven)",
    vendor: "TukangLasGangKancil",
    desc: "Pelindung baja ringan karbon komposit. Mampu menahan lemparan ke lantai semen saat lose streak 20x.",
    icon: "🛡️",
  },
  {
    id: "BM-004",
    title: "Buku Panduan PGP 1001 Alasan Kalah",
    type: "INTEL & PSYOP",
    priceCrypto: "0.00001 BTC",
    priceFiatApprox: "≈ Rp 10.000",
    rating: "★★★★★ (Must Have)",
    vendor: "KaptenPusingCSI",
    desc: "Template kilah instan: 'Layar kena minyak gorengan', 'Emak nyuruh beli beras', 'Indihome 999ms'.",
    icon: "📖",
  },
];

export default function DarkMarketBazaar() {
  const [selectedItem, setSelectedItem] = useState<BlackMarketItem | null>(null);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOpenOrder = (item: BlackMarketItem) => {
    cyberSounds.playKeyClick();
    setSelectedItem(item);
    setOrderSuccess(false);
  };

  const handleConfirmOrder = () => {
    cyberSounds.playSonarPing();
    setOrderProcessing(true);
    setTimeout(() => {
      setOrderProcessing(false);
      setOrderSuccess(true);
      cyberSounds.playDigitalRecall();
    }, 1800);
  };

  return (
    <section className="my-12 w-full">
      {/* Header Bazaar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#1a3826] pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400 animate-spin-retro" />
            <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">
              ONION V3 ESCROW // UNTRACEABLE MONERO PROTOCOL
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-mono font-black text-white glow-green mt-1">
            UNDERGROUND MLBB BLACK MARKET
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
            Bazaar terlarang penyedia script retri anti-kelomang, asuransi bintang, dan peralatan darurat
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#071016] border border-[#142d1f] px-3 py-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>ESCROW CONTRACT: 0x9F...420A</span>
        </div>
      </div>

      {/* Grid Item Bazaar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-[#070e13] border border-[#142c1e] hover:border-amber-400/60 p-4 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#112419] pb-2 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5">
                  {item.type}
                </span>
              </div>

              <h3 className="font-mono font-bold text-sm text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono line-clamp-2 mb-2 leading-relaxed">
                {item.desc}
              </p>

              <div className="text-[11px] font-mono text-zinc-500 space-y-0.5">
                <div>Vendor: <span className="text-zinc-300">~{item.vendor}</span></div>
                <div>Trust: <span className="text-emerald-400">{item.rating}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#112419]">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-mono font-black text-amber-400">
                  {item.priceCrypto}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {item.priceFiatApprox}
                </span>
              </div>

              <button
                onClick={() => handleOpenOrder(item)}
                className="w-full bg-[#0a1820] hover:bg-[#102430] border border-[#1e422c] hover:border-amber-400 text-zinc-200 font-mono text-xs py-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>ORDER VIA ESCROW</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Transaksi Escrow PGP */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#060c10] border border-[#1f452e] max-w-md w-full p-6 font-mono text-zinc-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative">
            <div className="flex items-center justify-between border-b border-[#142d1f] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase">
                  PGP ENCRYPTED ORDER HANDSHAKE
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-zinc-500 hover:text-white text-xs cursor-pointer"
              >
                [ESC]
              </button>
            </div>

            {!orderSuccess ? (
              <div className="space-y-3 text-xs">
                <div className="bg-[#0a141b] border border-[#163322] p-3 space-y-1">
                  <div className="text-zinc-400">ITEM: <span className="text-white font-bold">{selectedItem.title}</span></div>
                  <div className="text-zinc-400">ESCROW PRICE: <span className="text-amber-400 font-bold">{selectedItem.priceCrypto}</span></div>
                  <div className="text-zinc-400">VENDOR: <span className="text-cyan-400">~{selectedItem.vendor}</span></div>
                </div>

                <div className="text-[11px] text-zinc-400 bg-black/60 p-2.5 border border-zinc-800">
                  <span className="text-amber-400 font-bold block mb-1">
                    ⚠️ DISCLAIMER PENAFIAN DARKNET:
                  </span>
                  Barang yang dipesan tidak dijamin legal oleh Moonton. Jika akun Anda terkena sanksi derank ke Warrior, admin CSI Anomali akan membantu doa saja.
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 py-2 text-xs font-bold cursor-pointer"
                  >
                    BATALKAN
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={orderProcessing}
                    className="flex-1 bg-[#0f2d1e] hover:bg-[#17442d] border border-[#00ff66] text-[#00ff66] py-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {orderProcessing ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>GENERATING PGP KEY...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>KIRIM VIA ESCROW</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center py-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">ORDER PLACED TO DARKNET!</h4>
                <p className="text-xs text-zinc-400">
                  Paket &quot;{selectedItem.title}&quot; telah dikirim via kurir pos ronda terenkripsi. Estimasi tiba: saat Fanny squad ini bisa terbang lurus.
                </p>
                <div className="bg-black p-2 border border-emerald-900 text-[10px] text-emerald-400 text-left font-mono break-all">
                  PGP_SIGNATURE: 0xDEADBEEF420_RETRI_MISS_ANOMALI_AUTHENTICATED
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-[#163825] border border-[#00ff66] text-[#00ff66] py-2 text-xs font-bold cursor-pointer mt-2"
                >
                  TUTUP TERMINAL ESCROW
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
