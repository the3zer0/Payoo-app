# Payoo — Digital Wallet Demo

A responsive portfolio project built with HTML, CSS and vanilla JavaScript. No runtime packages, external fonts, CDN scripts or backend are required.

## Start locally

Requires Node.js 20 or later for development commands. No dependency installation is necessary.

```sh
npm test
npm run build
npm start
```

Open http://localhost:3017. Re-run the build and reload the browser after editing source files.

Demo number: **01700000000**. Demo PIN: **1234**. Any valid-format dummy Bangladesh mobile number (11 digits, beginning 013–019) has its own wallet, initially **BDT 45,000.00**. Do not use real financial details.

## Features

- Responsive login, dashboard and six wallet service pages.
- Persistent per-account balances, including zero balances.
- Add money, cashout, transfer, bill payment and bonuses.
- One-time BONUS100 and BONUS500 coupons per demo wallet.
- Saved transaction history, newest first, with a recent activity dashboard.
- Amounts stored as integer paisa to avoid floating-point balance errors.
- PIN, recipient, bank, bill account and sufficient-balance validation.
- Demo session expires after eight hours; logout clears the tab's session.
- Accessible labels, native links/buttons, keyboard focus states and inline status messages.

## Deploy

Deploy **only the contents of `dist/`** after running `npm test && npm run build`.

- **Netlify:** import the source repository; `netlify.toml` defines the build command and publish directory. Alternatively upload the built `dist` folder.
- **Vercel:** import the source repository; `vercel.json` specifies the static build and output directory.
- **GitHub Pages or another static host:** publish the files inside `dist` with `index.html` at the deployment root. All asset and page links are relative, so project subdirectories work.

No environment variables or payment keys are needed. Use HTTPS. Netlify and Vercel configurations include response security headers. Other hosts may require configuring equivalent headers separately. A custom `404.html` is included.

The deployment ZIP contains the built site's contents at its root. Unzip and upload those files. Do not publish `work/`, which contains an original-source backup.

## Data and limitations

This is a **simulated wallet for learning and portfolio use**, not a real MFS/payment platform. No money is sent, bank ownership is not checked, and the PIN is public demo logic. Client-side route checks are a convenience, not a security boundary.

Wallets are stored in localStorage under `payoo:wallet:<mobile>`; sessions are in sessionStorage. Data persists in the same browser/origin, is not synced across devices, and can be changed or cleared by the browser user. Original unscoped `balance` data is not imported because it has no account identity. Clear site storage to reset the demo. Web Locks serializes same-wallet writes across tabs in supported browsers; older browsers use a best-effort synchronous fallback. Storage failures are reported instead of displaying a false success.

Real financial use requires a secure backend, verified identities, server-side authorization and a ledger, auditability, and payment-provider integration.

## Validation

`npm test` covers balances, zero preservation, account isolation, all wallet flows, duplicate coupons, invalid inputs, insufficient funds, and storage failures. Browser checks covered all wallet pages at 320px, 768px and 1440px, plus deposit/reload, transfer to zero, coupon reuse prevention, cashout, bill payment and history.

## Files

- `*.html`: deployable page source
- `css/styles.css`: shared responsive styles
- `js/wallet.js`: testable wallet storage and transaction logic
- `js/app.js`: UI, session and form handling
- `scripts/build.cjs`: static output builder
- `scripts/serve.cjs`: loopback-only development preview
- `scripts/generate.cjs`: shared page template generator (rerunning overwrites the generated HTML pages)
- `tests/wallet.test.cjs`: Node test suite
- `work/original/`: original files retained before changes
