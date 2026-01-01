import { useState, useEffect, useRef } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateStrength } from '@/lib/password-generator.js';
import { toast } from '@/hooks/use-toast';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function PasswordDisplay({ password, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef();
  const strength = calculateStrength(password);

  useEffect(() => {
    if (!password) {
      setDisplayText('');
      return;
    }

    setIsAnimating(true);
    let iteration = 0;
    const finalPassword = password;
    const totalIterations = finalPassword.length * 3;

    const animate = () => {
      const progress = Math.floor(iteration / 3);
      
      const newText = finalPassword
        .split('')
        .map((char, index) => {
          if (index < progress) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(newText);
      iteration++;

      if (iteration <= totalIterations) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(finalPassword);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [password]);

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

  const getStrengthColor = () => {
    if (strength.score <= 2) return 'bg-destructive';
    if (strength.score <= 4) return 'bg-[hsl(45_80%_50%)]';
    return 'bg-secondary';
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-center gap-2 p-4 bg-card neo-brutal">
          <code className={`flex-1 font-mono text-lg break-all text-foreground font-bold tracking-wider ${isAnimating ? 'animate-scramble' : ''}`}>
            {displayText || 'Click Generate to create password'}
          </code>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onRegenerate}
              className="shrink-0 neo-brutal bg-accent hover:bg-accent/80"
              aria-label="Regenerate password"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              disabled={!password}
              className="shrink-0 neo-brutal bg-secondary hover:bg-secondary/80"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {password && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold uppercase tracking-wide">
            <span className="text-muted-foreground">Strength</span>
            <span>{strength.label}</span>
          </div>
          <div className="h-4 bg-muted neo-brutal overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${getStrengthColor()}`}
              style={{ width: `${(strength.score / 7) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
