"use client";

import React, { useState } from "react";
import { Search, Flame, Upload, User, Video, ShieldAlert, Sparkles } from "lucide-react";
import { sounds } from "@/lib/soundEffects";

interface TubeHeaderProps {
  onSearch: (query: string) => void;
  onUploadClick: () => void;
}

export default function TubeHeader({ onSearch, onUploadClick }: TubeHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playRecallSpam();
    onSearch(searchTerm);
  };

  return (
    <header className="w-full bg-[#08101d] border-b border-[#1b2c45] sticky top-0 z-40 shadow-lg">
      {/* Top Warning Banner Parodi */}
      <div className="bg-[#050b14] text-[11px] text-slate-400 py-1 px-4 text-center border-b border-[#14233a] flex items-center justify-center gap-2">
        <span className="text-red-400 font-bold">⚠️ PORTAL HIBURAN RESMI:</span>
        <span>CSI Anomali - Road to MPL (Mobile Legends Plenger League). 100% Just for Fun & Komedi!</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo Tube Classic */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => {
              sounds.playRecallSpam();
              onSearch("");
              setSearchTerm("");
            }}
            className="flex items-center gap-1.5 cursor-pointer select-none group"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white font-sans group-hover:text-blue-400 transition-colors">
              CSI
            </span>
            <span className="bg-[#e50914] text-white text-base sm:text-lg font-black px-2 py-0.5 rounded tracking-wider uppercase shadow">
              TUBE
            </span>
            <span className="text-[10px] text-blue-400 font-mono font-bold bg-[#11233d] px-1.5 py-0.5 rounded border border-[#1d375e] ml-1 hidden sm:inline">
              ROAD TO MPL
            </span>
          </div>

          {/* Tombol aksi mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onUploadClick}
              className="bg-[#1b2f4d] hover:bg-[#25416c] text-slate-200 text-xs px-2.5 py-1.5 rounded flex items-center gap-1 border border-[#2d4977]"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>

        {/* Search Bar Tube Style */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full md:max-w-xl flex items-center relative"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari video blunder (misal: fanny darat, retri kelomang, layla tank)..."
              className="w-full bg-[#0e1c31] text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-9 pr-3 py-2 rounded-l border border-r-0 border-[#233a5e] focus:outline-none focus:border-blue-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-[#0066cc] hover:bg-[#0077ee] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-r border border-[#0066cc] flex items-center justify-center cursor-pointer transition-colors"
          >
            Cari
          </button>
        </form>

        {/* Navigation / Quick Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onUploadClick}
            className="bg-[#1b2f4d] hover:bg-[#25416c] text-slate-200 font-medium text-xs px-3 py-1.5 rounded flex items-center gap-1.5 border border-[#2d4977] cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            Upload Blunder
          </button>

          <button
            onClick={() => sounds.playRetriMiss()}
            className="bg-[#241315] hover:bg-[#381a1d] text-red-300 font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 border border-red-900/60 cursor-pointer transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Lose Streak 37x
          </button>
        </div>
      </div>
    </header>
  );
}
