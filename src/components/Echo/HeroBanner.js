'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import heroImg from '@/assets/EC/hero.jpg';
import EC_logo from '@/assets/EC/EC_logo.svg';
import VideoModal from '@/components/VideoModal';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

const HERO_VIDEO_SRC = '/video/vid02.mp4';

export default function HeroBanner() {
  const { t } = useLanguage();
  const { openContactModal } = useContactModal();
  const heroTranslation = t('productPages.echo.hero');
  const downloadTranslation = t('productPages.echo.download');
  const content = typeof heroTranslation === 'object' && heroTranslation !== null ? heroTranslation : {};
  const download = typeof downloadTranslation === 'object' && downloadTranslation !== null ? downloadTranslation : null;
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  const downloadHref = download?.link && download.link !== '#' ? `${basePath}/download/${download.link}` : null;
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const backgroundVideoRef = useRef(null);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  useEffect(() => {
    if (!isVideoModalOpen) return;

    const backgroundVideoElement = backgroundVideoRef.current;

    if (backgroundVideoElement) {
      backgroundVideoElement.pause();
    }

    return () => {
      if (backgroundVideoElement) {
        void backgroundVideoElement.play().catch(() => {});
      }
    };
  }, [closeVideoModal, isVideoModalOpen]);

  return (
    <>
      <section className="relative w-full h-140 lg:h-180 flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={backgroundVideoRef}
          className="absolute inset-0 h-full w-full object-cover filter-[saturate(0.2)]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={heroImg.src}
          aria-hidden="true">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative z-10 container flex flex-col gap-8 mx-auto max-w-6xl items-center justify-center">
          <Image
            src={EC_logo}
            alt={content.logoAlt}
            className="h-auto w-[clamp(10rem,45vw,18rem)] object-contain"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 288px"
          />
          <p
            className="px-6 text-3xl lg:text-4xl text-white font-light text-center"
            dangerouslySetInnerHTML={{ __html: content.tagline }}></p>
          <div className="flex gap-6 ">
            <button
              type="button"
              onClick={openContactModal}
              className="px-6 py-3 backdrop-blur-sm bg-ECmainColor text-white rounded-lg border border-ECmainColor font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white">
              {content.bookDemo}
            </button>
            {/* <button
              type="button"
              onClick={openVideoModal}
              className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-ECmainColor hover:text-black cursor-pointer hover:border-ECmainColor">
              {content.playVideo}
            </button> */}
            {downloadHref && download?.title ? (
              <a
                href={downloadHref}
                download
                className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-ECmainColor hover:text-black cursor-pointer hover:border-ECmainColor text-center">
                {download.title}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        src={HERO_VIDEO_SRC}
        poster={heroImg.src}
        title={content.playVideo}
      />
    </>
  );
}
