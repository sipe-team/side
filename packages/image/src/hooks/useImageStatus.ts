import { type SyntheticEvent, useCallback, useEffect, useState } from 'react';

export type ImageStatus = 'loading' | 'normal' | 'fallback' | 'error';

interface UseImageStatusParams {
  src: string;
  fallbackSrc?: string;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

interface UseImageStatusResult {
  status: ImageStatus;
  imgSrc: string;
  handleLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  handleError: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export function useImageStatus({
  src,
  fallbackSrc,
  onLoad: onLoadFromProps,
  onError: onErrorFromProps,
}: UseImageStatusParams): UseImageStatusResult {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setStatus('loading');
  }, [src]);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      onLoadFromProps?.(event);
      setStatus('normal');
    },
    [onLoadFromProps],
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      onErrorFromProps?.(event);

      if (status !== 'fallback' && fallbackSrc) {
        setImgSrc(fallbackSrc);
        setStatus('fallback');
        return;
      }

      setStatus('error');
    },
    [fallbackSrc, onErrorFromProps, status],
  );

  return {
    status,
    imgSrc,
    handleLoad,
    handleError,
  };
}
