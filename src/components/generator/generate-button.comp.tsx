import { useCallback, useRef, useState } from 'react';

import { Check, RotateCw } from 'lucide-react';

import { useTranslation } from '@/hooks/translation';

import { Button } from '$/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';
import { cn } from '$/lib/utils';

export const GenerateButton = (props: { onGenerate: () => void }) => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const debouncerTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleGenerate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      props.onGenerate();
      setSuccess(true);

      if (debouncerTimeout.current) {
        clearTimeout(debouncerTimeout.current);
      }

      debouncerTimeout.current = setTimeout(() => {
        setSuccess(false);
      }, 500);
    },
    [props]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          className={cn('ml-auto', {
            'border-contrast!': success,
          })}
          variant="outline"
          onClick={handleGenerate}
        >
          {success ? <Check className="text-contrast" /> : <RotateCw />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('generate_new_value')}</TooltipContent>
    </Tooltip>
  );
};
