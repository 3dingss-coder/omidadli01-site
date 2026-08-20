# omidadli01-site

سایت شخصی/پورتفولیو امید عدلی (Performance Marketing & CRO).

## ساختار ریپو

- `project/` — سورس‌کد کامل (React + TypeScript + Vite + Tailwind CSS 4)
- `deploy/` — خروجی آماده‌ی دیپلوی روی Cloudflare Workers
  - `deploy/dist/` — build نهایی (static assets)
  - `deploy/worker.js` — Cloudflare Worker (سرو استاتیک + API ساده روی D1)
  - `deploy/wrangler.toml` — تنظیمات Wrangler
  - `deploy/schema.sql` — اسکیمای دیتابیس D1 (اختیاری، worker خودش هم می‌سازدش)

## توسعه

\`\`\`bash
cd project
npm install
npm run dev      # اجرای لوکال
npm run build    # خروجی build در project/dist
\`\`\`

## دیپلوی روی Cloudflare

\`\`\`bash
cd deploy
npx wrangler deploy
\`\`\`

## نکته امنیتی

پین ورود پیش‌فرض پنل ادمین 1234 است — بعد از اولین ورود از داخل پنل ادمین (بخش «تغییر پین‌کد») حتماً تغییرش بده.
