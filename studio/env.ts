/**
 * The Sanity project this Studio edits. Read from studio/.env (see
 * .env.example). Neither value is a secret: the dataset is public on the Free
 * plan, and the project ID appears in every image URL the site serves.
 */

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

/** Pinned so a Sanity API change never alters what a query returns. */
export const API_VERSION = '2025-02-19'

// No throw here: the CLI loads this file for every command, including the
// `sanity login` that has to run before a project ID exists.
if (!projectId) {
  console.warn(
    'SANITY_STUDIO_PROJECT_ID is not set. Copy studio/.env.example to studio/.env ' +
      'and fill it in. See docs/sanity/02-developer-setup.md.',
  )
}
