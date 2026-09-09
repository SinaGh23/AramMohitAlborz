# SEO Action Plan — آرام محیط البرز (arammohit.ir)

Last updated: 2026-09-09

## Hosting facts you must not forget

| Fact | Value |
|---|---|
| Host | **GitHub Pages** (repo `SinaGh23/AramMohitAlborz`) |
| Canonical domain | **`https://arammohit.ir`** (apex, **no `www`**) |
| `www.arammohit.ir` | 301-redirects to the apex domain |
| `.htaccess` | **Completely ignored.** GitHub Pages is not Apache. |
| 404 page | `/404.html` — GitHub Pages serves it automatically |

**Rule: every canonical, `og:url`, sitemap `<loc>` and Schema URL must use
`https://arammohit.ir` with no `www`.** Getting this wrong is what caused the
2026 ranking collapse.

---

## What broke the rankings (and is now fixed)

1. **Canonical / sitemap pointed at `www.arammohit.ir`, which 301-redirects.**
   204 URLs across the site. Every sitemap entry resolved to a redirect, so
   Google reported "Page with redirect" for the whole sitemap, and every page's
   canonical pointed at a URL that redirects somewhere else. This is the single
   biggest cause. Introduced in commit `33c0033`.
2. **Fabricated `aggregateRating` (4.9 from 127 reviews) with no reviews on the
   page.** This violates Google's structured-data policy for review snippets and
   risks a manual action. Removed.
3. **`BreadcrumbList` that listed the nav menu** instead of a page hierarchy —
   invalid markup on the homepage. Replaced with `WebSite` schema.
4. **Unencoded spaces in absolute image URLs** (`/images/logo img/...`) inside
   `og:image` and Schema `logo`/`image`, making them invalid URLs.
5. Internal links pointed to `/index.html` instead of `/`, creating a duplicate
   of the homepage.

---

## Things only you can do (Claude cannot)

### 1. Google Search Console — do this first, today

The site previously ranked #1 with a plain `<title>آرام محیط البرز</title>` and
no canonical tag at all. That means the ranking was carried by **off-page and
local signals**, not on-page text. Restoring crawl health is what matters most.

1. Go to <https://search.google.com/search-console>.
2. Make sure you have a property for **`https://arammohit.ir`** (or a Domain
   property for `arammohit.ir`). If your only property is the `www` one, add the
   non-www property — **all of your data has been going to the wrong property.**
3. **URL Inspection** → paste `https://arammohit.ir/` → **Request Indexing**.
   Repeat for `https://arammohit.ir/blogs/` and each of the 9 article URLs.
4. **Sitemaps** → remove any old sitemap entry → submit `sitemap.xml`.
5. **Pages** report → check for "Page with redirect", "Duplicate, Google chose a
   different canonical", and "Alternate page with proper canonical tag". These
   should drain over the next 2–4 weeks.
6. **Manual actions** and **Security issues** → confirm both are clean. If there
   is a structured-data manual action from the fake review markup, file a
   reconsideration request now that the markup is gone.

### 2. Google Business Profile — the biggest lever for "سمپاشی کرج"

For a local service query like سمپاشی کرج, the map pack and the business profile
usually outrank on-page factors.

- Claim/verify the profile at <https://business.google.com>.
- Category: **Pest Control Service**.
- Address, phone `09193613357`, and hours must match the website **character for
  character** (the site says: کرج، دهقان ویلا دوم، کوچه بابایی، پلاک ۹۶، واحد ۱).
- Add the website URL as `https://arammohit.ir` (no www).
- Upload real job photos and the وزارت بهداشت permit.
- **Ask every satisfied customer for a Google review.** This is the highest-value
  recurring action available to you. Real reviews also make it legitimate to
  re-add rating markup later.

### 3. Iranian directories and citations

Consistent Name/Address/Phone listings on: [ترب](https://torob.com),
[کجارو], [ایران‌جیب], [جاباما]-style local directories, [بلد], [نشان] (Neshan
maps), [بالادِرِکت], and any کرج business directory. Same NAP everywhere.

### 4. Files you should decide about

- **`images/logo img/Sina Gholami resume.pdf`** — a personal résumé is publicly
  downloadable at `https://arammohit.ir/images/logo%20img/Sina%20Gholami%20resume.pdf`.
  It has nothing to do with the business. **Recommend deleting it.**
- The `.md` docs in this repo are served publicly too; they are now blocked in
  `robots.txt`, but you may prefer to delete them from the deployed branch.

### 5. Verify after deploying

- <https://search.google.com/test/rich-results> → test `https://arammohit.ir/`
  (expect `PestControlService`, `WebSite`, `FAQPage`, no errors).
- <https://pagespeed.web.dev/> → test the homepage on **Mobile**.
- Check <https://arammohit.ir/robots.txt> and `/sitemap.xml` load correctly.

---

## Realistic timeline

| When | What to expect |
|---|---|
| 1–3 days | Google recrawls the homepage after you request indexing |
| 1–2 weeks | Sitemap errors clear; correct canonical registered |
| 2–6 weeks | Rankings recover toward previous positions |
| 1–3 months | Gains beyond the previous position, if reviews and citations grow |

Do **not** make further large structural changes during this window — Google
needs a stable site to re-establish trust.

---

## Next content step (not yet done)

Dedicated service pages would add topical depth without cannibalising the
homepage's hold on سمپاشی کرج:

- `/khadamat/sampashi-manzel/` — سمپاشی منزل و آپارتمان
- `/khadamat/sampashi-restaurant/` — سمپاشی رستوران و آشپزخانه صنعتی
- `/khadamat/sampashi-sanati/` — سمپاشی کارخانه و انبار
- `/khadamat/sampashi-bimarestan/` — سمپاشی بیمارستان و مراکز درمانی

Each needs 800+ words of genuinely specific content (process, timing, safety,
what the customer must prepare) — not spun variations of each other.
