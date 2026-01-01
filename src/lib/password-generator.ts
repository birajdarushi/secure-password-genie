export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
}

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, special } = options;
  
  let chars = '';
  let password = '';
  
  // Build character pool
  if (uppercase) chars += UPPERCASE_CHARS;
  if (lowercase) chars += LOWERCASE_CHARS;
  if (numbers) chars += NUMBER_CHARS;
  if (special) chars += SPECIAL_CHARS;
  
  // If no options selected, default to lowercase
  if (chars === '') {
    chars = LOWERCASE_CHARS;
  }
  
  // Ensure at least one character from each selected type
  const requiredChars: string[] = [];
  if (uppercase) requiredChars.push(UPPERCASE_CHARS[Math.floor(Math.random() * UPPERCASE_CHARS.length)]);
  if (lowercase) requiredChars.push(LOWERCASE_CHARS[Math.floor(Math.random() * LOWERCASE_CHARS.length)]);
  if (numbers) requiredChars.push(NUMBER_CHARS[Math.floor(Math.random() * NUMBER_CHARS.length)]);
  if (special) requiredChars.push(SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)]);
  
  // Generate random password
  for (let i = 0; i < length - requiredChars.length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Insert required characters at random positions
  for (const char of requiredChars) {
    const pos = Math.floor(Math.random() * (password.length + 1));
    password = password.slice(0, pos) + char + password.slice(pos);
  }
  
  return password;
}

export function calculateStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 4) return { score, label: 'Fair', color: 'bg-chart-5' };
  if (score <= 5) return { score, label: 'Good', color: 'bg-chart-2' };
  return { score, label: 'Strong', color: 'bg-primary' };
}
