"use client";

import React, { useState, useRef, useEffect } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import { Terminal, Shield, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalLog {
  id: number;
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 1,
      type: "system",
      text: "[+] TOR CIRCUIT ESTABLISHED // ROUTED VIA WARNET_BAROKAH_NODE_04",
    },
    {
      id: 2,
      type: "system",
      text: "[+] CSI ANOMALI MAINFRAME ACCESSED // THREAT CLASSIFICATION: PLENGER",
    },
    {
      id: 3,
      type: "output",
      text: "Type 'help' to inspect intercepted squad exploits, rosters, or leaked files.",
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    cyberSounds.playKeyClick();

    const newLogs: TerminalLog[] = [
      ...logs,
      { id: Date.now(), type: "input", text: `root@csi-anomali:~# ${inputVal}` },
    ];

    switch (cmd) {
      case "help":
        newLogs.push({
          id: Date.now() + 1,
          type: "output",
          text: `AVAILABLE COMMANDS:
  roster     - Inspect classified operative records and feeder profiles
  retri      - Execute emergency retribution algorithm (99.8% fail rate)
  leak       - Read intercepted Moonton confidential surveillance memo
  market     - Query Dark Web Black Market illicit MLBB items
  tas        - Broadcast 10x high-frequency recall taunting packets
  bintang    - Query current squad star inventory (Warning: Depleted)
  clear      - Purge console visual buffer
  exit       - Attempt disconnect from the Anomali`,
        });
        break;

      case "roster":
        cyberSounds.playSonarPing();
        newLogs.push({
          id: Date.now() + 1,
          type: "output",
          text: `[CLASSIFIED DOSSIER ARCHIVE]
- AGENT 01: LordRetriBocor [Jungler] -> Threat: CRITICAL CRAB DESTROYER
- AGENT 02: LaylaGarisKeras [Gold]   -> Threat: 6 BOOTS TANK PROTOTYPE
- AGENT 03: TigrealAngin [Roamer]    -> Threat: INVERSE ENEMY TRANSPORTER
- AGENT 04: NanaSemak [Mid Lane]     -> Threat: PSYCHOLOGICAL TAS-TAS DDOS
- AGENT 05: ZilongPasrah [EXP Lane]  -> Threat: SPLIT PUSH SUICIDE RUNNER
- AGENT 00: CadanganMental [Coach]   -> Threat: 999MS PACKET LOSS HAZARD`,
        });
        break;

      case "retri":
        cyberSounds.playRetriGlitch();
        newLogs.push({
          id: Date.now() + 1,
          type: "error",
          text: `[!] EXECUTING RETRIBUTION ALGORITHM...
[!] TARGET: ENEMY LORD (HP: 1,420)
[!] ERROR 0xDEAD_CRAB: Retribution missed Lord by 3.8 yards!
[+] Successfully smited 1x Wild Jungle Kelomang (Crab)!
[-] Enemy Jungler secured Lord with auto-attack. Teammates mental state: -50.`,
        });
        break;

      case "leak":
        cyberSounds.playGlitchBurst();
        newLogs.push({
          id: Date.now() + 1,
          type: "output",
          text: `[TOP SECRET LEAKED MEMO - MOONTON INVESTIGATION DEPT]
DATE: 2026-11-22
SUBJECT: Squad CSI Anomali containment breach.
SUMMARY: We detected an anomalous syndicate deliberately queueing ranked matches at 3 AM.
Witness reports indicate player 'LordRetri' flew across the entire map on Fanny, missed all wires,
and landed straight into enemy base fountain while typing 'lag sumpah'.
RECOMMENDATION: Quarantine squad in Master V division permanently.`,
        });
        break;

      case "tas":
        cyberSounds.playDigitalRecall();
        newLogs.push({
          id: Date.now() + 1,
          type: "output",
          text: `[!] BROADCASTING RECALL PACKETS:
🌀 TAS! TAS! TAS! TAS! TAS! TAS! TAS! TAS!
[!] Warning: Enemy Franco is now locking hook onto your exact coordinates.`,
        });
        break;

      case "bintang":
        cyberSounds.playGlitchBurst();
        newLogs.push({
          id: Date.now() + 1,
          type: "error",
          text: `[!] QUERYING STAR INVENTORY:
Current Mythic Stars: 0 ⭐
Historical Stars Lost: -184 ⭐
Division Status: DERANKED TO PEON LEVEL 3`,
        });
        break;

      case "market":
        newLogs.push({
          id: Date.now() + 1,
          type: "output",
          text: `[DARKNET BAZAAR FEED]
- Stolen Mythic Star (Untraced)       : 0.00042 BTC
- Fanny Auto-Target Wall Remover     : 0.00085 XMR
- Military Phone Casing (Anti-Banting): 0.00150 BTC
Scroll down to the 'Underground Black Market' section to order.`,
        });
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        cyberSounds.playBreachAlarm();
        newLogs.push({
          id: Date.now() + 1,
          type: "error",
          text: `[!] ACCESS DENIED: There is no exit from the CSI Anomali lose streak.`,
        });
        break;

      default:
        cyberSounds.playGlitchBurst();
        newLogs.push({
          id: Date.now() + 1,
          type: "error",
          text: `sh: command not found: '${cmd}'. Type 'help' for permitted terminal commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  return (
    <div className="w-full bg-[#05090c] border border-[#1a3826] shadow-[0_0_25px_rgba(0,255,102,0.1)] my-8">
      {/* Terminal Title Bar */}
      <div className="bg-[#09131a] border-b border-[#142d1f] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00ff66]" />
          <span className="text-xs font-mono font-bold text-zinc-300">
            root@csi-anomali:~# [DARKNET TERMINAL INTERFACE v4.2]
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40 border border-rose-400" />
        </div>
      </div>

      {/* Terminal Body Screen */}
      <div className="p-4 font-mono text-xs md:text-sm text-[#00ff66] min-h-[220px] max-h-[340px] overflow-y-auto space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`${
              log.type === "error"
                ? "text-[#ff003c]"
                : log.type === "system"
                ? "text-cyan-400"
                : log.type === "input"
                ? "text-zinc-300 font-bold"
                : "text-emerald-400"
            } whitespace-pre-wrap leading-relaxed`}
          >
            {log.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={handleCommand}
        className="bg-[#081016] border-t border-[#142d1f] px-3 py-2 flex items-center gap-2"
      >
        <span className="text-[#00ff66] font-mono font-bold text-xs">
          root@csi-anomali:~#
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help', 'retri', 'roster', 'leak'..."
          className="flex-1 bg-transparent border-none text-[#00ff66] font-mono text-xs focus:outline-none placeholder-zinc-600"
        />
        <button
          type="submit"
          className="text-zinc-500 hover:text-[#00ff66] transition-colors p-1 cursor-pointer"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
