import { getYear } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Home from "../assets/home.svg";
import Logo from "../assets/travel.png";
import styles from "../styles/Base.module.css";

export function Base({ children, title }: any) {
  const { pathname } = useRouter();

  const defaultTitle = "Káťa a Kuba na cestách";
  const customTitle =
    pathname !== "/" && title ? `${defaultTitle} - ${title}` : defaultTitle;

  return (
    <div className={styles.container}>
      <Head>
        <title>{customTitle}</title>
        <meta
          name="description"
          content="This is our travel blog for family and friends"
        />
        <link rel="icon" href="/travel.ico" />
      </Head>

      {pathname === "/" ? (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/">
              <Image src={Logo} alt="Logo" width={60} height={60} priority />
            </Link>
            <h1>Káťa a Kuba na cestách</h1>
          </div>
        </header>
      ) : (
        <header className={styles.headerHome}>
          <div className={styles.headerContent}>
            <Link href="/">
              <Image src={Home} alt="Home" width={20} height={20} priority />
            </Link>
          </div>
        </header>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        © Copyright {getYear(new Date())}. All rights reserved.
      </footer>
    </div>
  );
}
