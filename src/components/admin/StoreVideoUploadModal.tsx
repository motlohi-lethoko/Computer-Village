import React, { useState } from 'react';
import { X, Upload, Video, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface StoreVideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreVideoUploadModal: React.FC<StoreVideoUploadModalProps> = ({ isOpen, onClose }) => {
  const { addStoreVideo, uploadMediaHelper, showToast } = useShop();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('/assets/images/computer_village_flyer.jpg');
  const [duration, setDuration] = useState('0:30');
  const [category, setCategory] = useState('Store Tour');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleVideoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMessage('');
      setStatusMsg('Reading and processing video file...');
      const url = await uploadMediaHelper(file);
      setVideoUrl(url);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
      }
      setStatusMsg('Video uploaded successfully!');
    } catch {
      setErrorMessage('Could not process video file. Please ensure it is MP4 or WebM.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleThumbnailFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMessage('');
      const url = await uploadMediaHelper(file);
      setThumbnail(url);
    } catch {
      setErrorMessage('Could not process image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      setErrorMessage('Please upload a video file or enter a video URL.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      addStoreVideo({
        title: title.trim() || 'Computer Village Store Walkthrough',
        description: description.trim() || 'Floor tour of current laptop stock and accessories at Metcash Complex Room 104A.',
        videoUrl,
        thumbnail,
        duration: duration || '0:30',
        category: category as any
      });
      setIsSaving(false);
      setSaveSuccess(true);
      showToast('✓ Walkthrough video published to Store Tour', 'success');
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-5 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Upload Store Tour Video
              </h3>
              <p className="text-xs text-slate-500">
                Add video demo to the store walkthrough section
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Video Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Laptops On Display & Shop Shelves"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description / What is shown
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Walkthrough of HP & Lenovo laptops on display, routers, and original chargers."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Video file upload */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Select Video File (MP4, WebM)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoFile}
              disabled={isUploading}
              className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

            <div className="pt-2 border-t border-slate-200">
              <label className="block text-[11px] text-slate-500 mb-1">Or paste direct video URL:</label>
              <input
                type="text"
                placeholder="https://..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || isSaving}
              className={`px-5 py-2.5 rounded-lg text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/25'
                  : 'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-600/20 active:scale-[0.98]'
              } ${isSaving ? 'opacity-90 cursor-wait' : ''}`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Publishing Video...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>✓ Video Published!</span>
                </>
              ) : isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Uploading Media...</span>
                </>
              ) : (
                <span>Publish Video to Store</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
