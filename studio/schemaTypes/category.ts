import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons/Folder'

/**
 * A product category: what the piece is. Rings, Bracelets, Pendants, Key Rings,
 * and whatever the shop adds next (wallets, belts). Each category becomes a
 * filter on the shelf. Lines that cut across categories, such as Anime, are
 * collections instead (collection.ts).
 *
 * A category that products still point to cannot be deleted; Sanity refuses
 * until those products are moved or deleted first.
 */
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Name',
      type: 'string',
      description: 'As it appears on the shelf filter, e.g. "Rings".',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description:
        'Used in links like /products?category=rings. Press Generate. Avoid changing it once the category is live, or old links stop filtering.',
      options: {source: 'label', maxLength: 40},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Short note',
      type: 'string',
      description: 'One line under the filter, e.g. "Signets, bands, stone settings".',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers come first in the filter and on the shelf.',
      initialValue: 10,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {title: 'Position', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'label', subtitle: 'note'},
  },
})
