import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

export function PasswordOptions({ options, onChange }) {
  const updateOption = (key, value) => {
    onChange({ ...options, [key]: value });
  };

  const toggleOptions = [
    { id: 'uppercase', label: 'UPPERCASE (A-Z)', checked: options.uppercase },
    { id: 'lowercase', label: 'lowercase (a-z)', checked: options.lowercase },
    { id: 'numbers', label: 'Numbers (0-9)', checked: options.numbers },
    { id: 'special', label: 'Special (!@#$%^&*)', checked: options.special },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="length" className="text-base font-bold uppercase tracking-wide">
            Length
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
            className="w-20 text-center font-mono font-bold neo-brutal"
          />
        </div>
        <div className="neo-brutal p-3 bg-muted/30">
          <Slider
            value={[options.length]}
            onValueChange={([value]) => updateOption('length', value)}
            min={8}
            max={64}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs font-mono font-bold text-muted-foreground">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-bold uppercase tracking-wide">Character Types</Label>
        <div className="grid gap-2">
          {toggleOptions.map(({ id, label, checked }) => (
            <div 
              key={id} 
              className="flex items-center space-x-3 p-3 neo-brutal bg-card cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => updateOption(id, !checked)}
            >
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(checked) => updateOption(id, Boolean(checked))}
                className="border-2 border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={id}
                className="text-sm font-mono font-bold cursor-pointer select-none flex-1"
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
