import { useState, useCallback } from 'react';

interface UseCalculatorResult {
  expression: string;
  setExpression: (expr: string) => void;
  result: number | null;
  cached: boolean;
  loading: boolean;
  error: string | null;
  calculate: () => Promise<void>;
}

export const parseExpression = (expr: string): number => {
  const trimmed = expr.trim();
  if (!trimmed) return 0;

  const cleanExpr = trimmed.replace(/\s/g, '');

  if (!/^[+\-*/0-9.]+$/.test(cleanExpr)) {
    throw new Error('Por favor ingrese números válidos');
  }

  const tokens = cleanExpr.match(/([+\-*/]|[0-9.]+)/g);
  if (!tokens) {
    throw new Error('Por favor ingrese números válidos');
  }

  let value = 0;
  let currentOp = '+';
  let currentNum = '';

  for (const token of tokens) {
    if (/^[+\-*/]$/.test(token)) {
      if (currentNum) {
        const num = parseFloat(currentNum);
        if (isNaN(num)) {
          throw new Error('Por favor ingrese números válidos');
        }
        if (currentOp === '+') value += num;
        else if (currentOp === '-') value -= num;
        else if (currentOp === '*') value *= num;
        else if (currentOp === '/') value /= num;
        currentNum = '';
      }
      currentOp = token;
    } else {
      currentNum += token;
    }
  }

  if (currentNum) {
    const num = parseFloat(currentNum);
    if (isNaN(num)) {
      throw new Error('Por favor ingrese números válidos');
    }
    if (currentOp === '+') value += num;
    else if (currentOp === '-') value -= num;
    else if (currentOp === '*') value *= num;
    else if (currentOp === '/') value /= num;
  }

  return value;
};

export const useCalculator = (): UseCalculatorResult => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [cached, setCached] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setCached(false);

    try {
      const numericResult = parseExpression(expression);
      setResult(numericResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [expression]);

  return {
    expression,
    setExpression,
    result,
    cached,
    loading,
    error,
    calculate,
  };
};