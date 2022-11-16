import { NavLink } from "react-router-dom";
import Logo from "../../assets/travel.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.image}>
        <NavLink to="/">
          <img src={Logo} alt="logo" />
        </NavLink>
      </div>
      <div className={styles.title}>
        <h1>Ajtící na cestách</h1>
        <p>Blog o cestování a digitálním nomádství</p>
      </div>
    </header>
  );
}

export default Header;
