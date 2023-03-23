import { getYear } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import CsLogo from "../assets/cs.png";
import EnLogo from "../assets/en.png";
import Home from "../assets/home.svg";
import Logo from "../assets/travel.png";
import LangContext from "../context/LangContext";
import styles from "../styles/Base.module.css";

export const LanguageToggle = () => {
  const { enLang, toggleEnLang } = useContext(LangContext);

  return (
    <div className={styles.languageToggleWrapper}>
      <button onClick={toggleEnLang} className={styles.languageToggleBtn}>
        <Image
          src={enLang ? CsLogo : EnLogo}
          alt={enLang ? "English" : "Česky"}
          width={48}
          height={32}
          priority
        />
      </button>
    </div>
  );
};

export function Base({ children, title }: any) {
  const { enLang } = useContext(LangContext);
  const { pathname } = useRouter();

  const defaultTitle = enLang
    ? "Katka & Kuba on travels"
    : "Káťa a Kuba na cestách";
  const customTitle =
    pathname !== "/" && title ? `${defaultTitle} - ${title}` : defaultTitle;

  return (
    <div className={styles.container}>
      <Head>
        <title>{customTitle}</title>
        <meta
          name="description"
          content={
            enLang
              ? "This is our travel blog for family and friends"
              : "Tohle je náš cestovatelských blog pro rodinu a přátele"
          }
        />
        <link rel="icon" href="/travel.ico" />
      </Head>

      {pathname === "/" ? (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/">
              <Image src={Logo} alt="Logo" width={60} height={60} priority />
            </Link>
            <h1>{defaultTitle}</h1>
            <LanguageToggle />
          </div>
        </header>
      ) : (
        <header className={styles.headerHome}>
          <div className={styles.headerContent}>
            <Link href="/">
              <Image src={Home} alt="Home" width={20} height={20} priority />
            </Link>
            <LanguageToggle />
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
