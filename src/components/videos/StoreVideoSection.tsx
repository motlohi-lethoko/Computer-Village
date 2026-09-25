import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Plus, 
  Trash2, 
  Upload, 
  MapPin,
  Clock
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { StoreVideo } from '../../types';

interface StoreVideoSectionProps {
  onOpenVideoUploadModal: () => void;
}

export const StoreVideoSection: React.FC<StoreVideoSectionProps> = ({ onOpenVideoUploadModal }) => {
  const { storeVideos, isAdmin, deleteStoreVideo } = useShop();
  const [selectedVideo, setSelectedVideo] = useState<StoreVideo>(
    storeVideos[0] || {
      id: 'default',
      title: 'Computer Village Metcash Store Tour',
      description: 'Live walkthrough of shelves stocked with EB-Link routers, Nesty headsets, and laptop accessories.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dateAdded: '2026-09-24'
    }
  );

  return (
    <section id="video-tour" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
              Store Floor Video Tour
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Watch Computer Village In Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Tour our shop floor at Metcash Complex Room 104A and watch live diagnostic demos from our technical workbench.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenVideoUploadModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>+ Upload New Video</span>
            </button>
          )}
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Player Screen */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-4 p-4 sm:p-5">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 shadow-inner">
              <video
                key={selectedVideo.videoUrl}
                src={selectedVideo.videoUrl}
                controls
                autoPlay={false}
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video streaming.
              </video>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>

              <div className="text-right sm:shrink-0 flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  Room 104A Metcash
                </span>
                {isAdmin && storeVideos.length > 1 && (
                  <button
                    onClick={() => deleteStoreVideo(selectedVideo.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200 cursor-pointer"
                    title="Delete this video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Video Playlist Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Video Playlist ({storeVideos.length})
            </h4>

            <div className="space-y-2.5">
              {storeVideos.map(video => {
                const isSelected = selectedVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-12 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden relative">
                      <Play className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className={`text-xs font-bold truncate ${
                        isSelected ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {video.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {video.description}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Added: {video.dateAdded}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-store Visit prompt */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Visit Us in Person</span>
              </div>
              <p className="text-xs text-slate-600">
                Test any laptop on our showroom counter before paying. Metcash Complex, Room 104A (Next to FNB ATM).
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
