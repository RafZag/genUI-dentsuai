'use client';

import Image from 'next/image';
import SectionHeading from '../SectionHeading';
import ContextHubModelScene from './ContextHubModelScene';
import { useLanguage } from '@/hooks/useLanguage';
import blueBG from '@/assets/CH/CH_bg_blue.jpg';

export default function SolutionSection({ solutionBg, patternBg, bigLogo }) {
  const { t } = useLanguage();
  const content = t('productPages.contextHub');

  return (
    <section className="w-full flex lg:mt-10">
      <div
        className="container mx-auto w-full max-w-6xl pl-10 pr-8 rounded-2xl pb-16 bg-CHmainColor relative overflow-visible "
        style={{
          backgroundImage: `url(${blueBG.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="flex flex-wrap lg:flex-nowrap mt-10 relative">
          <div className="lg:flex-3/5 lg:pr-8">
            <SectionHeading colorClass="text-darkGray" plusIconColor="text-white/75">
              {content.solution.title}
            </SectionHeading>
            <p
              className="text-darkGray text-base font-regular lg:ml-12 lg:text-lg mt-8"
              dangerouslySetInnerHTML={{ __html: content.solution.description }}></p>
          </div>
          <div className="lg:flex-2/5 "></div>
          <div className="w-full lg:w-[50%] lg:absolute lg:-right-10 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center min-h-70 lg:min-h-90 aspect-square">
            <ContextHubModelScene />
          </div>
        </div>
      </div>
    </section>
  );
}
