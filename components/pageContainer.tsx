import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Page.module.css';

interface PageContainerProps {
  title?: string;
  children?: React.ReactNode;
}

export default function PageContainer(props:PageContainerProps):JSX.Element {
  const { children, title } = props;
  let mixedTitle = 'N E O N A V';
  if (typeof title !== 'undefined') {
    mixedTitle = mixedTitle + `  [ ${title} ]`;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{mixedTitle}</title>
        <meta name="description" content="NeoNav Authentication Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.logoContainer}>
            <Image src="/neonav.svg" alt="NeoNav Logo" width={250} height={250} priority />
          </div>
        </div>
        <div className={styles.grid}>
        {children}
        </div>
      </main>
    </div>
  )
}
