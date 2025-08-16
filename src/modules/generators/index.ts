import { generateCNPJ } from './cnpj';
import { generateCPF } from './cpf';
import { generateEmailWithDomain, generateRandomEmail } from './email';
import { generateCellphone, generatePhone } from './phone';
import { generateUuid } from './uuid';

export const GenUtils = {
  cpf: generateCPF,
  cnpj: generateCNPJ,
  uuid: generateUuid,
  email: {
    random: generateRandomEmail,
    randomWithDomain: (domain: string) => generateEmailWithDomain(domain),
  },
  phone: {
    withDdd: () => generatePhone(true),
    withoutDdd: () => generatePhone(false),
  },
  cellphone: {
    withDdd: () => generateCellphone(true),
    withoutDdd: () => generateCellphone(false),
  },
};
