import React from 'react';
import Calculator from './components/Calculator';
import { useCalculator } from './hooks/useCalculator';
import './styles/main.css';

const App: React.FC = () => {
  const { expression, setExpression, result, cached, loading, error, calculate } = useCalculator();

  return (
    <div className="app">
      <h1>Calcu</h1>
      <Calculator
        expression={expression}
        setExpression={setExpression}
        onCalculate={calculate}
        loading={loading}
        error={error}
        result={result}
        cached={cached}
      />
    </div>
  );
};

export default App;