import { appKey } from '@/lib/app-key';

export const StorageKeys = {
  HistoryCpf: appKey('history.cpf'),
  HistoryCnpj: appKey('history.cnpj'),
  HistoryUuid: appKey('history.uuid'),
  HistoryEmail: appKey('history.email'),
  HistoryPhone: appKey('history.phone'),
  HistoryCellphone: appKey('history.cellphone'),

  AutoCopyConfig: appKey('config.auto-copy'),
  MaskedConfig: appKey('config.masked'),
};
