"use client";

import React, { useState, useEffect, useRef } from "react";
import { sounds } from "@/lib/soundEffects";

interface AnomalyPredatorProps {
  anomalies: { id: number; variantIndex: number }[];
  onDevourStart: (id: number, mouthPos: { mouthX: number; mouthY: number }) => void;
  onDevourComplete: (id: number) => void;
  onFinish: () => void;
}

type DevourStage = "none" | "inhale" | "chomp" | "chew" | "swallow";

export default function AnomalyPredator({
  anomalies,
  onDevourStart,
  onDevourComplete,
  onFinish,
}: AnomalyPredatorProps) {
  // Posisi monster Discord pemakan (ukuran ~144x144, 2x lebih besar dari anomali biasa)
  const [pos, setPos] = useState({ x: 200, y: 150 });
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = kanan, -1 = kiri
  const [state, setState] = useState<"hunting" | "devouring" | "satisfied" | "confused">("hunting");
  const [devourStage, setDevourStage] = useState<DevourStage>("none");
  const [mouthOpen, setMouthOpen] = useState(false);
  const [burstParticles, setBurstParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const posRef = useRef({ x: 200, y: 150 });
  const animFrameRef = useRef<number | null>(null);
  const isDevouringRef = useRef(false);
  const anomaliesRef = useRef(anomalies);
  anomaliesRef.current = anomalies;

  // Efek spawn saat pertama kali dipanggil dari klik 2x logo Discord
  useEffect(() => {
    if (typeof window !== "undefined") {
      const startX = window.innerWidth / 2 - 72;
      const startY = 150;
      setPos({ x: startX, y: startY });
      posRef.current = { x: startX, y: startY };

      sounds.playPredatorRoar();

      // Jika tidak ada anomali sama sekali, tampilkan animasi bingung lalu pergi
      if (anomaliesRef.current.length === 0) {
        setState("confused");
        const timer = setTimeout(() => {
          onFinish();
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Loop AI pemburu (60fps)
  useEffect(() => {
    let lastJawToggle = Date.now();

    const step = () => {
      // Jika sedang melahap, puas, atau bingung, jangan gerak mengejar
      if (isDevouringRef.current || state === "satisfied" || state === "confused") {
        animFrameRef.current = requestAnimationFrame(step);
        return;
      }

      const remaining = anomaliesRef.current;

      // Jika semua anomali sudah habis dilahap
      if (remaining.length === 0) {
        setState("satisfied");
        sounds.playBurp();
        setTimeout(() => {
          onFinish();
        }, 1500);
        return;
      }

      // Cari anomali terdekat berdasarkan koordinat elemen DOM
      const current = posRef.current;
      // Posisi pusat mulut monster: saat hadap kanan di x+88, saat hadap kiri di x+56
      const mouthX = direction === 1 ? current.x + 88 : current.x + 56;
      const mouthY = current.y + 70;

      let closestTarget: { id: number; x: number; y: number; dist: number } | null = null;

      for (const a of remaining) {
        const el = document.getElementById(`anomaly-${a.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;
          const dist = Math.hypot(targetX - mouthX, targetY - mouthY);

          if (!closestTarget || dist < closestTarget.dist) {
            closestTarget = { id: a.id, x: targetX, y: targetY, dist };
          }
        }
      }

      if (closestTarget) {
        const dx = closestTarget.x - mouthX;
        const dy = closestTarget.y - mouthY;
        const dist = closestTarget.dist;

        // Hadap ke arah mangsa
        if (Math.abs(dx) > 3) {
          setDirection(dx > 0 ? 1 : -1);
        }

        // Buka-tutup mulut lapar saat mengejar
        if (Date.now() - lastJawToggle > 240) {
          setMouthOpen((prev) => !prev);
          lastJawToggle = Date.now();
        }

        // Jika mulut monster sudah dekat dengan target (< 52px), mulai ANIMASI MELAHAP KARTUN
        if (dist < 52) {
          isDevouringRef.current = true;
          setState("devouring");

          // TAHAP 1: INHALE / BUKA MULUT LEBAR & LUNGE (Antisipasi Kartun)
          setDevourStage("inhale");
          setMouthOpen(true);

          // Monster melompat sedikit mendekat ke arah target
          const lungeX = current.x + dx * 0.45;
          const lungeY = current.y + dy * 0.45;
          posRef.current = { x: lungeX, y: lungeY };
          setPos({ x: lungeX, y: lungeY });

          const finalMouthX = direction === 1 ? lungeX + 88 : lungeX + 56;
          const finalMouthY = lungeY + 70;

          const targetId = closestTarget.id;
          // Panggil onDevourStart agar anomali tersedot lurus masuk ke dalam tenggorokan
          onDevourStart(targetId, { mouthX: finalMouthX, mouthY: finalMouthY });

          // TAHAP 2: CHOMP! Rahang membanting rapat dengan suara gigitan kartun (durasi 240ms)
          setTimeout(() => {
            setDevourStage("chomp");
            setMouthOpen(false);
            sounds.playChomp();

            // Remah-remah kartun bintang / partikel melesat dari sudut mulut
            const p = Array.from({ length: 6 }).map((_, i) => ({
              id: Date.now() + i,
              x: (Math.random() - 0.5) * 26,
              y: (Math.random() - 0.5) * 22,
              color: i % 2 === 0 ? "#5865F2" : "#F43F5E",
            }));
            setBurstParticles(p);
          }, 240);

          // TAHAP 3: CHEW / MENGUNYAH KARTUN (Pipi menggembung kiri-kanan)
          setTimeout(() => {
            setDevourStage("chew");
          }, 360);

          // TAHAP 4: SWALLOW / GULP! (Benjolan makanan turun ke perut, suara teguk)
          setTimeout(() => {
            setDevourStage("swallow");
            sounds.playGulp();
          }, 580);

          // TAHAP 5: SELESAI, Hapus anomali dan kembali memburu
          setTimeout(() => {
            onDevourComplete(targetId);
            setBurstParticles([]);
            setDevourStage("none");
            isDevouringRef.current = false;
            setState("hunting");
          }, 760);
        } else {
          // Gerak cepat memburu anomali (kecepatan 5.2px per frame)
          const speed = 5.2;
          const vx = (dx / dist) * speed;
          const vy = (dy / dist) * speed;

          const newX = current.x + vx;
          const newY = current.y + vy;

          posRef.current = { x: newX, y: newY };
          setPos({ x: newX, y: newY });
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [state, direction, onDevourStart, onDevourComplete, onFinish]);

  // Transformasi squash & stretch kartun berdasarkan stage melahap
  const getBodyScale = () => {
    switch (devourStage) {
      case "inhale":
        return "scale(0.95, 1.08)"; // Tarik napas / memanjang sebelum menggigit
      case "chomp":
        return "scale(1.22, 0.82)"; // Squash benturan rahang membanting
      case "chew":
        return "scale(1.12, 0.94)"; // Menggembung mengunyah
      case "swallow":
        return "scale(0.98, 1.05)"; // Menelan memanjang
      default:
        return "scale(1.0, 1.0)";
    }
  };

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: state === "satisfied" ? "transform 0.4s ease-out, opacity 0.4s ease-out" : "none",
      }}
      className={`fixed top-0 left-0 z-40 select-none pointer-events-none ${
        state === "satisfied" ? "scale-105 opacity-90" : ""
      }`}
    >
      <div
        style={{
          transform: `scaleX(${direction}) ${getBodyScale()}`,
          transition:
            devourStage === "chomp"
              ? "transform 0.1s cubic-bezier(0.18, 0.89, 0.32, 1.28)"
              : "transform 0.16s ease-in-out",
        }}
        className="relative flex flex-col items-center"
      >
        {/* Karakter Monster Discord 2D (Ukuran 2x Lipat: 144px x 144px) */}
        <div className="relative w-36 h-36 filter drop-shadow-2xl">
          <svg viewBox="-12 -24 152 144" className="w-full h-full overflow-visible">
            <defs>
              {/* Gradien Tubuh Monster Discord Blurple */}
              <linearGradient id="discordMonsterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7983F5" />
                <stop offset="45%" stopColor="#5865F2" />
                <stop offset="100%" stopColor="#3C45A5" />
              </linearGradient>

              {/* Gradien Bayangan Perut Bawah */}
              <linearGradient id="discordBellyShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5865F2" />
                <stop offset="100%" stopColor="#252B6E" />
              </linearGradient>

              {/* Gradien Rongga Dalam Mulut Melahap (Gelap Bersih Tanpa Garis) */}
              <radialGradient id="monsterMouthVoid" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#4A051A" />
                <stop offset="65%" stopColor="#22020B" />
                <stop offset="100%" stopColor="#0D0104" />
              </radialGradient>

              {/* Gradien Mata Monster Merah-Emas */}
              <linearGradient id="monsterEyeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#9F1239" />
              </linearGradient>

              {/* Gradien Tanduk Monster */}
              <linearGradient id="hornGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#3C45A5" />
                <stop offset="60%" stopColor="#1E2355" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Bayangan di Tanah */}
            <ellipse
              cx="64"
              cy="106"
              rx={devourStage === "chomp" ? "52" : "42"}
              ry={devourStage === "chomp" ? "12" : "10"}
              fill="rgba(0,0,0,0.35)"
              className="animate-pulse"
            />

            {/* Ekor Monster Demon di Belakang */}
            <g className="origin-left">
              <path
                d="M 12 70 Q -6 68 -12 50 Q -16 38 -6 32 Q 2 28 6 36"
                fill="none"
                stroke="#3C45A5"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <polygon points="-16,28 -4,34 -12,44" fill="#F43F5E" />
            </g>

            {/* Sayap Monster Kecil di Belakang */}
            <g
              style={{
                transformOrigin: "20px 30px",
                animation: state === "hunting" ? "flapWingLeft 0.25s infinite alternate ease-in-out" : "none",
              }}
            >
              <path
                d="M 18 36 Q -2 18 -8 4 Q 8 16 12 28 Q 18 20 22 34 Z"
                fill="#3C45A5"
                stroke="#2A327D"
                strokeWidth="1.5"
              />
            </g>
            <g
              style={{
                transformOrigin: "108px 30px",
                animation: state === "hunting" ? "flapWingRight 0.25s infinite alternate ease-in-out" : "none",
              }}
            >
              <path
                d="M 110 36 Q 130 18 136 4 Q 120 16 116 28 Q 110 20 106 34 Z"
                fill="#3C45A5"
                stroke="#2A327D"
                strokeWidth="1.5"
              />
            </g>

            {/* Kaki Kiri Monster (Animasi Berjalan Cepat) */}
            <g
              style={{
                transformOrigin: "36px 88px",
                animation: state === "hunting" ? "walkLegLeft 0.22s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="30" y="85" width="13" height="18" rx="6" fill="#3C45A5" />
              <ellipse cx="36" cy="101" rx="9" ry="5" fill="#2A327D" />
              <polygon points="41,101 46,102 41,104" fill="#FFFFFF" />
              <polygon points="36,102 40,105 34,105" fill="#FFFFFF" />
            </g>

            {/* Kaki Kanan Monster (Animasi Berjalan Cepat) */}
            <g
              style={{
                transformOrigin: "92px 88px",
                animation: state === "hunting" ? "walkLegRight 0.22s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="85" y="85" width="13" height="18" rx="6" fill="#3C45A5" />
              <ellipse cx="92" cy="101" rx="9" ry="5" fill="#2A327D" />
              <polygon points="97,101 102,102 97,104" fill="#FFFFFF" />
              <polygon points="92,102 96,105 90,105" fill="#FFFFFF" />
            </g>

            {/* Tanduk Monster Tajam di Atas Telinga Ikon Discord */}
            <path
              d="M 14 12 Q 2 -8 -2 -18 Q 14 -10 24 4 Z"
              fill="url(#hornGrad)"
              stroke="#2A327D"
              strokeWidth="1.5"
            />
            <path
              d="M 114 12 Q 126 -8 130 -18 Q 114 -10 104 4 Z"
              fill="url(#hornGrad)"
              stroke="#2A327D"
              strokeWidth="1.5"
            />

            {/* Duri Punggung Monster di Atas Kepala */}
            <polygon points="45,2 49,-7 53,4" fill="#2A327D" />
            <polygon points="60,6 64,-4 68,6" fill="#F43F5E" />
            <polygon points="75,4 79,-7 83,2" fill="#2A327D" />

            {/* TUBUH UTAMA: SILUET ASLI IKON DISCORD CLYDE */}
            <path
              d="M107.7,8.07 A105.15,105.15,0,0,0,81.47,0 a72.06,72.06,0,0,0-3.36,6.83 A97.68,97.68,0,0,0,49,6.83 A72.37,72.37,0,0,0,45.64,0 A105.89,105.89,0,0,0,19.39,8.09 C2.79,32.65-1.71,56.6.54,80.21 A105.73,105.73,0,0,0,32.71,96.36 a77.7,77.7,0,0,0,6.89-11.11 a68.42,68.42,0,0,1-10.85-5.18 c.91-.66,1.8-1.34,2.66-2 a75.57,75.57,0,0,0,64.32,0 c.87.71,1.76,1.39,2.66,2 a68.68,68.68,0,0,1-10.87,5.19 a77,77,0,0,0,6.89,11.1 A105.25,105.25,0,0,0,126.6,80.22 C129.24,52.84,122.09,29.11,107.7,8.07 Z"
              fill="url(#discordMonsterGrad)"
              stroke="#2A327D"
              strokeWidth="2.5"
            />

            {/* RONGGA MULUT & GIGI MONSTER (Bersih Tanpa Garis Luar) */}
            <g style={{ transformOrigin: "64px 68px" }}>
              {/* Rongga Dalam Mulut Terbuka Lebar saat Inhale / Melahap */}
              {(devourStage === "inhale" || (state === "hunting" && mouthOpen)) && (
                <g>
                  {/* Rongga Dalam Bersih Tanpa Stroke */}
                  <path
                    d={
                      devourStage === "inhale"
                        ? "M 32 64 Q 64 46 96 64 Q 100 94 64 94 Q 28 94 32 64 Z"
                        : "M 38 67 Q 64 58 90 67 Q 92 82 64 82 Q 36 82 38 67 Z"
                    }
                    fill="url(#monsterMouthVoid)"
                  />
                  {/* Lidah Kartun Merah di Dasar Mulut */}
                  <path
                    d={
                      devourStage === "inhale"
                        ? "M 48 88 Q 64 74 80 88 Z"
                        : "M 52 79 Q 64 70 76 79 Z"
                    }
                    fill="#E11D48"
                  />
                  {/* Taring Atas Putih Tajam Bersih */}
                  <g fill="#FFFFFF">
                    <polygon points="42,64 46,74 50,64" />
                    <polygon points="52,63 56,76 60,63" />
                    <polygon points="62,62 64,74 66,62" />
                    <polygon points="68,63 72,76 76,63" />
                    <polygon points="78,64 82,74 86,64" />
                  </g>
                  {/* Taring Bawah Putih Tajam Menghadap ke Atas */}
                  <g fill="#FFFFFF">
                    <polygon
                      points={
                        devourStage === "inhale"
                          ? "46,92 50,80 54,92"
                          : "48,81 52,73 56,81"
                      }
                    />
                    <polygon
                      points={
                        devourStage === "inhale"
                          ? "58,93 64,78 70,93"
                          : "60,82 64,72 68,82"
                      }
                    />
                    <polygon
                      points={
                        devourStage === "inhale"
                          ? "74,92 78,80 82,92"
                          : "72,81 76,73 80,81"
                      }
                    />
                  </g>
                </g>
              )}

              {/* Mulut Saat Mengunyah / Tertutup (Senyuman Monster Bertaring Tanpa Garis Ribet) */}
              {devourStage !== "inhale" && (!mouthOpen || state !== "hunting") && (
                <g>
                  {/* Celah Senyum Gelap Halus */}
                  <path
                    d={
                      devourStage === "chew"
                        ? "M 34 71 Q 64 76 94 71"
                        : "M 36 70 Q 64 74 92 70"
                    }
                    fill="none"
                    stroke="#1E1B4B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Taring Kartun Putih Menyembul dari Sela Bibir */}
                  <polygon points="46,69 50,77 54,69" fill="#FFFFFF" />
                  <polygon points="74,69 78,77 82,69" fill="#FFFFFF" />
                  <polygon points="60,73 64,66 68,73" fill="#FFFFFF" />
                </g>
              )}
            </g>

            {/* MATA MONSTER PADA LOKASI IKON DISCORD */}
            <g>
              {state === "confused" ? (
                // Mata Bingung
                <g>
                  <ellipse cx="42.45" cy="53" rx="10" ry="12" fill="#FFFFFF" />
                  <circle cx="42.45" cy="53" r="4.5" fill="#0F172A" />
                  <ellipse cx="84.69" cy="53" rx="8" ry="6" fill="#FFFFFF" />
                  <circle cx="84.69" cy="53" r="3.5" fill="#0F172A" />
                  <path d="M 60 22 Q 64 16 68 20 Q 68 24 64 27 L 64 29" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="64" cy="33" r="1.5" fill="#FDE047" />
                </g>
              ) : state === "satisfied" ? (
                // Mata Senang Kenyang (^ ^)
                <g>
                  <path d="M 34 54 Q 42.45 44 51 54" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 76 54 Q 84.69 44 93 54" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="32" cy="62" r="5" fill="#F43F5E" opacity="0.7" />
                  <circle cx="96" cy="62" r="5" fill="#F43F5E" opacity="0.7" />
                </g>
              ) : (
                // Mata Monster Lapar / Memburu
                <g>
                  {/* Soket Kiri */}
                  <ellipse
                    cx="42.45"
                    cy="53"
                    rx={devourStage === "inhale" ? "12.5" : "11.4"}
                    ry={devourStage === "inhale" ? "13.8" : "12.7"}
                    fill="#18181B"
                    stroke="#2A327D"
                    strokeWidth="1.5"
                  />
                  {/* Iris Menyala */}
                  <ellipse cx={direction === 1 ? "44" : "40"} cy="53" rx="8" ry="10" fill="url(#monsterEyeGlow)" />
                  {/* Pupil Slit */}
                  <ellipse cx={direction === 1 ? "45" : "39"} cy="53" rx="2.5" ry="8" fill="#000000" />
                  <circle cx={direction === 1 ? "46" : "40"} cy="48" r="2.5" fill="#FFFFFF" />

                  {/* Soket Kanan */}
                  <ellipse
                    cx="84.69"
                    cy="53"
                    rx={devourStage === "inhale" ? "12.5" : "11.4"}
                    ry={devourStage === "inhale" ? "13.8" : "12.7"}
                    fill="#18181B"
                    stroke="#2A327D"
                    strokeWidth="1.5"
                  />
                  {/* Iris Menyala */}
                  <ellipse cx={direction === 1 ? "86" : "82"} cy="53" rx="8" ry="10" fill="url(#monsterEyeGlow)" />
                  {/* Pupil Slit */}
                  <ellipse cx={direction === 1 ? "87" : "81"} cy="53" rx="2.5" ry="8" fill="#000000" />
                  <circle cx={direction === 1 ? "88" : "82"} cy="48" r="2.5" fill="#FFFFFF" />

                  {/* Alis Monster */}
                  <path d="M 31 43 L 53 47" stroke="#2A327D" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 96 43 L 74 47" stroke="#2A327D" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* Cakar Tangan Monster */}
            <g
              style={{
                transformOrigin: "80px 75px",
                animation: state === "hunting" ? "reachArm 0.3s infinite alternate ease-in-out" : "none",
              }}
            >
              <ellipse cx="94" cy="74" rx="8" ry="5" fill="#3C45A5" stroke="#2A327D" strokeWidth="1" />
              <polygon points="101,72 107,74 101,76" fill="#FFFFFF" />
              <polygon points="98,76 104,79 97,80" fill="#FFFFFF" />
            </g>
          </svg>

          {/* Partikel Percikan / Bintang Kartun Saat Mulut Mengatup (Chomp) */}
          {burstParticles.map((pt) => (
            <div
              key={pt.id}
              style={{
                transform: `translate3d(${pt.x + 88}px, ${pt.y + 70}px, 0)`,
                backgroundColor: pt.color,
              }}
              className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full animate-ping pointer-events-none"
            />
          ))}
        </div>
      </div>

      {/* Keyframe Animasi Tambahan */}
      <style jsx>{`
        @keyframes walkLegLeft {
          from {
            transform: rotate(-22deg);
          }
          to {
            transform: rotate(22deg);
          }
        }
        @keyframes walkLegRight {
          from {
            transform: rotate(22deg);
          }
          to {
            transform: rotate(-22deg);
          }
        }
        @keyframes flapWingLeft {
          from {
            transform: rotate(-15deg);
          }
          to {
            transform: rotate(18deg);
          }
        }
        @keyframes flapWingRight {
          from {
            transform: rotate(15deg);
          }
          to {
            transform: rotate(-18deg);
          }
        }
        @keyframes reachArm {
          from {
            transform: rotate(-8deg);
          }
          to {
            transform: rotate(12deg);
          }
        }
      `}</style>
    </div>
  );
}
