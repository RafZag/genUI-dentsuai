'use client';

import TeamHero from '@/components/Team/TeamHero';
import TeamMember from '@/components/Team/TeamMember';

import SectionHeading from '@/components/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';

export default function Team() {
  const { t } = useLanguage();
  const content = t('team');
  return (
    <main className="flex-1 flex flex-col items-center pt-44 text-center bg-top bg-[url(../assets/philosophy/header_bg.jpg)] unoptimized bg-no-repeat">
      <TeamHero />
      <section className="flex flex-col items-center ">
        <div className="container text-left flex flex-col w-full max-w-6xl px-12 lg:px-0 pt-12 mb-12">
          <h3 className="text-lg lg:text-xl font-light text-white lg:ml-12">{content.sections[0].subtitle}</h3>
          <p className="text-base font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
            {content.sections[0].description}
          </p>
        </div>
      </section>
      <section className="mt-12 container flex lg:flex-col mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col items-center lg:items-start">
        {/* <SectionHeading colorClass="text-white" plusIconColor="text-ctMainColor">
          {content.sections[1].title}
        </SectionHeading> */}
        <div className="flex-1 lg:ml-12 w-full flex gap-24 flex-col lg:flex-row justify-start mt-12">
          <TeamMember member={content.sections[1].members[0]} />
          <TeamMember member={content.sections[1].members[1]} />
          <TeamMember member={content.sections[1].members[2]} />
        </div>
      </section>
      <div className="w-full bg-[url(../assets/team_bg.png)] bg-center unoptimized bg-no-repeat">
        <section className="mt-8 container flex lg:flex-col mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col items-center lg:items-start">
          {/* <SectionHeading colorClass="text-white" plusIconColor="text-ctMainColor">
            {content.sections[2].title}
          </SectionHeading> */}
          <div className="flex-1 lg:ml-12 w-full flex gap-24 flex-col lg:flex-row justify-start mt-12">
            <TeamMember member={content.sections[2].members[0]} />
            <TeamMember member={content.sections[2].members[1]} />
            <TeamMember member={content.sections[2].members[2]} />
          </div>
        </section>
        <section className="mt-12 mb-20 container flex lg:flex-col mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col items-center lg:items-start">
          {/* <SectionHeading colorClass="text-white" plusIconColor="text-ctMainColor">
            {content.sections[3].title}
          </SectionHeading> */}
          <div className="flex-1 lg:ml-12 w-full flex gap-24 flex-col lg:flex-row justify-start mt-12">
            <TeamMember member={content.sections[2].members[3]} />
            <TeamMember member={content.sections[3].members[0]} />
            <TeamMember member={content.sections[3].members[1]} />
          </div>
        </section>
        <section className="mt-12 mb-20 container flex lg:flex-col mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col items-center lg:items-start">
          {/* <SectionHeading colorClass="text-white" plusIconColor="text-ctMainColor">
            {content.sections[3].title}
          </SectionHeading> */}
          <div className="flex-1 lg:ml-12 w-full flex gap-24 flex-col lg:flex-row justify-start mt-12">
            <TeamMember member={content.sections[3].members[2]} />
          </div>
        </section>
        <section className="flex flex-col items-center ">
          <div className="container text-center flex flex-col w-full max-w-6xl px-12 lg:px-0 pt-20 mb-30">
            <h3 className="text-lg lg:text-xl font-light text-white lg:ml-12">{content.sections[4].subtitle}</h3>
          </div>
        </section>
      </div>
    </main>
  );
}
