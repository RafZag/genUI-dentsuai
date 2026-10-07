import { type SchemaTypeDefinition } from 'sanity'
import productType from './documents/product'
import { productCarouselBlock } from './blocks/productCarouselBlock'
import { page } from './documents/page'
import {
  challengesBlock,
  solutionsBlock,
  gainsBlock,
  usageBlock,
  faqAccordionBlock,
} from './blocks/productBlocks';


export const schemaTypes: SchemaTypeDefinition[] = [productType, productCarouselBlock, page, challengesBlock, solutionsBlock, gainsBlock, usageBlock, faqAccordionBlock,    ]
