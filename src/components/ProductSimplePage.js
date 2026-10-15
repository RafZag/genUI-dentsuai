'use client';

import Image from 'next/image';
import PlusIcon from '@/components/PlusIcon';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/hooks/useLanguage';

const PRODUCT_SLUG_MAP = {
  aura: 'aura',
  cadabra: 'cadabra',
  contentCreator: 'content-creator',
  echo: 'echo',
  hydePark: 'hyde-park',
  trendHunter: 'trend-hunter',
};

function SectionHeading({ children, colorClass }) {
  return (
    <h2 className={`text-2xl lg:text-4xl font-light ${colorClass} inline-flex items-center gap-5`}>
      <PlusIcon size={25} className="text-[#ADADAD]" />
      {children}
    </h2>
  );
}

function ArrowButton({ children, className, iconFill }) {
  return (
    <button className={className}>
      <svg width="12" height="16" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative top-px h-4 w-3">
        <path
          d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
          fill={iconFill}
        />
      </svg>
      {children}
    </button>
  );
}

export default function ProductSimplePage({ slug }) {
  const { t } = useLanguage();
  const product = PRODUCTS.find((item) => item.slug === PRODUCT_SLUG_MAP[slug]);
  const page = t('productPages.template');
  const title = t(`productPages.${slug}.title`);
  const description = t(`productPages.${slug}.description`);

  const heroAlt = product ? `${product.title} logo` : title;

  return (
    <main className="flex-1 text-white">
      <section
        className="w-full min-h-120 lg:min-h-180 flex items-center justify-center bg-linear-to-b from-black via-[#111] to-[#0b0b0b]"
        style={product ? { backgroundColor: product.tint + '12' } : undefined}>
        <div className="container flex flex-col gap-8 mx-auto max-w-6xl items-center justify-center px-6 py-16">
          {product ? <Image src={product.logo} alt={heroAlt} className="h-auto w-[clamp(14rem,26vw,22rem)]" /> : null}
          <p className="px-6 text-3xl lg:text-4xl text-white font-light text-center">
            {page.hero?.subtitle || description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <button
              className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer"
              style={product ? { borderColor: product.tint } : undefined}>
              {page.hero?.readMore || 'Read more'}
            </button>
            <button
              className="px-6 py-3 backdrop-blur-sm text-white rounded-lg border font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer"
              style={product ? { backgroundColor: product.tint, borderColor: product.tint } : undefined}>
              {page.hero?.playVideo || 'Play video'}
            </button>
          </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center lg:-mt-30">
        <div className="container flex flex-col w-full max-w-6xl pl-10 pr-12 bg-almostBlack/85 backdrop-blur-sm rounded-2xl py-12">
          <SectionHeading colorClass="text-white">{page.challenge?.title || 'Challenge'}</SectionHeading>
          <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8">
            {page.challenge?.subtitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </h3>
          <p className="text-base font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
            {page.challenge?.description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </p>
        </div>
      </section>

      <section className="w-full flex mt-10 lg:mt-20">
        <div className="container flex flex-col mx-auto w-full max-w-6xl px-10 lg:pl-0">
          <SectionHeading colorClass="text-white">{page.solution?.title || 'Solution'}</SectionHeading>
          <p className="text-midGray lg:ml-12 mt-8">
            {page.solution?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
          <div className="grid lg:grid-cols-2 gap-8 mt-10 lg:ml-12">
            {(page.solution?.items || [
              { title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
              { title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
            ]).map((item) => (
              <div key={item.title}>
                <h4 className="text-white text-xl font-light inline-flex items-center gap-3 my-6">
                  <svg width="12" height="16" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative top-px h-4 w-3">
                    <path
                      d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                      fill="currentColor"
                    />
                  </svg>
                  {item.title}
                </h4>
                <p className="text-lightGray">{item.description}</p>
              </div>
            ))}
          </div>
          <ArrowButton
            className="inline-flex items-center gap-2 font-medium transition-opacity text-lightGray hover:text-white cursor-pointer mt-8 lg:ml-12"
            iconFill="currentColor">
            {page.solution?.readMore || 'Read more'}
          </ArrowButton>
        </div>
      </section>

      <section className="w-full flex mt-10 lg:mt-20">
        <div className="container flex flex-col lg:flex-nowrap mx-auto w-full max-w-6xl px-10 lg:pl-0">
          <SectionHeading colorClass="text-white">{page.gains?.title || 'What you gain'}</SectionHeading>
          <div className="grid lg:grid-cols-3 gap-8 mt-14">
            {(page.gains?.items || []).map((item) => (
              <div key={item.title} className="flex flex-col items-center justify-around text-center rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="h-24 w-24 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/40">IMG</div>
                <h3 className="text-white lg:text-xl mt-8">{item.title}</h3>
                <p className="text-lightGray text-light mt-4 mb-8">{item.description}</p>
                <ArrowButton
                  className="px-6 py-3 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer"
                  iconFill="currentColor">
                  {item.readMore || 'Read more'}
                </ArrowButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full flex mt-10 lg:mt-20">
        <div className="container flex flex-col mx-auto w-full max-w-6xl px-10 lg:pl-0">
          <SectionHeading colorClass="text-white">{page.useCases?.title || 'When to use'}</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-8 mt-10 lg:ml-12">
            {(page.useCases?.items || []).map((item) => (
              <div key={item.title}>
                <h4 className="font-light text-white text-xl inline-flex items-center gap-3 my-6">
                  <svg width="12" height="16" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative top-px h-4 w-3">
                    <path
                      d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                      fill="#363636"
                    />
                  </svg>
                  {item.title}
                </h4>
                <p className="ml-6 text-lightGray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full flex mt-10 lg:mt-20 mb-20">
        <div className="container flex flex-col mx-auto w-full max-w-6xl px-10 lg:pl-0">
          <SectionHeading colorClass="text-white">{page.whyUs?.title || 'Why us?'}</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-8 mt-10 lg:ml-12">
            {(page.whyUs?.items || []).map((item) => (
              <div key={item.title}>
                <h4 className="font-light text-white text-xl inline-flex items-center gap-3 my-6">
                  <svg width="12" height="16" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative top-px h-4 w-3">
                    <path
                      d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
                      fill="#363636"
                    />
                  </svg>
                  {item.title}
                </h4>
                <p className="ml-6 text-lightGray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
