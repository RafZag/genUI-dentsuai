'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PlusIcon from '@/components/PlusIcon';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/hooks/useLanguage';
import { useContactModal } from '@/hooks/useContactModal';

const NAV_LINKS_KEYS = ['nav.philosophy', 'nav.team', 'nav.podcast', 'nav.blog', 'nav.lab', 'nav.contact'];
const DEFAULT_HOVER_COLOR = '#00ff84';

const PRODUCT_ABBREVIATIONS = {
  'llm-brand-auditor': 'BA',
  'trend-hunter': 'TH',
  'content-creator': 'CC',
  echo: 'EC',
  aura: 'AU',
  cadabra: 'CA',
  'hyde-park': 'HP',
  'context-hub': 'CH',
  sniffer: 'SN',
};

const NAV_LINKS = [
  { key: 'nav.philosophy', href: '/philosophy' },
  { key: 'nav.team', href: '/team' },
  { key: 'nav.podcast', href: '#' },
  { key: 'nav.blog', href: '#' },
  { key: 'nav.lab', href: '/lab' },
  { key: 'nav.contact', href: '' },
];

export default function Navbar({ hoverColor = undefined }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const { language, changeLanguage, t } = useLanguage();
  const { openContactModal } = useContactModal();

  const currentProduct = PRODUCTS.find(
    (product) => pathname === `/products/${product.slug}` || pathname.startsWith(`/products/${product.slug}/`),
  );

  const isOnProductPage = currentProduct !== undefined;

  const getProductTitle = (slug, fallback) => {
    const abbreviation = PRODUCT_ABBREVIATIONS[slug];
    return abbreviation ? t(`products.${abbreviation}.title`) : fallback;
  };

  const navHoverColor = hoverColor || currentProduct?.tint || DEFAULT_HOVER_COLOR;
  const isProductPath = (slug) => pathname === `/products/${slug}` || pathname.startsWith(`/products/${slug}/`);

  return (
    <header>
      <div
        className="w-full backdrop-blur-sm bg-black/20 fixed top-0 left-0 z-50 border-b border-white/10"
        style={{ '--nav-hover-color': navHoverColor }}>
        <nav className="max-w-[1200px] mx-auto lg:px-4 px-6 flex justify-between items-center h-[82px]">
          {/* Logo */}
          <Link href="/" className="font-bold text-white flex items-center gap-2">
            <PlusIcon size={18} className="text-[var(--nav-hover-color)] transition-colors duration-150" />
            {t('nav.logo')}
          </Link>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <div className="hover:text-[var(--nav-hover-color)] text-white font-light cursor-pointer flex items-center group-hover:bg-[#191919] px-6 rounded-t-lg h-[82px] transition-colors duration-150">
                <span
                  className="transition-colors duration-150 group-hover:text-[var(--nav-hover-color)]"
                  style={isOnProductPage ? { color: navHoverColor } : undefined}>
                  {t('nav.products')}
                </span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-[29%] -translate-y-3 opacity-0 invisible pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 ease-out">
                <div className="bg-gradient-to-b from-[#191919] to-[#353535] rounded-b-lg py-2 pb-4 w-52">
                  {PRODUCTS.map((product) => (
                    <Link
                      href={`/products/${product.slug}`}
                      key={product.slug}
                      className={`block pl-6 py-2 text-sm hover:text-[var(--nav-hover-color)] hover:bg-white/5 cursor-pointer transition-colors duration-150 ${
                        isProductPath(product.slug) ? 'text-[var(--nav-hover-color)] bg-white/10' : 'text-white/70'
                      }`}>
                      {getProductTitle(product.slug, product.title)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isPlaceholder = link.href === '#';

              if (link.key === 'nav.contact') {
                return (
                  <button
                    key={link.key}
                    type="button"
                    onClick={openContactModal}
                    className={`cursor-pointer flex items-center h-[82px] transition-colors px-5 duration-150 ${
                      isActive ? 'text-[var(--nav-hover-color)]' : 'text-white'
                    } hover:text-[var(--nav-hover-color)]`}>
                    {t(link.key)}
                  </button>
                );
              }
              if (isPlaceholder) {
                return (
                  <span key={link.key} className="flex items-center h-[82px] px-5 text-white/35 select-none">
                    {t(link.key)}
                  </span>
                );
              }
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`cursor-pointer flex items-center h-[82px] transition-colors px-5 duration-150 ${
                    isActive ? 'text-[var(--nav-hover-color)]' : 'text-white'
                  } hover:text-[var(--nav-hover-color)]`}>
                  {t(link.key)}
                </Link>
              );
            })}
            {/* Language switcher */}
            <div className="ml-5 flex items-center border border-white/20 rounded-md h-[30px] cursor-pointer text-sm">
              <button
                type="button"
                onClick={() => changeLanguage('pl')}
                className={`px-3 py-4 h-[30px] flex items-center justify-center rounded-l-md transition-all duration-200 ${
                  language === 'pl'
                    ? 'text-white bg-white/10'
                    : 'text-white/40 hover:text-[var(--nav-hover-color)] cursor-pointer'
                }`}>
                PL
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-3 h-[30px] flex items-center justify-center rounded-r-md transition-all duration-200 ${
                  language === 'en'
                    ? 'text-white bg-white/10'
                    : 'text-white/40 hover:text-[var(--nav-hover-color)] cursor-pointer'
                }`}>
                EN
              </button>
            </div>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 cursor-pointer">
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </nav>
        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="px-6 pb-6 flex flex-col gap-1 border-t border-white/10">
            {/* Products accordion */}
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex justify-between items-center w-full py-3 text-white cursor-pointer">
              <span style={isOnProductPage ? { color: navHoverColor } : undefined}>{t('nav.products')}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}>
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${productsOpen ? 'max-h-96' : 'max-h-0'}`}>
              {PRODUCTS.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.slug}
                  onClick={() => {
                    setMobileOpen(false);
                    setProductsOpen(false);
                  }}
                  className={`block pl-4 py-2 text-sm hover:text-[var(--nav-hover-color)] cursor-pointer transition-colors duration-150 ${
                    isProductPath(product.slug)
                      ? 'text-[var(--nav-hover-color)] bg-white/10 rounded-md'
                      : 'text-white/60'
                  }`}>
                  {getProductTitle(product.slug, product.title)}
                </Link>
              ))}
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isPlaceholder = link.href === '#';

              if (link.key === 'nav.contact') {
                return (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => {
                      openContactModal();
                      setMobileOpen(false);
                    }}
                    className="w-full py-3 text-left text-white hover:text-[var(--nav-hover-color)] cursor-pointer transition-colors duration-150 border-t border-white/5">
                    {t(link.key)}
                  </button>
                );
              }

              if (isPlaceholder) {
                return (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setProductsOpen(false);
                    }}
                    className="w-full py-3 text-left text-white/35 cursor-pointer transition-colors duration-150 border-t border-white/5 select-none">
                    {t(link.key)}
                  </button>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setProductsOpen(false);
                  }}>
                  <div
                    key={link.key}
                    className="py-3 text-white hover:text-[var(--nav-hover-color)] cursor-pointer transition-colors duration-150 border-t border-white/5">
                    {t(link.key)}
                  </div>
                </Link>
              );
            })}
            {/* Mobile language switcher */}
            <div className="py-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeLanguage('pl')}
                  className={`px-3 py-2 rounded transition-all duration-200 ${
                    language === 'pl' ? 'text-white bg-white/10' : 'text-white/40 hover:text-[var(--nav-hover-color)]'
                  }`}>
                  PL
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-2 rounded transition-all duration-200 ${
                    language === 'en' ? 'text-white bg-white/10' : 'text-white/40 hover:text-[var(--nav-hover-color)]'
                  }`}>
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
