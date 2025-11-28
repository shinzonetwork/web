import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import clsx from 'clsx';
import type { ReactNode } from 'react';



import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('padding-horiz--md', styles.heroBanner)}>
      <div>
        <ThemedImage
          className={styles.heroLogo}
          alt=''
          sources={{
            light: useBaseUrl('/img/shinzo-logo-hero.svg'),
            dark: useBaseUrl('/img/shinzo-logo-hero-w.svg'),
          }}
        />

        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}
      wrapperClassName='szo-home'>
      <main>
        <HomepageHeader />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
