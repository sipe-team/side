import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import * as Icons from '.';

describe('Icon Components', () => {
  const iconEntries = Object.entries(Icons);

  it.each(iconEntries)('%s should render without crashing', (_, Icon) => {
    const screen = render(<Icon data-testid="icon" />);
    const svg = screen.getByTestId('icon');
    expect(svg).toBeInTheDocument();

    expect(svg).toHaveAttribute('width');
    expect(svg).toHaveAttribute('height');
    expect(svg).toHaveAttribute('viewBox');
    const viewBox = svg?.getAttribute('viewBox');
    expect(viewBox).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
    const hasGraphics = Boolean(svg?.querySelector('path, rect, circle, ellipse, line, polyline, polygon'));
    expect(hasGraphics).toBe(true);
    const paths = svg?.querySelectorAll('path');
    if (paths) {
      for (const path of Array.from(paths)) {
        expect(path).toHaveAttribute('fill');
      }
    }
  });

  it.each(iconEntries)('%s should apply custom size', (_, Icon) => {
    const screen = render(<Icon data-testid="icon" size={32} />);
    const svg = screen.getByTestId('icon');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it.each(iconEntries)('%s should apply custom color', (_, Icon) => {
    const screen = render(<Icon data-testid="icon" color="#FF0000" />);
    const svg = screen.getByTestId('icon');
    expect(svg?.querySelector('path')).toHaveAttribute('fill', '#FF0000');
  });

  it.each(iconEntries)('%s should forward ref correctly', (_, Icon) => {
    const ref = createRef<SVGSVGElement>();
    render(<Icon data-testid="icon" ref={ref} />);
    expect(ref.current).instanceOf(SVGSVGElement);
  });

  it.each(iconEntries)('%s should spread additional props', (_, Icon) => {
    const screen = render(<Icon data-testid="icon" className="custom-class" />);
    const svg = screen.getByTestId('icon');
    expect(svg).toHaveClass('custom-class');
  });
});
