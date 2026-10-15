'use client';

import PlusIcon from '@/components/PlusIcon';
import Image from 'next/image';
import BMimg from '@/assets/Team/BM_big.png';
import BGimg from '@/assets/Team/BG_big.png';
import MGimg from '@/assets/Team/MG_big.png';
import MPalimg from '@/assets/Team/MPal_big.png';
import MPimg from '@/assets/Team/MP_big.png';
import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const teamImages = [BMimg, BGimg, MGimg, MPalimg, MPimg];

export default function TeamSection() {
  const { t } = useLanguage();
  const translatedMembers = t('teamSection.members');
  const members = Array.isArray(translatedMembers) ? translatedMembers : [];

  return (
    <section className="container w-full max-w-6xl mb-20 px-4 lg:px-0">
      <div className="w-full flex items-center gap-6 lg:gap-12">
        <h2 className="text-2xl lg:text-4xl font-semibold  text-[#00FF84] inline-flex items-center gap-5">
          <PlusIcon size={25} className="text-[#ADADAD]" />
          {t('teamSection.title')}
        </h2>
        <Link href="/team">
          <button className="inline-flex items-center gap-3 font-medium transition-opacity text-lightGray hover:text-[#00FF84] cursor-pointer">
            <svg
              width="12"
              height="16"
              viewBox="0 0 13 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-px h-4 w-3">
              <path
                d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                fill="#00FF84"
              />
            </svg>
            {t('teamSection.moreAboutUs')}
          </button>
        </Link>
      </div>
      <div className="w-full mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto gap-8">
        {teamImages.map((image, index) => {
          const member = members[index] || {};

          return (
            <div key={member.name || index} className="flex flex-col items-center justify-center text-center">
              <div className="group relative mb-6">
                <Image
                  src={image}
                  alt={member.name || `Team member ${index + 1}`}
                  width={200}
                  height={200}
                  unoptimized
                  className="block"
                />
              </div>
              <h4 className="text-sm font-semibold text-[#00FF84]">{member.name}</h4>
              <p className="text-sm text-lightGray">{member.role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
