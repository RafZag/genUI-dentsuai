'use client';

import { useLanguage } from '@/hooks/useLanguage';

import Image from 'next/image';
import Link from 'next/link';

import { PRODUCTS } from '@/data/products';

import { useEffect, useRef } from 'react';

// Map product slugs to abbreviations used in i18n
const PRODUCT_ABBREVIATIONS = {
  'llm-brand-auditor': 'BA',
  'trend-hunter': 'TH',
  'content-creator': 'CC',
  echo: 'EC',
  sniffer: 'SN',
  aura: 'AU',
  cadabra: 'CA',
  'hyde-park': 'HP',
  'context-hub': 'CH',
};

export default function ProductCarousel() {
  const { t } = useLanguage();
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const loopWidth = useRef(1);
  const loopOffset = useRef(0);
  const velocity = useRef(0.6);
  const targetVelocity = useRef(0.6);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const dragVelocity = useRef(0);
  const rafId = useRef(null);

  // Helper function to get translated product text
  const getProductText = (slug, key) => {
    const abbr = PRODUCT_ABBREVIATIONS[slug];
    return t(`products.${abbr}.${key}`);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
    let activeCardIndex = -1;
    let lastCenterCheck = 0;
    let hasSetInitialPosition = false;

    const clearActiveCard = () => {
      if (activeCardIndex === -1) return;
      const currentCard = track.children[activeCardIndex];
      if (currentCard) currentCard.classList.remove('mobile-center-active');
      activeCardIndex = -1;
    };

    const updateCenteredCard = () => {
      if (!mobileMediaQuery.matches) {
        clearActiveCard();
        return;
      }

      const cards = track.children;
      if (!cards.length) return;

      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < cards.length; i += 1) {
        const cardRect = cards[i].getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      const activationRadius = Math.max(56, Math.min(viewportRect.width * 0.18, 120));
      if (closestDistance > activationRadius) {
        clearActiveCard();
        return;
      }

      if (closestIndex === activeCardIndex) return;

      clearActiveCard();
      cards[closestIndex].classList.add('mobile-center-active');
      activeCardIndex = closestIndex;
    };

    const onMobileQueryChange = () => {
      if (mobileMediaQuery.matches) {
        updateCenteredCard();
        return;
      }
      clearActiveCard();
    };

    const updateLoopWidth = () => {
      loopWidth.current = Math.max(1, track.scrollWidth / 3);

      if (!hasSetInitialPosition && track.children.length > PRODUCTS.length) {
        const firstCardInCenterLoop = track.children[PRODUCTS.length];
        if (firstCardInCenterLoop) {
          const desiredShift =
            firstCardInCenterLoop.offsetLeft + firstCardInCenterLoop.offsetWidth / 2 - viewport.clientWidth / 2;

          loopOffset.current = desiredShift - loopWidth.current;
          track.style.transform = `translate3d(${-(loopWidth.current + loopOffset.current)}px, 0, 0)`;
          hasSetInitialPosition = true;
        }
      }

      updateCenteredCard();
    };

    const animate = () => {
      if (!isDragging.current) {
        velocity.current += (targetVelocity.current - velocity.current) * 0.04;
        loopOffset.current = (loopOffset.current + velocity.current + loopWidth.current) % loopWidth.current;
        track.style.transform = `translate3d(${-(loopWidth.current + loopOffset.current)}px, 0, 0)`;
      }

      const now = performance.now();
      if (now - lastCenterCheck > 90) {
        updateCenteredCard();
        lastCenterCheck = now;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const dragStart = (clientX) => {
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = clientX;
      dragStartOffset.current = loopOffset.current;
      lastDragX.current = clientX;
      lastDragTime.current = performance.now();
      dragVelocity.current = 0;
      viewport.style.cursor = 'grabbing';
    };

    const dragMove = (clientX) => {
      if (!isDragging.current) return;
      const dx = dragStartX.current - clientX;
      if (Math.abs(dx) > 4) hasDragged.current = true;

      const now = performance.now();
      const dt = Math.max(now - lastDragTime.current, 1);
      dragVelocity.current = ((lastDragX.current - clientX) / dt) * 16;
      lastDragX.current = clientX;
      lastDragTime.current = now;

      loopOffset.current =
        (((dragStartOffset.current + dx) % loopWidth.current) + loopWidth.current) % loopWidth.current;
      track.style.transform = `translate3d(${-(loopWidth.current + loopOffset.current)}px, 0, 0)`;
    };

    const dragEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      velocity.current = dragVelocity.current;
      viewport.style.cursor = 'grab';
    };

    const onMouseDown = (e) => dragStart(e.clientX);
    const onMouseMove = (e) => dragMove(e.clientX);
    const onMouseUp = () => dragEnd();

    const onTouchStart = (e) => dragStart(e.touches[0].clientX);
    const onTouchMove = (e) => {
      e.preventDefault();
      dragMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => dragEnd();

    const onDragStart = (e) => e.preventDefault();

    const onClickCapture = (e) => {
      if (hasDragged.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      targetVelocity.current = 0;
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      targetVelocity.current = 0.4;
    };

    updateLoopWidth();
    rafId.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    if (mobileMediaQuery.addEventListener) {
      mobileMediaQuery.addEventListener('change', onMobileQueryChange);
    } else {
      mobileMediaQuery.addListener(onMobileQueryChange);
    }

    updateCenteredCard();

    viewport.style.cursor = 'grab';
    viewport.addEventListener('mousedown', onMouseDown);
    viewport.addEventListener('mouseenter', onMouseEnter);
    viewport.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', onTouchEnd);
    viewport.addEventListener('dragstart', onDragStart);
    viewport.addEventListener('click', onClickCapture, true);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      resizeObserver.disconnect();
      viewport.removeEventListener('mousedown', onMouseDown);
      viewport.removeEventListener('mouseenter', onMouseEnter);
      viewport.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('dragstart', onDragStart);
      viewport.removeEventListener('click', onClickCapture, true);
      if (mobileMediaQuery.removeEventListener) {
        mobileMediaQuery.removeEventListener('change', onMobileQueryChange);
      } else {
        mobileMediaQuery.removeListener(onMobileQueryChange);
      }
      clearActiveCard();
    };
  }, []);

  return (
    <section className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden">
      <div ref={viewportRef} className="overflow-hidden px-6 md:px-12">
        <div ref={trackRef} className="flex w-max gap-5 will-change-transform select-none pt-18">
          {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((panel, index) => (
            <div
              key={`${panel.title}-${index}`}
              className="group relative overflow-visible backdrop-blur-sm w-sm h-sm rounded-2xl border border-white/15 pl-10 pr-6  pt-6 pb-6 text-left text-white/90"
              style={{
                background: `radial-gradient(farthest-corner at 40px 40px, ${panel.tint}50 0%, rgba(16,16,16,0.7) 50%)`,
                backgroundRepeat: 'no-repeat',
              }}>
              <div
                className="mobile-grow-overlay pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background: `radial-gradient(farthest-corner at 40px 40px, ${panel.tint}50 0%, transparent 60%)`,
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-start">
                <Link href={`/products/${panel.slug}`} className="flex items-center gap-4 h-25">
                  <Image
                    src={panel.logo}
                    alt={`${getProductText(panel.slug, 'title')} logo`}
                    width="auto"
                    height={100}
                    unoptimized
                    draggable={false}
                    className="mobile-grow-logo relative z-20 mb-4 origin-[20%_80%] group-hover:drop-shadow-[14px_20px_4px_rgba(0,0,0,0.25)] drop-shadow-[10px_8px_4px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out group-hover:scale-[1.6] group-hover:-rotate-4"
                  />
                  <h3
                    className="mobile-grow-title text-3xl md:text-4xl font-semibold leading-10 transition-transform duration-500 ease-out group-hover:translate-x-10"
                    style={{ color: panel.tint }}>
                    {getProductText(panel.slug, 'title')}
                  </h3>
                </Link>
                <div>
                  <p
                    className="mt-4 text-lg md:text-xl font-light text-white"
                    dangerouslySetInnerHTML={{ __html: getProductText(panel.slug, 'slogan') }}
                  />
                  <p className="mt-3 max-w-[34ch] text-[0.85rem] leading-snug text-lightGray font-light mb-6">
                    {getProductText(panel.slug, 'description')}
                  </p>
                </div>

                <div className="flex-grow" />

                <div className="flex justify-end">
                  <Link
                    href={`/products/${panel.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
                    style={{ color: panel.tint }}>
                    {t('common.learnMore')}
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 13 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative top-px h-4 w-3">
                      <path
                        d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
