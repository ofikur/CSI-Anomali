"use client";

import React, { useState } from "react";
import { VideoItem, VIDEOS } from "@/lib/videoData";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  AlertTriangle,
  Send,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { sounds } from "@/lib/soundEffects";

interface VideoPlayerModalProps {
  video: VideoItem;
  onClose: () => void;
  onSelectVideo: (video: VideoItem) => void;
}

export default function VideoPlayerModal({
  video,
  onClose,
  onSelectVideo,
}: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(4200);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    "BocilWarnet: Lord nya nangis di pojokan liat retri lu bang wkwkwk",
    "MakIjah: Bayar bakwan 4 biji dulu woy baru nonton replay!",
    "MoontonOfficer: Akun ini resmi kami jadikan studi kasus penurunan mental pemain.",
    "LaylaUser69: Build 6 sepatu warrior boots terbukti ampuh buat lari dari kenyataan.",
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePlayToggle = () => {
    if (!isPlaying) {
      sounds.playRecallSpam();
      setIsPlaying(true);
    } else {
      sounds.playRetriMiss();
      setIsPlaying(false);
    }
  };

  const handleLike = () => {
    sounds.playRecallSpam();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    sounds.playRecallSpam();
    setComments([`Kamu: ${newComment.trim()}`, ...comments]);
    setNewComment("");
  };

  const relatedVideos = VIDEOS.filter((v) => v.id !== video.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0b1626] border border-[#203657] rounded-lg w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#070f1a] border-b border-[#182a45]">
          <div className="flex items-center gap-2">
            <span className="bg-[#e50914] text-white font-black text-xs px-2 py-0.5 rounded">
              CSI-PLAYER
            </span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              REPLAY ID: #{video.id} • {video.resolution}
            </span>
          </div>
          <button
            onClick={() => {
              sounds.playErrorBonk();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1a2f4d] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-3 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Video Player & Details (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Mock Video Screen */}
              <div
                className={`relative aspect-video w-full rounded-md bg-gradient-to-br ${video.thumbnailColor} border border-[#1f375a] flex flex-col justify-between overflow-hidden shadow-inner group`}
              >
                {/* Center Content / Graphic */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-6xl sm:text-7xl animate-pulse">
                    {video.heroIcon}
                  </span>
                  <div className="mt-3 bg-black/70 text-slate-100 text-xs sm:text-sm px-3 py-1 rounded border border-white/20 font-bold max-w-md">
                    {isPlaying ? "▶️ SEDANG MEMUTAR BLUNDER MATCH..." : "⏸️ VIDEO DIPAUSET"}
                  </div>
                  <p className="text-[11px] text-red-400 font-mono mt-1">
                    PING SERVER: 999ms • FPS: 14 (LELET)
                  </p>
                </div>

                {/* Video Controls Bar */}
                <div className="bg-black/90 p-2 sm:p-3 flex items-center justify-between gap-3 text-white border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayToggle}
                      className="bg-[#0066cc] hover:bg-[#0077ee] text-white p-1.5 rounded cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-slate-300 hover:text-white cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-mono text-slate-300">
                      04:20 / {video.duration}
                    </span>
                  </div>

                  {/* Scrub Bar */}
                  <div className="flex-1 mx-2 hidden sm:block">
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-600 h-full w-[35%]"></div>
                    </div>
                  </div>

                  <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-black font-mono">
                    {video.resolution}
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {video.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-[#182b47]">
                  {/* Uploader info */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-[#142338] border border-[#203657] p-1.5 rounded-full">
                      {video.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-white">
                          {video.uploader}
                        </span>
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <span className="text-xs text-slate-400">
                        {video.uploaderRole} • 420K Subscriber Warnet
                      </span>
                    </div>
                  </div>

                  {/* Actions (Like, Dislike, Share) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border transition-colors cursor-pointer ${
                        hasLiked
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-[#13233b] hover:bg-[#1a3052] text-slate-200 border-[#233d63]"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {likes}
                    </button>

                    <button
                      onClick={() => sounds.playRetriMiss()}
                      className="bg-[#13233b] hover:bg-[#1a3052] text-slate-300 px-3 py-1.5 rounded text-xs font-bold border border-[#233d63] flex items-center gap-1 cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      12
                    </button>

                    <button
                      onClick={() => {
                        sounds.playRecallSpam();
                        alert("Link blunder berhasil disalin! Silakan sebar ke grup mabar!");
                      }}
                      className="bg-[#13233b] hover:bg-[#1a3052] text-slate-300 px-3 py-1.5 rounded text-xs font-bold border border-[#233d63] flex items-center gap-1 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3 bg-[#0d1a2d] p-3 rounded border border-[#192c47] text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-2">
                    <span>{video.views} kali ditonton</span>
                    <span>•</span>
                    <span>Diunggah {video.uploadedTime}</span>
                  </div>
                  <p className="leading-relaxed">{video.description}</p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="pt-2">
                <h3 className="font-bold text-sm text-slate-200 mb-2">
                  Komentar ({comments.length + 180})
                </h3>

                <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis tanggapan atau hujatan untuk match ini..."
                    className="flex-1 bg-[#0c182a] text-slate-200 text-xs px-3 py-2 rounded border border-[#213757] focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-[#0066cc] hover:bg-[#0077ee] text-white px-3 py-2 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Kirim
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                  {comments.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0e1c30] p-2 rounded border border-[#1b2f4d] text-slate-300"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Video Terkait / Blunder Serupa (1 Col) */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-[#182b47] pb-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Blunder Terkait Lainnya
              </h3>

              <div className="space-y-2.5">
                {relatedVideos.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      sounds.playRecallSpam();
                      onSelectVideo(r);
                    }}
                    className="flex gap-2.5 bg-[#0e1a2c] hover:bg-[#142640] p-1.5 rounded border border-[#1b2f4c] cursor-pointer group transition-colors"
                  >
                    <div
                      className={`relative aspect-video w-28 shrink-0 rounded bg-gradient-to-br ${r.thumbnailColor} flex items-center justify-center overflow-hidden`}
                    >
                      <span className="text-xl">{r.heroIcon}</span>
                      <span className="absolute bottom-1 right-1 bg-black/90 text-white text-[9px] font-mono px-1 rounded">
                        {r.duration}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 line-clamp-2 leading-tight">
                        {r.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 truncate">
                        {r.uploader}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {r.views} • {r.rating}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
