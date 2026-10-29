/**
 * One-off: moves every product from the old single options list
 * (variantLabel + variants) to option groups, and removes the old fields.
 *
 *   cd studio && npx sanity exec scripts/migrate-options.ts --with-user-token
 *
 * The seed rewrites the placeholder products itself; this is for the ones the
 * shop typed in by hand. Safe to run twice: a product that already has option
 * groups is left alone, apart from clearing the old fields.
 */

import {getCliClient} from 'sanity/cli'
import {API_VERSION} from '../env'

const client = getCliClient({apiVersion: API_VERSION})

const key = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-')

type Legacy = {
  _id: string
  name: string
  variantLabel?: string
  variants?: string[]
  optionGroups?: unknown[]
}

async function main() {
  // Drafts too, so an unpublished edit doesn't bring the old fields back.
  const products = await client.fetch<Legacy[]>(
    `*[_type == "product" && (defined(variantLabel) || defined(variants))]
      {_id, name, variantLabel, variants, optionGroups}`,
    {},
    {perspective: 'raw'},
  )

  const tx = client.transaction()
  for (const p of products) {
    const values = (p.variants ?? []).filter((v) => v.trim() && v !== 'Adjustable')
    const patch = client.patch(p._id).unset(['variantLabel', 'variants'])
    if (!p.optionGroups?.length && values.length) {
      const label = p.variantLabel || 'Size'
      patch.set({
        optionGroups: [
          {
            _type: 'optionGroup',
            _key: key(label),
            label,
            values: values.map((v) => ({
              _type: 'optionValue',
              _key: key(v),
              label: v,
              soldOut: false,
            })),
          },
        ],
      })
    }
    tx.patch(patch)
    console.log(`${p.name}: ${p.variantLabel ?? ''} ${values.join(', ')}`)
  }

  await tx.commit()
  console.log(`\nMoved ${products.length} products to option groups.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
