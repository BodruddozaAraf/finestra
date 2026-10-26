import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

/**
 * One piece on the shelf. Mirrors the Product type in lib/catalogue.ts at the
 * repository root; change the two together.
 *
 * Validation here is what stops a half-filled piece from being published, so
 * the site never has to guess at a missing price or photograph.
 */

/** Keys into CARE in lib/catalogue.ts. Adding one here needs care copy there. */
const FINISHES = [
  {title: 'Silver (925)', value: 'silver'},
  {title: 'Steel', value: 'steel'},
  {title: 'Cord', value: 'cord'},
  {title: 'Stone', value: 'stone'},
  {title: 'Acrylic', value: 'acrylic'},
  {title: 'Enamel', value: 'enamel'},
  {title: 'Resin', value: 'resin'},
]

/** The description a screen reader speaks in place of a photograph. */
const altField = defineField({
  name: 'alt',
  title: 'Describe the photo',
  type: 'string',
  description:
    'What is in the picture, in one plain sentence, e.g. "A wide silver signet ring on a black surface." Read aloud to blind visitors.',
  validation: (rule) => rule.required().error('Add a short description of the photo.'),
})

export const piece = defineType({
  name: 'piece',
  title: 'Piece',
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
        'The end of the piece page link, e.g. /products/kalighat-signet. Press Generate. Avoid changing it after the piece is shared, or old links break.',
      options: {source: 'name', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'line',
      title: 'Line',
      type: 'reference',
      group: 'basics',
      to: [{type: 'line'}],
      options: {disableNew: true},
      validation: (rule) => rule.required(),
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
      description: 'Keeps the piece on the site, marked as sold out.',
      initialValue: false,
    }),
    defineField({
      name: 'onShelf',
      title: 'On the homepage shelf',
      type: 'boolean',
      group: 'basics',
      description: 'Shows the piece in "On the shelf this week" on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      group: 'basics',
      description: 'Lower numbers come first within the line.',
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main photo',
      type: 'image',
      group: ['basics', 'photos'],
      description:
        'The photo on the shelf and at the top of the piece page. Square photos work best. Use the crop icon to mark the part that must always stay in view.',
      options: {hotspot: true},
      fields: [altField],
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'frames',
      title: 'More photos',
      type: 'array',
      group: 'photos',
      description: 'Other angles, or the piece being worn. Optional. Drag to reorder.',
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
      description: 'One or two sentences on what the piece is.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'finish',
      title: 'Finish',
      type: 'string',
      group: 'details',
      description: 'Picks the care note shown on the piece page.',
      options: {list: FINISHES},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variantLabel',
      title: 'What the options are called',
      type: 'string',
      group: 'details',
      description: 'e.g. Size, Length, Cord, Finish.',
      initialValue: 'Size',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'variants',
      title: 'Options',
      type: 'array',
      group: 'details',
      description: 'One per entry, e.g. 18mm, 19mm, 20mm. Type one and press Enter.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Line, then position',
      name: 'lineThenOrder',
      by: [
        {field: 'line.order', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {title: 'Name', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
    {title: 'Price, low to high', name: 'priceAsc', by: [{field: 'price', direction: 'asc'}]},
  ],
  preview: {
    select: {
      name: 'name',
      line: 'line.label',
      price: 'price',
      soldOut: 'soldOut',
      media: 'mainImage',
    },
    prepare({name, line, price, soldOut, media}) {
      const bits = [line, price ? `৳ ${Number(price).toLocaleString('en-US')}` : null]
      if (soldOut) bits.push('Sold out')
      return {title: name, subtitle: bits.filter(Boolean).join(' · '), media}
    },
  },
})
