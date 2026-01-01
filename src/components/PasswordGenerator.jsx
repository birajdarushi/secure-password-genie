import { useState, useCallback } from 'react';
import { Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PasswordDisplay } from './PasswordDisplay.jsx';
import { PasswordOptions } from './PasswordOptions.jsx';
import { generatePassword } from '@/lib/password-generator.js';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  }, [options]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary neo-brutal mb-4">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight uppercase">Password Generator</h1>
          <p className="text-muted-foreground font-mono text-sm">
            Create strong, secure passwords instantly
          </p>
        </div>

        <div className="bg-card p-6 neo-brutal space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold uppercase tracking-wide">Your Password</h2>
            <p className="text-muted-foreground text-sm font-mono">
              Customize and generate a secure password
            </p>
          </div>
          
          <PasswordDisplay password={password} onRegenerate={handleGenerate} />
          
          <div className="border-t-2 border-foreground pt-6">
            <PasswordOptions options={options} onChange={setOptions} />
          </div>

          <Button 
            onClick={handleGenerate} 
            className="w-full h-14 text-lg font-bold uppercase tracking-wider neo-brutal bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Generate Password
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-wide">
          Passwords are generated locally and never stored
        </p>
      </div>
    </div>
  );
}
