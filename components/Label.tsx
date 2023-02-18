import styles from "../styles/Label.module.css";

export function Label({category}: {category: string}) {
 if (category === "new") {
  return <div className={styles.labelNew}>New</div>
 } else return null
}
