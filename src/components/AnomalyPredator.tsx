"use client";

import React, { useState, useEffect, useRef } from "react";
import { sounds } from "@/lib/soundEffects";

interface AnomalyPredatorProps {
  anomalies: { id: number; variantIndex: number }[];
  onDevourStart: (id: number, mouthPos: { mouthX: number; mouthY: number }) => void;
  onDevourComplete: (id: number) => void;
  onFinish: () => void;
}

export default function AnomalyPredator({
  anomalies,
  onDevourStart,
  onDevourComplete,
  onFinish,
}: AnomalyPredatorProps) {
  // Posisi predator (ukuran 128x144, 2x lebih besar dari anomali biasa)
  const [pos, setPos] = useState({ x: 200, y: 150 });
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = kanan, -1 = kiri
  const [state, setState] = useState<"hunting" | "devouring" | "satisfied" | "confused">("hunting");
  const [jawOpen, setJawOpen] = useState(false);
  const [isChewing, setIsChewing] = useState(false);
  const [burstParticles, setBurstParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const posRef = useRef({ x: 200, y: 150 });
  const animFrameRef = useRef<number | null>(null);
  const isDevouringRef = useRef(false);
  const anomaliesRef = useRef(anomalies);
  anomaliesRef.current = anomalies;

  // Efek spawn saat pertama kali muncul
  useEffect(() => {
    if (typeof window !== "undefined") {
      const startX = window.innerWidth / 2 - 64;
      const startY = 160;
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
      // Posisi mulut predator: saat hadap kanan di x+95, saat hadap kiri di x+33
      const mouthX = direction === 1 ? current.x + 95 : current.x + 33;
      const mouthY = current.y + 76;

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

        // Mulut buka-tutup lapar saat mengejar
        if (Date.now() - lastJawToggle > 200) {
          setJawOpen((prev) => !prev);
          lastJawToggle = Date.now();
        }

        // Jika mulut predator sudah sangat dekat dengan target (< 54px), mulai ANIMASI MELAHAP
        if (dist < 54) {
          isDevouringRef.current = true;
          setState("devouring");
          setJawOpen(true); // Buka mulut lebar-lebar untuk melahap

          // Sedikit lunge mendekat ke titik mangsa
          const lungeX = current.x + dx * 0.4;
          const lungeY = current.y + dy * 0.4;
          posRef.current = { x: lungeX, y: lungeY };
          setPos({ x: lungeX, y: lungeY });

          const finalMouthX = direction === 1 ? lungeX + 95 : lungeX + 33;
          const finalMouthY = lungeY + 76;

          const targetId = closestTarget.id;
          // Panggil onDevourStart agar anomali disedot MASUK KE DALAM MULUT
          onDevourStart(targetId, { mouthX: finalMouthX, mouthY: finalMouthY });

          // TAHAP 1: Anomali tersedot masuk ke dalam tenggorokan (durasi 260ms)
          setTimeout(() => {
            // TAHAP 2: RAHANG MENUTUP RAPAT (CHOMP!), mengunyah, dan menelan (GULP!)
            setJawOpen(false);
            setIsChewing(true);
            sounds.playChomp();
            sounds.playGulp();

            // Partikel remah-remah kartun kecil yang keluar dari sudut mulut saat mengunyah
            const p = Array.from({ length: 4 }).map((_, i) => ({
              id: Date.now() + i,
              x: (Math.random() - 0.5) * 20,
              y: (Math.random() - 0.5) * 20,
              color: i % 2 === 0 ? "#5865F2" : "#F43F5E",
            }));
            setBurstParticles(p);
          }, 260);

          // TAHAP 3: Selesai menelan, hapus anomali dari memori dan kembali memburu
          setTimeout(() => {
            onDevourComplete(targetId);
            setBurstParticles([]);
            setIsChewing(false);
            isDevouringRef.current = false;
            setState("hunting");
          }, 480);
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

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: state === "satisfied" ? "transform 0.4s ease-out, opacity 0.4s ease-out" : "none",
      }}
      className={`fixed top-0 left-0 z-50 select-none pointer-events-none ${
        state === "satisfied" ? "scale-105 opacity-90" : ""
      }`}
    >
      <div
        style={{
          transform: `scaleX(${direction}) scale(${isChewing ? "1.12, 0.92" : "1.0, 1.0"})`,
          transition: isChewing ? "transform 0.12s ease-in-out" : "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        className="relative flex flex-col items-center"
      >
        {/* Karakter Predator 2D (Ukuran 2x Lipat: 128px x 144px) */}
        <div className="relative w-32 h-36 filter drop-shadow-xl">
          <svg viewBox="0 0 128 144" className="w-full h-full overflow-visible">
            <defs>
              {/* Gradien Void Tubuh Predator */}
              <linearGradient id="predatorBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="60%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Gradien Rongga Dalam Mulut Melahap */}
              <radialGradient id="mouthVoid" cx="45%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="50%" stopColor="#4C0519" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>

              {/* Gradien Mata Bersinar */}
              <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
            </defs>

            {/* Bayangan Raksasa di Tanah */}
            <ellipse
              cx="64"
              cy="138"
              rx={state === "devouring" ? "44" : "36"}
              ry="10"
              fill="rgba(0,0,0,0.35)"
              className="animate-pulse"
            />

            {/* Efek Garis Hisap Menarik Masuk ke Mulut (Suction Inward Lines) */}
            {state === "devouring" && (
              <g opacity="0.8">
                <path
                  d="M 124 55 Q 106 68 88 74"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
                <path
                  d="M 128 76 Q 108 76 88 76"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />
                <path
                  d="M 124 97 Q 106 84 88 78"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </g>
            )}

            {/* Duri Punggung Predator (Dorsal Spikes) */}
            <g fill="#A855F7">
              <polygon points="32,24 16,14 30,36" />
              <polygon points="24,46 8,38 22,58" />
              <polygon points="18,68 4,64 18,80" />
            </g>

            {/* Kaki Kiri Belakang (Animasi Langkah Cepat) */}
            <g
              style={{
                transformOrigin: "46px 105px",
                animation: state === "hunting" ? "walkLegLeft 0.22s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="42" y="102" width="14" height="24" rx="7" fill="#0F172A" />
              <ellipse cx="48" cy="126" rx="10" ry="6" fill="#020617" />
              {/* Cakar */}
              <polygon points="56,126 62,128 56,130" fill="#E2E8F0" />
            </g>

            {/* Tubuh Utama Predator (Bentuk Oval Raksasa Bertekstur) */}
            <path
              d="M 40 28 C 75 14, 115 28, 116 72 C 117 110, 80 124, 48 116 C 26 110, 20 85, 24 55 C 26 38, 32 30, 40 28 Z"
              fill="url(#predatorBody)"
              stroke="#6366F1"
              strokeWidth="3"
            />

            {/* RONGGA MULUT & GIGI (Artikulasi Rahang Melahap) */}
            <g style={{ transformOrigin: "60px 76px" }}>
              {/* Rongga Dalam Mulut saat Terbuka Lebar */}
              {(jawOpen || state === "devouring") && (
                <path
                  d="M 64 54 Q 124 38 116 76 Q 124 114 64 98 Z"
                  fill="url(#mouthVoid)"
                  stroke="#BE123C"
                  strokeWidth="2.5"
                />
              )}

              {/* Gigi / Taring Atas */}
              <g
                fill="#FFFFFF"
                style={{
                  transform: jawOpen ? "translateY(-4px)" : "none",
                  transition: "transform 0.1s",
                }}
              >
                <polygon points="72,56 76,70 80,56" />
                <polygon points="82,56 87,74 92,56" />
                <polygon points="94,57 99,73 104,58" />
                <polygon points="106,60 110,72 114,62" />
              </g>

              {/* Rahang Bawah & Taring Bawah yang Membuka ke Bawah */}
              <g
                style={{
                  transformOrigin: "60px 84px",
                  transform: jawOpen ? "rotate(32deg) translateY(4px)" : "rotate(0deg)",
                  transition: "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <path
                  d="M 60 76 Q 96 86 114 84 Q 94 108 60 94 Z"
                  fill="#0F172A"
                  stroke="#6366F1"
                  strokeWidth="2"
                />
                {/* Taring Bawah Menusuk ke Atas */}
                <polygon points="74,84 79,68 84,84" fill="#FFFFFF" />
                <polygon points="86,84 92,66 98,84" fill="#FFFFFF" />
                <polygon points="100,82 105,70 110,82" fill="#FFFFFF" />
              </g>
            </g>

            {/* Mata Predator Raksasa Ekspresif */}
            <g>
              {state === "confused" ? (
                // Mata Bingung "?"
                <g>
                  <circle cx="74" cy="42" r="10" fill="#FFFFFF" />
                  <circle cx="74" cy="42" r="4" fill="#0F172A" />
                  <path d="M 60 22 Q 68 14 74 20 Q 74 24 68 28 L 68 31" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="68" cy="35" r="1.5" fill="#F59E0B" />
                </g>
              ) : state === "satisfied" ? (
                // Mata Senang Melengkung Kenyang (^ ^)
                <g>
                  <path d="M 64 44 Q 72 36 80 44" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="62" cy="54" r="5" fill="#F43F5E" opacity="0.6" />
                </g>
              ) : (
                // Mata Memburu Tajam / Lapar
                <g>
                  {/* Kornea Putih */}
                  <ellipse cx="76" cy="42" rx="13" ry="15" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  {/* Pupil Neon Berapi */}
                  <ellipse cx={direction === 1 ? "80" : "72"} cy="42" rx="7" ry="9" fill="url(#eyeGlow)" />
                  {/* Kilau Cahaya Mata */}
                  <circle cx={direction === 1 ? "82" : "74"} cy="38" r="3" fill="#FFFFFF" />
                  {/* Alis Kartun Menukik Tajam */}
                  <path d="M 64 32 L 88 38" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* Lengan / Cakar Menjangkau ke Depan */}
            <g
              style={{
                transformOrigin: "60px 88px",
                animation: state === "hunting" ? "reachArm 0.35s infinite alternate ease-in-out" : "none",
              }}
            >
              <path d="M 58 84 Q 82 86 92 94" fill="none" stroke="#0F172A" strokeWidth="9" strokeLinecap="round" />
              <path d="M 58 84 Q 82 86 92 94" fill="none" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
              {/* Kuku Cakar */}
              <polygon points="92,90 98,92 92,95" fill="#E2E8F0" />
              <polygon points="90,95 96,98 88,100" fill="#E2E8F0" />
            </g>

            {/* Kaki Kanan Depan (Animasi Stomp Berjalan) */}
            <g
              style={{
                transformOrigin: "70px 108px",
                animation: state === "hunting" ? "walkLegRight 0.22s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="66" y="104" width="15" height="26" rx="7" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
              <ellipse cx="74" cy="130" rx="11" ry="6" fill="#0F172A" />
              {/* Cakar Depan */}
              <polygon points="83,128 90,131 83,134" fill="#E2E8F0" />
            </g>
          </svg>

          {/* Partikel Remah-remah Kartun saat Mengunyah */}
          {burstParticles.map((pt) => (
            <div
              key={pt.id}
              style={{
                transform: `translate3d(${pt.x + 95}px, ${pt.y + 76}px, 0)`,
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
            transform: rotate(-24deg);
          }
          to {
            transform: rotate(24deg);
          }
        }
        @keyframes walkLegRight {
          from {
            transform: rotate(24deg);
          }
          to {
            transform: rotate(-24deg);
          }
        }
        @keyframes reachArm {
          from {
            transform: rotate(-10deg);
          }
          to {
            transform: rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
