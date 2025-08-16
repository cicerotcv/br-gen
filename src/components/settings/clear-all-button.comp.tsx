import { X } from 'lucide-react';

import { cn } from '@/modules/shadcn/lib/utils';

import { useTranslation } from '@/hooks/translation';
import { eventEmitter, EventName } from '@/lib/event';

export const ClearAllButton = () => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        `bg-accent/50 border-accent group flex aspect-square w-20 cursor-pointer
        flex-col items-center justify-center gap-1 rounded-md border p-2
        transition-all select-none`,
        'active:opacity-90',
        'hover:bg-destructive/50 hover:border-destructive'
      )}
      onClick={() => eventEmitter.emit(EventName.ClearHistory)}
    >
      <X
        className="group-hover:bg-destructive bg-accent rounded-full px-1 py-1
          transition-all"
      />
      <span className="text-center text-xs">{t('clear_all')}</span>
    </div>
  );
};
