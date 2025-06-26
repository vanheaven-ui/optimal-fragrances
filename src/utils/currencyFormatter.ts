// src/utils/currencyFormatter.ts

/**
 * Formats a number as a Ugandan Shilling (UGX) currency string.
 *
 * @param amount The number to format.
 * @returns A string representing the formatted currency, e.g., "UGX 120,000.00".
 */
export const formatPrice = (
  amount: number,
  currency: string,
  minDecimalDigits: number,
): string => {
  // Use toLocaleString for proper currency formatting,
  // ensuring commas for thousands separators and two decimal places.
  // 'en-US' locale is used for standard comma separation.
  // 'currency' style for currency formatting, and 'UGX' for the currency code.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: minDecimalDigits, 
    maximumFractionDigits: 2, // Ensure no more than two decimal places
  }).format(amount);
};
