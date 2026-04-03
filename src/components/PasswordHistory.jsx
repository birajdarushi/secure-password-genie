import { Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function PasswordHistory({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  const copyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      toast({ title: 'Copied!', description: 'Password copied to clipboard' });
    } catch {
      toast({ title: 'Failed to copy', description: 'Please copy manually', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Recent Passwords
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-7 px-2 text-muted-foreground hover:text-destructive"
          aria-label="Clear history"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      </div>
      <ul className="space-y-1">
        {history.map((pwd, i) => (
          <li
            key={i}
            className="flex items-center gap-2 p-2 neo-brutal bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onSelect(pwd)}
          >
            <code className="flex-1 font-mono text-xs break-all text-foreground truncate">
              {pwd}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-6 w-6"
              onClick={(e) => { e.stopPropagation(); copyPassword(pwd); }}
              aria-label="Copy password"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
