import { getYear } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/travel.png";
import styles from "../styles/Base.module.css";

export default function Base({ children }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Travel blog</title>
        <meta
          name="description"
          content="This is our travel blog for friend and family"
        />
        <link rel="icon" href="/travel.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.image}>
          <Link href="/">
            <Image src={Logo} alt="Logo" width={80} height={80} />
          </Link>
        </div>
        <div className={styles.title}>
          <h1>Ajtící na cestách</h1>
          <p>Blog o cestování a digitálním nomádství</p>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        © Copyright {getYear(new Date())}. All rights reserved.
      </footer>
    </div>
  );
}
