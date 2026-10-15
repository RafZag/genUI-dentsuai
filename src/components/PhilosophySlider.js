'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

export default function PhilosophySlider() {
  const { t } = useLanguage();
  const translatedPhilosophies = t('philosophySlider.items');
  const philosophies = Array.isArray(translatedPhilosophies) ? translatedPhilosophies : [];
  const hasPhilosophies = philosophies.length > 0;
  const slideCount = philosophies.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [animationDirection, setAnimationDirection] = useState(1);

  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  const changeSlide = useCallback(
    (direction) => {
      if (!hasPhilosophies) {
        return;
      }

      setAnimationDirection(direction);
      setAnimationPhase('out');

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + direction + slideCount) % slideCount);
        setAnimationPhase('pre-in');

        animationFrameRef.current = requestAnimationFrame(() => {
          setAnimationPhase('idle');
        });
      }, 220);
    },
    [hasPhilosophies, slideCount],
  );

  const resetAutoplay = useCallback(() => {
    if (!hasPhilosophies) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      changeSlide(1);
    }, 10000);
  }, [changeSlide, hasPhilosophies]);

  const goToPrevious = () => {
    changeSlide(-1);
    resetAutoplay();
  };

  const goToNextWithReset = () => {
    changeSlide(1);
    resetAutoplay();
  };

  useEffect(() => {
    resetAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resetAutoplay]);

  const isAnimating = animationPhase !== 'idle';

  const contentAnimationClass =
    animationPhase === 'out'
      ? animationDirection === 1
        ? 'opacity-0 translate-x-3'
        : 'opacity-0 -translate-x-3'
      : animationPhase === 'pre-in'
        ? animationDirection === 1
          ? 'opacity-0 -translate-x-3'
          : 'opacity-0 translate-x-3'
        : 'opacity-100 translate-x-0';

  const contentTransitionClass =
    animationPhase === 'pre-in' ? 'transition-none' : 'transition-all duration-300 ease-out';

  if (!hasPhilosophies) {
    return null;
  }

  return (
    <section className="w-full mb-10 p-4 px-6 flex flex-col items-center justify-center">
      <div className="container lg:w-6xl mx-auto pt-16 pb-12 flex gap-4 items-center justify-between h-80 lg:h-70">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={isAnimating}
          aria-label={t('philosophySlider.previousAriaLabel')}
          className="group cursor-pointer disabled:opacity-60">
          <svg
            width="36"
            height="50"
            viewBox="0 0 41 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-6 sm:h-12.5 sm:w-9">
            <path
              d="M5.89765 37.9819C5.89765 37.9819 6.01106 37.9819 6.06777 37.9819L14.4039 37.9819C17.7497 37.9819 20.4716 40.5105 20.4716 43.6186L20.4716 44.4615L20.4716 51.3625C20.4716 54.4706 23.1936 56.9992 26.5394 56.9992L34.8755 56.9992C38.278 57.0519 41 54.5233 41 51.4152L41 43.6713C41 40.5632 38.278 38.0346 34.9322 38.0346L26.5961 38.0346C23.2503 38.0346 20.5284 35.506 20.5284 32.3979L20.5284 24.654C20.5284 21.5459 23.2503 19.0173 26.5961 19.0173L34.9322 19.0173C38.278 19.0173 41 16.4887 41 13.3806L41 5.6367C41 2.52861 38.278 2.37964e-07 34.9322 5.30462e-07L26.5961 1.25923e-06C23.2503 1.55172e-06 20.5283 2.52862 20.5284 5.6367L20.5284 12.5377L20.5284 13.3806C20.5284 16.4887 17.8064 19.0173 14.4606 19.0173L6.12448 19.0173C6.12448 19.0173 6.01106 19.0173 5.95435 19.0173C2.66528 19.07 -3.09489e-06 21.5986 -2.82778e-06 24.654L-2.15079e-06 32.3979C-1.88367e-06 35.4533 2.66529 37.9819 5.95436 38.0346L5.89765 37.9819Z"
              className="fill-[#00FF84] group-hover:fill-white transition-all duration-200"
            />
          </svg>
        </button>
        <div className={`${contentTransitionClass} ${contentAnimationClass}`}>
          <div className="text-3xl lg:text-5xl font-medium pb-2 bg-linear-to-t from-[#B6B6B6] to-white bg-clip-text text-transparent inline-block">
            {philosophies[currentIndex].title}
          </div>
          <div className="text-lg lg:text-xl font-light text-white max-w-3xl mx-auto mt-4 p-6">
            {philosophies[currentIndex].description}
          </div>
        </div>
        <button
          type="button"
          onClick={goToNextWithReset}
          disabled={isAnimating}
          aria-label={t('philosophySlider.nextAriaLabel')}
          className="group cursor-pointer disabled:opacity-60">
          <svg
            width="36"
            height="50"
            viewBox="0 0 41 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-6 sm:h-12.5 sm:w-9">
            <path
              d="M35.1024 19.0181C35.1024 19.0181 34.9889 19.0181 34.9322 19.0181H26.5961C23.2503 19.0181 20.5284 16.4895 20.5284 13.3814V12.5385V5.63751C20.5284 2.52942 17.8064 0.000808458 14.4606 0.000808458H6.12448C2.72199 -0.051871 0 2.47674 0 5.58483V13.3287C0 16.4368 2.72199 18.9654 6.06777 18.9654H14.4039C17.7497 18.9654 20.4716 21.494 20.4716 24.6021V32.346C20.4716 35.4541 17.7497 37.9827 14.4039 37.9827H6.06777C2.72199 37.9827 0 40.5113 0 43.6194V51.3633C0 54.4714 2.72199 57 6.06777 57H14.4039C17.7497 57 20.4716 54.4714 20.4716 51.3633V44.4623V43.6194C20.4716 40.5113 23.1936 37.9827 26.5394 37.9827H34.8755C34.8755 37.9827 34.9889 37.9827 35.0456 37.9827C38.3347 37.93 41 35.4014 41 32.346V24.6021C41 21.5467 38.3347 19.0181 35.0456 18.9654L35.1024 19.0181Z"
              className="fill-[#00FF84] group-hover:fill-white transition-all duration-200"
            />
          </svg>
        </button>
      </div>
      <Link href="/philosophy" className="mt-8">
        <button className="inline-flex items-center gap-2 font-medium transition-opacity text-lightGray hover:text-[#00FF84] cursor-pointer">
          <svg
            width="12"
            height="16"
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative top-px h-4 w-3">
            <path
              d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
              fill="#ADADAD"
            />
          </svg>
          {t('philosophySlider.readMore')}
        </button>
      </Link>
    </section>
  );
}
