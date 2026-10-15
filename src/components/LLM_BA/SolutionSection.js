'use client';

import SectionHeading from '../SectionHeading';
import BrandAuditorModelScene from './BrandAuditorModelScene';
import { useLanguage } from '@/hooks/useLanguage';
import orangeBG from '@/assets/LLM_BA/LLM_BA_bg_orange.jpg';

export default function SolutionSection({ solutionBg, patternBg }) {
  const { t } = useLanguage();
  const content = t('productPages.llmBrandAuditor');

  return (
    <section className="w-full flex flex-col lg:mt-10 overflow-visible">
      <div
        className="container mx-auto w-full max-w-6xl pl-10 pr-8 rounded-2xl pt-10 pb-16 bg-BAmainColor relative overflow-visible "
        style={{
          backgroundImage: `url(${orangeBG.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="flex flex-wrap lg:flex-nowrap mt-4 relative">
          <div className="lg:flex-3/5">
            <SectionHeading colorClass="text-darkGray" plusIconColor="text-white/75">
              {content.solution.title}
            </SectionHeading>
            <p
              className="text-darkGray text-base font-regular lg:ml-12 lg:text-lg mt-8"
              dangerouslySetInnerHTML={{ __html: content.solution.description }}></p>
          </div>
          <div className="lg:flex-2/5 "></div>
          <div className="w-full lg:w-[50%] lg:absolute lg:-right-10 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center min-h-70 lg:min-h-90 aspect-square">
            <BrandAuditorModelScene />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 px-10 w-full max-w-6xl rounded-2xl pt-8 pb-10 ">
        {content.solution.items.map((item) => (
          <div key={item.title} className="flex-1/2 ">
            <h3 className="text-xl lg:text-2xl font-light text-white mt-10">{item.title}</h3>
            <p className="text-base font-light lg:text-lg text-lightGray mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
