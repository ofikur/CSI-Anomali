"use client";

import React, { useState, useMemo } from "react";
import TubeHeader from "@/components/TubeHeader";
import TubeCategoryBar from "@/components/TubeCategoryBar";
import VideoCard from "@/components/VideoCard";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import TubeSidebar from "@/components/TubeSidebar";
import UploadModal from "@/components/UploadModal";
import { VIDEOS, VideoItem } from "@/lib/videoData";
import { sounds } from "@/lib/soundEffects";
import { Flame, Play, Sparkles, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function Home() {
  const [videoList, setVideoList] = useState<VideoItem[]>(VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState("Semua Klip");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter video berdasarkan pencarian dan kategori
  const filteredVideos = useMemo(() => {
    return videoList.filter((v) => {
      const matchCat =
        selectedCategory === "Semua Klip" ||
        v.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        v.title.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchSearch =
        !searchQuery.trim() ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [videoList, selectedCategory, searchQuery]);

  const handleUploadSuccess = (newVid: VideoItem) => {
    setVideoList([newVid, ...videoList]);
  };

  const featuredVideo = videoList[0];

  return (
    <div className="min-h-screen bg-[#0c1626] text-slate-200 flex flex-col font-sans">
      {/* Header Utama Tube */}
      <TubeHeader
        onSearch={(query) => {
          setSearchQuery(query);
          setSelectedCategory("Semua Klip");
        }}
        onUploadClick={() => setShowUploadModal(true)}
      />

      {/* Bar Kategori Tagar */}
      <TubeCategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery("");
        }}
      />

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 flex-1 w-full space-y-6">
        {/* Banner Utama / Featured Match of The Day */}
        {selectedCategory === "Semua Klip" && !searchQuery && (
          <div
            onClick={() => {
              sounds.playRecallSpam();
              setActiveVideo(featuredVideo);
            }}
            className="group relative bg-[#09121f] border border-[#1b2d49] hover:border-blue-500/60 rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div
                className={`relative aspect-video md:aspect-auto bg-gradient-to-br ${featuredVideo.thumbnailColor} flex items-center justify-center p-6`}
              >
                <span className="text-6xl sm:text-7xl transform group-hover:scale-110 transition-transform">
                  {featuredVideo.heroIcon}
                </span>
                <div className="absolute top-2 left-2 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow">
                  <Flame className="w-3 h-3 animate-pulse" />
                  Klip Terpanas Hari Ini
                </div>
                <div className="absolute bottom-2 right-2 bg-black/90 text-white font-mono text-xs px-2 py-0.5 rounded">
                  {featuredVideo.duration}
                </div>
              </div>

              <div className="p-4 sm:p-5 md:col-span-2 flex flex-col justify-between space-y-3 bg-[#0d1829]">
                <div>
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-bold mb-1">
                    <span>{featuredVideo.category}</span>
                    <span>•</span>
                    <span className="text-slate-400">{featuredVideo.views} views</span>
                    <span>•</span>
                    <span className="text-green-400">{featuredVideo.rating}% Kepuasan</span>
                  </div>
                  <h2 className="text-base sm:text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {featuredVideo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#182b47] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{featuredVideo.avatar}</span>
                    <span className="font-bold text-slate-200">
                      {featuredVideo.uploader}
                    </span>
                    <span className="text-slate-400">({featuredVideo.uploaderRole})</span>
                  </div>
                  <button className="bg-[#0066cc] group-hover:bg-[#0077ee] text-white px-3.5 py-1.5 rounded font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Putar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout 2 Kolom: Grid Video + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Kolom Video Grid (3 Kolom) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Header Bagian Video */}
            <div className="flex items-center justify-between border-b border-[#182b47] pb-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                <span>
                  {searchQuery
                    ? `Hasil Pencarian: "${searchQuery}"`
                    : selectedCategory === "Semua Klip"
                    ? "Semua Klip Blunder & Fail Terbaru"
                    : `Kategori: ${selectedCategory}`}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ({filteredVideos.length} video)
                </span>
              </h2>

              <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
                <span>Urutkan:</span>
                <span className="text-blue-400 font-bold cursor-pointer">Paling Banyak Dihujat ▼</span>
              </div>
            </div>

            {/* Grid Video */}
            {filteredVideos.length === 0 ? (
              <div className="bg-[#0d1829] border border-[#1b2d49] rounded p-8 text-center space-y-2">
                <AlertCircle className="w-10 h-10 text-yellow-400 mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-white">Tidak Ada Video yang Cocok</h3>
                <p className="text-xs text-slate-400">
                  Coba cari dengan kata kunci lain seperti &quot;fanny&quot;, &quot;retri&quot;, &quot;layla&quot;, atau klik salah satu tag di atas.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onSelect={(v) => setActiveVideo(v)}
                  />
                ))}
              </div>
            )}

            {/* Classic Tube Pagination */}
            <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-1.5 text-xs font-bold select-none">
              <button
                onClick={() => {
                  sounds.playRecallSpam();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className="px-2.5 py-1.5 bg-[#101e33] hover:bg-[#192f52] text-slate-300 rounded border border-[#1e365b] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Sebelumnya
              </button>

              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    sounds.playRecallSpam();
                    setCurrentPage(num);
                  }}
                  className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                    currentPage === num
                      ? "bg-[#0066cc] text-white font-extrabold"
                      : "bg-[#101e33] hover:bg-[#192f52] text-slate-300 border border-[#1e365b]"
                  }`}
                >
                  {num}
                </button>
              ))}

              <span className="px-2 text-slate-500">...</span>
              <button
                onClick={() => {
                  sounds.playRecallSpam();
                  setCurrentPage(69);
                }}
                className="w-8 h-8 rounded flex items-center justify-center bg-[#101e33] hover:bg-[#192f52] text-slate-300 border border-[#1e365b] cursor-pointer"
              >
                69
              </button>

              <button
                onClick={() => {
                  sounds.playRecallSpam();
                  setCurrentPage((p) => p + 1);
                }}
                className="px-2.5 py-1.5 bg-[#101e33] hover:bg-[#192f52] text-slate-300 rounded border border-[#1e365b] flex items-center gap-1 cursor-pointer"
              >
                Selanjutnya
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Kolom Sidebar (1 Kolom) */}
          <div className="lg:col-span-1">
            <TubeSidebar
              onTagClick={(tag) => {
                setSearchQuery(tag);
                setSelectedCategory("Semua Klip");
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer Classic Tube */}
      <footer className="w-full bg-[#08101d] border-t border-[#17273d] py-6 px-4 text-xs text-slate-400 mt-10">
        <div className="max-w-7xl mx-auto space-y-3 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300 font-medium">
            <span className="hover:text-blue-400 cursor-pointer">Tentang CSI Anomali</span>
            <span>•</span>
            <span className="hover:text-blue-400 cursor-pointer">Jadwal Plenger League</span>
            <span>•</span>
            <span className="hover:text-blue-400 cursor-pointer">Syarat Masuk Squad (WR &lt; 40%)</span>
            <span>•</span>
            <span className="hover:text-blue-400 cursor-pointer">Kontak Warnet Pos Ronda</span>
            <span>•</span>
            <span className="hover:text-blue-400 cursor-pointer">Kebijakan Anti-Surrender</span>
          </div>

          <p className="text-[11px] text-slate-400">
            ⚠️ Disclaimer: Website ini adalah parodi murni bertema portal video untuk squad Mobile Legends: Bang Bang &quot;CSI Anomali - Road to MPL&quot;. Dibuat 100% just for fun, humor, dan hiburan komunitas gamer tanpa muatan konten dewasa.
          </p>

          <p className="text-[10px] text-slate-400 font-mono">
            © 2026 CSI-TUBE • Powered by Next.js 16 & Tailwind CSS • Lose Streak 37x Berkelanjutan.
          </p>
        </div>
      </footer>

      {/* Modal Video Player Interaktif */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onSelectVideo={(v) => setActiveVideo(v)}
        />
      )}

      {/* Modal Upload Blunder */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
