import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

/**
 * One product on the shelf. Mirrors the Product type in lib/catalogue.ts at
 * the repository root; change the two together.
 *
 * Validation here is what stops a half-filled product from being published,
 * so the site never has to guess at a missing price or photograph.
 *
 * There is no position field: products show newest first, by when they were
 * created in the Studio.
 */

/** The description a screen reader speaks in place of a photograph. */
const altField = defineField({
  name: 'alt',
  title: 'Describe the photo',
  type: 'string',
  description:
    'What is in the picture, in one plain sentence, e.g. "A wide silver signet ring on a black surface." Read aloud to blind visitors.',
  validation: (rule) => rule.required().error('Add a short description of the photo.'),
})

/**
 * One choice within a group, e.g. "Black" under Colour. A photo is worth
 * adding when the choice changes how the product looks; sizes rarely need one.
 */
export const optionValue = defineType({
  name: 'optionValue',
  title: 'Option',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Name',
      type: 'string',
      description: 'e.g. Black, 19mm, 28 inch chain.',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Optional. The product in this option, e.g. the black version.',
      options: {hotspot: true},
      fields: [altField],
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold out',
      type: 'boolean',
      description: 'Only this option. The rest stay available.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'label', soldOut: 'soldOut', media: 'image'},
    prepare: ({title, soldOut, media}) => ({
      title,
      subtitle: soldOut ? 'Sold out' : undefined,
      media,
    }),
  },
})

/** A named set of choices, e.g. Colour: Silver, Black. */
export const optionGroup = defineType({
  name: 'optionGroup',
  title: 'Option group',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'What the options are called',
      type: 'string',
      description: 'e.g. Colour, Size, Chain.',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'values',
      title: 'Options',
      type: 'array',
      of: [defineArrayMember({type: 'optionValue'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'label', values: 'values'},
    prepare: ({title, values}) => ({
      title,
      subtitle: ((values ?? []) as {label?: string}[]).map((v) => v.label).join(', '),
    }),
  },
})

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'photos', title: 'Photos'},
    {name: 'details', title: 'Details'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'basics',
      description:
        'The end of the product page link, e.g. /products/kalighat-signet. Press Generate. Avoid changing it after the product is shared, or old links break.',
      options: {source: 'name', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'basics',
      to: [{type: 'category'}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      group: 'basics',
      to: [{type: 'collection'}],
      description: 'Optional. e.g. Anime. Leave empty for classic pieces.',
      options: {disableNew: true},
    }),
    defineField({
      name: 'price',
      title: 'Price (Taka)',
      type: 'number',
      group: 'basics',
      description: 'Whole Taka, no symbol, e.g. 1450.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold out',
      type: 'boolean',
      group: 'basics',
      description: 'Keeps the product on the site, marked as sold out.',
      initialValue: false,
    }),
    defineField({
      name: 'onShelf',
      title: 'On the homepage shelf',
      type: 'boolean',
      group: 'basics',
      description: 'Shows the product in "On the shelf this week" on the homepage.',
      initialValue: false,
    }),

    defineField({
      name: 'mainImage',
      title: 'Main photo',
      type: 'image',
      group: ['basics', 'photos'],
      description:
        'The photo on the shelf and at the top of the product page. Square photos work best. Use the crop icon to mark the part that must always stay in view.',
      options: {hotspot: true},
      fields: [altField],
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'frames',
      title: 'More photos',
      type: 'array',
      group: 'photos',
      description: 'Other angles, or the product being worn. Optional. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [altField],
        }),
      ],
      validation: (rule) => rule.max(8),
    }),

    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      group: 'details',
      description: 'e.g. "925 silver" or "Waxed cord, steel clasp".',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'One or two sentences on what the product is.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'optionGroups',
      title: 'Options',
      type: 'array',
      group: 'details',
      description:
        'What the product comes in, e.g. Colour and Size. Up to two. Leave empty for one-size or adjustable pieces.',
      of: [defineArrayMember({type: 'optionGroup'})],
      validation: (rule) => rule.max(2),
    }),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: '_createdAt', direction: 'desc'}]},
    {title: 'Name', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
    {title: 'Price, low to high', name: 'priceAsc', by: [{field: 'price', direction: 'asc'}]},
  ],
  preview: {
    select: {
      name: 'name',
      category: 'category.label',
      collection: 'collection.label',
      price: 'price',
      soldOut: 'soldOut',
      media: 'mainImage',
    },
    prepare({name, category, collection, price, soldOut, media}) {
      const bits = [
        category,
        collection,
        price ? `৳ ${Number(price).toLocaleString('en-US')}` : null,
      ]
      if (soldOut) bits.push('Sold out')
      return {title: name, subtitle: bits.filter(Boolean).join(' · '), media}
    },
  },
})
