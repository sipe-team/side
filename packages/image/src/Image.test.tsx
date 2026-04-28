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

  it('applies width and height styles for number and string values', () => {
    render(<Image src="https://picsum.photos/400/300" alt="size test" width={320} height="50%" />);

    const img = screen.getByRole('img', { name: 'size test' });
    expect(img).toHaveStyle({
      width: '320px',
      height: '50%',
    });
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
