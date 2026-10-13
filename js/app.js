'use strict';
(() => {
  const W = window.PayooWallet;
  const page = document.body.dataset.page;
  if (!page) return;
  const message = document.getElementById('message');
  const format = cents => new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 }).format(cents / 100);
  let account;
  function notify(text, error = false) { message.textContent = text; message.className = 'notice ' + (error ? 'error' : 'success'); message.hidden = false; }
  function session() { try { const value = JSON.parse(sessionStorage.getItem('payoo:session') || 'null'); return value && W.mobile(value.mobile) && value.expires > Date.now() ? value.mobile : null; } catch { return null; } }
  if (page === 'login') {
    document.getElementById('loginForm').addEventListener('submit', event => {
      event.preventDefault();
      const mobile = event.currentTarget.elements.mobile.value.trim();
      const pin = event.currentTarget.elements.pin.value;
      if (!W.mobile(mobile)) return notify('Enter an 11-digit Bangladesh mobile number beginning with 013–019.', true);
      if (pin !== W.PIN) return notify('Incorrect demo PIN. Use 1234.', true);
      try {
        W.read(localStorage, mobile);
        sessionStorage.setItem('payoo:session', JSON.stringify({ mobile, expires: Date.now() + 8 * 60 * 60 * 1000 }));
        location.assign('dashboard.html');
      } catch { notify('Browser storage is unavailable or contains invalid wallet data. Enable storage or clear this site’s data to restart the demo.', true); }
    });
    return;
  }
  account = session();
  if (!account) { location.replace('index.html'); return; }
  document.getElementById('accountLabel').textContent = 'Wallet •••••••' + account.slice(-4);
  document.getElementById('logout').addEventListener('click', () => { sessionStorage.removeItem('payoo:session'); location.replace('index.html'); });
  function render() {
    try {
      const state = W.read(localStorage, account);
      document.getElementById('balance').textContent = format(state.balance);
      const list = document.getElementById('transactions');
      if (!list) return;
      list.replaceChildren();
      const items = page === 'transactions' ? state.transactions : state.transactions.slice(0, 5);
      if (!items.length) { const empty = document.createElement('li'); empty.className = 'empty'; empty.textContent = 'No transactions yet. Add money or try another wallet service to get started.'; list.append(empty); }
      for (const tx of items) {
        const row = document.createElement('li'); row.className = 'transaction';
        const icon = document.createElement('span'); icon.className = 'transaction-icon'; icon.textContent = tx.amount > 0 ? '↙' : '↗'; icon.setAttribute('aria-hidden', 'true');
        const copy = document.createElement('div'); const title = document.createElement('strong'); title.textContent = tx.title;
        const detail = document.createElement('small'); detail.textContent = tx.detail + ' · ' + new Date(tx.time).toLocaleString('en-BD', {dateStyle:'medium',timeStyle:'short'}); copy.append(title, detail);
        const value = document.createElement('strong'); value.className = tx.amount > 0 ? 'credit' : 'debit'; value.textContent = (tx.amount > 0 ? '+' : '−') + format(Math.abs(tx.amount)); row.append(icon, copy, value); list.append(row);
      }
    } catch { notify('Unable to read wallet data. Enable browser storage or clear this site’s data to restart the demo.', true); }
  }
  const form = document.getElementById('walletForm');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (form.dataset.busy === 'true') return;
    if (session() !== account) { location.replace('index.html'); return; }
    const data = Object.fromEntries(new FormData(form)); data.type = page;
    const button = form.querySelector('[type="submit"]'); form.dataset.busy = 'true'; button.disabled = true;
    try {
      const commit = () => W.transact(localStorage, account, data);
      if (navigator.locks) await navigator.locks.request('payoo-wallet-' + account, commit); else commit();
      form.reset(); render(); notify('Success! Your demo balance and transaction history have been updated.');
    } catch (error) { notify(error.name === 'QuotaExceededError' ? 'Browser storage is full. No transaction was saved.' : error.message, true); }
    finally { form.dataset.busy = 'false'; button.disabled = false; }
  });
  window.addEventListener('storage', event => { if (event.key === 'payoo:wallet:' + account || event.key === null) render(); });
  window.addEventListener('pageshow', () => { if (session() !== account) location.replace('index.html'); else render(); });
  render();
})();
