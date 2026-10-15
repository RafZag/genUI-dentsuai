import enProductPages from '@/locales/en/productPages.json';

const productPages = enProductPages.productPages;

export function getProductMetadata(key) {
  const page = productPages[key];

  if (!page) {
    return {
      title: 'dentsu AI Stack',
      description: 'A collection of AI tools and resources for creative professionals.',
    };
  }

  if (page.metadata) {
    return page.metadata;
  }

  return {
    title: `${page.title} | dentsu AI Stack`,
    description: page.description,
  };
}
