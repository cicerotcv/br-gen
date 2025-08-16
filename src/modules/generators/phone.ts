import { randInt } from './shared';

const generateDdd = () => {
  return randInt(10, 99);
};

export const generateNumber = () => {
  const number = randInt(1e7, 1e8 - 1);
  return number;
};

export const generatePhone = (includeDdd: boolean = false) => {
  if (includeDdd) return `${generateDdd()}${generateNumber()}`;
  return generateNumber().toString();
};

export const generateCellphone = (includeDdd: boolean) => {
  if (includeDdd) return `${generateDdd()}9${generateNumber()}`;
  return `9${generateNumber()}`;
};
