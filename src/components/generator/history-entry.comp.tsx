import { useCallback, useState, useTransition } from 'react';

import { Check, Copy } from 'lucide-react';

import { Button } from '@/modules/shadcn/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/modules/shadcn/components/ui/tooltip';

import { useConfig } from '@/contexts/config.context';
import { useTranslation } from '@/hooks/translation';
import { saveToClipboard } from '@/lib/clipboard';
import { MaskUtils } from '@/lib/mask';

type Props = {
  value: string;
  pattern?: string;
};

export const HistoryEntry = (props: Props) => {
  const { masked } = useConfig();
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const getDisplayValue = useCallback(
    (value: string) => {
      if (masked && props.pattern)
        return MaskUtils.applyMask(value, props.pattern);

      return value;
    },
    [masked, props.pattern]
  );

  const displayValue = getDisplayValue(props.value);

  const handleCopyContent = () => {
    saveToClipboard(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <li
      className="hover:bg-accent/50 hover:border-accent -mx-2 flex flex-row
        items-center justify-between gap-2 rounded border border-transparent
        px-2"
    >
      <span className="overflow-hidden text-sm text-nowrap text-ellipsis">
        {displayValue}
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyContent}
            className="-mr-2 w-auto"
          >
            {copied ? (
              <>
                <span className="text-xs">{t('copied')}</span>{' '}
                <Check className="text-contrast" />
              </>
            ) : (
              <Copy />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t('copy_to_clipboard')}</TooltipContent>
      </Tooltip>
    </li>
  );
};
