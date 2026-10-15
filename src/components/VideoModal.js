'use client';

import { useEffect, useRef } from 'react';

export default function VideoModal({ isOpen, onClose, src, poster, title, loop = true, muted = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const initialOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.currentTime = 0;
      void videoElement.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = initialOverflow;
      window.removeEventListener('keydown', handleEscape);

      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/80 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        onMouseDown={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors duration-200 hover:bg-white hover:text-black"
          aria-label="Close video player">
          <span className="text-2xl leading-none">×</span>
        </button>
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          autoPlay
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
          poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
