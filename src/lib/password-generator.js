const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = /[0OlI1]/g;

export function generatePassword(options) {
  const { length, uppercase, lowercase, numbers, special, excludeSimilar } = options;
  
  const strip = (str) => excludeSimilar ? str.replace(SIMILAR_CHARS, '') : str;

  let chars = '';
  let password = '';
  
  if (uppercase) chars += strip(UPPERCASE_CHARS);
  if (lowercase) chars += strip(LOWERCASE_CHARS);
  if (numbers) chars += strip(NUMBER_CHARS);
  if (special) chars += SPECIAL_CHARS;
  
  if (chars === '') {
    chars = strip(LOWERCASE_CHARS) || LOWERCASE_CHARS;
  }
  
  const requiredChars = [];
  const safeUpper = strip(UPPERCASE_CHARS) || UPPERCASE_CHARS;
  const safeLower = strip(LOWERCASE_CHARS) || LOWERCASE_CHARS;
  const safeNums  = strip(NUMBER_CHARS)    || NUMBER_CHARS;
  if (uppercase) requiredChars.push(safeUpper[Math.floor(Math.random() * safeUpper.length)]);
  if (lowercase) requiredChars.push(safeLower[Math.floor(Math.random() * safeLower.length)]);
  if (numbers)   requiredChars.push(safeNums[Math.floor(Math.random() * safeNums.length)]);
  if (special)   requiredChars.push(SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)]);
  
  for (let i = 0; i < length - requiredChars.length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  for (const char of requiredChars) {
    const pos = Math.floor(Math.random() * (password.length + 1));
    password = password.slice(0, pos) + char + password.slice(pos);
  }
  
  return password;
}

export function calculateEntropy(password) {
  if (!password) return 0;
  const poolSize =
    (/[A-Z]/.test(password) ? 26 : 0) +
    (/[a-z]/.test(password) ? 26 : 0) +
    (/[0-9]/.test(password) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 32 : 0);
  if (poolSize === 0) return 0;
  return Math.round(password.length * Math.log2(poolSize));
}


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
