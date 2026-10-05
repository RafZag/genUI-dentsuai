import {defineField, defineType} from 'sanity'


export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        })
    ],
})
