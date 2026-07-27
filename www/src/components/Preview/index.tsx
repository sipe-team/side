import { type ReactNode, useState } from 'react';

import CodeBlock from '@theme/CodeBlock';
import { clsx } from 'clsx';

import styles from './styles.module.css';

export interface PreviewProps {
  children: ReactNode;
  code: string;
  language?: string;
  /** `"dark"` gives the stage a dark canvas — use for dark-only components. */
  theme?: 'light' | 'dark';
}

// children render unconditionally (no BrowserOnly) so the example lands in the static SSR HTML.
export function Preview({ children, code, language = 'tsx', theme = 'light' }: PreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={styles.preview}>
      <div className={clsx(styles.stage, theme === 'dark' && styles.stageDark)}>{children}</div>

      <div className={styles.toolbar}>
        <button type="button" className={styles.toggle} onClick={() => setShowCode((prev) => !prev)}>
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>

      {showCode && (
        <div className={styles.code}>
          <CodeBlock language={language}>{code}</CodeBlock>
        </div>
      )}
    </div>
  );
}

export default Preview;
