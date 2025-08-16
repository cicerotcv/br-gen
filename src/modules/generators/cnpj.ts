import { allSame, randDigit } from './shared';

function calcCheckDigitCNPJ(digits: number[]): number {
  const factors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = digits.reduce(
    (acc, digit, idx) =>
      acc + digit * factors[factors.length - digits.length + idx],
    0
  );
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

export function generateCNPJ(): string {
  // CNPJ is 14 digits long, with the first 8 being the base
  // and the last 4 being the branch and check digits.
  const base = Array.from({ length: 8 }, () => randDigit());

  // The branch is usually a fixed number, but we can randomize it
  // for the sake of this generator. In practice, it could be a specific
  // branch number or a fixed value.
  const branch = Array.from({ length: 4 }, () => randDigit());

  const digits = [...base, ...branch];

  // Ensure the last digit is not the same as the others
  // This prevents generating CNPJ numbers like 11.111.111/0001-11
  // or similar patterns.
  if (allSame(digits)) {
    digits[0] = (digits[0] + 1) % 10;
  }

  const d1 = calcCheckDigitCNPJ(digits);
  const d2 = calcCheckDigitCNPJ([...digits, d1]);

  return [...digits, d1, d2].join('');
}
