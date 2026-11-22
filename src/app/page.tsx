"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import TornDiscordCard from "@/components/TornDiscordCard";
import AnomalyCharacter from "@/components/AnomalyCharacter";
import AnomalyPredator from "@/components/AnomalyPredator";

export default function Home() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [anomalies, setAnomalies] = useState<{ id: number; variantIndex: number }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPredatorActive, setIsPredatorActive] = useState(false);
  const [devouringTarget, setDevouringTarget] = useState<{
    id: number;
    mouthX: number;
    mouthY: number;
  } | null>(null);
  const [activePart, setActivePart] = useState<"csi" | "anomali">("csi");
  const [boxStyle, setBoxStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const csiRef = useRef<HTMLSpanElement>(null);
  const anomaliRef = useRef<HTMLSpanElement>(null);

  // Link invite Discord resmi CSI Anomali
  const discordInviteUrl = "https://discord.gg/abqKgDxBY";

  // Muat status anomali dari localStorage agar tetap ada saat di-refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem("csi_anomalies");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnomalies(parsed.slice(0, 7));
        }
      }
    } catch {
      // Abaikan error parsing / storage
    }
    setIsLoaded(true);
  }, []);

  // Simpan perubahan anomali ke localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("csi_anomalies", JSON.stringify(anomalies));
    } catch {
      // Abaikan error storage
    }
  }, [anomalies, isLoaded]);

  // Animasi otomatis berpindah kiri (csi) dan kanan (anomali) terus gantian
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePart((prev) => (prev === "csi" ? "anomali" : "csi"));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Update posisi dan ukuran kotak yang menyorot kata tanpa mengubah jarak teks
  const updateBoxPosition = (part: "csi" | "anomali") => {
    const target = part === "csi" ? csiRef.current : anomaliRef.current;
    if (target) {
      const padX = 6;
      const padY = 4;
      setBoxStyle({
        left: target.offsetLeft - padX,
        width: target.offsetWidth + padX * 2,
        top: target.offsetTop - padY,
        height: target.offsetHeight + padY * 2,
      });
    }
  };

  useEffect(() => {
    updateBoxPosition(activePart);
    const timer = setTimeout(() => updateBoxPosition(activePart), 50);
    return () => clearTimeout(timer);
  }, [activePart]);

  useEffect(() => {
    const handleResize = () => updateBoxPosition(activePart);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activePart]);

  // Tangani tombol ESC untuk menutup video easter egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideoId(null);
      }
    };

    if (activeVideoId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoId]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* Title H1 Tanpa Border & Teks Rapet Kayak Biasanya */}
        <h1 className="select-none flex items-center justify-center py-2">
          <div
            ref={containerRef}
            className="relative inline-flex items-center text-4xl sm:text-5xl font-black tracking-tight"
          >
            {/* Kotak animasi yang berpindah kiri-kanan & berganti warna */}
            <div
              style={{
                transform: `translateX(${boxStyle.left}px)`,
                width: `${boxStyle.width}px`,
                height: `${boxStyle.height}px`,
                top: `${boxStyle.top}px`,
              }}
              className={`absolute left-0 rounded-xl transition-all duration-500 ease-in-out pointer-events-none shadow-sm ${
                activePart === "csi" ? "bg-zinc-900" : "bg-[#5865F2]"
              } ${boxStyle.width === 0 ? "opacity-0" : "opacity-100"}`}
            />

            {/* Bagian #csi (rapat tanpa padding pembatas) */}
            <span
              ref={csiRef}
              onClick={() => setActivePart("csi")}
              className={`relative z-10 transition-colors duration-500 cursor-pointer select-none ${
                activePart === "csi" ? "text-white" : "text-zinc-900 hover:text-black"
              }`}
            >
              <span className={activePart === "csi" ? "text-indigo-400" : "text-zinc-400"}>
                #
              </span>
              csi
            </span>

            {/* Bagian anomali (klik saat kotak aktif memunculkan hingga 7 anomali berbeda) */}
            <span
              ref={anomaliRef}
              onClick={() => {
                if (activePart === "anomali") {
                  setAnomalies((prev) => {
                    if (prev.length >= 7) return prev;
                    return [
                      ...prev,
                      {
                        id: Date.now() + Math.random(),
                        variantIndex: prev.length,
                      },
                    ];
                  });
                } else {
                  setActivePart("anomali");
                }
              }}
              className={`relative z-10 transition-colors duration-500 cursor-pointer select-none ${
                activePart === "anomali" ? "text-white" : "text-zinc-900 hover:text-black"
              }`}
            >
              anomali
            </span>
          </div>
        </h1>

        {/* Discord Card dengan Animasi Sobek Kartun Interaktif & Easter Egg Logo Klik 2x */}
        <TornDiscordCard
          discordInviteUrl={discordInviteUrl}
          onOpenVideo={() => setActiveVideoId("WxC7v3q9AQg")}
          onTriggerPredator={() => setIsPredatorActive(true)}
        />

        {/* Footer Note, Part of Code Squads Informatics & Tombol Easter Egg Simple */}
        <div className="flex flex-col items-center space-y-3 pt-1">
          <p className="text-xs text-zinc-400">
            Mobile Legends Squad Community
          </p>

          {/* Part of Code Squads Informatics */}
          <Link
            href="https://codesquad.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <span>Part of</span>
            <span className="font-semibold text-zinc-700 group-hover:text-zinc-900 underline decoration-zinc-300 underline-offset-4 group-hover:decoration-zinc-800 transition-colors">
              Code Squads Informatics
            </span>
            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Tombol Easter Egg Simple (tanpa ikon) */}
          <button
            onClick={() => setActiveVideoId("DDwMEp-ItOQ")}
            className="inline-flex items-center text-xs text-zinc-400 hover:text-zinc-600 bg-white hover:bg-zinc-100 border border-zinc-200/80 rounded-full px-3.5 py-1 transition-all shadow-xs cursor-pointer"
          >
            <span>Jangan diklik</span>
          </button>
        </div>
      </div>

      {/* Kumpulan Karakter Anomali 2D yang Berjalan Keliling Layar (Maksimal 7 Karakter Unik) */}
      {anomalies.map((a) => (
        <AnomalyCharacter
          key={a.id}
          id={a.id}
          variantIndex={a.variantIndex}
          devourTarget={
            devouringTarget && devouringTarget.id === a.id
              ? { mouthX: devouringTarget.mouthX, mouthY: devouringTarget.mouthY }
              : null
          }
        />
      ))}

      {/* Karakter Pemakan (Predator Anomali 2x Lebih Besar yang Memangsa Anomali) */}
      {isPredatorActive && (
        <AnomalyPredator
          anomalies={anomalies}
          onDevourStart={(id, mouthPos) =>
            setDevouringTarget({ id, mouthX: mouthPos.mouthX, mouthY: mouthPos.mouthY })
          }
          onDevourComplete={(id) => {
            setAnomalies((prev) => prev.filter((a) => a.id !== id));
            setDevouringTarget(null);
          }}
          onFinish={() => {
            setIsPredatorActive(false);
            setDevouringTarget(null);
          }}
        />
      )}

      {/* Fullscreen Video Easter Egg (Bersih & Loop Berulang) */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Tombol Tutup Bersih */}
          <button
            onClick={() => setActiveVideoId(null)}
            aria-label="Tutup video"
            className="absolute top-5 right-5 z-50 text-white/70 hover:text-white bg-black/60 hover:bg-black/90 backdrop-blur-md p-2.5 rounded-full transition-all cursor-pointer border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Iframe Full Layar Bersih & Loop Berulang */}
          <div className="w-full h-full">
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&loop=1&playlist=${activeVideoId}&rel=0`}
              title="CSI Anomali Easter Egg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}
