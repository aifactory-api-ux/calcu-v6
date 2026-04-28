import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpressionInput from '../src/components/ExpressionInput';

describe('ExpressionInput', () => {
  it('renders input with correct value', () => {
    render(<ExpressionInput value="2+2" onChange={() => {}} onSubmit={() => {}} disabled={false} />);
    const input = screen.getByLabelText('Expresión matemática') as HTMLInputElement;
    expect(input.value).toBe('2+2');
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<ExpressionInput value="" onChange={onChange} onSubmit={() => {}} disabled={false} />);
    const input = screen.getByLabelText('Expresión matemática');
    fireEvent.change(input, { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledWith('5');
  });

  it('calls onSubmit when Enter is pressed', () => {
    const onSubmit = vi.fn();
    render(<ExpressionInput value="2+2" onChange={() => {}} onSubmit={onSubmit} disabled={false} />);
    const input = screen.getByLabelText('Expresión matemática');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalled();
  });

  it('does not call onSubmit when disabled', () => {
    const onSubmit = vi.fn();
    render(<ExpressionInput value="2+2" onChange={() => {}} onSubmit={onSubmit} disabled={true} />);
    const input = screen.getByLabelText('Expresión matemática');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders with placeholder', () => {
    render(<ExpressionInput value="" onChange={() => {}} onSubmit={() => {}} disabled={false} />);
    const input = screen.getByPlaceholderText('Ej: 2+2-1');
    expect(input).toBeDefined();
  });
});