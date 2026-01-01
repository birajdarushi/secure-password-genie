import { useState, useCallback } from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordDisplay } from './PasswordDisplay';
import { PasswordOptions } from './PasswordOptions';
import { generatePassword, type PasswordOptions as Options } from '@/lib/password-generator';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<Options>({
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Password Generator</h1>
          <p className="text-muted-foreground">
            Create strong, secure passwords instantly
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Your Password</CardTitle>
            <CardDescription>
              Customize and generate a secure password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <PasswordDisplay password={password} onRegenerate={handleGenerate} />
            
            <div className="border-t border-border pt-6">
              <PasswordOptions options={options} onChange={setOptions} />
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Passwords are generated locally and never stored or transmitted
        </p>
      </div>
    </div>
  );
}
