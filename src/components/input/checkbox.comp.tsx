import { Checkbox } from '$/components/ui/checkbox';
import { Label } from '$/components/ui/label';
import { cn } from '$/lib/utils';

type Props = {
  id: string;
  checked?: boolean;
  onCheckedChange: (value: boolean) => void;
  className?: string;
  label?: string;
};

export const CheckboxInput = (props: Props) => {
  return (
    <div
      className={cn('flex cursor-pointer items-center gap-2', props.className)}
    >
      <Checkbox
        id={props.id}
        checked={props.checked}
        onCheckedChange={(value) =>
          props.onCheckedChange(value !== 'indeterminate' && value)
        }
      />
      <Label
        htmlFor={props.id}
        className="cursor-pointer text-sm font-medium text-nowrap"
      >
        {props.label}
      </Label>
    </div>
  );
};
