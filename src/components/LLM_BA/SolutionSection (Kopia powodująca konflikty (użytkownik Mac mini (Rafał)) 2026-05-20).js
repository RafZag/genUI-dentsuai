'use client';

import Image from 'next/image';
import SectionHeading from '../SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';

export default function SolutionSection({ solutionBg, patternBg, bigLogo }) {
  const { t } = useLanguage();
  const content = t('productPages.llmBrandAuditor');

  return (
    <section className="w-full flex lg:mt-10">
      <div
        className="container mx-auto w-full max-w-6xl pl-10 pr-12 rounded-2xl py-12 border border-white/15 bg-[#0E0E0E] relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at bottom right, rgba(255,171,0,0.6) 0%, transparent 50%), radial-gradient(circle at top left, rgba(255,171,0,0.2) 0%, transparent 40%)',
          backgroundRepeat: 'no-repeat',
        }}>
        <SectionHeading colorClass="text-BAmainColor" plusIconColor="text-white/75">
          {content.solution.title}
        </SectionHeading>
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="flex-3/5">
            <p
              className="text-white lg:ml-12 mt-8"
              dangerouslySetInnerHTML={{ __html: content.solution.description }}></p>
            {content.solution.items.map((item) => (
              <div key={item.title} className="flex-1/2 lg:ml-12">
                <h3 className="text-white mt-6 lg:text-xl">{item.title}</h3>
                <p className="text-lightGray mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="lg:flex-2/5 flex items-center justify-center pl-8 pt-8">
            <Image src={bigLogo} alt={content.hero.logoAlt} width={420} height="auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
