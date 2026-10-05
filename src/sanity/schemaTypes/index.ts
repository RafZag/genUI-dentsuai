import { type SchemaTypeDefinition } from 'sanity'
import productType from './documents/product'
import { productCarouselBlock } from './blocks/productCarouselBlock'
import { page } from './documents/page'


export const schemaTypes: SchemaTypeDefinition[] = [productType, productCarouselBlock, page]
