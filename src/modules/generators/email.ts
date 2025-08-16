import { randInt } from './shared';

export const formatEmail = (name: string, domain: string): string => {
  const email = `${name.replace(/\s+/g, '.').toLowerCase()}@${domain}`;
  return email;
};

export const generateRandomEmail = (): string => {
  const randomName = `user${randInt(0, 9999).toString().padStart(4, '0')}`;
  const randomDomain = `example.com`;
  return formatEmail(randomName, randomDomain);
};

export const generateEmailWithDomain = (domain: string): string => {
  const randomName = `user${randInt(0, 9999).toString().padStart(4, '0')}`;
  return formatEmail(randomName, domain);
};
