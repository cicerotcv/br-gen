export const MaskUtils = {
  onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
  },
  applyMask(input: unknown, pattern: string) {
    if (input === null || input === undefined) return '';

    const digits = MaskUtils.onlyNumbers(`${input}`);

    if (!digits.length) return '';

    let result = '';
    let i = 0,
      j = 0;

    // Fill pattern until we run out of digits or pattern
    for (; i < pattern.length && j < digits.length; i++) {
      result += pattern[i] === '#' ? digits[j++] : pattern[i];
    }

    // Append suffix only if it contains no '#'
    let suffix = '';
    for (; i < pattern.length; i++) {
      // stop if incomplete number
      if (pattern[i] === '#') return result;
      suffix += pattern[i];
    }

    return result + suffix;
  },
};
