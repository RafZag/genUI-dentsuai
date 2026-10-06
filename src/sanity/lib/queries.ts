import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "page" && (slug.current == "/" || slug.current == "home")][0]{
    title,
    sections[]{
      ...,
      _type == "productCarouselBlock" => {
        ...,
        selectedProducts[]->{
          _id,
          name,
          tagline,
          "slug": slug.current,
          websiteUrl,
          logo {
            asset->{ url },
            alt
          }
        },
        "allProducts": *[_type == "product"] | order(_createdAt desc)[0...10]{
          _id,
          name,
          tagline,
          "slug": slug.current,
          websiteUrl,
          logo {
            asset->{ url },
            alt
          }
        }
      }
    }
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    tagline,
    description,
    "slug": slug.current,
    logo {
      asset->{ url },
      alt
    }
  }
`;