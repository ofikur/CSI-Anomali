"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnomalyVariant {
  id: number;
  hoodieColor: string;
  accentColor: string;
  eyeColor: string;
  innerEyeColor: string;
  headgear: "horns" | "flame" | "ears" | "crown" | "halo" | "crystal" | "ninja";
  particleColor: string;
  speed: number;
  scale: number;
}

const VARIANTS: AnomalyVariant[] = [
  // 0. Void Original (Discord Blurple & Dark Zinc)
  {
    id: 0,
    hoodieColor: "#18181B",
    accentColor: "#5865F2",
    eyeColor: "#38BDF8",
    innerEyeColor: "#FFFFFF",
    headgear: "horns",
    particleColor: "#5865F2",
    speed: 2.2,
    scale: 1.0,
  },
  // 1. Crimson Flame (Dark Red & Fiery Gold)
  {
    id: 1,
    hoodieColor: "#450A0A",
    accentColor: "#EF4444",
    eyeColor: "#FDE047",
    innerEyeColor: "#FFFFFF",
    headgear: "flame",
    particleColor: "#EF4444",
    speed: 2.7,
    scale: 0.95,
  },
  // 2. Emerald Glitch (Dark Green & Neon Lime)
  {
    id: 2,
    hoodieColor: "#022C22",
    accentColor: "#10B981",
    eyeColor: "#4ADE80",
    innerEyeColor: "#FFFFFF",
    headgear: "ears",
    particleColor: "#10B981",
    speed: 1.9,
    scale: 1.05,
  },
  // 3. Mythic Gold (Deep Amber & Royal Crown)
  {
    id: 3,
    hoodieColor: "#291B00",
    accentColor: "#F59E0B",
    eyeColor: "#FFFFFF",
    innerEyeColor: "#FDE047",
    headgear: "crown",
    particleColor: "#F59E0B",
    speed: 2.1,
    scale: 1.1,
  },
  // 4. Phantom Cosmic (Deep Violet & Fuchsia Halo)
  {
    id: 4,
    hoodieColor: "#2E1065",
    accentColor: "#A855F7",
    eyeColor: "#E879F9",
    innerEyeColor: "#FFFFFF",
    headgear: "halo",
    particleColor: "#C084FC",
    speed: 2.4,
    scale: 0.92,
  },
  // 5. Cyber Ice (Deep Navy & Electric Cyan)
  {
    id: 5,
    hoodieColor: "#082F49",
    accentColor: "#06B6D4",
    eyeColor: "#67E8F9",
    innerEyeColor: "#FFFFFF",
    headgear: "crystal",
    particleColor: "#38BDF8",
    speed: 2.5,
    scale: 1.0,
  },
  // 6. Shadow Stealth (Pure Black & Smoke Silver)
  {
    id: 6,
    hoodieColor: "#09090B",
    accentColor: "#71717A",
    eyeColor: "#FAFAFA",
    innerEyeColor: "#A1A1AA",
    headgear: "ninja",
    particleColor: "#E4E4E7",
    speed: 3.0,
    scale: 0.9,
  },
];

interface AnomalyCharacterProps {
  variantIndex?: number;
}

export default function AnomalyCharacter({ variantIndex = 0 }: AnomalyCharacterProps) {
  const v = VARIANTS[variantIndex % VARIANTS.length];

  const [pos, setPos] = useState({ x: 100, y: 150 });
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = kanan, -1 = kiri
  const [isWalking, setIsWalking] = useState(true);
  const [isJumping, setIsJumping] = useState(false);

  const targetRef = useRef({ x: 300, y: 200 });
  const posRef = useRef({ x: 100, y: 150 });
  const animFrameRef = useRef<number | null>(null);

  // Set initial spawn position di sekitar tengah layar dengan offset acak
  useEffect(() => {
    if (typeof window !== "undefined") {
      const offsetX = (Math.random() - 0.5) * 120;
      const offsetY = (Math.random() - 0.5) * 50;
      const startX = window.innerWidth / 2 - 32 + offsetX;
      const startY = 120 + offsetY;

      setPos({ x: startX, y: startY });
      posRef.current = { x: startX, y: startY };

      pickNewTarget();
    }
  }, []);

  // Pilih target koordinat jalan acak di seluruh layar
  const pickNewTarget = () => {
    if (typeof window === "undefined") return;

    const padding = 60;
    const maxX = Math.max(100, window.innerWidth - padding * 2);
    const maxY = Math.max(100, window.innerHeight - padding * 2);

    const nextX = Math.floor(Math.random() * maxX) + padding;
    const nextY = Math.floor(Math.random() * maxY) + padding;

    targetRef.current = { x: nextX, y: nextY };
    setIsWalking(true);

    if (nextX > posRef.current.x) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
  };

  // Loop pergerakan karakter berjalan mulus berkeliling layar (60fps)
  useEffect(() => {
    let isIdle = false;
    let idleTimer: any = null;

    const step = () => {
      const current = posRef.current;
      const target = targetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 6) {
        if (!isIdle) {
          isIdle = true;
          setIsWalking(false);
          // Berhenti sejenak, lalu pilih target baru
          idleTimer = setTimeout(() => {
            isIdle = false;
            pickNewTarget();
          }, 1000 + Math.random() * 900);
        }
      } else {
        const speed = v.speed;
        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        const newX = current.x + vx;
        const newY = current.y + vy;

        posRef.current = { x: newX, y: newY };
        setPos({ x: newX, y: newY });

        if (Math.abs(dx) > 1) {
          setDirection(dx > 0 ? 1 : -1);
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [v.speed]);

  // Karakter melompat jika diklik
  const handleCharacterClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 550);
  };

  // Render headgear unik tiap varian
  const renderHeadgear = () => {
    switch (v.headgear) {
      case "flame":
        return (
          <>
            <path d="M 23 13 Q 18 2 24 6 Q 28 0 32 8 Q 36 0 40 6 Q 46 2 41 13 Z" fill={v.accentColor} />
            <path d="M 27 10 Q 32 3 37 10 Z" fill="#FDE047" />
          </>
        );
      case "ears":
        return (
          <>
            <path d="M 22 14 C 18 3, 19 -1, 23 2 C 27 5, 26 10, 25 14 Z" fill={v.accentColor} />
            <path d="M 42 14 C 46 3, 45 -1, 41 2 C 37 5, 38 10, 39 14 Z" fill={v.accentColor} />
          </>
        );
      case "crown":
        return (
          <g>
            <path d="M 20 8 L 24 2 L 28 6 L 32 1 L 36 6 L 40 2 L 44 8 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <circle cx="32" cy="3" r="1.5" fill="#EF4444" />
          </g>
        );
      case "halo":
        return (
          <ellipse cx="32" cy="6" rx="14" ry="4" fill="none" stroke={v.accentColor} strokeWidth="2.5" className="animate-pulse" />
        );
      case "crystal":
        return (
          <>
            <polygon points="21,12 18,2 24,7" fill="#67E8F9" />
            <polygon points="43,12 46,2 40,7" fill="#67E8F9" />
            <polygon points="32,9 32,2 34,7" fill="#BAE6FD" />
          </>
        );
      case "ninja":
        return (
          <>
            <path d="M 20 12 L 44 12" stroke={v.accentColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 42 12 Q 52 8 50 16" stroke={v.accentColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case "horns":
      default:
        return (
          <>
            <path d="M 24 13 L 20 4 L 27 9 Z" fill={v.accentColor} />
            <path d="M 40 13 L 44 4 L 37 9 Z" fill={v.accentColor} />
          </>
        );
    }
  };

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: isJumping ? "transform 0.2s ease-out" : "none",
      }}
      className="fixed top-0 left-0 z-40 select-none pointer-events-auto cursor-pointer"
      onClick={handleCharacterClick}
    >
      <div
        style={{
          transform: `scaleX(${direction}) scale(${v.scale}) ${isJumping ? "translateY(-30px) rotate(15deg)" : ""}`,
          transition: "transform 0.25s ease-in-out",
        }}
        className="relative flex flex-col items-center"
      >
        {/* Karakter Anomali 2D (Open-Source SVG Vector Sprite) */}
        <div className="relative w-16 h-20 filter drop-shadow-md">
          <svg viewBox="0 0 64 72" className="w-full h-full overflow-visible">
            {/* Bayangan di tanah yang berdenyut saat melangkah */}
            <ellipse
              cx="32"
              cy="68"
              rx={isWalking ? "16" : "18"}
              ry="5"
              fill="rgba(0,0,0,0.25)"
              className={isWalking ? "animate-pulse" : ""}
            />

            {/* Partikel Glitch Anomali Melayang */}
            <rect
              x="8"
              y="18"
              width="4"
              height="4"
              fill={v.particleColor}
              className="animate-ping"
              style={{ animationDuration: "1.6s" }}
            />
            <rect
              x="52"
              y="26"
              width="3"
              height="3"
              fill={v.accentColor}
              className="animate-pulse"
              style={{ animationDuration: "1.2s" }}
            />

            {/* Kaki Kiri */}
            <g
              style={{
                transformOrigin: "24px 50px",
                animation: isWalking ? "walkLegLeft 0.35s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="20" y="50" width="8" height="14" rx="4" fill={v.hoodieColor} />
              <ellipse cx="23" cy="64" rx="6" ry="3.5" fill={v.accentColor} />
            </g>

            {/* Kaki Kanan */}
            <g
              style={{
                transformOrigin: "40px 50px",
                animation: isWalking ? "walkLegRight 0.35s infinite alternate ease-in-out" : "none",
              }}
            >
              <rect x="36" y="50" width="8" height="14" rx="4" fill={v.hoodieColor} />
              <ellipse cx="40" cy="64" rx="6" ry="3.5" fill={v.accentColor} />
            </g>

            {/* Tubuh Karakter Anomali */}
            <g
              style={{
                transformOrigin: "32px 35px",
                animation: isWalking ? "walkBody 0.35s infinite alternate ease-in-out" : "none",
              }}
            >
              {/* Mantel / Jubah Anomali */}
              <path
                d="M 18 24 C 18 10, 46 10, 46 24 C 48 38, 48 52, 42 54 C 34 56, 30 56, 22 54 C 16 52, 16 38, 18 24 Z"
                fill={v.hoodieColor}
              />

              {/* Aksen List Jubah */}
              <path
                d="M 22 54 C 28 55, 36 55, 42 54"
                stroke={v.accentColor}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Headgear unik varian */}
              {renderHeadgear()}

              {/* Wajah Gelap Misterius */}
              <ellipse cx="32" cy="27" rx="11" ry="8" fill="#09090B" />

              {/* Mata Anomali Bercahaya */}
              <g className="animate-pulse">
                {/* Mata Kiri */}
                <ellipse cx="28" cy="26" rx="3" ry="4" fill={v.eyeColor} />
                <circle cx="28.5" cy="25" r="1.2" fill={v.innerEyeColor} />

                {/* Mata Kanan */}
                <ellipse cx="36" cy="26" rx="3" ry="4" fill={v.eyeColor} />
                <circle cx="36.5" cy="25" r="1.2" fill={v.innerEyeColor} />
              </g>

              {/* Tanda # di Dada */}
              <text
                x="32"
                y="45"
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fill={v.accentColor}
                fontFamily="monospace"
              >
                #
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* CSS Keyframes Animasi Langkah Kaki & Badan */}
      <style jsx>{`
        @keyframes walkLegLeft {
          0% {
            transform: rotate(-22deg) translateY(-2px);
          }
          100% {
            transform: rotate(24deg) translateY(2px);
          }
        }
        @keyframes walkLegRight {
          0% {
            transform: rotate(24deg) translateY(2px);
          }
          100% {
            transform: rotate(-22deg) translateY(-2px);
          }
        }
        @keyframes walkBody {
          0% {
            transform: translateY(0px) rotate(-1deg);
          }
          100% {
            transform: translateY(-3px) rotate(1deg);
          }
        }
      `}</style>
    </div>
  );
}
