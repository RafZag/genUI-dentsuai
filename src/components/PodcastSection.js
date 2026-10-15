'use client';

import Image from 'next/image';
import podcastLogo from '@/assets/bigPodcastLogo.svg';
import PlusIcon from '@/components/PlusIcon';
import { useLanguage } from '@/hooks/useLanguage';

export default function PodcastSection() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 z-20">
      <div
        className="container flex flex-col lg:w-6xl rounded-2xl lg:flex-row border gap-12 border-white/25 px-6 lg:px-14 py-14 items-center justify-between"
        style={{
          backgroundImage:
            'radial-gradient(circle at bottom right, rgba(145,214,86,0.45) 0%, transparent 20%), radial-gradient(farthest-corner at 50% -80px, rgba(255,255,255,0.15) 0%, #101010 50%)',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="text-left flex-col">
          <h2 className="text-2xl font-light text-white mb-6 inline-flex items-center gap-5">
            <PlusIcon size={25} className="text-[#2AA650]" />
            {t('podcastSection.title')}
          </h2>
          <p className="lg:text-lg font-light mb-14 pl-10">{t('podcastSection.description')}</p>
          <div className="mt-6 flex gap-8 pl-10">
            <button className="self-start lg:text-medium text-sm rounded-xl border border-[#2AA650] px-5 lg:px-10 py-5 text-[#2AA650] leading-none font-light transition-colors duration-300 hover:bg-[#2AA650] hover:text-black cursor-pointer">
              {t('podcastSection.listenToPodcast')}
            </button>
            {/* <button className="inline-flex text-sm lg:text-lg items-center gap-3 font-medium transition-opacity text-lightGray hover:text-[#2AA650] cursor-pointer">
              <svg
                width="12"
                height="16"
                viewBox="0 0 13 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative top-px h-4 w-3">
                <path
                  d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                  fill="#2AA650"
                />
              </svg>
              {t('podcastSection.latestEpisode')}
            </button> */}
          </div>
        </div>

        <Image src={podcastLogo} alt="Podcast Logo" width={240} height={240} />
      </div>
    </section>
  );
}
