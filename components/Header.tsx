import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/travel.png";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
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
  );
}
