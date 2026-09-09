# چک‌لیست انتشار مقاله جدید بلاگ

مرجع کامل یک مقاله استاندارد: `blogs/morche/morche.html` — قالب آماده: `blogs/_template/post-template.html`

## ۱) انتخاب موضوع

- تکراری نباشد (لیست مقالات موجود را در `blogs/index.html` چک کن).
- یک سوال واقعی کاربر را جواب بدهد («چرا مورچه‌ها برمی‌گردند؟» بهتر از «درباره مورچه»).
- کلمه کلیدی اصلی مشخص باشد و در `title`، `description`، `h1` و URL بیاید.
- **کرج** فقط در `title` و متا و یکی-دو جای طبیعی بیاید، نه در همه تیترها (خدمات فقط محدود به کرج نیست).
- **قالب محتوا را عوض کن** تا مقاله‌ها شبیه هم نشوند: راهنمای جامع، مقایسه گونه‌ها، افسانه و واقعیت (myth-busting)، چک‌لیست فصلی، پرسش و پاسخ، بررسی یک مورد واقعی. ولی اسکلت سئو (فهرست مطالب، جدول، FAQ، اسکیما) همیشه بماند.

## ۲) ساخت فایل

1. پوشه جدید: `blogs/<slug>/<slug>.html` (slug انگلیسی کوتاه، بعد از انتشار **هرگز** تغییر نکند).
2. قالب `_template/post-template.html` را کپی کن و همه `morche` ها را با slug جدید عوض کن.
3. `<meta name="robots">` را به `index, follow` برگردان.
4. تاریخ‌ها: `datePublished`/`dateModified` (میلادی) در اسکیما + تاریخ شمسی در `post-meta`.
5. حداقل ۱۲۰۰ کلمه، لینک داخلی به ۲-۳ مقاله مرتبط + یک لینک به صفحه اصلی.
6. سوالات FAQ صفحه و اسکیمای `FAQPage` باید عیناً یکی باشند.
7. **فقط اطلاعات واقعی شرکت**: تلفن‌ها 09193613357 / 09194870530 / 026-34209019، مجوز وزارت بهداشت، مدیریت مهندس فاطمه براتی. قیمت، آمار و نظرات مشتری از خودمان نمی‌سازیم.

## ۳) عکس‌ها

- ۳ عکس در `blogs/images/` با نام `<slug>1..3` (webp یا jpg بهینه‌شده، زیر ۲۰۰KB).
- منبع آزاد (ویکی‌مدیا کامنز با لایسنس CC/PD) یا عکس خود شرکت؛ برای عکس‌های CC خط اعتبار (`img-credit`) زیر عکس‌ها بیاید.
- `alt` فارسی توصیفی، `width`/`height` مشخص، عکس دوم و سوم `loading="lazy"`.

## ۴) اتصال به بقیه سایت (هر ۴ مورد الزامی)

1. **sitemap.xml**: بلوک `<url>` جدید با عکس‌ها + به‌روزرسانی `lastmod` صفحه بلاگ.
2. **blogs/index.html**: مقاله جدید را «جدیدترین مقاله» (featured) کن و مقاله featured قبلی را به شبکه کارت‌ها منتقل کن؛ اسکیمای `Blog` بالای صفحه هم یک `BlogPosting` جدید بگیرد.
3. **index.html (صفحه اصلی)**: در صورت مهم بودن مقاله، کارت جدید در بخش بلاگ اضافه کن.
4. **سایدبار ۹+ مقاله قبلی**: لینک `side-link` مقاله جدید را به همه پست‌های قبلی اضافه کن (اسکریپت پایتون با replace ساده کافی است).

## ۵) بعد از انتشار

- در Google Search Console آدرس جدید را Inspect و Request Indexing کن.
- سایت روی GitHub Pages است؛ فقط commit + push کافی است.

## After editing CSS or JS: bump the cache version

GitHub Pages serves `style.css` / `blog.css` / `script.js` with
`Cache-Control: max-age=14400`, so returning visitors keep the old file for up
to 4 hours and will see a half-broken page (new HTML, old CSS).

Every local stylesheet and script is linked with a version stamp:

```html
<link rel="stylesheet" href="style.css?v=20260909a" />
<script defer src="script.js?v=20260909a"></script>
```

**Whenever you change a `.css` or `.js` file, bump that stamp in every HTML
file** (e.g. `?v=20260909a` -> `?v=20260910a`). Changing the query string makes
browsers treat it as a new file and fetch it immediately.

From the repo root:

```bash
OLD=20260909a; NEW=20260910a
grep -rl "?v=$OLD" --include=*.html . | xargs sed -i "s/?v=$OLD/?v=$NEW/g"
```

Do NOT add a version stamp to the CDN links (Vazirmatn, ionicons, EmailJS) —
those are already pinned to a specific release.
