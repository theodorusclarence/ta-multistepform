export const REGEX = {
  NUMBER_ONLY: /^[0-9]+$/,
  DECIMAL_NUMBER_AND_NEGATIVE: /^-?[0-9]\d*(\.\d+)?$/,
  PHONE_NUMBER: /^\+628[1-9][0-9]{7,11}$/,
};

/**
 * Validation for exact length
 * @param length exact string length
 * @param message error message
 * @returns React Hook Form's validation object
 */
export const exactLength = (length: number, message: string) => ({
  minLength: {
    value: length,
    message,
  },
  maxLength: {
    value: length,
    message,
  },
});
