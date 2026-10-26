# 2. One-time developer setup

Everything in the code is already written. These steps create the Sanity
project and connect the code to it. Steps marked **(you)** need a person at the
computer, because they sign in through a browser. The rest Claude can run.

Requirements: Node 22.12 or newer (`node --version`). Work in a terminal at
the repository root, on the `sanity-backend` branch.

## Step 1: sign in to Sanity (you)

```bash
cd studio
npx sanity login
```

A browser window opens. Choose **Google** (or GitHub, or email) and sign in
with the account that should own the project. This creates the Sanity
account if there isn't one yet. Sanity then remembers the sign-in on this
computer.

## Step 2: create the project (you, or Claude once step 1 is done)

Still inside `studio/`:

```bash
npx sanity init --bare --project-name "Finestra" --dataset-default
```

- `--bare` only creates the project; it does not touch the Studio code already in `studio/`.
- `--dataset-default` creates a **public** dataset named `production`, which is what the Free plan allows.
- If it asks which organisation to use, pick your personal one.
- If it offers a plan, choose **Free**. The 30-day Growth trial still switches on by itself.

It prints the new **project ID**, eight characters such as `a1b2c3d4`. The
project ID is not a secret.

(Alternative: create the project on https://www.sanity.io/manage → **Create
project**, name it Finestra, and add a public dataset named `production`.)

## Step 3: put the project ID in two env files

`studio/.env` (copy `studio/.env.example`):

```bash
SANITY_STUDIO_PROJECT_ID=a1b2c3d4
SANITY_STUDIO_DATASET=production
```

`.env.local` at the repository root (keep the `VERCEL_OIDC_TOKEN` line already there):

```bash
SANITY_PROJECT_ID=a1b2c3d4
SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<any long random string>
```

For the secret, `node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"` works.
Both files are git-ignored.

## Step 4: send the schema to Sanity

```bash
cd studio
npm run schema:deploy
```

This uploads the field definitions from `studio/schemaTypes/`, so Sanity's
tools (including the MCP server) know what a piece looks like.

## Step 5: load the sample pieces

```bash
npm run seed
```

This runs `studio/scripts/seed.ts` as you (no API token is created). It
downloads the 21 placeholder photos from Unsplash, uploads them to Sanity,
and creates 4 lines and 21 pieces with fixed IDs. It is safe to run again.

After this the website looks exactly as it did before the switch, which
proves the wiring works. The shop deletes these pieces as real ones go in.

## Step 6: open the Studio locally

```bash
npm run dev
```

Open http://localhost:3333 and sign in. You should see **Pieces**, **Pieces by
line**, and **Lines** in the left menu, with 21 pieces. The GROQ playground
(Vision) appears only here in development, never in the hosted Studio.

## Step 7: run the website against Sanity

From the repository root:

```bash
npm run dev
```

Check http://localhost:3000, `/products`, and a piece page such as
`/products/ring-signet`. Product photos should now load from `cdn.sanity.io`.

## Step 8: put the Studio online

```bash
cd studio
npm run deploy
```

This publishes the Studio to **https://finestra.sanity.studio**, free. If the
name `finestra` is taken, change `studioHost` in `studio/sanity.cli.ts` (for
example to `finestra-bd`) and run it again. Sanity adds the Studio's address
to the project's allowed origins (CORS) on its own.

Run `npm run deploy` again whenever the schema in `studio/` changes.

## Step 9 (optional): connect Claude to Sanity

The quickstart's `sanity init` normally also installs Sanity's agent skills
and MCP server. We skipped the scaffold (the Studio was written by hand), so
add them separately if you want Claude to read and write content directly.
`sanity init` has `--mcp` and `--skills` flags for this; together with
`--bare` and the existing project, it should not touch the Studio code:

```bash
npx sanity init --bare --project <project id> --dataset production --mcp --skills
```

If that prompts for anything unexpected, stop and check `npx sanity init --help`.

## Changing fields later

1. Edit `studio/schemaTypes/piece.ts` (or `line.ts`).
2. Change the matching `Product` type in `lib/catalogue.ts` and the query in `lib/sanity.ts`.
3. `cd studio && npm run schema:deploy && npm run deploy`.
4. Commit and push the website change as usual.

A new **finish** also needs care copy added to `CARE` in `lib/catalogue.ts`.

## Next

[04-webhook-and-deploy.md](04-webhook-and-deploy.md): Vercel environment
variables and the publish webhook.
