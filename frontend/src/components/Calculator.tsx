import React from 'react';
import ExpressionInput from './ExpressionInput';
import ResultDisplay from './ResultDisplay';

interface CalculatorProps {
  expression: string;
  setExpression: (expr: string) => void;
  onCalculate: () => void;
  loading: boolean;
  error: string | null;
  result: number | null;
  cached: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({
  expression,
  setExpression,
  onCalculate,
  loading,
  error,
  result,
  cached,
}) => {
  return (
    <div className="calculator">
      <ExpressionInput
        value={expression}
        onChange={setExpression}
        onSubmit={onCalculate}
        disabled={loading}
      />
      <div className="calculator-buttons">
        <button onClick={onCalculate} disabled={loading}>
          +
        </button>
        <button onClick={onCalculate} disabled={loading}>
          −
        </button>
      </div>
      <ResultDisplay result={result} cached={cached} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Calculator;