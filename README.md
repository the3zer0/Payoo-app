<div align="center">

# Payoo · Digital Wallet Demo

**A responsive, browser-based digital wallet simulator built with vanilla JavaScript.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

**[🌐 Live Demo](https://payoomobileapp-orcin.vercel.app) · [💻 Source Code](https://github.com/the3zer0/Payoo-app)**

</div>

---

## Overview

**Payoo** is a fintech-inspired **portfolio and learning project**. It simulates everyday wallet operations in the browser: adding money, cashing out, transferring funds, paying bills, applying bonuses, and reviewing transactions.

It is a **demo only**. It does **not** connect to banks or payment services and must not be used with actual money or personal financial details.

![Payoo project visual](./payoo.png)

## Features

- Responsive login, dashboard, and wallet-service pages.
- Add money, cash out, transfer funds, and pay bills.
- Apply one-time `BONUS100` and `BONUS500` promo codes per demo wallet.
- Review transaction history, with latest activity first.
- Persistent **per-demo-number** balances using `localStorage`.
- Session handling with `sessionStorage` and an eight-hour session expiry.
- Validation for account numbers, PINs, amounts, billing data, and available balance.
- Store money as **integer paisa** to avoid floating-point rounding errors.
- Keyboard-accessible controls, labels, focus states, and inline feedback.
- Tests for wallet logic, including invalid transactions and zero balances.

## Tech stack

| Area | Technology |
| --- | --- |
| Interface | Semantic HTML5, CSS3 |
| Application logic | Vanilla JavaScript |
| Persistence | Browser `localStorage` and `sessionStorage` |
| Local tooling | Node.js 20+ and built-in Node test runner |
| Bundling | Custom Node.js build script (no framework/runtime packages) |
| Hosting | Static hosting; Netlify/Vercel configurations included |

**Dependencies:** `package.json` declares **no npm runtime dependencies or devDependencies**. Development tasks use Node.js built-in functionality, so `npm install` is not required.

## Getting started

**Prerequisite:** Node.js **20 or newer**.

```bash
git clone https://github.com/the3zer0/Payoo-app.git
cd Payoo-app

npm test
npm run build
npm start
```

Open **http://localhost:3017**. If you modify a source file, rebuild with `npm run build` before reloading the preview.

### Demo credentials

| Item | Demo value |
| --- | --- |
| Phone number | `01700000000` |
| PIN | `1234` |

You can also use a dummy Bangladesh mobile number that starts with `013`–`019` and has 11 digits. Each demo number starts with **BDT 45,000.00** and maintains its own local browser wallet.

> Never enter a real PIN, bank account number, or sensitive financial information. The demo PIN is intentionally public and provides **no real security**.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run wallet logic tests using Node's built-in test runner |
| `npm run build` | Generate deployable static files in `dist/` |
| `npm start` | Serve the generated `dist/` directory locally |

The local preview defaults to port **3017**; the script also supports a `PORT` environment variable.

## Project structure

```text
index.html             Login / entry page
dashboard.html         Wallet overview
addmoney.html          Add-money flow
cashout.html           Cash-out flow
transfer.html          Transfer flow
paybill.html           Bill-payment flow
getbonus.html          Promo-code flow
transactions.html      Transaction history
css/styles.css         Shared responsive styling
js/wallet.js           Wallet data and transaction logic
js/app.js              UI and browser session logic
scripts/build.cjs      Static build
scripts/serve.cjs      Local preview server
tests/wallet.test.cjs  Wallet behavior tests
netlify.toml           Netlify configuration
vercel.json            Vercel configuration
```

## Deployment

The project builds to a **static `dist/` directory**. Publish **the contents of `dist/`**, not the original source tree.

- **Vercel:** Import the repository; its `vercel.json` contains static build/output settings.
- **Netlify:** Import the repository; `netlify.toml` provides build and publish settings.
- **Other static hosting:** Run `npm test && npm run build`, then upload the generated files in `dist/`.

There are no backend credentials or environment variables required for the demo.

**Live site:** https://payoomobileapp-orcin.vercel.app

## Data handling and limitations

- Transactions are **simulated**; no actual funds are transferred.
- Wallet state lives in `localStorage` and is specific to the browser and site origin.
- Sessions are kept in `sessionStorage`; data does not sync across devices.
- Clearing browser storage removes local demo history and balances.
- Client-side PIN checks and navigation restrictions are **not security boundaries**.
- A real money product would require identity verification, secure server-side authorization, a durable ledger, and regulated payment integrations.

## Testing

`npm test` exercises balance calculations, account separation, transfers, bills, one-time coupons, insufficient funds, and invalid inputs. There is no external test framework to install.

## Author

Built by [Md Rahat Mahmud](https://github.com/the3zer0) for learning and portfolio demonstration.

[Try Payoo →](https://payoomobileapp-orcin.vercel.app)
