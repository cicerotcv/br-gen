type Store = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem: <T = any>(key: string) => Promise<T | null>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: <T = any>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
};

const createChromeStore = (): Store => ({
  getItem: async <T>(key: string): Promise<T | null> =>
    new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result[key] ?? null);
      });
    }),

  setItem: async <T>(key: string, value: T) =>
    chrome.storage.sync.set({ [key]: value }),

  removeItem: async (key: string) => chrome.storage.sync.remove(key),

  clear: async () => chrome.storage.sync.clear(),
});

const createLocalStorageStore = (): Store => ({
  getItem: async <T>(key: string): Promise<T | null> => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  setItem: async <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: async (key: string) => {
    localStorage.removeItem(key);
  },

  clear: async () => {
    localStorage.clear();
  },
});

const getStore = (): Store => {
  if (import.meta.env.PROD) return createChromeStore();

  return createLocalStorageStore();
};

export const StorageManager = getStore();
