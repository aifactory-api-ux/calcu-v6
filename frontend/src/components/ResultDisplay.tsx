import React from 'react';

interface ResultDisplayProps {
  result: number | null;
  cached: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, cached }) => {
  return (
    <div className="result-display">
      {result !== null && (
        <>
          <span className="result-value">{result}</span>
          {cached && <span className="cached-badge">cached</span>}
        </>
      )}
    </div>
  );
};

export default ResultDisplay;