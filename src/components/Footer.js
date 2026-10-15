'use client';

import Image from 'next/image';
import Link from 'next/link';
import dentsuLogo from '@/assets/dentsu_sm.png';
import fbIcon from '@/assets/sm_logos/fb.png';
import xIcon from '@/assets/sm_logos/x.png';
import linkedinIcon from '@/assets/sm_logos/in.png';
import instagramIcon from '@/assets/sm_logos/ig.png';
import ytIcon from '@/assets/sm_logos/yt.png';
import { PRODUCTS } from '@/data/products';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

const POLICY_LINK_CONFIG = {
  en: [
    { href: '/download/Privacy_Policy.pdf', target: '_blank' },
    { href: 'https://www.dentsu.com/uk/en/policies/responsible-disclosure-policy', target: '_blank' },
  ],
  pl: [
    { href: '/download/Polityka_Prywatnosci.pdf', target: '_blank' },
    { href: 'https://www.dentsu.com/uk/en/policies/responsible-disclosure-policy', target: '_blank' },
  ],
};

const SITE_MAP_LINK_CONFIG = [
  { href: '/philosophy' },
  { href: '/team' },
  { href: '#' },
  { href: '#' },
  { href: '/lab' },
  { action: 'contact' },
];

function FooterLinkContent({ children }) {
  return (
    <>
      <svg
        width="9"
        height="12"
        viewBox="0 0 13 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative top-px h-4 w-3">
        <path
          d="M11.13 6.00572C11.13 6.00572 11.0941 6.00572 11.0761 6.00572H8.43292C7.37206 6.00572 6.50899 5.20721 6.50899 4.2257V3.95953V1.78027C6.50899 0.798765 5.64592 0.000255303 4.58506 0.000255303H1.94191C0.863071 -0.0163803 0 0.78213 0 1.76363V4.20907C0 5.19057 0.863071 5.98908 1.92393 5.98908H4.56708C5.62794 5.98908 6.49101 6.78759 6.49101 7.76909V10.2145C6.49101 11.196 5.62794 11.9945 4.56708 11.9945H1.92393C0.863071 11.9945 0 12.7931 0 13.7746V16.22C0 17.2015 0.863071 18 1.92393 18H4.56708C5.62794 18 6.49101 17.2015 6.49101 16.22V14.0407V13.7746C6.49101 12.7931 7.35408 11.9945 8.41494 11.9945H11.0581C11.0581 11.9945 11.0941 11.9945 11.112 11.9945C12.1549 11.9779 13 11.1794 13 10.2145V7.76909C13 6.80423 12.1549 6.00572 11.112 5.98908L11.13 6.00572Z"
          fill="#3C3C3C"
        />
      </svg>
      {children}
    </>
  );
}

function FooterLinkItem({ children, href, onClick, target, rel }) {
  const className =
    'inline-flex items-center gap-3 text-[#8e8e8e] hover:text-[#FFFFFF] transition-colors duration-300 cursor-pointer';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <FooterLinkContent>{children}</FooterLinkContent>
      </button>
    );
  }

  return (
    <Link href={href} className={className} target={target} rel={rel}>
      <FooterLinkContent>{children}</FooterLinkContent>
    </Link>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();
  const { openContactModal } = useContactModal();
  const translatedPolicyLinks = t('footer.policyLinks');
  const translatedSiteMapLinks = t('footer.siteMapLinks');
  const translatedProductLinks = t('footer.productLinks');
  const policyLinks = Array.isArray(translatedPolicyLinks) ? translatedPolicyLinks : [];
  const policyLinkConfig = POLICY_LINK_CONFIG[language] || POLICY_LINK_CONFIG.en;
  const siteMapLinks = Array.isArray(translatedSiteMapLinks) ? translatedSiteMapLinks : [];
  const productLinks = Array.isArray(translatedProductLinks) ? translatedProductLinks : [];

  return (
    <footer className="w-full bg-darkGray">
      <div className="container max-w-6xl mx-auto px-12 lg:px-0 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-left">
          <div>
            <h3 className="text-white font-light mb-6 text-lg">{t('footer.ourPolicies')}</h3>
            <div className="text-sm flex flex-col gap-4 font-light">
              {policyLinks.map((item, index) => (
                <FooterLinkItem
                  key={item}
                  href={policyLinkConfig[index]?.href || '/'}
                  target={policyLinkConfig[index]?.target}
                  rel={policyLinkConfig[index]?.target === '_blank' ? 'noopener noreferrer' : undefined}>
                  {item}
                </FooterLinkItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-light mb-6 text-lg">{t('footer.siteMap')}</h3>
            <div className="text-sm flex flex-col gap-4 font-light">
              {siteMapLinks.map((item, index) => {
                const linkConfig = SITE_MAP_LINK_CONFIG[index];

                if (linkConfig?.action === 'contact') {
                  return (
                    <FooterLinkItem key={item} onClick={openContactModal}>
                      {item}
                    </FooterLinkItem>
                  );
                }

                return (
                  <FooterLinkItem key={item} href={linkConfig?.href || '/'}>
                    {item}
                  </FooterLinkItem>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-white font-light mb-6 text-lg">{t('footer.Products')}</h3>
            <div className="text-sm flex flex-col gap-4 font-light">
              {PRODUCTS.map((product, index) => (
                <FooterLinkItem key={product.slug} href={`/products/${product.slug}`}>
                  {productLinks[index] || product.title}
                </FooterLinkItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-light mb-6 text-lg">{t('footer.contact')}</h3>
            <address className="not-italic text-sm text-[#8e8e8e] leading-relaxed font-light">
              {t('footer.company')}
              <br />
              {t('footer.address')}
              <br />
              {t('footer.phone')}
            </address>
            <div className="mt-12">
              {/* <h3 className="text-white font-light mb-6 text-lg">{t('footer.letsConnect')}</h3> */}
              <div className="flex items-center gap-3 mb-8">
                <a
                  href="https://www.instagram.com/dentsupl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image src={instagramIcon.src} alt="Instagram" width={34} height={34} />
                </a>
                <a
                  href="https://www.facebook.com/dentsuPL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image src={fbIcon.src} alt="Facebook" width={34} height={34} />
                </a>
                <a
                  href="https://www.linkedin.com/company/dentsupl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image src={linkedinIcon.src} alt="LinkedIn" width={34} height={34} />
                </a>
                {/* <a
                  href="https://twitter.com/dentsupl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image src={xIcon.src} alt="X (Twitter)" width={34} height={34} />
                </a>
                <a
                  href="https://www.youtube.com/channel/dentsupl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-300">
                  <Image src={ytIcon.src} alt="YouTube" width={34} height={34} />
                </a> */}
              </div>
              <p className="text-[#4F4F4F] text-sm font-light">
                {t('footer.copyright')}
                <Image src={dentsuLogo.src} alt="Dentsu Logo" width={53} height={11} className="inline-block ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
