"use client";

import React, { useState } from "react";
import { sounds } from "@/lib/soundEffects";
import { MessageSquare, Send, Smile, ThumbsUp } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
  avatar: string;
  tag: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    user: "BocilEpic69",
    text: "Bang, kemaren pas war Fanny lu kenapa muter-muter di buff biru terus tewas kena red buff?",
    time: "2 menit lalu",
    avatar: "🤡",
    tag: "Netizen Julid",
  },
  {
    id: 2,
    user: "CSI•LordRetriBocor",
    text: "Itu pemanasan jari dek! Lagian buff birunya tadi nantangin gue duluan!",
    time: "5 menit lalu",
    avatar: "👑",
    tag: "Kapten Beban",
  },
  {
    id: 3,
    user: "Mak_Ijah_Gorengan",
    text: "WOY KELUAR DARI WARNET! UTANG GORENGAN 4 BIJI SAMA ES TEH JUMBO BELOM DIBAYAR!",
    time: "12 menit lalu",
    avatar: "👵",
    tag: "Sponsor Utama",
  },
  {
    id: 4,
    user: "LaylaTankUser",
    text: "Build full blade armor + antique cuirass di Layla itu meta tersembunyi ya guys, kalian aja yang gak ngerti ilmu!",
    time: "25 menit lalu",
    avatar: "🏹",
    tag: "Gold Lane Sesat",
  },
  {
    id: 5,
    user: "Moonton_Pusat_KW",
    text: "Akun squad ini resmi kami pantau karena dicurigai menjadi penyebab depresi massal pemain publik.",
    time: "1 jam lalu",
    avatar: "🤖",
    tag: "Peringatan",
  },
];

export default function Shoutbox() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [userName, setUserName] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userMsg.trim()) return;

    sounds.playRecallSpam();

    const newComment: Comment = {
      id: Date.now(),
      user: userName.trim(),
      text: userMsg.trim(),
      time: "Baru saja",
      avatar: "🤪",
      tag: "Warga Penasaran",
    };

    setComments([newComment, ...comments]);
    setUserMsg("");
  };

  return (
    <section className="my-10 w-full bg-[#FFFF00] border-8 border-dashed border-[#0000FF] p-4 sm:p-6 shadow-[10px_10px_0px_#FF00FF]">
      {/* Header Shoutbox */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#FF0000] uppercase tracking-tight flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-[#0000FF] animate-bounce" />
            SHOUTBOX WARNET 2000-AN (BUKU TAMU)
          </h2>
          <p className="text-xs sm:text-sm font-bold text-black mt-1">
            Tinggalkan pesan, cacian, motivasi palsu, atau tagihan kas squad di sini!
          </p>
        </div>
        <span className="bg-[#00FF00] text-black font-black text-xs px-2 py-1 border-2 border-black hidden sm:inline-block animate-pulse">
          ONLINE: 4,200 BOCIL
        </span>
      </div>

      {/* Form Kirim Bacotan */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#00FFFF] border-4 border-black p-3 mb-4 space-y-2 shadow-[4px_4px_0px_#000]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nama / Nick MLBB Kamu..."
            required
            className="w-full bg-white text-black font-bold p-2 text-xs sm:text-sm border-2 border-black focus:outline-none"
          />
          <div className="sm:col-span-2 flex gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Tulis pesan / hujatan untuk CSI Anomali..."
              required
              className="w-full bg-white text-black font-bold p-2 text-xs sm:text-sm border-2 border-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#FF0000] hover:bg-red-700 text-yellow-300 font-black px-4 py-2 text-xs sm:text-sm border-2 border-black uppercase flex items-center gap-1 cursor-pointer shrink-0 shadow-[2px_2px_0px_#000]"
            >
              <Send className="w-4 h-4" />
              KIRIM!
            </button>
          </div>
        </div>
      </form>

      {/* Feed Komentar */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-white border-3 border-black p-3 text-black text-xs sm:text-sm shadow-[3px_3px_0px_#000] flex gap-3 items-start"
          >
            <span className="text-3xl bg-yellow-200 border-2 border-black p-1 rounded-sm shrink-0">
              {c.avatar}
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-300 pb-1 mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-blue-800 uppercase font-mono">
                    {c.user}
                  </span>
                  <span className="text-[10px] bg-red-500 text-white font-bold px-1 rounded-xs">
                    {c.tag}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{c.time}</span>
              </div>
              <p className="font-medium text-zinc-900 leading-snug break-words">
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
