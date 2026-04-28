import React from 'react';

interface ExpressionInputProps {
  value: string;
  onChange: (expr: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const ExpressionInput: React.FC<ExpressionInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder="Ej: 2+2-1"
      aria-label="Expresión matemática"
    />
  );
};

export default ExpressionInput;