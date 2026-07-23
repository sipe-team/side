import type { ReactNode } from 'react';

import Heading from '@theme/Heading';

import styles from './index.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tokens first',
    description: (
      <>
        Color, spacing, radius and type all resolve through <code>@sipe-team/tokens</code>. Components read the contract
        rather than literal values, so a token change lands everywhere at once.
      </>
    ),
  },
  {
    title: 'Typed and tested',
    description: (
      <>
        Every package ships ESM and CJS with types, and each component carries Vitest coverage for its variants,
        accessibility states and controlled behavior.
      </>
    ),
  },
  {
    title: 'Composable by default',
    description: (
      <>
        Components forward refs, extend their native element props and support <code>asChild</code> through Radix Slot —
        so they fit the markup you already have.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className="col col--4">
      <div className={styles.card}>
        {/* h2, not h3 — the hero is the only h1, so jumping to h3 would skip a level. */}
        <Heading as="h2" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardBody}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
