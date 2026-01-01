import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateStrength } from '@/lib/password-generator';
import { toast } from '@/hooks/use-toast';

interface PasswordDisplayProps {
  password: string;
  onRegenerate: () => void;
}

export function PasswordDisplay({ password, onRegenerate }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);
  const strength = calculateStrength(password);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border shadow-sm">
          <code className="flex-1 font-mono text-lg break-all text-foreground">
            {password || 'Click Generate to create password'}
          </code>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onRegenerate}
              className="shrink-0 hover:bg-accent"
              aria-label="Regenerate password"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              disabled={!password}
              className="shrink-0 hover:bg-accent"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {password && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Password Strength</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${(strength.score / 7) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
