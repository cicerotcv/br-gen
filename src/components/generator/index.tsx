import { useCallback, useEffect, useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { useConfig } from '@/contexts/config.context';
import { useTranslation } from '@/hooks/translation';
import { saveToClipboard } from '@/lib/clipboard';
import { eventEmitter, EventName } from '@/lib/event';
import { MaskUtils } from '@/lib/mask';
import { StorageManager } from '@/lib/storage-manager';

import { Badge } from '$/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '$/components/ui/collapsible';
import { cn } from '$/lib/utils';

import { ClearButton } from './clear-button.comp';
import { GenerateButton } from './generate-button.comp';
import { HistoryEntry } from './history-entry.comp';

type Props = {
  label: string;
  generator?: () => string;
  pattern?: string;
  storeKey?: string;
};

export const GeneratorComponent = (props: Props) => {
  const { masked, autoCopy } = useConfig();
  const { t } = useTranslation();

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    async function loadHistory() {
      if (!props.storeKey) return;

      const stored = await StorageManager.getItem(props.storeKey);

      console.log({ stored });

      if (stored) return setHistory(stored);

      setHistory([]);
    }

    loadHistory();
  }, [props.storeKey]);

  useEffect(() => {
    const clearHistory = () => {
      console.log('Clearing history', props.label);
      setHistory([]);
      if (props.storeKey) StorageManager.removeItem(props.storeKey);
    };

    eventEmitter.addListener(EventName.ClearHistory, clearHistory);

    return () => {
      eventEmitter.removeListener(EventName.ClearHistory, clearHistory);
    };
  }, [props.label, props.storeKey]);

  const getDisplayValue = useCallback(
    (value: string) => {
      if (masked && props.pattern)
        return MaskUtils.applyMask(value, props.pattern);

      return value;
    },
    [masked, props.pattern]
  );

  const handleGenerate = useCallback(() => {
    if (!props.generator) return;

    const newValue = props.generator();

    setHistory((prev) => {
      const updated = [newValue, ...prev];

      if (props.storeKey) StorageManager.setItem(props.storeKey, updated);

      return updated;
    });

    if (autoCopy) saveToClipboard(getDisplayValue(newValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.generator, props.pattern, getDisplayValue, autoCopy]);

  return (
    <Collapsible className="w-full overflow-hidden rounded-md border">
      <CollapsibleTrigger asChild>
        <div
          className="bg-accent flex w-full cursor-pointer flex-row items-center
            justify-between px-4 py-2 text-left
            data-[state=open]:[&_[data-role=collapsible-chevron]]:rotate-90"
        >
          <div className="flex items-center gap-2">
            {props.label}

            <Badge variant="outline">{history.length}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <ClearButton
              onClear={() => setHistory([])}
              visible={history.length > 0}
            />

            <GenerateButton onGenerate={handleGenerate} />

            <ChevronRight
              data-role="collapsible-chevron"
              className={cn('size-4 transition-all', {})}
            />
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="bg-accent/50 px-4 py-2">
        {history.length > 0 ? (
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">
              {t('history')}
            </span>

            <ul className="mt-1">
              {history.map((item, index) => (
                <HistoryEntry
                  key={`${item}${index}`}
                  value={item}
                  pattern={props.pattern}
                />
              ))}
            </ul>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">
            {t('no_history')}
          </span>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
