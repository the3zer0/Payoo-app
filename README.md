# Payoo App

A mobile-style digital wallet demo built with HTML, Tailwind CSS and vanilla JavaScript. It explores common wallet interactions through separate, easy-to-follow pages.

> **Learning / portfolio demo:** This app does not connect to a bank or payment service. Login, balances and transactions are simulated in the browser. Do not enter real account details or PINs.

![Payoo app preview](payoo.png)

## Features

- Mobile number and PIN login screen
- Dashboard with wallet service shortcuts
- Add money and cashout interfaces
- Money transfer and bill payment interfaces
- Coupon-based bonus demo
- Mobile-focused UI styled with Tailwind CSS

## Tech stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript and DOM events
- Browser localStorage (used by transfer, bill payment and bonus pages)

## Run locally

No package installation or build step is required.

```bash
git clone https://github.com/the3zer0/Payoo-app.git
cd Payoo-app
```

Serve the folder using VS Code Live Server, or Python if installed:

```bash
python -m http.server 5500
```

Open **http://localhost:5500**. Internet access is needed for the Tailwind CDN. Keep the same hostname and port while testing because localStorage is scoped to the site origin.

## Try the demo

1. Enter a dummy mobile number and PIN `1234` on the login screen.
2. Open a wallet service from the dashboard.
3. Use PIN `1234` for add money, cashout, transfer and bill payment.
4. Try coupon `BONUS100` or `BONUS500` on the bonus page.

The intended starting demo balance is **45,000**, displayed with a dollar sign. The login screen currently accepts any nonempty mobile value and any four-digit PIN; money actions specifically require `1234`.

## Project structure

```text
Payoo-app/
├── index.html          # Login screen
├── dashboard.html      # Dashboard and static payment examples
├── addmoney.html       # Add money
├── cashout.html        # Cashout
├── transfer.html       # Transfer money
├── getbonus.html       # Coupon bonus
├── paybill.html        # Bill payment
├── js/                 # Page-specific event handlers
├── assets/             # Icons and background images
├── payoo.png           # Project preview
└── README.md
```

## Current limitations / review findings

These issues exist in the current application; adding this README does not fix them.

- **Balances are inconsistent across pages.** Add money and cashout start from 45,000 on every load and do not persist changes. The dashboard displays a hardcoded balance. Other pages use localStorage.
- **Zero balance is incorrectly reset.** Transfer, bill payment and bonus use `parseFloat(value) || 45000`, which treats a valid zero as missing data.
- **Two dashboard actions are broken.** The logo and Transactions tile call `goDashboardNoActive()` and `goToDashboardWithActive()`, but neither function is defined.
- **Authentication is only a demo.** There is no server, authenticated session or route protection; dashboard pages can be opened directly. Logout only navigates to the login page.
- **Payment details are not validated or processed.** Bank, account, agent and recipient fields do not participate in the JavaScript transaction logic.
- **Transaction history is static.** The Latest Payment cards are examples and are not generated from money actions.
- **Coupons can be redeemed repeatedly.** There is no redemption tracking.
- **Money validation needs strengthening.** Use finite numbers, sensible bounds and integer minor units rather than unrestricted floating-point arithmetic.
- **Accessibility can be improved.** Replace clickable navigation divs with links/buttons and associate labels with inputs.

## Suggested next steps

1. Share one balance and transaction store across all pages; preserve zero correctly.
2. Record transactions and render real demo history on the dashboard.
3. Fix dashboard navigation and validate all required form fields.
4. Add one-time coupon redemption and consistent demo login behavior.
5. Add regression tests for reloads, page transitions, insufficient funds and zero balance.
6. For a real payment product, implement server-side authentication, authorization, validation and a verified payment provider integration. Browser storage is not a trusted financial ledger.

## Author

**Md Rahat Mahmud** — [GitHub](https://github.com/the3zer0) · [LinkedIn](https://www.linkedin.com/in/mahmud3zer0)
