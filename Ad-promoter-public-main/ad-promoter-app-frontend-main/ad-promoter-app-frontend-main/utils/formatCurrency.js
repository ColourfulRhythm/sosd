const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'NGN',
  style: 'currency',
});
const CURRENCY_FORMATTER_WITHOUT_STYLE = new Intl.NumberFormat(undefined, {
  currency: 'NGN',
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}
export function formatCurrencyWithoutStyle(number) {
  return CURRENCY_FORMATTER_WITHOUT_STYLE.format(number);
}
