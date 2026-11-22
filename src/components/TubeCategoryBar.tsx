"use client";

import React from "react";
import { sounds } from "@/lib/soundEffects";

interface TubeCategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = [
  "Semua Klip",
  "Retri Indomaret",
  "Fanny Darat",
  "Layla Tank 6 Sepatu",
  "Tigreal Dorong Temen",
  "Nana Tas-Tas-Tas",
  "Zilong Split Push",
  "Surrender Menit 3",
  "Ping 999ms",
  "Bocil Warnet",
];

export default function TubeCategoryBar({
  selectedCategory,
  onSelectCategory,
}: TubeCategoryBarProps) {
  const handleClick = (cat: string) => {
    sounds.playRecallSpam();
    onSelectCategory(cat);
  };

  return (
    <div className="w-full bg-[#0a1424] border-b border-[#182840] py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={`whitespace-nowrap px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
                isActive
                  ? "bg-[#0066cc] text-white font-bold"
                  : "bg-[#101e33] hover:bg-[#182c4a] text-slate-300 border border-[#1d3354]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
