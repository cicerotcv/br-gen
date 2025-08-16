import { useCallback } from 'react';

import { Trash } from 'lucide-react';

import { useTranslation } from '@/hooks/translation';

import { Button } from '$/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '$/components/ui/tooltip';

export const ClearButton = (props: {
  onClear: () => void;
  visible?: boolean;
}) => {
  const { t } = useTranslation();

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      props.onClear();
    },
    [props]
  );

  if (!props.visible) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon-sm"
          variant="outline-destructive"
          className="ml-auto"
          onClick={handleClear}
        >
          <Trash />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('clear_history')}</TooltipContent>
    </Tooltip>
  );
};
