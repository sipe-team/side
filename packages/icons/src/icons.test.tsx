import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import * as Icons from './';

describe('Icon Components', () => {
  for (const [name, Icon] of Object.entries(Icons)) {
    describe(name, () => {
      it('should render without crashing', () => {
        render(<Icon />);
        const svg = document.querySelector('svg');
        expect(svg).toBeDefined();

        expect(svg).toHaveAttribute('width');
        expect(svg).toHaveAttribute('height');
        expect(svg).toHaveAttribute('viewBox');
        const viewBox = svg?.getAttribute('viewBox');
        expect(viewBox).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
        const hasGraphics = Boolean(
          svg?.querySelector('path, rect, circle, ellipse, line, polyline, polygon')
        );
        expect(hasGraphics).toBe(true);
        const paths = svg?.querySelectorAll('path');
        if (paths) {
          for (const path of Array.from(paths)) {
            expect(path).toHaveAttribute('fill');
          }
        }
      });

      it('should apply custom size', () => {
        render(<Icon size={32} />);
        const svg = document.querySelector('svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
      });

      it('should apply custom color', () => {
        render(<Icon color="#FF0000" />);
        const svg = document.querySelector('svg');
        expect(svg?.querySelector('path')).toHaveAttribute('fill', '#FF0000');
      });

      it('should forward ref correctly', () => {
        const ref = createRef<SVGSVGElement>();
        render(<Icon ref={ref} />);
        expect(ref.current).instanceOf(SVGSVGElement);
      });

      it('should spread additional props', () => {
        render(<Icon data-testid="test-icon" className="custom-class" />);
        const svg = screen.getByTestId('test-icon');
        expect(svg).toHaveClass('custom-class');
      });
    });
  }
});