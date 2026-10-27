import type {StructureResolver} from 'sanity/structure'
import {FolderIcon} from '@sanity/icons/Folder'
import {TagIcon} from '@sanity/icons/Tag'
import {API_VERSION} from './env'

const NEWEST_FIRST = [{field: '_createdAt', direction: 'desc' as const}]

/**
 * The Studio's left-hand menu, in the shop's words: every product, the same
 * products split by category, then the categories themselves.
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
      S.divider(),
      S.documentTypeListItem('category').title('Categories').icon(FolderIcon),
    ])
