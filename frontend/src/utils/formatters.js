export const formatCurrency = (value) => new Intl.NumberFormat("en-IN", {style: "currency", currency: "INR", maximumFractionDigits: 0}).format(value);

/*
Formats number into Indian Rupee currency format using JavaScript Internationalization API (Intl.NumberFormat)
Intl.NumberFormat - built-in JavaScript object used for number formatting based on locale.
style: "currency" - Formats number as currency.
.format(value) - Formats the number.

** REFERENCE** - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
*/