"use client";

import React, { useState } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import {
  ShieldAlert,
  Radio,
  Lock,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
  AlertTriangle,
  Globe,
  Wifi,
} from "lucide-react";

export default function TorHeader() {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [ping, setPing] = useState(999);
  const [securityStatus, setSecurityStatus] = useState("ENCRYPTED (TOR v3)");

  const handleToggleAudio = () => {
    const active = cyberSounds.toggleAmbientDrone((playing) => {
      setIsAudioOn(playing);
    });
    setIsAudioOn(active);
    cyberSounds.playKeyClick();
  };

  const handleSonar = () => {
    cyberSounds.playSonarPing();
    setPing(Math.floor(Math.random() * 200) + 850);
  };

  const handleBreach = () => {
    cyberSounds.playBreachAlarm();
    setSecurityStatus("WARNING: MOONTON RADAR DETECTED!");
    setTimeout(() => setSecurityStatus("ENCRYPTED (TOR v3)"), 4000);
  };

  return (
    <header className="w-full bg-[#030708] border-b border-[#1e3a2b] sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      {/* Onion Network Address Simulator Bar */}
      <div className="bg-[#070d10] border-b border-[#0f2419] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <div className="flex items-center gap-1.5 bg-[#0a141b] border border-[#1a3826] px-2.5 py-1 text-[#00ff66]">
            <span className="text-base">🧅</span>
            <Lock className="w-3.5 h-3.5 text-[#00ff66]" />
            <span className="text-zinc-400 select-all">
              csianomali7x9kq4plenger.onion
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-[#ff003c]/10 border border-[#ff003c]/40 text-[#ff003c] text-[10px] uppercase font-bold tracking-wider">
            <ShieldAlert className="w-3 h-3" />
            {securityStatus}
          </span>
        </div>

        {/* Tor Circuit Route Display */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="text-zinc-400 font-bold">TOR CIRCUIT:</span>
          <span className="text-emerald-400">Guard [Warnet Barokah]</span>
          <span>→</span>
          <span className="text-cyan-400">Relay [Proxy Ciganjur]</span>
          <span>→</span>
          <span className="text-amber-400">Exit [Pos Ronda RT 03]</span>
          <span>→</span>
          <span className="text-[#ff003c] font-black">CSI-ANOMALI.CORE</span>
        </div>

        {/* Controls: Audio Synth & Sonar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSonar}
            className="flex items-center gap-1 bg-[#0a141b] hover:bg-[#12222e] border border-[#00f0ff]/40 text-[#00f0ff] px-2 py-1 text-[11px] transition-colors cursor-pointer"
            title="Scan Tor Nodes"
          >
            <Radio className="w-3 h-3 animate-pulse text-[#00f0ff]" />
            <span>PING: {ping}ms</span>
          </button>

          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] border transition-all cursor-pointer font-bold ${
              isAudioOn
                ? "bg-[#00ff66]/10 border-[#00ff66] text-[#00ff66] glow-green"
                : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#00ff66]" />
                <span>DARKNET AMBIENCE [ON]</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>AMBIENCE [OFF]</span>
              </>
            )}
          </button>

          <button
            onClick={handleBreach}
            className="flex items-center gap-1 bg-[#ff003c]/20 hover:bg-[#ff003c]/30 border border-[#ff003c] text-[#ff003c] px-2 py-1 text-[11px] font-bold cursor-pointer"
          >
            <AlertTriangle className="w-3 h-3" />
            <span className="hidden sm:inline">SIMULATE BREACH</span>
          </button>
        </div>
      </div>

      {/* Redacted Dark Web Threat Ticker */}
      <div className="bg-[#05080a] border-b border-[#0f2419] py-1 px-4 overflow-hidden whitespace-nowrap text-xs text-zinc-400 flex items-center gap-4">
        <span className="bg-[#ff003c] text-black font-black text-[10px] px-1.5 py-0.2 uppercase shrink-0">
          CLASSIFIED INTEL
        </span>
        <div className="inline-block animate-[marquee-scroll_25s_linear_infinite] font-mono text-[11px]">
          [DEPT OF ANOMALY] THREAT LEVEL: MAXIMUM LOSE STREAK // OPERATIVE LORD_RETRI REPORTED 4,290 RETRI FAILS ON WILD CRAB //
          MOONTON SURVEILLANCE DRONES INTERCEPTED OVER WARNET POS 04 // BOUNTY ISSUED: 500 XMR FOR SAFE RETURN OF LOST MYTHIC STARS //
          ROAD TO MPL (MOBILE LEGENDS PLENGER LEAGUE) PROTOCOL ACTIVATED //
        </div>
      </div>
    </header>
  );
}
