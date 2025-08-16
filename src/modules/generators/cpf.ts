import { allSame, randDigit } from './shared';

function calcCheckDigit(digits: number[], factorStart: number): number {
  const sum = digits.reduce(
    (acc, digit, idx) => acc + digit * (factorStart - idx),
    0
  );
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

export function generateCPF(): string {
  const base: number[] = Array.from({ length: 9 }, () => randDigit());

  // Ensure the last digit is not the same as the others
  // This prevents generating CPF numbers like 111.111.111-11
  if (allSame(base)) {
    base[base.length - 1] = (base[base.length - 1] + 1) % 10;
  }

  const d1 = calcCheckDigit(base, 10);
  const d2 = calcCheckDigit([...base, d1], 11);

  return [...base, d1, d2].join('');
}
