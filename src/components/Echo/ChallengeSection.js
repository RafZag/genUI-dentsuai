'use client';

import SectionHeading from '../SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';

export default function ChallengeSection() {
  const { t } = useLanguage();
  const content = t('productPages.echo');

  return (
    <section className="flex-1 flex flex-col items-center lg:-mt-30">
      <div className="container flex flex-col w-full max-w-6xl pl-10 pr-12 bg-almostBlack/85 backdrop-blur-sm rounded-2xl py-12">
        <SectionHeading colorClass="text-ECmainColor" plusIconColor="text-lightGray">
          {content.challenge.title}
        </SectionHeading>
        <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8">{content.challenge.subtitle}</h3>
        <p className="text-base font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
          {content.challenge.descriptionBefore} <span className="text-ECmainColor">{content.challenge.highlight}</span>{' '}
          {content.challenge.descriptionAfter}
        </p>
      </div>
    </section>
  );
}
