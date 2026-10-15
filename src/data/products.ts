import BA_logo from '@/public/BA_logo.png';
import TH_logo from '@/public/TH_logo.png';
import CC_logo from '@/public/CC_logo.png';
import EC_logo from '@/public/EC_logo.png';
import AU_logo from '@/public/AU_logo.png';
import CA_logo from '@/public/CA_logo.png';
import HP_logo from '@/public/HP_logo.png';
import CH_logo from '@/public/CH_logo.png';
import SN_logo from '@/public/SN_logo.png';

export const PRODUCTS = [
  {
    slug: 'llm-brand-auditor',
    title: 'LLM Brand Auditor',
    tint: '#ffaa00',
    logo: BA_logo,
    slogan: 'Brand visibility in AI.',
    description:
      'Your customers stopped searching. They started asking. Know what AI chatbots say about your brand and fix it.',
    details:
      'Monitor how your brand appears across AI assistants, detect inaccurate narratives, and prioritize corrective actions with confidence.',
  },
  {
    slug: 'echo',
    title: 'Echo',
    tint: '#00baa8',
    logo: EC_logo,
    slogan: 'Advanced sentiment and opinion analytics.',
    description:
      'The problem is not a lack of data. It is the flood. Turn thousands of opinions into clear, actionable insights.',
    details:
      'Surface sentiment drivers, compare narratives across channels, and translate complex feedback into practical decisions.',
  },
  {
    slug: 'sniffer',
    title: 'Sniffer',
    tint: '#217fff',
    logo: SN_logo,
    slogan: 'Be the first to know what your competitors are doing.',
    description: 'Be the first to know what your competitors - and the web around your brand - are doing.',
    details:
      "Competitors change prices, offers, and messaging every day - and you find out too late, or by accident. Manually checking dozens of pages isn't feasible, standard alerts drown in noise, and \"HTML change detected\" doesn't tell you what happened. You're missing opportunities and market moves you don't even know exist.",
  },
  {
    slug: 'context-hub',
    title: 'Context Hub',
    tint: '#5acbff',
    logo: CH_logo,
    slogan: 'Your AI-Powered Knowledge\nBase and Virtual Assistant.',
    description:
      "Context Hub is an advanced knowledge platform that indexes and opens up access to all of an organization's key data – from detailed project descriptions and HR procedures to legal documentation.",
    details:
      'Utilizing advanced AI algorithms, including multimodal analysis (e.g., the ability to \"understand\" visual content within multimedia files), Context Hub does not just search for text; it identifies context and connections to deliver precise, verified answers.',
  },
  {
    slug: 'trend-hunter',
    title: 'Trend Hunter',
    tint: '#0098ff',
    logo: TH_logo,
    slogan: 'Cultural signal detection.',
    description:
      'Your competitors are already watching the next trend. Spot it first and plan your content based on data, not guesswork.',
    details:
      'Track emerging conversations, map momentum by audience segment, and convert weak signals into campaign opportunities quickly.',
  },
  {
    slug: 'aura',
    title: 'Aura',
    tint: '#9666ff',
    logo: AU_logo,
    slogan: 'Truth hidden in data, delivered with expert precision.',
    description:
      'Go beyond what standard tools can see to uncover correlations and opportunities that can move your business.',
    details:
      'Combine structured and unstructured data to reveal patterns, risks, and strategic opportunities that standard dashboards miss.',
  },
  {
    slug: 'cadabra',
    title: 'Cadabra',
    tint: '#05b200',
    logo: CA_logo,
    slogan: 'Prompt engineering and IP protection.',
    description:
      'Transform raw prompts into precision creative code, store them securely, and keep every generated asset on brand.',
    details:
      'Standardize prompt quality with reusable templates, governance workflows, and secure storage for brand-safe AI production.',
  },
  {
    slug: 'hyde-park',
    title: 'Hyde Park',
    tint: '#d152d8',
    logo: HP_logo,
    slogan: 'Creative ideation, accelerated.',
    description: 'Transform your brief into precise execution plans and hundreds of unique creative hooks.',
    details:
      'Generate idea territories, pressure-test concepts, and build execution-ready directions faster without sacrificing originality.',
  },
  {
    slug: 'content-creator',
    title: 'Content Creator',
    tint: '#ff6136',
    logo: CC_logo,
    slogan: 'Content production at scale.',
    description:
      'Produce, personalize, and manage content in one modular AI system. You decide which modules you need.',
    details:
      'Coordinate briefs, generation, approvals, and localization from one workspace while keeping teams aligned on messaging.',
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
