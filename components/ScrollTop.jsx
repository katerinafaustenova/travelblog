import Image from "next/image";
import ArrowUp from "../assets/arrow-up.svg";
import styles from "../styles/ScrollTop.module.css";

export default function ScrollTop() {
  return (
    <button
      aria-label="Nahoru"
      type="button"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className={styles.scrollTop}
    >
      <Image src={ArrowUp} alt="Scroll to the top" width={25} height={25} />
    </button>
  );
}
