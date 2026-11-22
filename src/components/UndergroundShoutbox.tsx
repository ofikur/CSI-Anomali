"use client";

import React, { useState } from "react";
import { cyberSounds } from "@/lib/soundEffects";
import { MessageSquare, Send, Shield, Radio, Lock } from "lucide-react";

interface WiretapMessage {
  id: number;
  handle: string;
  msg: string;
  time: string;
  classification: string;
}

const INITIAL_MESSAGES: WiretapMessage[] = [
  {
    id: 1,
    handle: "ANON_JULID_69",
    msg: "Lapor komandan, Fanny CSI Anomali barusan meluncur tapi kabelnya nyangkut di tiang jemuran warga.",
    time: "2m ago",
    classification: "INTERCEPTED",
  },
  {
    id: 2,
    handle: "LORD_RETRI_BOCOR",
    msg: "Retri tadi sengaja dihemat untuk season depan, biar musuh merasa menang semu.",
    time: "8m ago",
    classification: "SQUAD_CORE",
  },
  {
    id: 3,
    handle: "MOONTON_CYBER_AGENT",
    msg: "Server kami mencatat anomali: tim ini berhasil lose streak 38x berturut-turut tanpa menghapus game.",
    time: "24m ago",
    classification: "MONITORING",
  },
  {
    id: 4,
    handle: "MAK_IJAH_GORENGAN",
    msg: "WOY KELUAR DARI DARKNET! KAS WARNET SAMA UTANG BAKWAN TAHU 3 BIJI BELOM DIBAYAR!",
    time: "1h ago",
    classification: "DOMESTIC_TAP",
  },
];

export default function UndergroundShoutbox() {
  const [messages, setMessages] = useState<WiretapMessage[]>(INITIAL_MESSAGES);
  const [alias, setAlias] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alias.trim() || !text.trim()) return;

    cyberSounds.playKeyClick();
    cyberSounds.playSonarPing();

    const newMsg: WiretapMessage = {
      id: Date.now(),
      handle: alias.trim().toUpperCase(),
      msg: text.trim(),
      time: "Just now",
      classification: "ANONYMOUS_LEAK",
    };

    setMessages([newMsg, ...messages]);
    setText("");
  };

  return (
    <section className="my-12 w-full bg-[#05090c] border border-[#142d1f] p-4 sm:p-6 font-mono">
      {/* Header Wiretap */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#142d1f] pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            ENCRYPTED ONION WIRETAP (SHOUTBOX)
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>E2E TOR-ENCRYPTED FEED</span>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-[#071016] border border-[#163323] p-3 mb-4 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Agent Codename..."
            required
            className="bg-[#020507] border border-[#163323] text-emerald-400 p-2 text-xs focus:outline-none focus:border-emerald-400 font-bold"
          />
          <div className="sm:col-span-2 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Drop encrypted intel / roast for CSI Anomali..."
              required
              className="w-full bg-[#020507] border border-[#163323] text-zinc-200 p-2 text-xs focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="bg-[#0f2d1e] hover:bg-[#16432c] border border-[#00ff66] text-[#00ff66] px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT</span>
            </button>
          </div>
        </div>
      </form>

      {/* Message Feed */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className="bg-[#030608] border border-[#102318] p-3 text-xs space-y-1 hover:border-emerald-900/60 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] border-b border-zinc-900 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">~{m.handle}</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 border border-emerald-900">
                  {m.classification}
                </span>
              </div>
              <span className="text-zinc-600 text-[10px]">{m.time}</span>
            </div>
            <p className="text-zinc-300 pt-0.5 leading-relaxed">{m.msg}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
