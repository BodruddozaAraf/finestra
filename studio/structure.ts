import type {StructureResolver} from 'sanity/structure'
import {FolderIcon} from '@sanity/icons/Folder'
import {TagIcon} from '@sanity/icons/Tag'
import {API_VERSION} from './env'

/**
 * The Studio's left-hand menu, in the shop's words: every piece, the same
 * pieces split by line, then the lines themselves.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Finestra')
    .items([
      S.documentTypeListItem('piece').title('Pieces').icon(TagIcon),
      S.listItem()
        .title('Pieces by line')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('line')
            .title('Pieces by line')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
            .child((lineId) =>
              S.documentList()
                .title('Pieces')
                .schemaType('piece')
                .apiVersion(API_VERSION)
                .filter('_type == "piece" && line._ref == $lineId')
                .params({lineId})
                .defaultOrdering([{field: 'order', direction: 'asc'}])
                .initialValueTemplates([
                  S.initialValueTemplateItem('piece-in-line', {lineId}),
                ]),
            ),
        ),
      S.divider(),
      S.documentTypeListItem('line').title('Lines').icon(FolderIcon),
    ])
