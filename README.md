# The Vedic Dharma — James Kalomiris author site

Static rebuild of `thevedicdharma.com` (migrated off Duda), ready to deploy
to Netlify. Plain HTML/CSS/JS — no build step, no npm dependencies.

## What this site is

This is an **author/book-promotion site** for James Kalomiris, author of
*The Secret History of the Vedas* book series. There is no physical
business, address, or hours — content centers on the books, Amazon buy
links, reviews, an author bio, and a newsletter signup.

## Project structure

```
.
├── index.html          Single page: hero, intro, books, reviews, about, contact
├── css/style.css        All styles (brand colors/fonts as CSS custom properties)
├── js/main.js            Mobile nav toggle, scroll reveal, Netlify form submit
├── images/               Real photos/covers/logo pulled from the Duda export
├── fonts/exlibris-bold.otf  Self-hosted display font (used for headings)
└── netlify.toml          Publish config + cache headers
```

Body text uses **Epilogue** (loaded from Google Fonts). Headings use
**Ex Libris** (`fonts/exlibris-bold.otf`, self-hosted — this was already a
custom-uploaded font in the original site, not a Google Font).

Brand colors (from the original site's page CSS, not the generic Duda
platform stylesheet):

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `rgb(0,0,0)` | Text, buttons, contact section background |
| `--color-cream` | `rgb(250,247,240)` | Page background |
| `--color-gold` | `rgb(246,186,44)` | Accent, buttons, links on dark background |
| `--color-ink-soft` | `rgba(0,0,0,0.7)` | Secondary text |

## Updating content

Everything is hand-authored HTML in `index.html` — no CMS, no templating.

- **Book descriptions / Amazon links** — each book is one `<article class="book-card">`
  block in the `#books` section. The `href` on the "Buy Now" button is the
  Amazon product page.
- **"Coming Soon" books** (*The Yoga of Karl Marx*, *Dialectical
  Immaterialism*) — same markup but `book-card-soon`, with a `badge-soon`
  span instead of a buy button. Add a real "Buy Now" link and drop the
  badge once each book is published.
- **Reviews** — grouped under `#reviews`, one `.reviews-group` per book,
  each review a `<blockquote>`.
- **About Me bio** — `#about` section, one paragraph.
- **Contact email / social links** — `#contact` section.
- **Nav / anchor links** — `.site-nav` in the `<header>`; anchors must match
  section `id`s.

There are no hours or address to maintain (there weren't any in the
original export).

## Missing / TODO

- **Blog** — the original Duda export's blog page had zero published posts
  (empty RSS feed). Not migrated. Add a blog section/page later if there's
  real content for it.
- **"Empty Page"** — was a genuinely blank stub in the original nav.
  Dropped entirely.
- **Social share image** — `og:image` currently points at the small round
  Om logo (`images/logo-icon.png`, 207×204px). A larger, purpose-made
  1200×630 share image would look better in social previews — none existed
  in the export.
- **The Vedic Book of Change** (third book in the planned "Marxist Dharma"
  trilogy) is mentioned in body copy but has no cover art in the export —
  not given its own book card for that reason.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploying to Netlify

You'll need to do this step yourself — this environment has no Netlify
credentials.

**Option A — Git-connected (recommended, gets auto-deploys on push):**

1. In the Netlify dashboard: **Add new site → Import an existing project**.
2. Connect to GitHub and pick this repository.
3. Build settings: leave **Build command** empty, set **Publish directory**
   to `.` (repo root, since `index.html` lives there).
4. Set the **Production branch** to whichever branch you want live (check
   this matches where you actually merge — a mismatched branch/directory
   is the #1 reason a form/site "deploys fine" but shows nothing new).
5. Deploy.

**Option B — Drag-and-drop:**

1. Download/clone this repo locally.
2. In the Netlify dashboard: **Add new site → Deploy manually**.
3. Drag the project folder (the one containing `index.html`) onto the
   upload area.

## Post-deploy checklist

Go through this once the site is live:

1. **Contact form detection** — go to **Site → Forms** in the Netlify
   dashboard. If it's empty after a successful deploy:
   - Double check the production branch and publish directory in Netlify's
     build settings actually match where `index.html` lives. A deploy can
     succeed while serving the wrong branch/directory, and forms never get
     detected on that path.
   - Check **Project configuration** for a forms/post-processing detection
     toggle — some Netlify project types require this to be explicitly
     enabled, not just the `data-netlify` attribute on the `<form>`.
   - Once detected, **submit the form for real**. It's wired with a
     `fetch()` + `event.preventDefault()` handler (`js/main.js`), so a
     successful submission shows an inline "Thank you" message on the page
     itself instead of redirecting to Netlify's generic success page.
2. **Caching** — `netlify.toml` currently sets short cache lifetimes
   (5 min for CSS/JS, 1 hour for images) specifically so edits show up
   quickly for returning visitors while the site is still being revised.
   Don't lengthen these to "immutable"/long `max-age` until the site is
   stable, or asset filenames are content-hashed — otherwise a future
   logo/CSS/JS fix can be invisible to anyone who already visited.
3. **Brand assets** — the logo and book covers here are the real files
   pulled from the Duda export. If a different logo file, favicon, or a
   review-platform badge is ever wanted, provide it as an actual file
   attachment or raw SVG/PNG — not a pasted image in chat, which usually
   isn't retrievable as a real file.
4. **Amazon links** — verify each "Buy Now" button still resolves (Amazon
   occasionally deprecates old product URLs); they're canonical
   `amazon.com/dp/<ASIN>` links, not the tracking-parameter URLs from the
   original export.
5. **Third-party links** — check the social links (Facebook, Instagram,
   Twitter/X, LinkedIn, YouTube, Substack, Amazon author page) still point
   where expected.

## Git / PR mechanics note

This repository had no commit history before this migration, so this
branch's first push became the repo's default branch. If you want a PR
against a separate `main` later, `main` needs to be created first (e.g. an
orphan empty commit), and this branch's history reconciled onto it before
GitHub will allow opening a PR between them.
