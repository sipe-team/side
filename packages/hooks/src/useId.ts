import { useId as useReactId } from 'react';

export function useId(deterministicId?: string): string {
  const reactId = useReactId();
  return deterministicId ?? `side-${reactId}`;
}
