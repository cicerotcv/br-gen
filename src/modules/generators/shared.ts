/**
 * Generates a random integer between the specified min and max values.
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random integer between min and max.
 */
export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random digit between 0 and 9.
 * @returns A random digit between 0 and 9.
 * @example
 * randDigit(); // might return 5
 */
export const randDigit = (): number => {
  return randInt(0, 9);
};

/**
 * Checks if all elements in the array are the same.
 * @param digits An array of digits to check.
 * @returns True if all elements are the same, false otherwise.
 */
export function allSame(digits: number[]): boolean {
  return digits.every((d) => d === digits[0]);
}
