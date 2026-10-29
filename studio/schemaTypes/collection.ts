import {defineField, defineType} from 'sanity'
import {SparkleIcon} from '@sanity/icons/Sparkle'

/**
 * A collection: a line that runs across categories, such as Anime. An anime
 * ring is still a ring and an anime key ring still a key ring; the collection
 * is what lets the shelf gather them together.
 *
 * Products may belong to one collection or none. Classic pieces have none.
 *
 * Like a category, a collection that products still point to cannot be
 * deleted until those products are moved or deleted first.
 */
export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Name',
      type: 'string',
      description: 'As it appears on the shelf filter, e.g. "Anime".',
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description:
        'Used in links like /products?collection=anime. Press Generate. Avoid changing it once the collection is live, or old links stop filtering.',
      options: {source: 'label', maxLength: 40},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Short note',
      type: 'string',
      description: 'One line under the filter, e.g. "Rings, key rings, and pendants for fans".',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'order',
      title: 'Position',
      type: 'number',
      description: 'Lower numbers come first in the filter.',
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
