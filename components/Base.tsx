import { getYear } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Home from "../assets/home.svg";
import Logo from "../assets/travel.png";
import styles from "../styles/Base.module.css";

export default function Base({ children }: any) {
  const { asPath } = useRouter();

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

      {asPath === "/" ? (
        <header className={styles.header}>
          <div className={styles.image}>
            <Link href="/">
              <Image src={Logo} alt="Logo" width={80} height={80} />
            </Link>
          </div>
          <div className={styles.title}>
            <h1>Káťa a Kuba na cestách</h1>
            <p>Blog o cestování a digitálním nomádství</p>
          </div>
        </header>
      ) : (
        <header className={styles.home}>
          <Link href="/">
            <Image src={Home} alt="Home" width={20} height={20} />
          </Link>
        </header>
      )}

      {children}

      <footer className={styles.footer}>
        © Copyright {getYear(new Date())}. All rights reserved.
      </footer>
    </div>
  );
}
