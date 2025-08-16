const isExtensionContext =
  typeof chrome !== 'undefined' &&
  chrome.i18n &&
  typeof chrome.i18n.getMessage === 'function';

type Messages = Record<string, string>;
const devMessages: Record<string, Messages> = {};

interface ChromeMessage {
  message: string;
  description?: string;
}

const convertMessages = (data: Record<string, ChromeMessage>): Messages =>
  Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.message]));

export const loadDevTranslations = async () => {
  const locales = ['en', 'pt_BR'] as const;

  await Promise.all(
    locales.map(async (locale) => {
      const response = await fetch(`/_locales/${locale}/messages.json`);
      const data: Record<string, ChromeMessage> = await response.json();
      devMessages[locale === 'pt_BR' ? 'pt' : locale] = convertMessages(data);
    })
  );
};

const getLangCode = (): string => {
  const lang = navigator.language || 'en';
  return lang.split('-')[0]; // 'pt-BR' -> 'pt'
};

const getDevMessage = (key: string, substitutions?: string[]): string => {
  const lang = getLangCode();
  const message = devMessages[lang] || devMessages['en'] || {};
  let text = message[key] || key;

  // Simple substitutions
  substitutions?.forEach((sub, i) => {
    text = text.replace(`$${i + 1}`, sub);
  });

  return text;
};

export const chromeApi = {
  i18n: {
    getMessage: (key: string, substitutions?: string | string[]): string => {
      if (isExtensionContext) {
        return chrome.i18n.getMessage(key, substitutions);
      }

      const subs =
        typeof substitutions === 'string' ? [substitutions] : substitutions;
      return getDevMessage(key, subs);
    },

    getUILanguage: (): string => {
      return isExtensionContext
        ? chrome.i18n.getUILanguage()
        : navigator.language;
    },
  },
};

export const isExtension = () => isExtensionContext;
export const getCurrentLanguage = (): string => getLangCode();

if (!isExtensionContext) {
  loadDevTranslations();
}
