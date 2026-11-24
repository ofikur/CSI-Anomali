"use client";

import React, { useState, useEffect, useRef } from "react";

export interface SinAnomalyVariant {
  id: number;
  sinName: "Pride" | "Wrath" | "Gluttony" | "Greed" | "Lust" | "Envy" | "Sloth";
  indonesianName: string;
  sifatDescription: string;
  hoverReaction: string;
  hoodieColor: string;
  accentColor: string;
  eyeColor: string;
  innerEyeColor: string;
  headgear: "pride" | "wrath" | "gluttony" | "greed" | "lust" | "envy" | "sloth";
  particleColor: string;
  baseSpeed: number;
  scale: number;
  idleMin: number;
  idleMax: number;
}

export const SIN_VARIANTS: SinAnomalyVariant[] = [
  // 0. Pride (Superbia / Kesombongan)
  {
    id: 0,
    sinName: "Pride",
    indonesianName: "Kesombongan",
    sifatDescription: "Angkuh, narsis, langkah tegap, menatap rendah segalanya",
    hoverReaction: "Menatap rendah kursor",
    hoodieColor: "#2E1065", // Royal Purple
    accentColor: "#F59E0B", // Gold
    eyeColor: "#FDE047",
    innerEyeColor: "#B45309",
    headgear: "pride",
    particleColor: "#FBBF24",
    baseSpeed: 1.9,
    scale: 1.15,
    idleMin: 1800,
    idleMax: 2600,
  },
  // 1. Wrath (Ira / Kemurkaan)
  {
    id: 1,
    sinName: "Wrath",
    indonesianName: "Kemurkaan",
    sifatDescription: "Pemarah, agresif, menerjang cepat, tantrum menghentak",
    hoverReaction: "Mengamuk melawan kursor!",
    hoodieColor: "#450A0A", // Lava Crimson
    accentColor: "#EF4444", // Fiery Red
    eyeColor: "#F87171",
    innerEyeColor: "#FDE047",
    headgear: "wrath",
    particleColor: "#F97316",
    baseSpeed: 3.5,
    scale: 1.0,
    idleMin: 300,
    idleMax: 700,
  },
  // 2. Gluttony (Gula / Kerakusan)
  {
    id: 2,
    sinName: "Gluttony",
    indonesianName: "Kerakusan",
    sifatDescription: "Gembul rakus, langkah bergoyang, selalu mengunyah paha ayam",
    hoverReaction: "Mendekap makanan ketakutan",
    hoodieColor: "#381E11", // Pastry Brown
    accentColor: "#F43F5E", // Frosting Pink
    eyeColor: "#FFFFFF",
    innerEyeColor: "#18181B",
    headgear: "gluttony",
    particleColor: "#FBBF24",
    baseSpeed: 1.5,
    scale: 1.25,
    idleMin: 2000,
    idleMax: 3000,
  },
  // 3. Greed (Avaritia / Keserakahan)
  {
    id: 3,
    sinName: "Greed",
    indonesianName: "Keserakahan",
    sifatDescription: "Kikir paranoid, bergerak di sudut, melempar dan menjaga koin",
    hoverReaction: "Mau curi hartaku?!",
    hoodieColor: "#064E3B", // Velvet Emerald
    accentColor: "#EAB308", // Gold Coin
    eyeColor: "#FEF08A",
    innerEyeColor: "#713F12",
    headgear: "greed",
    particleColor: "#34D399",
    baseSpeed: 3.1,
    scale: 0.95,
    idleMin: 1000,
    idleMax: 1800,
  },
  // 4. Lust (Luxuria / Hawa Nafsu)
  {
    id: 4,
    sinName: "Lust",
    indonesianName: "Hawa Nafsu",
    sifatDescription: "Genit menggoda, langkah melayang gemulai, meniup gelembung hati",
    hoverReaction: "Menggoda dan mendekati kursor",
    hoodieColor: "#4A0427", // Velvet Magenta
    accentColor: "#EC4899", // Neon Rose
    eyeColor: "#F472B6",
    innerEyeColor: "#881337",
    headgear: "lust",
    particleColor: "#FB7185",
    baseSpeed: 2.2,
    scale: 1.0,
    idleMin: 1200,
    idleMax: 2000,
  },
  // 5. Envy (Invidia / Kedengkian)
  {
    id: 5,
    sinName: "Envy",
    indonesianName: "Kedengkian",
    sifatDescription: "Pendengki licik, mengendap-endap mengintai, menjulurkan lidah bisa",
    hoverReaction: "Mendesis dengki mengancam",
    hoodieColor: "#052E16", // Viper Green
    accentColor: "#22C55E", // Acid Lime
    eyeColor: "#4ADE80",
    innerEyeColor: "#022C22",
    headgear: "envy",
    particleColor: "#84CC16",
    baseSpeed: 2.5,
    scale: 0.98,
    idleMin: 1200,
    idleMax: 1900,
  },
  // 6. Sloth (Acedia / Kemalasan)
  {
    id: 6,
    sinName: "Sloth",
    indonesianName: "Kemalasan",
    sifatDescription: "Sangat lamban malas, sering tertidur pulas dengan dengkuran Z-z-z",
    hoverReaction: "Terganggu... jangan berisik...",
    hoodieColor: "#1E293B", // Drowsy Slate
    accentColor: "#38BDF8", // Dreamy Cyan
    eyeColor: "#94A3B8",
    innerEyeColor: "#0F172A",
    headgear: "sloth",
    particleColor: "#BAE6FD",
    baseSpeed: 1.0,
    scale: 0.92,
    idleMin: 3200,
    idleMax: 5000,
  },
];

interface AnomalyCharacterProps {
  id?: number;
  variantIndex?: number;
  devourTarget?: { mouthX: number; mouthY: number } | null;
}

export default function AnomalyCharacter({
  id,
  variantIndex = 0,
  devourTarget = null,
}: AnomalyCharacterProps) {
  const v = SIN_VARIANTS[variantIndex % SIN_VARIANTS.length];

  const [pos, setPos] = useState({ x: 100, y: 150 });
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = kanan, -1 = kiri
  const [isWalking, setIsWalking] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sinAction, setSinAction] = useState<"normal" | "special_idle" | "reacting">("normal");

  const targetRef = useRef({ x: 300, y: 200 });
  const posRef = useRef({ x: 100, y: 150 });
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;
  const animFrameRef = useRef<number | null>(null);

  // Set initial spawn position di sekitar tengah layar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 70;
      const startX = window.innerWidth / 2 - 32 + offsetX;
      const startY = 120 + offsetY;

      setPos({ x: startX, y: startY });
      posRef.current = { x: startX, y: startY };

      pickNewTarget();
    }
  }, []);

  // AI Pemilihan Koordinat Sesuai Sifat Karakter Dosa
  const pickNewTarget = () => {
    if (typeof window === "undefined") return;

    const padding = 60;
    const maxX = Math.max(100, window.innerWidth - padding * 2);
    const maxY = Math.max(100, window.innerHeight - padding * 2);

    let nextX = Math.floor(Math.random() * maxX) + padding;
    let nextY = Math.floor(Math.random() * maxY) + padding;

    if (v.sinName === "Greed") {
      const preferLeft = Math.random() > 0.5;
      nextX = preferLeft ? padding + Math.random() * 80 : window.innerWidth - padding - Math.random() * 80;
    } else if (v.sinName === "Sloth") {
      const current = posRef.current;
      const deltaX = (Math.random() - 0.5) * 120;
      const deltaY = (Math.random() - 0.5) * 80;
      nextX = Math.min(Math.max(padding, current.x + deltaX), window.innerWidth - padding);
      nextY = Math.min(Math.max(padding, current.y + deltaY), window.innerHeight - padding);
    } else if (v.sinName === "Pride") {
      nextY = Math.min(nextY, window.innerHeight * 0.45);
    }

    targetRef.current = { x: nextX, y: nextY };
    setIsWalking(true);
    setSinAction("normal");

    if (nextX > posRef.current.x) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
  };

  // Loop pergerakan karakter berjalan mulus berkeliling layar (60fps)
  useEffect(() => {
    if (devourTarget) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let isIdle = false;
    let idleTimer: any = null;

    const step = () => {
      // Jika kursor sedang diarahkan ke karakter, karakter diam di tempat untuk bereaksi
      if (isHoveredRef.current) {
        animFrameRef.current = requestAnimationFrame(step);
        return;
      }

      const current = posRef.current;
      const target = targetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 6) {
        if (!isIdle) {
          isIdle = true;
          setIsWalking(false);
          setSinAction("special_idle");

          const delay = v.idleMin + Math.random() * (v.idleMax - v.idleMin);
          idleTimer = setTimeout(() => {
            isIdle = false;
            pickNewTarget();
          }, delay);
        }
      } else {
        const speed = v.baseSpeed;
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
  }, [v.baseSpeed, v.idleMin, v.idleMax, v.sinName, devourTarget]);

  // Reaksi Sifat Unik Saat Karakter Diklik oleh Pengguna
  const handleCharacterClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    setSinAction("reacting");

    setTimeout(() => {
      setIsJumping(false);
      setSinAction(isWalking ? "normal" : "special_idle");
    }, 700);
  };

  // Render Headgear & Aksesoris Unik 7 Deadly Sins
  const renderSinHeadgearAndFeatures = () => {
    switch (v.headgear) {
      case "pride":
        return (
          <g>
            <path
              d="M 18 10 L 22 2 L 27 7 L 32 0 L 37 7 L 42 2 L 46 10 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="1"
            />
            <circle cx="32" cy="4" r="1.5" fill="#EF4444" />
            <circle cx="22" cy="5" r="1" fill="#3B82F6" />
            <circle cx="42" cy="5" r="1" fill="#3B82F6" />
            {(sinAction === "special_idle" || isHovered) && (
              <g className="animate-ping" style={{ transformOrigin: "32px 0px" }}>
                <polygon points="32,-3 34,0 37,0 34,2 35,5 32,3 29,5 30,2 27,0 30,0" fill="#FEF08A" />
              </g>
            )}
          </g>
        );

      case "wrath":
        return (
          <g>
            <path
              d={isHovered ? "M 20 13 Q 12 -4 23 2 Q 27 -6 30 7 Z" : "M 22 13 Q 15 1 23 4 Q 26 -2 29 8 Z"}
              fill="#EF4444"
              className={sinAction === "reacting" || isHovered ? "animate-bounce" : ""}
            />
            <path d="M 23 9 Q 25 3 28 8 Z" fill="#FDE047" />
            <path
              d={isHovered ? "M 44 13 Q 52 -4 41 2 Q 37 -6 34 7 Z" : "M 42 13 Q 49 1 41 4 Q 38 -2 35 8 Z"}
              fill="#EF4444"
              className={sinAction === "reacting" || isHovered ? "animate-bounce" : ""}
            />
            <path d="M 41 9 Q 39 3 36 8 Z" fill="#FDE047" />
          </g>
        );

      case "gluttony":
        return (
          <g>
            <ellipse cx="23" cy="11" rx="4" ry="3" fill="#D97706" />
            <ellipse cx="41" cy="11" rx="4" ry="3" fill="#D97706" />
            <g
              transform={isHovered ? "translate(30, 31) rotate(10)" : "translate(38, 33)"}
              className={sinAction === "special_idle" && !isHovered ? "chewDrumstickAnim" : ""}
              style={{ transformOrigin: "4px 4px" }}
            >
              <ellipse cx="7" cy="4" rx="5" ry="3.5" fill="#B45309" />
              <line x1="0" y1="4" x2="4" y2="4" stroke="#F1F5F9" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        );

      case "greed":
        return (
          <g>
            <circle cx="21" cy="7" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
            <text x="21" y="9.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#854D0E">
              $
            </text>
            <circle cx="43" cy="7" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
            <text x="43" y="9.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#854D0E">
              $
            </text>
            {(sinAction === "special_idle" || isHovered) && (
              <g className="tossCoinAnim" style={{ transformOrigin: "32px 10px" }}>
                <circle cx="32" cy="-2" r="3.5" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
                <text x="32" y="0" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#854D0E">
                  $
                </text>
              </g>
            )}
          </g>
        );

      case "lust":
        return (
          <g>
            <path
              d="M 23 12 Q 18 2 26 1 Q 32 1 32 8"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 41 12 Q 46 2 38 1 Q 32 1 32 8"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 15 30 Q 7 22 9 14 Q 15 20 17 28 Z" fill="#F43F5E" opacity="0.85" />
            <path d="M 49 30 Q 57 22 55 14 Q 49 20 47 28 Z" fill="#F43F5E" opacity="0.85" />
            {(sinAction === "special_idle" || isHovered) && (
              <g className="floatHeartAnim" style={{ transformOrigin: "32px -4px" }}>
                <path d="M 30 -4 A 2 2 0 0 1 34 -4 A 2 2 0 0 1 38 -4 Q 38 -1 34 2 Q 30 -1 30 -4 Z" fill="#FB7185" />
              </g>
            )}
          </g>
        );

      case "envy":
        return (
          <g>
            <path
              d="M 23 13 Q 17 3 23 0 Q 27 -2 24 -7"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 41 13 Q 47 3 41 0 Q 37 -2 40 -7"
              fill="none"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 32 34 L 32 38 L 30 40 M 32 38 L 34 40"
              stroke="#EF4444"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              className={sinAction === "special_idle" || isHovered ? "flickerTongueAnim" : ""}
            />
          </g>
        );

      case "sloth":
        return (
          <g>
            <path
              d={isHovered ? "M 20 16 Q 32 10 44 16 L 40 8 Q 48 12 50 20 Z" : "M 20 12 Q 32 2 44 12 L 40 4 Q 48 8 50 16 Z"}
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1"
            />
            <circle cx="51" cy="18" r="2.5" fill="#FFFFFF" />
            <g className="floatZAnim">
              <text x="6" y="16" fontSize="7" fontWeight="bold" fill="#38BDF8">
                z
              </text>
              <text x="10" y="8" fontSize="9" fontWeight="bold" fill="#7DD3FC">
                Z
              </text>
            </g>
          </g>
        );

      default:
        return null;
    }
  };

  // Render Mata Ekspresif Tiap Dosa
  const renderSinEyes = () => {
    switch (v.headgear) {
      case "pride":
        return (
          <g>
            <ellipse cx="28" cy="26" rx="3.5" ry="3.5" fill="#FDE047" />
            <circle cx="28.5" cy="25" r="1.3" fill="#B45309" />
            <path d="M 24 23 Q 28 25 32 23" stroke="#2E1065" strokeWidth="1.5" fill="none" />

            <ellipse cx="36" cy="26" rx="3.5" ry="3.5" fill="#FDE047" />
            <circle cx="36.5" cy="25" r="1.3" fill="#B45309" />
            <path d="M 32 23 Q 36 25 40 23" stroke="#2E1065" strokeWidth="1.5" fill="none" />
          </g>
        );

      case "wrath":
        return (
          <g className={sinAction === "reacting" || isHovered ? "animate-ping" : "animate-pulse"}>
            <ellipse cx="28" cy="26" rx="3.5" ry="4" fill="#EF4444" />
            <ellipse cx="28" cy="26" rx="1.2" ry="3.5" fill="#FDE047" />
            <path d="M 23 23 L 31 26" stroke="#450A0A" strokeWidth="2.2" strokeLinecap="round" />

            <ellipse cx="36" cy="26" rx="3.5" ry="4" fill="#EF4444" />
            <ellipse cx="36" cy="26" rx="1.2" ry="3.5" fill="#FDE047" />
            <path d="M 41 23 L 33 26" stroke="#450A0A" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );

      case "gluttony":
        return (
          <g>
            <circle cx="28" cy="26" r="3.8" fill="#FFFFFF" />
            <circle cx="28.5" cy="26" r="2" fill="#18181B" />
            <circle cx="29" cy="25" r="0.8" fill="#FFFFFF" />

            <circle cx="36" cy="26" r="3.8" fill="#FFFFFF" />
            <circle cx="36.5" cy="26" r="2" fill="#18181B" />
            <circle cx="37" cy="25" r="0.8" fill="#FFFFFF" />

            <path d="M 30 31 Q 32 33 34 31 Z" fill="#F43F5E" />
          </g>
        );

      case "greed":
        return (
          <g>
            <ellipse cx="28" cy="26" rx="3.5" ry="3.8" fill="#FEF08A" />
            <text x="28" y="28.5" textAnchor="middle" fontSize="6" fontWeight="900" fill="#713F12">
              $
            </text>

            <ellipse cx="36" cy="26" rx="3.5" ry="3.8" fill="#FEF08A" />
            <text x="36" y="28.5" textAnchor="middle" fontSize="6" fontWeight="900" fill="#713F12">
              $
            </text>
          </g>
        );

      case "lust":
        return (
          <g>
            <ellipse cx="28" cy="26" rx="3.5" ry="4" fill="#F472B6" />
            <circle cx="27.5" cy="25.5" r="1" fill="#881337" />
            <circle cx="29" cy="25.5" r="1" fill="#881337" />
            <polygon points="26.5,26 30,26 28.25,28.5" fill="#881337" />

            <ellipse cx="36" cy="26" rx="3.5" ry="4" fill="#F472B6" />
            <circle cx="35.5" cy="25.5" r="1" fill="#881337" />
            <circle cx="37" cy="25.5" r="1" fill="#881337" />
            <polygon points="34.5,26 38,26 36.25,28.5" fill="#881337" />
          </g>
        );

      case "envy":
        return (
          <g>
            <ellipse cx="28" cy="26" rx="3.5" ry="4" fill="#4ADE80" />
            <ellipse cx="28" cy="26" rx="0.9" ry="3.8" fill="#052E16" />
            <path d="M 24 23 L 31 25" stroke="#052E16" strokeWidth="1.6" />

            <ellipse cx="36" cy="26" rx="3.5" ry="4" fill="#4ADE80" />
            <ellipse cx="36" cy="26" rx="0.9" ry="3.8" fill="#052E16" />
            <path d="M 40 23 L 33 25" stroke="#052E16" strokeWidth="1.6" />
          </g>
        );

      case "sloth":
        return (
          <g>
            <ellipse cx="28" cy="26" rx="3" ry="3.5" fill="#38BDF8" />
            <path d={isHovered ? "M 23 25 Q 28 27 33 25" : "M 24 23 Q 28 26 32 23"} fill="#1E293B" stroke="#0F172A" strokeWidth="1" />

            <ellipse cx="36" cy="26" rx="3" ry="3.5" fill="#38BDF8" />
            <path d={isHovered ? "M 31 25 Q 36 27 41 25" : "M 32 23 Q 36 26 40 23"} fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
          </g>
        );

      default:
        return null;
    }
  };

  // Dinamika transformasi badan sesuai sifat, aksi, dan interaksi hover kursor
  const getDynamicBodyTransform = () => {
    if (devourTarget) {
      return `scaleX(${direction * 0.5}) scaleY(1.5) rotate(10deg)`;
    }
    if (isJumping) {
      if (v.sinName === "Pride") return "translateY(-34px) rotate(0deg) scale(1.18)";
      if (v.sinName === "Wrath") return "translateY(-26px) rotate(22deg) scale(1.15)";
      if (v.sinName === "Sloth") return "translateY(-12px) rotate(6deg) scale(0.9)";
      return "translateY(-28px) rotate(15deg)";
    }
    // Reaksi badan saat kursor diarahkan (Hover)
    if (isHovered) {
      if (v.sinName === "Pride") return "translateY(-8px) scale(1.18) rotate(-10deg)"; // Menjulang tinggi menolak
      if (v.sinName === "Wrath") return "scale(1.22, 0.95) rotate(6deg)"; // Menerjang marah melawan
      if (v.sinName === "Gluttony") return "scale(1.25, 1.05) rotate(-3deg)"; // Mendekap makanan erat
      if (v.sinName === "Greed") return "scale(0.92, 0.92) rotate(-18deg)"; // Membelakangi kursor kikir
      if (v.sinName === "Lust") return "translateY(-6px) scale(1.08) rotate(8deg)"; // Condong mendekati genit
      if (v.sinName === "Envy") return "translateY(5px) scale(1.12, 0.88) rotate(-5deg)"; // Mengendap mengancam
      if (v.sinName === "Sloth") return "translateY(8px) scale(1.02, 0.78)"; // Ambruk tidur
    }
    if (!isWalking && sinAction === "special_idle") {
      if (v.sinName === "Sloth") return "translateY(5px) scale(1.0, 0.85)";
      if (v.sinName === "Pride") return "translateY(-2px) scale(1.02, 1.08)";
      if (v.sinName === "Wrath") return "scale(1.06, 0.96)";
      if (v.sinName === "Gluttony") return "scale(1.1, 0.95)";
    }
    return `scaleX(${direction}) scale(${v.scale})`;
  };

  return (
    <div
      id={id !== undefined ? `anomaly-${id}` : undefined}
      data-anomaly-id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 2500);
      }}
      style={{
        transform: devourTarget
          ? `translate3d(${devourTarget.mouthX - 32}px, ${devourTarget.mouthY - 40}px, 0) scale(0.04) rotate(${
              direction === 1 ? 55 : -55
            }deg)`
          : `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: devourTarget ? 0 : 1,
        transition: devourTarget
          ? "transform 0.26s cubic-bezier(0.4, 0, 0.8, 0.2), opacity 0.22s ease-in"
          : isJumping
          ? "transform 0.2s ease-out"
          : "none",
      }}
      className={`anomaly-entity fixed top-0 left-0 z-50 select-none pointer-events-auto cursor-pointer ${
        devourTarget ? "pointer-events-none" : ""
      }`}
      onClick={handleCharacterClick}
    >
      {/* FLOATING NAME BADGE & SIFAT REAKSI SAAT DIARAHKAN KURSOR */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap animate-in fade-in zoom-in-90 duration-150 flex flex-col items-center">
          <div
            style={{ borderColor: v.accentColor }}
            className="bg-zinc-950/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-lg border backdrop-blur-md flex items-center gap-1.5"
          >
            <span style={{ color: v.accentColor }}>{v.sinName}</span>
            <span className="text-zinc-400 font-normal text-[10px]">({v.indonesianName})</span>
          </div>
          {/* Subtitle Reaksi Sifat Langsung */}
          <span className="text-[9px] text-zinc-300 bg-black/70 px-2 py-0.2 rounded-full mt-0.5 backdrop-blur-xs shadow-xs border border-white/5">
            {v.hoverReaction}
          </span>
          {/* Panah Penunjuk Badge */}
          <div
            style={{ borderTopColor: v.accentColor }}
            className="w-0 h-0 border-x-4 border-x-transparent border-t-4 opacity-80"
          />
        </div>
      )}

      <div
        style={{
          transform: getDynamicBodyTransform(),
          transition: devourTarget
            ? "transform 0.24s ease-in"
            : isHovered
            ? "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : sinAction === "special_idle"
            ? "transform 0.35s ease-in-out"
            : "transform 0.25s ease-in-out",
        }}
        className={`relative flex flex-col items-center ${
          (!isWalking || isHovered) && v.sinName === "Wrath" ? "rageTrembleAnim" : ""
        } ${(!isWalking || isHovered) && v.sinName === "Sloth" ? "deepBreathAnim" : ""}`}
      >
        {/* Karakter Anomali 2D (7 Deadly Sins Vector Sprite Realistis) */}
        <div className="relative w-16 h-20 filter drop-shadow-md">
          <svg viewBox="0 0 64 72" className="w-full h-full overflow-visible">
            {/* Bayangan di tanah yang berdenyut saat melangkah */}
            <ellipse
              cx="32"
              cy="68"
              rx={isWalking ? "16" : v.sinName === "Sloth" ? "20" : "18"}
              ry={v.sinName === "Sloth" && (!isWalking || isHovered) ? "7" : "5"}
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
                animation: isWalking && !isHovered
                  ? v.sinName === "Wrath"
                    ? "walkLegLeft 0.18s infinite alternate ease-in-out"
                    : v.sinName === "Sloth"
                    ? "walkLegLeft 0.65s infinite alternate ease-in-out"
                    : "walkLegLeft 0.35s infinite alternate ease-in-out"
                  : "none",
              }}
            >
              <rect x="20" y="50" width="8" height="14" rx="4" fill={v.hoodieColor} />
              <ellipse cx="23" cy="64" rx="6" ry="3.5" fill={v.accentColor} />
            </g>

            {/* Kaki Kanan */}
            <g
              style={{
                transformOrigin: "40px 50px",
                animation: isWalking && !isHovered
                  ? v.sinName === "Wrath"
                    ? "walkLegRight 0.18s infinite alternate ease-in-out"
                    : v.sinName === "Sloth"
                    ? "walkLegRight 0.65s infinite alternate ease-in-out"
                    : "walkLegRight 0.35s infinite alternate ease-in-out"
                  : "none",
              }}
            >
              <rect x="36" y="50" width="8" height="14" rx="4" fill={v.hoodieColor} />
              <ellipse cx="40" cy="64" rx="6" ry="3.5" fill={v.accentColor} />
            </g>

            {/* Tubuh Karakter Anomali (Menyesuaikan Postur Dosa) */}
            <g
              style={{
                transformOrigin: "32px 35px",
                animation: isWalking && !isHovered
                  ? v.sinName === "Gluttony"
                    ? "waddleBody 0.32s infinite alternate ease-in-out"
                    : "walkBody 0.35s infinite alternate ease-in-out"
                  : "none",
              }}
            >
              {/* Mantel / Jubah Anomali */}
              <path
                d={
                  v.headgear === "gluttony"
                    ? "M 14 24 C 14 10, 50 10, 50 24 C 53 38, 53 52, 44 55 C 34 58, 30 58, 20 55 C 12 52, 12 38, 14 24 Z"
                    : "M 18 24 C 18 10, 46 10, 46 24 C 48 38, 48 52, 42 54 C 34 56, 30 56, 22 54 C 16 52, 16 38, 18 24 Z"
                }
                fill={v.hoodieColor}
              />

              {/* Aksen List Jubah */}
              <path
                d={
                  v.headgear === "gluttony"
                    ? "M 20 55 C 27 57, 37 57, 44 55"
                    : "M 22 54 C 28 55, 36 55, 42 54"
                }
                stroke={v.accentColor}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Headgear & Fitur Sifat Unik Tiap Dosa */}
              {renderSinHeadgearAndFeatures()}

              {/* Wajah Gelap Misterius */}
              <ellipse cx="32" cy="27" rx="11" ry="8" fill="#09090B" />

              {/* Mata Anomali 7 Dosa yang Khas */}
              {renderSinEyes()}

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

      {/* CSS Keyframes Animasi Kelakuan & Sifat Dosa */}
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
        @keyframes waddleBody {
          0% {
            transform: translateY(0px) rotate(-4deg);
          }
          100% {
            transform: translateY(-2px) rotate(4deg);
          }
        }
        :global(.chewDrumstickAnim) {
          animation: chewDrum 0.28s infinite alternate ease-in-out;
        }
        @keyframes chewDrum {
          from {
            transform: rotate(-18deg) translateY(0px);
          }
          to {
            transform: rotate(-5deg) translateY(-3px);
          }
        }
        :global(.tossCoinAnim) {
          animation: coinToss 0.7s infinite alternate cubic-bezier(0.3, 0.8, 0.4, 1);
        }
        @keyframes coinToss {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.15) rotateY(180deg);
          }
          100% {
            transform: translateY(-2px) scale(0.95);
          }
        }
        :global(.floatHeartAnim) {
          animation: heartFloat 1.2s infinite ease-out;
        }
        @keyframes heartFloat {
          0% {
            transform: translateY(0px) scale(0.7);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-16px) scale(1.3);
            opacity: 0;
          }
        }
        :global(.flickerTongueAnim) {
          animation: tongueFlick 0.3s infinite alternate ease-in-out;
        }
        @keyframes tongueFlick {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(2px) scaleY(1.3);
          }
        }
        :global(.floatZAnim) {
          animation: floatZ 1.6s infinite ease-in-out;
        }
        @keyframes floatZ {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-5px) translateX(-2px);
            opacity: 1;
          }
          100% {
            transform: translateY(-10px) translateX(2px);
            opacity: 0.3;
          }
        }
        :global(.rageTrembleAnim) {
          animation: rageTremble 0.08s infinite alternate;
        }
        @keyframes rageTremble {
          0% {
            transform: translateX(-1.5px) rotate(-1.5deg);
          }
          100% {
            transform: translateX(1.5px) rotate(1.5deg);
          }
        }
        :global(.deepBreathAnim) {
          animation: deepBreath 2.2s infinite ease-in-out;
        }
        @keyframes deepBreath {
          0%,
          100% {
            transform: translateY(8px) scale(1.02, 0.78);
          }
          50% {
            transform: translateY(4px) scale(1.06, 0.88);
          }
        }
      `}</style>
    </div>
  );
}
