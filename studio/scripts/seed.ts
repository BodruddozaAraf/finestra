/**
 * Loads the placeholder catalogue into Sanity, photos included.
 *
 *   cd studio && npm run seed
 *
 * Runs as the signed-in developer (`--with-user-token`), so no API token is
 * created or stored. Safe to run twice: documents use fixed IDs and are
 * replaced, and Sanity stores an identical photo only once.
 *
 * The shop is expected to delete these products as its real ones go in.
 */

import {getCliClient} from 'sanity/cli'
import {API_VERSION} from '../env'
import {
  CATALOGUE,
  CATEGORIES,
  PRODUCT_FRAMES,
  PRODUCT_SHOTS,
  frameId,
} from './placeholder-catalogue'

const client = getCliClient({apiVersion: API_VERSION})

type Photo = {src: string; alt: string}

/** Ask Unsplash for a larger original than the site used to request. */
const original = (src: string) => {
  const url = new URL(src)
  url.searchParams.set('w', '1600')
  url.searchParams.set('q', '85')
  return url.toString()
}

const uploaded = new Map<string, string>()

async function upload(photo: Photo): Promise<string> {
  const key = frameId(photo.src)
  const known = uploaded.get(key)
  if (known) return known

  const res = await fetch(original(photo.src))
  if (!res.ok) throw new Error(`Could not download ${photo.src}: ${res.status}`)
  const asset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), {
    filename: `${key}.jpg`,
    source: {name: 'unsplash', id: key, url: photo.src},
  })
  uploaded.set(key, asset._id)
  console.log(`  photo ${key}`)
  return asset._id
}

const image = async (photo: Photo, withKey = false) => ({
  _type: 'image' as const,
  ...(withKey ? {_key: frameId(photo.src).slice(-12)} : {}),
  asset: {_type: 'reference' as const, _ref: await upload(photo)},
  alt: photo.alt,
})

async function main() {
  const tx = client.transaction()

  CATEGORIES.forEach((c, i) => {
    tx.createOrReplace({
      _id: `category-${c.id}`,
      _type: 'category',
      label: c.label,
      slug: {_type: 'slug', current: c.id},
      note: c.note,
      order: (i + 1) * 10,
    })
  })

  for (const p of CATALOGUE) {
    console.log(p.name)
    const shot = PRODUCT_SHOTS[p.id]
    // As the site showed it before the switch: the product's own shot, then
    // the category's stand-in frames minus any that repeat it.
    const frames = (PRODUCT_FRAMES[p.category] ?? []).filter(
      (f) => frameId(f.src) !== frameId(shot.src),
    )

    tx.createOrReplace({
      _id: `product-${p.id}`,
      _type: 'product',
      name: p.name,
      slug: {_type: 'slug', current: p.id},
      category: {_type: 'reference', _ref: `category-${p.category}`},
      price: p.price,
      material: p.material,
      story: p.story,
      variantLabel: p.variantLabel,
      variants: p.variants,
      soldOut: p.soldOut ?? false,
      onShelf: p.onShelf ?? false,
      mainImage: await image(shot),
      frames: await Promise.all(frames.map((f) => image(f, true))),
    })
  }

  await tx.commit()
  console.log(`\nSeeded ${CATEGORIES.length} categories and ${CATALOGUE.length} products.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
