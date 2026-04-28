import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultDisplay from '../src/components/ResultDisplay';

describe('ResultDisplay', () => {
  it('renders nothing when result is null', () => {
    const { container } = render(<ResultDisplay result={null} cached={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders result value when result is provided', () => {
    render(<ResultDisplay result={42} cached={false} />);
    expect(screen.getByText('42')).toBeDefined();
  });

  it('renders cached badge when cached is true', () => {
    render(<ResultDisplay result={10} cached={true} />);
    expect(screen.getByText('cached')).toBeDefined();
  });

  it('does not render cached badge when cached is false', () => {
    const { container } = render(<ResultDisplay result={10} cached={false} />);
    expect(container.querySelector('.cached-badge')).toBeNull();
  });
});