import type { CSSProperties } from 'react';
import styles from './Divider.module.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  style?: CSSProperties;
}

export function Divider({ orientation = 'horizontal', style }: DividerProps) {
  return (
    <hr
      aria-orientation={orientation}
      className={`${styles[orientation]} ${styles.divider}`}
      style={style}
    />
  );
}
