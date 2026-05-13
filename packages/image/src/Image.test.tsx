import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Image } from './Image';

describe('Image', () => {
  it('renders with required src and alt props', () => {
    render(<Image src="https://picsum.photos/400/300" alt="sample image" />);

    const img = screen.getByRole('img', { name: 'sample image' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://picsum.photos/400/300');
  });

  it('updates img src when the Image src prop changes after mount', () => {
    const firstSrc = 'https://picsum.photos/id/10/200/300';
    const secondSrc = 'https://picsum.photos/id/20/200/300';

    const { rerender } = render(<Image src={firstSrc} alt="gallery" />);
    const img = screen.getByRole('img', { name: 'gallery' });
    expect(img).toHaveAttribute('src', firstSrc);

    rerender(<Image src={secondSrc} alt="gallery" />);
    expect(img).toHaveAttribute('src', secondSrc);
  });

  it('forwards ref to the img element', () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image ref={ref} src="https://picsum.photos/400/300" alt="ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLImageElement);
    expect(ref.current?.tagName).toBe('IMG');
    expect(ref.current).toHaveAttribute('alt', 'ref test');
  });

  it('applies width and height styles for number and string values', () => {
    render(<Image src="https://picsum.photos/400/300" alt="size test" width={320} height="50%" />);

    const img = screen.getByRole('img', { name: 'size test' });
    expect(img).toHaveStyle({
      width: '320px',
      height: '50%',
    });
  });

  it('applies width only; height falls back to auto (CSS variables + sized)', () => {
    render(<Image src="https://picsum.photos/400/300" alt="width only" width={200} />);

    const img = screen.getByRole('img', { name: 'width only' });
    expect(img).toHaveStyle({ width: '200px', height: 'auto' });
  });

  it('applies height only; width falls back to auto (CSS variables + sized)', () => {
    render(<Image src="https://picsum.photos/400/300" alt="height only" height="120px" />);

    const img = screen.getByRole('img', { name: 'height only' });
    expect(img).toHaveStyle({ width: 'auto', height: '120px' });
  });

  it('switches to fallbackSrc once when image load fails', () => {
    render(
      <Image
        src="https://invalid-url.com/broken.jpg"
        fallbackSrc="https://dummyimage.com/400x300/e5e7eb/111827&text=FALLBACK"
        alt="fallback test"
      />,
    );

    const img = screen.getByRole('img', { name: 'fallback test' });
    fireEvent.error(img);

    expect(img).toHaveAttribute('src', 'https://dummyimage.com/400x300/e5e7eb/111827&text=FALLBACK');
  });

  it('moves to error state and hides image when fallback is unavailable', () => {
    render(<Image src="https://invalid-url.com/broken.jpg" alt="error test" width={400} height={300} />);

    const img = screen.getByRole('img', { name: 'error test' });
    fireEvent.error(img);

    expect(img).toHaveStyle({ visibility: 'hidden' });
  });

  it('shows placeholder while loading and hides it after load', () => {
    render(
      <Image
        src="https://picsum.photos/400/300"
        alt="placeholder test"
        placeholder={
          <div data-testid="placeholder" style={{ width: 400, height: 300 }}>
            loading...
          </div>
        }
      />,
    );

    const img = screen.getByAltText('placeholder test');
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
    expect(img).toHaveStyle({ visibility: 'hidden' });

    fireEvent.load(img);

    expect(screen.queryByTestId('placeholder')).not.toBeInTheDocument();
    expect(img.style.visibility).toBe('');
  });

  it('applies fill styles when fill is true', () => {
    render(<Image src="https://picsum.photos/400/300" alt="fill test" fill />);

    const img = screen.getByRole('img', { name: 'fill test' });
    expect(img).toHaveStyle({
      position: 'absolute',
      width: '100%',
      height: '100%',
    });
  });

  it('prefers fill layout over width prop (no sized / no pixel width from props)', () => {
    render(
      <div style={{ position: 'relative', width: 400, height: 300 }}>
        <Image src="https://picsum.photos/400/300" alt="fill and width" fill width={200} />
      </div>,
    );

    const img = screen.getByRole('img', { name: 'fill and width' });
    expect(img).toHaveStyle({
      position: 'absolute',
      width: '100%',
      height: '100%',
    });
    expect(img).not.toHaveStyle({ width: '200px' });
  });

  it('applies object-fit from fit prop', () => {
    render(
      <Image src="https://picsum.photos/400/300" alt="object-fit contain" width={100} height={100} fit="contain" />,
    );

    expect(screen.getByRole('img', { name: 'object-fit contain' })).toHaveStyle({ objectFit: 'contain' });
  });

  it('applies object-fit fill variant from fit prop', () => {
    render(<Image src="https://picsum.photos/400/300" alt="object-fit fill" width={100} height={100} fit="fill" />);

    expect(screen.getByRole('img', { name: 'object-fit fill' })).toHaveStyle({ objectFit: 'fill' });
  });

  it('uses lazy loading by default', () => {
    render(<Image src="https://picsum.photos/400/300" alt="loading attr test" />);

    const img = screen.getByRole('img', { name: 'loading attr test' });
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('always calls user onError callback', () => {
    const onError = vi.fn();
    render(<Image src="https://invalid-url.com/broken.jpg" alt="onError test" onError={onError} />);

    const img = screen.getByRole('img', { name: 'onError test' });
    fireEvent.error(img);

    expect(onError).toHaveBeenCalledTimes(1);
  });
});
