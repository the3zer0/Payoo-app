(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PayooWallet = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const PIN = '1234';
  const BANKS = ['BRAC Bank', 'UCB Bank', 'Dutch-Bangla Bank', 'Islami Bank Bangladesh', 'Eastern Bank Limited (EBL)', 'City Bank', 'Prime Bank', 'Pubali Bank', 'Bank Asia', 'NRB Bank'];
  const BILLS = ['Electricity', 'Gas', 'Water', 'Internet'];
  const COUPONS = { BONUS100: 10000, BONUS500: 50000 };
  function mobile(value) { return /^01[3-9]\d{8}$/.test(value); }
  function amount(value) {
    if (!/^\d+(\.\d{1,2})?$/.test(String(value).trim())) throw new Error('Enter a positive amount with at most two decimal places.');
    const parts = String(value).trim().split('.');
    const cents = Number(parts[0]) * 100 + Number((parts[1] || '').padEnd(2, '0'));
    if (!Number.isSafeInteger(cents) || cents < 1 || cents > 100000000) throw new Error('Amount must be between ৳0.01 and ৳1,000,000.');
    return cents;
  }
  function initial() { return { version: 1, balance: 4500000, claimed: [], transactions: [] }; }
  function read(storage, account) {
    const raw = storage.getItem('payoo:wallet:' + account);
    if (raw === null) return initial();
    const state = JSON.parse(raw);
    if (state.version !== 1 || !Number.isSafeInteger(state.balance) || state.balance < 0 || !Array.isArray(state.claimed) || !Array.isArray(state.transactions)) throw new Error('Saved wallet data is invalid. Clear this site’s storage to restart the demo.');
    return state;
  }
  function transact(storage, account, input) {
    if (!mobile(account)) throw new Error('Please sign in again.');
    const state = read(storage, account);
    let cents, title, detail, incoming;
    if (input.type === 'bonus') {
      const coupon = String(input.coupon || '').trim().toUpperCase();
      if (!Object.hasOwn(COUPONS, coupon)) throw new Error('Invalid coupon. Try BONUS100 or BONUS500.');
      if (state.claimed.includes(coupon)) throw new Error('This coupon has already been redeemed.');
      cents = COUPONS[coupon]; incoming = true; title = 'Bonus received'; detail = coupon;
      state.claimed.push(coupon);
    } else {
      if (input.pin !== PIN) throw new Error('Incorrect demo PIN. Use 1234.');
      cents = amount(input.amount);
      const recipient = String(input.recipient || '').trim();
      if (input.type === 'add') {
        if (!BANKS.includes(input.provider)) throw new Error('Choose a bank.');
        if (!/^\d{11}$/.test(recipient)) throw new Error('Enter an 11-digit demo bank account number.');
        incoming = true; title = 'Money added'; detail = input.provider;
      } else if (input.type === 'cashout' || input.type === 'transfer') {
        if (!mobile(recipient)) throw new Error('Enter a valid 11-digit Bangladesh mobile number.');
        if (recipient === account) throw new Error('Use a different recipient or agent number.');
        incoming = false; title = input.type === 'cashout' ? 'Cashout' : 'Money transferred'; detail = 'To •••••••' + recipient.slice(-4);
      } else if (input.type === 'bill') {
        if (!BILLS.includes(input.provider)) throw new Error('Choose a bill type.');
        if (!/^\d{6,20}$/.test(recipient)) throw new Error('Enter a bill account number with 6–20 digits.');
        incoming = false; title = input.provider + ' bill'; detail = 'Account ••••' + recipient.slice(-4);
      } else throw new Error('Unknown transaction type.');
    }
    if (!incoming && cents > state.balance) throw new Error('Insufficient balance.');
    const balance = state.balance + (incoming ? cents : -cents);
    if (!Number.isSafeInteger(balance) || balance > 10000000000) throw new Error('Demo wallet balance limit reached.');
    state.balance = balance;
    state.transactions.unshift({ id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10), title, detail, amount: incoming ? cents : -cents, time: new Date().toISOString() });
    storage.setItem('payoo:wallet:' + account, JSON.stringify(state));
    return state;
  }
  return { PIN, BANKS, BILLS, mobile, amount, initial, read, transact };
});
