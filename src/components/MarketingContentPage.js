'use client';

import SectionHeading from '@/components/SectionHeading';

export default function MarketingContentPage({ title, subtitle, sections = [], actionLabel, onAction }) {
  return (
    <main className="flex-1 flex flex-col items-center pt-44 text-center bg-top bg-[url(../assets/philosophy/header_bg.jpg)] unoptimized bg-no-repeat">
      <section className="w-full max-w-6xl px-12 lg:px-0">
        <div className="text-left lg:ml-12">
          <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
            {title}
          </SectionHeading>
          <p className="mt-8 max-w-3xl text-lg font-light text-[#ADADAD]">{subtitle}</p>
        </div>
      </section>

      <section className="w-full max-w-6xl px-12 py-16 lg:px-0 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left">
              <p className="text-sm uppercase tracking-[0.24em] text-[#00FF84]/80">{section.subtitle}</p>
              <h2 className="mt-4 text-2xl font-light text-white">{section.title}</h2>
              <p className="mt-4 text-base font-light leading-7 text-[#B9B9B9]">{section.description}</p>
            </article>
          ))}
        </div>
      </section>

      {actionLabel ? (
        <section className="mb-20 flex w-full justify-center px-12 lg:px-0">
          <button
            type="button"
            onClick={onAction}
            className="rounded-xl border border-[#00FF84] px-10 py-5 text-[#00FF84] leading-none font-light transition-colors duration-300 hover:bg-[#00FF84] hover:text-black cursor-pointer">
            {actionLabel}
          </button>
        </section>
      ) : null}
    </main>
  );
}
