import { NavLink, Route, Routes } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/how-it-started"
              style={({ isActive }) => ({
                color: isActive ? "rgb(254 95 103)" : "black",
              })}
            >
              Jak to všechno začalo
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/destinations"
              style={({ isActive }) => ({
                color: isActive ? "rgb(254 95 103)" : "black",
              })}
            >
              Destinace
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/map"
              style={({ isActive }) => ({
                color: isActive ? "rgb(254 95 103)" : "black",
              })}
            >
              Mapa
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/how-it-started"
          element={<h2>Jak to všechno začalo</h2>}
        />
        <Route path="/destinations" element={<h2>Destinace</h2>} />
        <Route path="/map" element={<h2>Mapa</h2>} />
      </Routes>
    </>
  );
}

export default Navbar;
