import Link from 'next/link';
import { DentsuPlusIcon } from '@/components/icons/DentsuPlusIcon';

export function SiteHeader() {
  return (
    <header className="w-full backdrop-blur-md bg-black/40 fixed top-0 left-0 z-50 border-b border-white/10">
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-8 flex justify-between items-center h-[82px]">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-bold text-white text-lg tracking-tight flex items-center gap-2.5 transition-colors duration-150 hover:text-white"
        >
          <DentsuPlusIcon size={20} className="text-[#00ff84]" />
          <span>dentsu AI Stack</span>
        </Link>

        {/* Navigation items */}
        <div className="hidden md:flex items-center gap-1 text-sm font-light">
          <Link
            href="/"
            className="flex items-center h-[82px] px-4 text-white hover:text-[#00ff84] transition-colors duration-150"
          >
            Produkty
          </Link>
          <span className="flex items-center h-[82px] px-4 text-white/35 select-none cursor-default">
            Filozofia
          </span>
          <span className="flex items-center h-[82px] px-4 text-white/35 select-none cursor-default">
            Zespół
          </span>
          <span className="flex items-center h-[82px] px-4 text-white/35 select-none cursor-default">
            Lab
          </span>
          <span className="flex items-center h-[82px] px-4 text-white/35 select-none cursor-default">
            Kontakt
          </span>

          {/* Language Switcher */}
          <div className="ml-4 flex items-center border border-white/20 rounded-md h-[30px] overflow-hidden text-xs">
            <span className="px-2.5 h-[30px] flex items-center justify-center text-white bg-white/10 font-medium">
              PL
            </span>
            <span className="px-2.5 h-[30px] flex items-center justify-center text-white/40 select-none">
              EN
            </span>
          </div>
        </div>

        {/* Demo Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 text-xs sm:text-sm backdrop-blur-sm bg-white/10 text-white rounded-lg border border-white/30 font-light transition-colors duration-300 hover:bg-[#00ff84] hover:text-black hover:border-[#00ff84] cursor-pointer"
          >
            Umów Demo
          </button>
        </div>
      </nav>
    </header>
  );
}
