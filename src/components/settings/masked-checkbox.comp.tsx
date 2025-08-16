import { useConfig } from '@/contexts/config.context';
import { useTranslation } from '@/hooks/translation';

import { CheckboxInput } from '../input/checkbox.comp';

export const ConfigMaskedCheckbox = () => {
  const config = useConfig();
  const { t } = useTranslation();

  return (
    <CheckboxInput
      id="masked-checkbox"
      label={t('use_mask')}
      checked={config.masked}
      onCheckedChange={config.setMasked}
    />
  );
};
