import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import type { PasswordOptions as Options } from '@/lib/password-generator';

interface PasswordOptionsProps {
  options: Options;
  onChange: (options: Options) => void;
}

export function PasswordOptions({ options, onChange }: PasswordOptionsProps) {
  const updateOption = <K extends keyof Options>(key: K, value: Options[K]) => {
    onChange({ ...options, [key]: value });
  };

  const toggleOptions = [
    { id: 'uppercase', label: 'Uppercase Letters (A-Z)', checked: options.uppercase },
    { id: 'lowercase', label: 'Lowercase Letters (a-z)', checked: options.lowercase },
    { id: 'numbers', label: 'Numbers (0-9)', checked: options.numbers },
    { id: 'special', label: 'Special Characters (!@#$%^&*)', checked: options.special },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="length" className="text-base font-medium">
            Password Length
          </Label>
          <Input
            type="number"
            id="length"
            min={8}
            max={64}
            value={options.length}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 8;
              updateOption('length', Math.min(64, Math.max(8, val)));
            }}
            className="w-20 text-center"
          />
        </div>
        <Slider
          value={[options.length]}
          onValueChange={([value]) => updateOption('length', value)}
          min={8}
          max={64}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Character Types</Label>
        <div className="grid gap-3">
          {toggleOptions.map(({ id, label, checked }) => (
            <div key={id} className="flex items-center space-x-3">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(checked) => updateOption(id as keyof Options, Boolean(checked))}
              />
              <Label
                htmlFor={id}
                className="text-sm font-normal cursor-pointer select-none"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
