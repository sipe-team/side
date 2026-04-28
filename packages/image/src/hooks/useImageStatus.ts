import { type SyntheticEvent, useCallback, useState } from 'react';

export type ImageStatus = 'loading' | 'normal' | 'fallback' | 'error';

interface UseImageStatusParams {
  src: string;
  fallbackSrc?: string;
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
  onError: onErrorFromProps,
}: UseImageStatusParams): UseImageStatusResult {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [imgSrc, setImgSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const handleLoad = useCallback((_event: SyntheticEvent<HTMLImageElement>) => {
    setStatus('normal');
  }, []);

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      onErrorFromProps?.(event);

      if (!hasTriedFallback && fallbackSrc) {
        setImgSrc(fallbackSrc);
        setHasTriedFallback(true);
        setStatus('loading');
        return;
      }

      setStatus('error');
    },
    [fallbackSrc, hasTriedFallback, onErrorFromProps],
  );

  return {
    status,
    imgSrc,
    handleLoad,
    handleError,
  };
}
