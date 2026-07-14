import { type ReactNode, useState } from 'react';

import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

export interface PreviewProps {
  children: ReactNode;
  code: string;
  language?: string;
}

// children render unconditionally (no BrowserOnly) so the example lands in the static SSR HTML.
export function Preview({ children, code, language = 'tsx' }: PreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={styles.preview}>
      <div className={styles.stage}>{children}</div>

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
