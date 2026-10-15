'use client';

import SectionHeading from '@/components/SectionHeading';

export default function LegalContentPage({ title, lead, sections = [] }) {
  return (
    <main className="flex-1 flex flex-col items-center pt-44 text-center bg-top bg-[url(../assets/philosophy/header_bg.jpg)] unoptimized bg-no-repeat">
      <section className="w-full max-w-4xl px-12 pb-20 lg:px-0">
        <div className="text-left lg:ml-12">
          <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
            {title}
          </SectionHeading>
          <p className="mt-8 max-w-3xl text-base font-light leading-7 text-[#B9B9B9]">{lead}</p>
          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-light text-white">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base font-light leading-7 text-[#B9B9B9]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
