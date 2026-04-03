import { useState, useCallback } from 'react';

const MAX_HISTORY = 5;

export function usePasswordHistory() {
  const [history, setHistory] = useState([]);

  const addToHistory = useCallback((password) => {
    if (!password) return;
    setHistory((prev) => {
      if (prev[0] === password) return prev;
      return [password, ...prev].slice(0, MAX_HISTORY);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addToHistory, clearHistory };
}
