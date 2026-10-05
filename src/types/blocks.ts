export interface ProductItem {
  _id: string;
  name: string;
  tagline?: string;
  slug: string;
  websiteUrl?: string;
  logo?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

export interface ProductCarouselBlockProps {
  _type: 'productCarouselBlock';
  _key?: string;
  heading?: string;
  subheading?: string;
  displayMode?: 'auto' | 'manual';
  selectedProducts?: ProductItem[];
  allProducts?: ProductItem[]; // Używane, gdy tryb to 'auto'
}