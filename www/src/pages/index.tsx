import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Side is the Sipe design system — typed, token-driven React components for building Sipe products."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Side
        </Heading>
        <p className={styles.heroSubtitle}>The design system for Sipe products</p>
      </div>
    </header>
  );
}
