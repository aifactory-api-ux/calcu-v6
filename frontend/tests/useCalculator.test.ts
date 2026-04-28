import { describe, it, expect } from 'vitest';
import { parseExpression } from '../src/hooks/useCalculator';

describe('useCalculator - parseExpression', () => {
  it('should return 0 for empty expression', () => {
    expect(parseExpression('')).toBe(0);
  });

  it('should return 0 for whitespace only', () => {
    expect(parseExpression('   ')).toBe(0);
  });

  it('should handle simple addition', () => {
    expect(parseExpression('2+2')).toBe(4);
  });

  it('should handle simple subtraction', () => {
    expect(parseExpression('5-3')).toBe(2);
  });

  it('should handle multiplication', () => {
    expect(parseExpression('3*4')).toBe(12);
  });

  it('should handle division', () => {
    expect(parseExpression('10/2')).toBe(5);
  });

  it('should handle multiple operations', () => {
    expect(parseExpression('2+2-1')).toBe(3);
  });

  it('should handle decimals', () => {
    expect(parseExpression('2.5+1.5')).toBe(4);
  });

  it('should throw error for invalid characters', () => {
    expect(() => parseExpression('2+abc')).toThrow();
  });

  it('should throw error for empty invalid input', () => {
    expect(() => parseExpression('abc')).toThrow();
  });
});