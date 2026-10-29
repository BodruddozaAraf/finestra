import type {StructureResolver} from 'sanity/structure'
import {FolderIcon} from '@sanity/icons/Folder'
import {SparkleIcon} from '@sanity/icons/Sparkle'
import {TagIcon} from '@sanity/icons/Tag'
import {API_VERSION} from './env'

const NEWEST_FIRST = [{field: '_createdAt', direction: 'desc' as const}]

/**
 * The Studio's left-hand menu, in the shop's words: every product, the same
 * products split by category and by collection, then the categories and
 * collections themselves.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Finestra')
    .items([
      S.documentTypeListItem('product')
        .title('Products')
        .icon(TagIcon)
        .child(S.documentTypeList('product').title('Products').defaultOrdering(NEWEST_FIRST)),
      S.listItem()
        .title('Products by category')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('category')
            .title('Products by category')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
            .child((categoryId) =>
              S.documentList()
                .title('Products')
                .schemaType('product')
                .apiVersion(API_VERSION)
                .filter('_type == "product" && category._ref == $categoryId')
                .params({categoryId})
                .defaultOrdering(NEWEST_FIRST)
                .initialValueTemplates([
                  S.initialValueTemplateItem('product-in-category', {categoryId}),
                ]),
            ),
        ),
      S.listItem()
        .title('Products by collection')
        .icon(SparkleIcon)
        .child(
          S.documentTypeList('collection')
            .title('Products by collection')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
            .child((collectionId) =>
              S.documentList()
                .title('Products')
                .schemaType('product')
                .apiVersion(API_VERSION)
                .filter('_type == "product" && collection._ref == $collectionId')
                .params({collectionId})
                .defaultOrdering(NEWEST_FIRST),
            ),
        ),
      S.divider(),
      S.documentTypeListItem('category').title('Categories').icon(FolderIcon),
      S.documentTypeListItem('collection').title('Collections').icon(SparkleIcon),
    ])
