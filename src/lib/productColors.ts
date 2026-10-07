/**
 * Brand colors mapped to products as used on dentsuai.com
 */
export const PRODUCT_COLORS: Record<string, { hex: string; className: string }> = {
  'llm-brand-auditor': { hex: '#ffaa00', className: 'text-BAmainColor' },
  'content-creator': { hex: '#ff6136', className: 'text-CCmainColor' },
  'trend-hunter': { hex: '#0098ff', className: 'text-THmainColor' },
  'echo': { hex: '#00baa8', className: 'text-ECmainColor' },
  'aura': { hex: '#9666ff', className: 'text-AUmainColor' },
  'cadabra': { hex: '#05b200', className: 'text-CAmainColor' },
  'hyde-park': { hex: '#d152d8', className: 'text-HPmainColor' },
  'context-hub': { hex: '#5acbff', className: 'text-CHmainColor' },
  'sniffer': { hex: '#217fff', className: 'text-SNmainColor' },
};

export const DEFAULT_BRAND_COLOR = {
  hex: '#00ff84',
  className: 'text-ctMainColor',
};

export function getProductBrandColor(slugOrName?: string) {
  if (!slugOrName) return DEFAULT_BRAND_COLOR;

  const normalized = slugOrName.toLowerCase().replace(/\s+/g, '-');
  for (const [key, val] of Object.entries(PRODUCT_COLORS)) {
    if (normalized.includes(key)) {
      return val;
    }
  }

  return DEFAULT_BRAND_COLOR;
}
