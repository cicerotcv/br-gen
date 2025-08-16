import { useEffect, useState } from 'react';

import { chromeApi, getCurrentLanguage, isExtension } from '@/lib/chrome-api';

/**
 * Hook for internationalization
 * Works both in development (with official translations loaded from files) and in Chrome extension context
 */
export const useTranslation = () => {
  const [isReady, setIsReady] = useState(isExtension());

  useEffect(() => {
    // If we're not in extension context, wait a bit for translations to load
    if (!isExtension()) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100); // Small delay to allow translations to load

      return () => clearTimeout(timer);
    }
  }, []);

  const t = (key: string, substitutions?: string | string[]) => {
    // Return key as fallback if translations aren't ready yet
    if (!isReady) return key;

    return chromeApi.i18n.getMessage(key, substitutions);
  };

  const locale = chromeApi.i18n.getUILanguage();
  const language = getCurrentLanguage();

  return {
    t,
    locale,
    language,
    isReady,
  };
};
