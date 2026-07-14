import { type ComponentPropsWithoutRef, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { clsx as cx } from 'clsx';

import { useImageStatus } from './hooks/useImageStatus';
import * as styles from './Image.css';

type ImageSize = number | string;
type ImageFit = 'contain' | 'cover' | 'fill';

export const ImageRadius = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: 'full',
} as const;
export type ImageRadius = (typeof ImageRadius)[keyof typeof ImageRadius];

export interface ImageProps
  extends Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'width' | 'height' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  width?: ImageSize;
  height?: ImageSize;
  fit?: ImageFit;
  fill?: boolean;
  radius?: ImageRadius;
  fallbackSrc?: string;
  placeholder?: ReactNode;
  onLoad?: ComponentPropsWithoutRef<'img'>['onLoad'];
  onError?: ComponentPropsWithoutRef<'img'>['onError'];
}

export const Image = forwardRef(function Image(
  {
    src,
    alt,
    width,
    height,
    fit = 'cover',
    fill = false,
    radius = ImageRadius.none,
    fallbackSrc,
    placeholder,
    loading = 'lazy',
    onLoad,
    onError,
    className: _className,
    style,
    ...props
  }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>,
) {
  const { status, imgSrc, handleLoad, handleError } = useImageStatus({
    src,
    ...(fallbackSrc ? { fallbackSrc } : {}),
    ...(onLoad ? { onLoad } : {}),
    ...(onError ? { onError } : {}),
  });

  const showPlaceholder = (status === 'loading' || status === 'fallback') && placeholder !== undefined;
  const isHidden = showPlaceholder || status === 'error';

  const useSized = !fill && (width !== undefined || height !== undefined);
  const dimensionStyle =
    useSized &&
    assignInlineVars({
      ...(width !== undefined && {
        [styles.widthVar]: typeof width === 'number' ? `${width}px` : width,
      }),
      ...(height !== undefined && {
        [styles.heightVar]: typeof height === 'number' ? `${height}px` : height,
      }),
    });

  return (
    <>
      {showPlaceholder ? placeholder : null}
      <img
        ref={ref}
        className={cx(
          styles.fit[fit],
          styles.radius[radius],
          fill && styles.fill,
          useSized && styles.sized,
          isHidden && styles.hidden,
          _className,
        )}
        src={imgSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{ ...(dimensionStyle || {}), ...style }}
        {...props}
      />
    </>
  );
});
