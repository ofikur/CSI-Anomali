"use client";

import React, { useState } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  Camera,
  Eye,
  Maximize2,
  RefreshCw,
  AlertTriangle,
  Radio,
  Sliders,
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  threatStatus: string;
  statusColor: string;
  fps: number;
  description: string;
  detectedEntities: string[];
}

const FEEDS: CameraFeed[] = [
  {
    id: "CAM-01",
    name: "BASE ALLY FOUNTAIN",
    location: "Sektor Barat Daya (Home Turf)",
    threatStatus: "AFK DETECTED // HIGH LOSS PROBABILITY",
    statusColor: "text-amber-400 border-amber-400/40",
    fps: 14,
    description: "Operative Nana terdeteksi berputar-putar di fountain selama 7 menit. Pasif Moliner pecah 4x.",
    detectedEntities: ["1x Nana (Idle)", "2x Molina (Guarding empty wall)", "0x Roamer"],
  },
  {
    id: "CAM-02",
    name: "LORD PIT SECTOR 4",
    location: "River Basin Sektor Utara",
    threatStatus: "CRITICAL BREACH // RETRI DISASTER IMMINENT",
    statusColor: "text-[#ff003c] border-[#ff003c]/40",
    fps: 12,
    description: "5 entitas musuh sedang mengepung Lord. Jungler sekutu terdeteksi sedang farming kelomang di seberang sungai.",
    detectedEntities: ["1x Lord (HP 12%)", "5x Musuh Menanti", "1x Kelomang (Target Jungler)"],
  },
  {
    id: "CAM-03",
    name: "WARNET BAROKAH PC 04",
    location: "Fisik: Pos Ronda RT 03 Lt. 1",
    threatStatus: "THERMAL CRITICAL // HARDWARE ABUSE",
    statusColor: "text-cyan-400 border-cyan-400/40",
    fps: 8,
    description: "Suhu HP mencapai 58°C. Layar licin akibat cipratan tahu gorengan. Koneksi Indihome terdeteksi 999ms.",
    detectedEntities: ["1x HP Layar Retak Seribu", "1x Gelas Teh Tarik Tumpah", "Kabel Setrikaan"],
  },
];

export default function SurveillanceCCTV() {
  const [activeCam, setActiveCam] = useState<CameraFeed>(FEEDS[1]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [timestamp, setTimestamp] = useState("2026-11-22 15:25:00");

  React.useEffect(() => {
    setTimestamp(new Date().toISOString().slice(0, 19).replace("T", " "));
    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString().slice(0, 19).replace("T", " "));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSwitchCam = (feed: CameraFeed) => {
    cyberSounds.playKeyClick();
    setGlitchActive(true);
    setTimeout(() => {
      setActiveCam(feed);
      setGlitchActive(false);
      cyberSounds.playGlitchBurst();
    }, 200);
  };

  const handleTriggerAlarm = () => {
    cyberSounds.playBreachAlarm();
  };

  return (
    <section className="my-12 w-full bg-[#05090c] border border-[#173824] p-4 sm:p-6 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
      {/* CCTV Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#142d1f] pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-white">
            LIVE DARKNET CCTV SURVEILLANCE
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-1 border border-zinc-800">
            RECORDING // RTSP://TOR-PROXY:8554
          </span>
          <button
            onClick={handleTriggerAlarm}
            className="text-[10px] font-mono text-[#ff003c] bg-[#ff003c]/10 border border-[#ff003c]/40 px-2 py-1 hover:bg-[#ff003c]/20 cursor-pointer"
          >
            TEST SIREN
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main CCTV Viewport (CRT Screen Simulation) */}
        <div className="lg:col-span-2 bg-[#020507] border-2 border-[#193a26] p-3 relative overflow-hidden flex flex-col justify-between min-h-[300px] sm:min-h-[360px]">
          {/* Top Camera Metadata Overlay */}
          <div className="flex items-center justify-between font-mono text-xs text-emerald-400 z-10 border-b border-emerald-950/40 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
              <span className="font-bold text-white">{activeCam.id} // {activeCam.name}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span>{activeCam.fps} FPS</span>
              <span>LIVE FEED</span>
            </div>
          </div>

          {/* Simulated CCTV Visual / Wireframe Center */}
          <div className="relative my-auto py-8 flex flex-col items-center justify-center text-center z-10 select-none">
            <div className={`transition-all duration-100 ${glitchActive ? "opacity-20 scale-95 blur-sm" : "opacity-100"}`}>
              {/* Radar Grid Graphic */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-emerald-500/30 flex items-center justify-center relative mx-auto mb-4 bg-emerald-950/10">
                <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/20" />
                <div className="absolute inset-8 rounded-full border border-emerald-500/20" />
                <div className="w-full h-px bg-emerald-500/20 absolute" />
                <div className="h-full w-px bg-emerald-500/20 absolute" />
                <div className="w-1/2 h-1/2 bg-gradient-to-tr from-transparent via-emerald-500/10 to-emerald-400/30 rounded-tl-full absolute top-0 left-0 origin-bottom-right animate-radar pointer-events-none" />

                {/* Radar target dots */}
                <span className="absolute top-8 right-10 w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Hostile Entity" />
                <span className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="absolute top-16 left-16 w-2.5 h-2.5 rounded-full bg-yellow-400" title="Kelomang" />
              </div>

              <div className="font-mono text-xs text-zinc-300 max-w-md mx-auto bg-black/80 p-2 border border-emerald-900/40">
                <p className="font-bold text-emerald-400 uppercase">{activeCam.location}</p>
                <p className="text-zinc-400 mt-1 text-[11px] leading-snug">{activeCam.description}</p>
              </div>
            </div>
          </div>

          {/* Bottom Feed Status */}
          <div className="flex flex-wrap items-center justify-between font-mono text-[10px] text-zinc-500 pt-2 border-t border-emerald-950/40 z-10">
            <span className={`px-1.5 py-0.5 border ${activeCam.statusColor}`}>
              STATUS: {activeCam.threatStatus}
            </span>
            <span className="text-zinc-400">
              TIMESTAMP: {timestamp}
            </span>
          </div>
        </div>

        {/* Camera Selector & Detected Log */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-zinc-400">SELECT CHANNEL:</div>
          <div className="space-y-2">
            {FEEDS.map((feed) => (
              <button
                key={feed.id}
                onClick={() => handleSwitchCam(feed)}
                className={`w-full text-left font-mono p-3 border transition-all cursor-pointer flex items-center justify-between ${
                  activeCam.id === feed.id
                    ? "bg-[#0c1f14] border-[#00ff66] text-[#00ff66]"
                    : "bg-[#060d12] border-[#152c1e] text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-2">
                    <span>{feed.id}</span>
                    <span className="text-zinc-400 text-[11px]">- {feed.name}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{feed.location}</div>
                </div>
                <Eye className="w-4 h-4 text-emerald-400" />
              </button>
            ))}
          </div>

          {/* Detected Objects List */}
          <div className="bg-[#070e13] border border-[#142a1d] p-3 font-mono text-xs space-y-2">
            <div className="text-zinc-400 text-[11px] font-bold border-b border-zinc-800 pb-1">
              DETECTED ANOMALIES IN FRAME:
            </div>
            <ul className="space-y-1 text-[11px] text-zinc-300">
              {activeCam.detectedEntities.map((ent, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-red-500">▶</span>
                  <span>{ent}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
