"use client";

import React from "react";
import { VideoItem } from "@/lib/videoData";
import { Play, ThumbsUp, Eye, Clock, CheckCircle } from "lucide-react";
import { sounds } from "@/lib/soundEffects";

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
}

export default function VideoCard({ video, onSelect }: VideoCardProps) {
  const handleClick = () => {
    sounds.playRecallSpam();
    onSelect(video);
  };

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col bg-[#0f1d33] hover:bg-[#152745] border border-[#1e3456] hover:border-[#35588a] rounded overflow-hidden cursor-pointer transition-all duration-200 select-none shadow-md hover:shadow-xl"
    >
      {/* Thumbnail Container */}
      <div className={`relative aspect-video w-full bg-gradient-to-br ${video.thumbnailColor} flex items-center justify-center overflow-hidden`}>
        {/* Background Decorative MLBB Mock Frame */}
        <div className="absolute inset-0 opacity-25 flex flex-col justify-between p-2 pointer-events-none">
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-300">
            <span>MLBB_PLENGER_LEAGUE</span>
            <span className="text-red-400">PING: 999ms</span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
            <span>CSI_ANOMALI_SQUAD</span>
            <span>BLUNDER_MATCH</span>
          </div>
        </div>

        {/* Hero Emoji / Center Mock Graphic */}
        <div className="flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <span className="text-4xl sm:text-5xl drop-shadow-lg">{video.heroIcon}</span>
          <span className="text-[10px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded mt-1 border border-white/10 uppercase tracking-widest">
            {video.category}
          </span>
        </div>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Quality Badge (Top Left) */}
        <div className="absolute top-1.5 left-1.5 bg-black/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded border border-white/20">
          {video.resolution}
        </div>

        {/* Duration Badge (Bottom Right) */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
          <Clock className="w-2.5 h-2.5 text-slate-300" />
          {video.duration}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-2.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title in Tube Link Style */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-blue-400 line-clamp-2 leading-snug transition-colors">
            {video.title}
          </h3>

          {/* Uploader Name */}
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-400">
            <span className="text-xs">{video.avatar}</span>
            <span className="hover:text-slate-200 truncate font-medium">
              {video.uploader}
            </span>
            <CheckCircle className="w-3 h-3 text-blue-400 shrink-0" />
          </div>
        </div>

        {/* Metadata Footer: Views & Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-1.5 border-t border-[#182b47]">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-slate-400" />
            <span>{video.views}</span>
          </div>

          <div className="flex items-center gap-1 text-green-400 font-bold">
            <ThumbsUp className="w-3 h-3" />
            <span>{video.rating}%</span>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            {video.uploadedTime}
          </span>
        </div>
      </div>
    </div>
  );
}
