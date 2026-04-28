import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import { useImageStatus } from './hooks/useImageStatus';

type ImageSize = number | string;
type ImageFit = 'contain' | 'cover' | 'fill';

export interface ImageProps
  extends Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'width' | 'height' | 'onLoad'> {
  src: string;
  alt: string;
  width?: ImageSize;
  height?: ImageSize;
  fit?: ImageFit;
  fill?: boolean;
  fallbackSrc?: string;
  placeholder?: ReactNode;
}

export function Image({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  fill = false,
  fallbackSrc,
  placeholder,
  loading = 'lazy',
  onError,
  style,
  ...props
}: ImageProps) {
  const { status, imgSrc, handleLoad, handleError } = useImageStatus({
    src,
    ...(fallbackSrc ? { fallbackSrc } : {}),
    ...(onError ? { onError } : {}),
  });

  const showPlaceholder = status === 'loading' && placeholder !== undefined;
  const isHidden = showPlaceholder || status === 'error';

  const sizeStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    objectFit: fit,
  };

  const fillStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }
    : {};

  return (
    <>
      {showPlaceholder ? placeholder : null}
      <img
        {...props}
        src={imgSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{ ...sizeStyle, ...fillStyle, visibility: isHidden ? 'hidden' : undefined, ...style }}
      />
    </>
  );
}
