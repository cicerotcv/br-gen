import { useConfig } from '@/contexts/config.context';
import { useTranslation } from '@/hooks/translation';

import { CheckboxInput } from '../input/checkbox.comp';

export const ConfigAutoCopyCheckbox = () => {
  const config = useConfig();
  const { t } = useTranslation();

  return (
    <CheckboxInput
      id="auto-copy-checkbox"
      label={t('auto_copy')}
      checked={config.autoCopy}
      onCheckedChange={config.setAutoCopy}
    />
  );
};
