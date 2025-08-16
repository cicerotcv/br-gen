import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { StorageKeys } from '@/config/keys';
import { StorageManager } from '@/lib/storage-manager';

type ConfigContextType = {
  masked: boolean;
  setMasked: (value: boolean) => void;
  autoCopy: boolean;
  setAutoCopy: (value: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ConfigContext = createContext<ConfigContextType>({
  masked: false,
  setMasked: () => {},
  autoCopy: false,
  setAutoCopy: () => {},
});

export const ConfigProvider = (props: PropsWithChildren) => {
  const [masked, setMasked] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      const masked = await StorageManager.getItem(StorageKeys.MaskedConfig);
      const autoCopy = await StorageManager.getItem(StorageKeys.AutoCopyConfig);
      if (masked !== null) setMasked(masked);
      if (autoCopy !== null) setAutoCopy(autoCopy);
    };
    loadConfig();
  }, []);

  const setMaskedConfig = useCallback((value: boolean) => {
    setMasked(value);
    StorageManager.setItem(StorageKeys.MaskedConfig, value);
  }, []);

  const setAutoCopyConfig = useCallback((value: boolean) => {
    setAutoCopy(value);
    StorageManager.setItem(StorageKeys.AutoCopyConfig, value);
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        masked,
        setMasked: setMaskedConfig,
        autoCopy,
        setAutoCopy: setAutoCopyConfig,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context)
    throw new Error('useConfig must be used within a ConfigProvider');

  return context;
};
