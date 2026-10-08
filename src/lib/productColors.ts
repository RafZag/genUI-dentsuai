/**
 * Exact brand colors, classes, and mappings as defined in lp-dentsu-ai
 */
export interface ProductColorDefinition {
  hex: string;
  className: string;
  bgClass: string;
}

export const PRODUCT_COLORS: Record<string, ProductColorDefinition> = {
  'llm-brand-auditor': { hex: '#ffaa00', className: 'text-BAmainColor', bgClass: 'bg-BAmainColor' },
  'llm-brand-audithor': { hex: '#ffaa00', className: 'text-BAmainColor', bgClass: 'bg-BAmainColor' },
  'echo': { hex: '#00baa8', className: 'text-ECmainColor', bgClass: 'bg-ECmainColor' },
  'sniffer': { hex: '#217fff', className: 'text-SNmainColor', bgClass: 'bg-SNmainColor' },
  'context-hub': { hex: '#5acbff', className: 'text-CHmainColor', bgClass: 'bg-CHmainColor' },
  'trend-hunter': { hex: '#0098ff', className: 'text-THmainColor', bgClass: 'bg-THmainColor' },
  'aura': { hex: '#9666ff', className: 'text-AUmainColor', bgClass: 'bg-AUmainColor' },
  'cadabra': { hex: '#05b200', className: 'text-CAmainColor', bgClass: 'bg-CAmainColor' },
  'hyde-park': { hex: '#d152d8', className: 'text-HPmainColor', bgClass: 'bg-HPmainColor' },
  'content-creator': { hex: '#ff6136', className: 'text-CCmainColor', bgClass: 'bg-CCmainColor' },
};

export const DEFAULT_BRAND_COLOR: ProductColorDefinition = {
  hex: '#00ff84',
  className: 'text-ctMainColor',
  bgClass: 'bg-ctMainColor',
};

// Aliases and partial keywords to match even if misspelled or partial
const KEYWORD_MAP: Array<{ match: RegExp; def: ProductColorDefinition }> = [
  { match: /audit(h)?or|brand|llm/i, def: PRODUCT_COLORS['llm-brand-auditor'] },
  { match: /echo/i, def: PRODUCT_COLORS['echo'] },
  { match: /sniff(er)?/i, def: PRODUCT_COLORS['sniffer'] },
  { match: /context/i, def: PRODUCT_COLORS['context-hub'] },
  { match: /trend/i, def: PRODUCT_COLORS['trend-hunter'] },
  { match: /aura/i, def: PRODUCT_COLORS['aura'] },
  { match: /cadabra/i, def: PRODUCT_COLORS['cadabra'] },
  { match: /hyde/i, def: PRODUCT_COLORS['hyde-park'] },
  { match: /content|creator/i, def: PRODUCT_COLORS['content-creator'] },
];

export function getProductBrandColor(slugOrName?: string): ProductColorDefinition {
  if (!slugOrName) return DEFAULT_BRAND_COLOR;

  const normalized = slugOrName.toLowerCase().trim().replace(/\s+/g, '-');

  // 1. Direct match by key
  if (PRODUCT_COLORS[normalized]) {
    return PRODUCT_COLORS[normalized];
  }

  // 2. Contains match
  for (const [key, val] of Object.entries(PRODUCT_COLORS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }

  // 3. Keyword / regex match (e.g. catches "Audithor" or "Brand" or "LLM")
  for (const item of KEYWORD_MAP) {
    if (item.match.test(normalized)) {
      return item.def;
    }
  }

  return DEFAULT_BRAND_COLOR;
}
