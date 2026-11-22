"use client";

import React, { useState } from "react";
import { X, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import { sounds } from "@/lib/soundEffects";

interface UploadModalProps {
  onClose: () => void;
  onSuccess: (newVideo: any) => void;
}

export default function UploadModal({ onClose, onSuccess }: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [uploader, setUploader] = useState("CSI•LordRetriBocor");
  const [category, setCategory] = useState("Retri Indomaret");
  const [level, setLevel] = useState("HP Terbanting");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sounds.playVictoryFals();
    setIsSuccess(true);

    const newVid = {
      id: `vid-${Date.now()}`,
      title: title.trim().toUpperCase(),
      category: category,
      duration: "03:15",
      resolution: "1080p",
      views: "1.2K",
      rating: 99,
      uploadedTime: "Baru saja",
      uploader: uploader,
      uploaderRole: "Player Pelapor",
      avatar: "🤡",
      thumbnailColor: "from-blue-950 via-red-950 to-slate-900",
      heroIcon: "📹",
      description: `Laporan blunder match langsung dari saksi mata. Tingkat keparahan: ${level}.`,
      commentsCount: 1,
    };

    setTimeout(() => {
      onSuccess(newVid);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-[#0c182a] border border-[#233d63] rounded-lg w-full max-w-lg p-5 shadow-2xl relative select-none">
        <div className="flex items-center justify-between border-b border-[#1b2f4c] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base text-slate-100">
              Upload Klip Blunder Baru
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playErrorBonk();
              onClose();
            }}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-100">
              Blunder Berhasil Diunggah!
            </h4>
            <p className="text-xs text-slate-400">
              Video telah ditambahkan ke etalase utama CSI-TUBE untuk dinikmati bersama.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Judul Klip Blunder:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Franco Hook Creep Hutan Sampai Kalah War..."
                required
                className="w-full bg-[#070f1b] border border-[#1d3454] rounded p-2 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Pelaku Utama:
                </label>
                <select
                  value={uploader}
                  onChange={(e) => setUploader(e.target.value)}
                  className="w-full bg-[#070f1b] border border-[#1d3454] rounded p-2 text-slate-100 focus:outline-none"
                >
                  <option value="CSI•LordRetriBocor">CSI•LordRetri (Jungler)</option>
                  <option value="CSI•LaylaGarisKeras">CSI•Layla (Gold)</option>
                  <option value="CSI•TigrealAngin">CSI•Tigreal (Roam)</option>
                  <option value="CSI•NanaSemak">CSI•Nana (Mid)</option>
                  <option value="CSI•ZilongPasrah">CSI•Zilong (EXP)</option>
                  <option value="BocilWarnetAnonim">Bocil Warnet Netscape</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Kategori Blunder:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#070f1b] border border-[#1d3454] rounded p-2 text-slate-100 focus:outline-none"
                >
                  <option value="Retri Indomaret">Retri Indomaret</option>
                  <option value="Fanny Darat">Fanny Darat</option>
                  <option value="Layla Tank 6 Sepatu">Layla Tank 6 Sepatu</option>
                  <option value="Tigreal Dorong Temen">Tigreal Dorong Temen</option>
                  <option value="Nana Tas-Tas-Tas">Nana Tas-Tas-Tas</option>
                  <option value="Zilong Split Push">Zilong Split Push</option>
                  <option value="Surrender Menit 3">Surrender Menit 3</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Tingkat Keparahan Emosi:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#070f1b] border border-[#1d3454] rounded p-2 text-slate-100 focus:outline-none"
              >
                <option value="HP Terbanting ke Kasur">HP Terbanting ke Kasur (Ringan)</option>
                <option value="Layar Retak Seribu">Layar Retak Seribu (Sedang)</option>
                <option value="Modem Warnet Dicabut">Modem Warnet Dicabut (Kritis)</option>
                <option value="Bintang Menguap ke Rank Master">Bintang Menguap ke Rank Master (Fatal)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0066cc] hover:bg-[#0077ee] text-white font-bold py-2.5 rounded flex items-center justify-center gap-1.5 cursor-pointer shadow transition-colors"
              >
                <Upload className="w-4 h-4" />
                Publikasikan ke CSI-TUBE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
